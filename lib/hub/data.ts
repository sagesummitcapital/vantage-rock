// Read layer for the private hub. Server-only (uses the service-role client).
import { db, isSupabaseConfigured } from "./supabase";

export type Business = "rentals" | "turo" | "advisory" | "trading";
export const BUSINESSES: { slug: Business; name: string }[] = [
  { slug: "rentals", name: "Rentals" },
  { slug: "turo", name: "Turo" },
  { slug: "advisory", name: "Vantage Rock" },
  { slug: "trading", name: "Prop trading" },
];

export type JournalKind = "instruction" | "decision" | "note" | "shipped" | "question";
export const JOURNAL_KINDS: JournalKind[] = ["instruction", "decision", "note", "shipped", "question"];
export type JournalStatus = "open" | "done" | "blocked" | "wontdo";
export const JOURNAL_STATUSES: JournalStatus[] = ["open", "done", "blocked", "wontdo"];

export type JournalEntry = {
  id: number;
  created_at: string;
  entry_date: string;
  author: "owner" | "grok" | "claude";
  kind: JournalKind;
  body: string;
  reply_to: number | null;
  status: JournalStatus;
  owner_approved: boolean;
  approved_at: string | null;
  tags: string[];
};

export type Property = {
  id: number;
  name: string;
  address: string | null;
  city: string | null;
  country: string;
  currency: string;
  platform: string | null;
  managed_by: string | null;
  target_rent: number | null;
  status: "rented" | "vacant" | "listed" | "renovation" | "sold";
  notes: string | null;
};

export type Lease = {
  id: number;
  property_id: number;
  tenant_label: string | null;
  start_date: string | null;
  end_date: string | null;
  monthly_rent: number;
  deposit: number | null;
  currency: string;
  status: "active" | "ended" | "upcoming";
};

export type Vehicle = {
  id: number;
  name: string;
  year: number | null;
  make: string | null;
  model: string | null;
  owner_party: string;
  status: "active" | "paused" | "maintenance" | "sold" | "planned";
  platform: string;
  tracker_provider: string | null;
  tracker_device_id: string | null;
  listing_url: string | null;
  notes: string | null;
};

export type Booking = {
  id: number;
  vehicle_id: number;
  platform_ref: string | null;
  start_at: string;
  end_at: string;
  gross: number;
  platform_fee: number;
  net: number;
  miles: number | null;
  status: "upcoming" | "active" | "completed" | "cancelled";
};

export type Transaction = {
  id: number;
  txn_date: string;
  business: Business;
  property_id: number | null;
  vehicle_id: number | null;
  direction: "income" | "expense";
  category: string;
  amount: number;
  currency: string;
  description: string | null;
  source: string | null;
};

export type Maintenance = {
  id: number;
  property_id: number | null;
  vehicle_id: number | null;
  opened_on: string;
  closed_on: string | null;
  title: string;
  vendor: string | null;
  cost: number | null;
  currency: string;
  status: "open" | "scheduled" | "done";
};

export type MonthlyRow = { month: string; business: Business; currency: string; income: number | null; expenses: number | null; net: number };
export type EntityMonth = { month: string; name: string; income: number; expenses: number; net: number; currency?: string; property_id?: number; vehicle_id?: number };
export type TradingMonth = { id: number; month: string; account: string; net_pnl: number; payouts: number; fees: number; notes: string | null };

const n = (v: unknown) => (v == null ? 0 : Number(v));

/** First day of the month, `monthsBack` months ago (0 = this month), as YYYY-MM-DD. */
export function monthStart(monthsBack = 0) {
  const d = new Date();
  d.setUTCDate(1);
  d.setUTCMonth(d.getUTCMonth() - monthsBack);
  return d.toISOString().slice(0, 10);
}

async function q<T>(p: PromiseLike<{ data: T[] | null; error: { message: string } | null }>): Promise<T[]> {
  const { data, error } = await p;
  if (error) throw new Error(error.message);
  return data ?? [];
}

export { isSupabaseConfigured };

// ---------- Journal ----------
export async function getJournal(opts: { limit?: number; kind?: JournalKind; status?: JournalStatus } = {}) {
  let qb = db().from("journal_entries").select("*");
  if (opts.kind) qb = qb.eq("kind", opts.kind);
  if (opts.status) qb = qb.eq("status", opts.status);
  return q<JournalEntry>(qb.order("id", { ascending: false }).limit(opts.limit ?? 100));
}

