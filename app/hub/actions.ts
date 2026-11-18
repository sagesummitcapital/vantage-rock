"use server";

// Owner-only writes from the hub. Every action re-checks the owner list on the server.
// Approvals live here and nowhere else: the agent API can never set owner_approved.
import { revalidatePath } from "next/cache";
import { requireOwner } from "@/lib/hub/owner";
import { db } from "@/lib/hub/supabase";
import { BUSINESSES, JOURNAL_KINDS, JOURNAL_STATUSES, type JournalKind, type JournalStatus } from "@/lib/hub/data";

export type ActionResult = { ok: boolean; error?: string };

const str = (f: FormData, k: string) => String(f.get(k) ?? "").trim();
const num = (f: FormData, k: string) => {
  const v = str(f, k).replace(/[$,€\s]/g, "");
  return v === "" ? null : Number(v);
};
const intOrNull = (f: FormData, k: string) => {
  const v = str(f, k);
  return v ? Number(v) : null;
};

async function run(fn: () => Promise<void>, paths: string[]): Promise<ActionResult> {
  try {
    await requireOwner();
    await fn();
    for (const p of paths) revalidatePath(p);
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Something went wrong" };
  }
}

// ---------- Journal ----------
export async function postJournalEntry(_prev: ActionResult | null, f: FormData): Promise<ActionResult> {
  return run(async () => {
    const kind = str(f, "kind") as JournalKind;
    const body = str(f, "body");
    if (!JOURNAL_KINDS.includes(kind)) throw new Error("Pick a kind");
    if (!body) throw new Error("Write something first");
    const approve = str(f, "approve") === "on";
    const { error } = await db().from("journal_entries").insert({
      author: "owner",
      kind,
      body,
      reply_to: intOrNull(f, "reply_to"),
      owner_approved: approve,
      approved_at: approve ? new Date().toISOString() : null,
    });
    if (error) throw new Error(error.message);
  }, ["/hub", "/hub/journal"]);
}

export async function approveEntry(id: number): Promise<ActionResult> {
  return run(async () => {
    const { error } = await db().from("journal_entries")
      .update({ owner_approved: true, approved_at: new Date().toISOString() }).eq("id", id);
    if (error) throw new Error(error.message);
  }, ["/hub", "/hub/journal"]);
}

export async function revokeApproval(id: number): Promise<ActionResult> {
  return run(async () => {
    const { error } = await db().from("journal_entries")
      .update({ owner_approved: false, approved_at: null }).eq("id", id);
    if (error) throw new Error(error.message);
  }, ["/hub", "/hub/journal"]);
}

export async function setEntryStatus(id: number, status: JournalStatus): Promise<ActionResult> {
  return run(async () => {
    if (!JOURNAL_STATUSES.includes(status)) throw new Error("Bad status");
    const { error } = await db().from("journal_entries").update({ status }).eq("id", id);
    if (error) throw new Error(error.message);
  }, ["/hub", "/hub/journal"]);
}

// ---------- Money ----------
export async function addTransaction(_prev: ActionResult | null, f: FormData): Promise<ActionResult> {
  return run(async () => {
    const business = str(f, "business");
    const direction = str(f, "direction");
    const amount = num(f, "amount");
    if (!BUSINESSES.some((b) => b.slug === business)) throw new Error("Pick a business");
    if (direction !== "income" && direction !== "expense") throw new Error("Pick income or expense");
    if (amount == null || !(amount > 0)) throw new Error("Amount must be more than 0");
    const { error } = await db().from("transactions").insert({
      // A month picker ("2026-10") books the entry on the 1st of that month.
      txn_date: str(f, "txn_date") || (/^\d{4}-\d{2}$/.test(str(f, "month")) ? `${str(f, "month")}-01` : new Date().toISOString().slice(0, 10)),
      business,
      direction,
      amount,
      category: str(f, "category") || (direction === "income" ? "income" : "expense"),
      currency: str(f, "currency") || "USD",
      property_id: intOrNull(f, "property_id"),
      vehicle_id: intOrNull(f, "vehicle_id"),
      description: str(f, "description") || null,
      source: "manual",
    });
    if (error) throw new Error(error.message);
  }, ["/hub", "/hub/money", "/hub/properties", "/hub/cars", "/hub/monthly"]);
}

export async function deleteTransaction(id: number): Promise<ActionResult> {
  return run(async () => {
    const { error } = await db().from("transactions").delete().eq("id", id);
    if (error) throw new Error(error.message);
  }, ["/hub", "/hub/money", "/hub/properties", "/hub/cars", "/hub/monthly"]);
}

