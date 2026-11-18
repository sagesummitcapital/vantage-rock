// Formatting helpers for the private hub. Pure functions: safe on server and client.
// Numeric columns from Supabase can arrive as strings, so everything goes through num().

export const PHOENIX_TZ = "America/Phoenix";

/** Coerce anything (string numerics, null, undefined) to a finite number. */
export function num(v: unknown): number {
  if (v == null || v === "") return 0;
  const n = typeof v === "number" ? v : Number(v);
  return Number.isFinite(n) ? n : 0;
}

type MoneyOpts = {
  /** Show cents (tables). Summary figures leave them off. */
  cents?: boolean;
  /** Always show a sign on non-zero values (+$1,200 / −$300). */
  signed?: boolean;
};

/** Currency-aware money. USD and EUR are first-class; anything else falls back to its ISO code. */
export function money(amount: unknown, currency: string | null | undefined = "USD", opts: MoneyOpts = {}): string {
  const cur = (currency || "USD").toUpperCase();
  const digits = opts.cents ? 2 : 0;
  let value = num(amount);
  if (Math.abs(value) < (opts.cents ? 0.005 : 0.5)) value = 0; // never print "−$0"
  let out: string;
  try {
    out = new Intl.NumberFormat(cur === "EUR" ? "en-IE" : "en-US", {
      style: "currency",
      currency: cur,
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
      signDisplay: opts.signed ? "exceptZero" : "auto",
    }).format(value);
  } catch {
    out = `${value.toFixed(digits)} ${cur}`;
  }
  // A true minus sign sets better beside lining figures than a hyphen.
  return out.replace(/^-/, "−");
}

export function tone(v: unknown): "pos" | "neg" | "flat" {
  const n = num(v);
  return n > 0.004 ? "pos" : n < -0.004 ? "neg" : "flat";
}

// ---------- Dates ----------
// Calendar dates (YYYY-MM-DD, month keys) are formatted in UTC so they never slip a day.
// Timestamps are shown in Phoenix time, where the owner is.

function calendarDate(s: string): Date | null {
  const d = new Date(`${String(s).slice(0, 10)}T12:00:00Z`);
  return Number.isNaN(d.getTime()) ? null : d;
}

function fmtCalendar(s: string | null | undefined, options: Intl.DateTimeFormatOptions): string {
  if (!s) return "";
  const d = calendarDate(s);
  if (!d) return String(s);
  return new Intl.DateTimeFormat("en-US", { ...options, timeZone: "UTC" }).format(d);
}

/** "Nov" */
export const monthShort = (m: string) => fmtCalendar(m, { month: "short" });
/** "N" — single-letter axis tick */
export const monthInitial = (m: string) => fmtCalendar(m, { month: "narrow" });
/** "November 2026" */
export const monthLong = (m: string) => fmtCalendar(m, { month: "long", year: "numeric" });
/** "Nov 2026" */
export const monthYear = (m: string) => fmtCalendar(m, { month: "short", year: "numeric" });
/** "Nov 18, 2026" */
export const day = (s: string | null | undefined) => fmtCalendar(s, { month: "short", day: "numeric", year: "numeric" });
/** "Nov 18" */
export const dayShort = (s: string | null | undefined) => fmtCalendar(s, { month: "short", day: "numeric" });
/** "Wednesday, November 18, 2026" */
export const dayLong = (s: string | null | undefined) =>
  fmtCalendar(s, { weekday: "long", month: "long", day: "numeric", year: "numeric" });

/** Month key used to match view rows to the roll-up's month list: "2026-11". */
export const monthKey = (m: string) => String(m).slice(0, 7);

/** Timestamp in Phoenix time: "Nov 18, 2:32 PM" */
export function dateTime(iso: string | null | undefined): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return String(iso);
  return new Intl.DateTimeFormat("en-US", {
    timeZone: PHOENIX_TZ,
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(d);
}

/** Timestamp as a Phoenix calendar day: "Nov 18, 2026" */
export function dateInPhoenix(iso: string | null | undefined): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return String(iso);
  return new Intl.DateTimeFormat("en-US", { timeZone: PHOENIX_TZ, month: "short", day: "numeric", year: "numeric" }).format(d);
}

/** Today in Phoenix: iso is YYYY-MM-DD (for date inputs), label is "Wed, Nov 18". */
export function phoenixToday(): { iso: string; label: string; long: string } {
  const now = new Date();
  const iso = new Intl.DateTimeFormat("en-CA", { timeZone: PHOENIX_TZ, year: "numeric", month: "2-digit", day: "2-digit" }).format(now);
  const label = new Intl.DateTimeFormat("en-US", { timeZone: PHOENIX_TZ, weekday: "short", month: "short", day: "numeric" }).format(now);
  const long = new Intl.DateTimeFormat("en-US", { timeZone: PHOENIX_TZ, weekday: "long", month: "long", day: "numeric", year: "numeric" }).format(now);
  return { iso, label, long };
}

/** First value of a Next.js search param. */
export function one(v: string | string[] | undefined): string | undefined {
  return Array.isArray(v) ? v[0] : v;
}