// ---------- Rentals ----------
export async function getProperties() {
  const since = monthStart(11);
  const [properties, leases, cash, maint] = await Promise.all([
    q<Property>(db().from("properties").select("*").order("id")),
    q<Lease>(db().from("leases").select("*").order("start_date", { ascending: false })),
    q<EntityMonth>(db().from("v_property_cashflow").select("*").gte("month", since)),
    q<Maintenance>(db().from("maintenance").select("*").not("property_id", "is", null).neq("status", "done")),
  ]);
  return properties.map((p) => {
    const rows = cash.filter((c) => c.property_id === p.id);
    return {
      ...p,
      target_rent: p.target_rent == null ? null : n(p.target_rent),
      activeLease: leases.find((l) => l.property_id === p.id && l.status === "active") ?? null,
      leases: leases.filter((l) => l.property_id === p.id),
      openMaintenance: maint.filter((m) => m.property_id === p.id),
      last12: {
        income: rows.reduce((s, r) => s + n(r.income), 0),
        expenses: rows.reduce((s, r) => s + n(r.expenses), 0),
        net: rows.reduce((s, r) => s + n(r.net), 0),
      },
      monthly: rows.map((r) => ({ month: r.month, income: n(r.income), expenses: n(r.expenses), net: n(r.net) })).sort((a, b) => a.month.localeCompare(b.month)),
    };
  });
}

// ---------- Turo ----------
export async function getVehicles() {
  const since = monthStart(11);
  const [vehicles, bookings, pnl, maint] = await Promise.all([
    q<Vehicle>(db().from("vehicles").select("*").order("id")),
    q<Booking>(db().from("bookings").select("*").order("start_at", { ascending: false }).limit(500)),
    q<EntityMonth>(db().from("v_vehicle_pnl").select("*").gte("month", since)),
    q<Maintenance>(db().from("maintenance").select("*").not("vehicle_id", "is", null).neq("status", "done")),
  ]);
  return vehicles.map((v) => {
    const rows = pnl.filter((r) => r.vehicle_id === v.id);
    const vb = bookings.filter((b) => b.vehicle_id === v.id);
    return {
      ...v,
      bookings: vb.slice(0, 10),
      tripCount: vb.filter((b) => b.status === "completed").length,
      upcoming: vb.filter((b) => b.status === "upcoming" || b.status === "active"),
      openMaintenance: maint.filter((m) => m.vehicle_id === v.id),
      last12: {
        income: rows.reduce((s, r) => s + n(r.income), 0),
        expenses: rows.reduce((s, r) => s + n(r.expenses), 0),
        net: rows.reduce((s, r) => s + n(r.net), 0),
      },
    };
  });
}

// ---------- Money ----------
export async function getTransactions(opts: { business?: Business; from?: string; to?: string; limit?: number } = {}) {
  let qb = db().from("transactions").select("*");
  if (opts.business) qb = qb.eq("business", opts.business);
  if (opts.from) qb = qb.gte("txn_date", opts.from);
  if (opts.to) qb = qb.lte("txn_date", opts.to);
  return q<Transaction>(qb.order("txn_date", { ascending: false }).order("id", { ascending: false }).limit(opts.limit ?? 300));
}

/** Monthly roll-up across all businesses (the "CFO of my own businesses" view). */
export async function getRollup(months = 12) {
  const since = monthStart(months - 1);
  const [rows, trading] = await Promise.all([
    q<MonthlyRow>(db().from("v_monthly_pnl").select("*").gte("month", since)),
    q<TradingMonth>(db().from("trading_results").select("*").gte("month", since).order("month", { ascending: false })),
  ]);
  const clean = rows.map((r) => ({ ...r, income: n(r.income), expenses: n(r.expenses), net: n(r.net) }));
  const monthsList = Array.from({ length: months }, (_, i) => monthStart(months - 1 - i));
  return {
    months: monthsList,
    rows: clean,
    trading: trading.map((t) => ({ ...t, net_pnl: n(t.net_pnl), payouts: n(t.payouts), fees: n(t.fees) })),
  };
}

export async function getOverview() {
  const [rollup, properties, vehicles, journal] = await Promise.all([
    getRollup(12),
    q<Property>(db().from("properties").select("*").order("id")),
    q<Vehicle>(db().from("vehicles").select("*").order("id")),
    getJournal({ limit: 8 }),
  ]);
  const [{ count: openCount }, { count: pendingCount }] = await Promise.all([
    db().from("journal_entries").select("id", { count: "exact", head: true }).eq("status", "open"),
    db().from("journal_entries").select("id", { count: "exact", head: true })
      .neq("author", "owner").in("kind", ["instruction", "decision"]).eq("owner_approved", false).neq("status", "wontdo"),
  ]);
  return { rollup, properties, vehicles, journal, openJournal: openCount ?? 0, pendingApprovals: pendingCount ?? 0 };
}

export async function getLookups() {
  const [properties, vehicles] = await Promise.all([
    q<Pick<Property, "id" | "name" | "currency">>(db().from("properties").select("id,name,currency").order("id")),
    q<Pick<Vehicle, "id" | "name">>(db().from("vehicles").select("id,name").order("id")),
  ]);
  return { properties, vehicles };
}