// ---------- Properties ----------
export async function updateProperty(_prev: ActionResult | null, f: FormData): Promise<ActionResult> {
  return run(async () => {
    const id = intOrNull(f, "id");
    if (!id) throw new Error("Missing property");
    const { error } = await db().from("properties").update({
      name: str(f, "name") || undefined,
      address: str(f, "address") || null,
      city: str(f, "city") || null,
      platform: str(f, "platform") || null,
      managed_by: str(f, "managed_by") || null,
      target_rent: num(f, "target_rent"),
      status: str(f, "status") || undefined,
      notes: str(f, "notes") || null,
    }).eq("id", id);
    if (error) throw new Error(error.message);
  }, ["/hub", "/hub/properties"]);
}

// ---------- Cars ----------
export async function addVehicle(_prev: ActionResult | null, f: FormData): Promise<ActionResult> {
  return run(async () => {
    const name = str(f, "name");
    if (!name) throw new Error("Give the car a name");
    const { error } = await db().from("vehicles").insert({
      name,
      year: intOrNull(f, "year"),
      make: str(f, "make") || null,
      model: str(f, "model") || null,
      owner_party: str(f, "owner_party") || "owner",
      status: str(f, "status") || "active",
      tracker_provider: str(f, "tracker_provider") || null,
      listing_url: str(f, "listing_url") || null,
    });
    if (error) throw new Error(error.message);
  }, ["/hub", "/hub/cars"]);
}

const ALL = ["/hub", "/hub/properties", "/hub/cars", "/hub/money", "/hub/monthly"];
const dateOrNull = (f: FormData, k: string) => (/^\d{4}-\d{2}-\d{2}$/.test(str(f, k)) ? str(f, k) : null);

// ---------- Properties: add ----------
export async function addProperty(_prev: ActionResult | null, f: FormData): Promise<ActionResult> {
  return run(async () => {
    const name = str(f, "name");
    if (!name) throw new Error("Give the property a name");
    const country = (str(f, "country") || "US").toUpperCase();
    const { error } = await db().from("properties").insert({
      name,
      address: str(f, "address") || null,
      city: str(f, "city") || null,
      country,
      currency: (str(f, "currency") || (country === "US" ? "USD" : "EUR")).toUpperCase(),
      platform: str(f, "platform") || null,
      managed_by: str(f, "managed_by") || null,
      target_rent: num(f, "target_rent"),
      status: str(f, "status") || "rented",
      notes: str(f, "notes") || null,
    });
    if (error) throw new Error(error.message);
  }, ALL);
}

// ---------- Leases ----------
export async function addLease(_prev: ActionResult | null, f: FormData): Promise<ActionResult> {
  return run(async () => {
    const property_id = intOrNull(f, "property_id");
    const rent = num(f, "monthly_rent");
    if (!property_id) throw new Error("Missing property");
    if (rent == null || !(rent > 0)) throw new Error("Monthly rent must be more than 0");
    const status = str(f, "status") || "active";
    if (status === "active") {
      // One active lease per property: the new one replaces the old one.
      const { error: endErr } = await db().from("leases").update({ status: "ended" }).eq("property_id", property_id).eq("status", "active");
      if (endErr) throw new Error(endErr.message);
    }
    const { error } = await db().from("leases").insert({
      property_id,
      tenant_label: str(f, "tenant_label") || null,
      start_date: dateOrNull(f, "start_date"),
      end_date: dateOrNull(f, "end_date"),
      monthly_rent: rent,
      deposit: num(f, "deposit"),
      currency: (str(f, "currency") || "USD").toUpperCase(),
      status,
      notes: str(f, "notes") || null,
    });
    if (error) throw new Error(error.message);
  }, ALL);
}

export async function endLease(id: number): Promise<ActionResult> {
  return run(async () => {
    const { error } = await db().from("leases").update({ status: "ended" }).eq("id", id);
    if (error) throw new Error(error.message);
  }, ALL);
}

// ---------- Maintenance (properties and cars) ----------
export async function addMaintenance(_prev: ActionResult | null, f: FormData): Promise<ActionResult> {
  return run(async () => {
    const property_id = intOrNull(f, "property_id");
    const vehicle_id = intOrNull(f, "vehicle_id");
    const title = str(f, "title");
    if (!property_id && !vehicle_id) throw new Error("Missing property or car");
    if (!title) throw new Error("Describe the job");
    const cost = num(f, "cost");
    const currency = (str(f, "currency") || "USD").toUpperCase();
    const status = str(f, "status") || "open";
    const opened_on = dateOrNull(f, "opened_on") ?? new Date().toISOString().slice(0, 10);
    const { error } = await db().from("maintenance").insert({
      property_id, vehicle_id, title, cost, currency, status, opened_on,
      vendor: str(f, "vendor") || null,
      closed_on: status === "done" ? opened_on : null,
      notes: str(f, "notes") || null,
    });
    if (error) throw new Error(error.message);
    // Optional: also book the cost as an expense so it lands in the P&L.
    if (str(f, "log_expense") === "on" && cost && cost > 0) {
      const { error: e2 } = await db().from("transactions").insert({
        txn_date: opened_on,
        business: property_id ? "rentals" : "turo",
        property_id, vehicle_id,
        direction: "expense",
        category: "repairs",
        amount: cost,
        currency,
        description: title,
        source: "maintenance",
      });
      if (e2) throw new Error(e2.message);
    }
  }, ALL);
}

export async function closeMaintenance(id: number): Promise<ActionResult> {
  return run(async () => {
    const { error } = await db().from("maintenance")
      .update({ status: "done", closed_on: new Date().toISOString().slice(0, 10) }).eq("id", id);
    if (error) throw new Error(error.message);
  }, ALL);
}

// ---------- Cars: edit ----------
export async function updateVehicle(_prev: ActionResult | null, f: FormData): Promise<ActionResult> {
  return run(async () => {
    const id = intOrNull(f, "id");
    if (!id) throw new Error("Missing car");
    const { error } = await db().from("vehicles").update({
      name: str(f, "name") || undefined,
      year: intOrNull(f, "year"),
      make: str(f, "make") || null,
      model: str(f, "model") || null,
      owner_party: str(f, "owner_party") || "owner",
      status: str(f, "status") || undefined,
      tracker_provider: str(f, "tracker_provider") || null,
      tracker_device_id: str(f, "tracker_device_id") || null,
      listing_url: str(f, "listing_url") || null,
      acquired_on: dateOrNull(f, "acquired_on"),
      acquisition_cost: num(f, "acquisition_cost"),
      notes: str(f, "notes") || null,
    }).eq("id", id);
    if (error) throw new Error(error.message);
  }, ALL);
}

// ---------- Turo trips ----------
export async function addBooking(_prev: ActionResult | null, f: FormData): Promise<ActionResult> {
  return run(async () => {
    const vehicle_id = intOrNull(f, "vehicle_id");
    const start = dateOrNull(f, "start_date");
    const end = dateOrNull(f, "end_date") ?? start;
    const gross = num(f, "gross") ?? 0;
    const fee = num(f, "platform_fee") ?? 0;
    if (!vehicle_id) throw new Error("Missing car");
    if (!start) throw new Error("Add the trip start date");
    const status = str(f, "status") || "completed";
    const { data, error } = await db().from("bookings").insert({
      vehicle_id,
      platform_ref: str(f, "platform_ref") || null,
      start_at: `${start}T12:00:00-07:00`,
      end_at: `${end}T12:00:00-07:00`,
      gross, platform_fee: fee,
      miles: intOrNull(f, "miles"),
      status,
      notes: str(f, "notes") || null,
    }).select("id").single();
    if (error) throw new Error(error.message);
    // Completed trips book their net payout as Turo income (default on).
    if (status === "completed" && str(f, "log_income") !== "off" && gross - fee > 0) {
      const { error: e2 } = await db().from("transactions").insert({
        txn_date: end,
        business: "turo",
        vehicle_id,
        booking_id: data.id,
        direction: "income",
        category: "trip",
        amount: Math.round((gross - fee) * 100) / 100,
        currency: "USD",
        description: str(f, "platform_ref") ? `Turo trip ${str(f, "platform_ref")}` : "Turo trip",
        source: "turo",
      });
      if (e2) throw new Error(e2.message);
    }
  }, ALL);
}

// ---------- Breakout / prop trading: monthly top line ----------
export async function saveTradingMonth(_prev: ActionResult | null, f: FormData): Promise<ActionResult> {
  return run(async () => {
    const m = str(f, "month");
    if (!/^\d{4}-\d{2}$/.test(m)) throw new Error("Pick a month");
    const { error } = await db().from("trading_results").upsert({
      month: `${m}-01`,
      account: str(f, "account") || "Breakout",
      net_pnl: num(f, "net_pnl") ?? 0,
      payouts: num(f, "payouts") ?? 0,
      fees: num(f, "fees") ?? 0,
      notes: str(f, "notes") || null,
    }, { onConflict: "month,account" });
    if (error) throw new Error(error.message);
  }, ALL);
}

export async function deleteTradingMonth(id: number): Promise<ActionResult> {
  return run(async () => {
    const { error } = await db().from("trading_results").delete().eq("id", id);
    if (error) throw new Error(error.message);
  }, ALL);
}
