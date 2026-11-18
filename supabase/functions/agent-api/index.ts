// Vantage Rock Financial — Agent API (Grok Bot / Claude). Supabase Edge Function "agent-api".
// Completely separate from Moonbag. Source of truth lives in the site repo: supabase/functions/agent-api/.
// Auth: Authorization: Bearer <api key>  (or x-api-key header). Keys are stored hashed in public.api_keys.
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { PostgrestClient } from "npm:@supabase/postgrest-js@1";
import { AGENT_API_DOC, DOC_VERSION } from "./docs.ts";

// Database-only client (no storage/auth deps needed). Service role stays server-side.
const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const db = new PostgrestClient(`${Deno.env.get("SUPABASE_URL")}/rest/v1`, {
  headers: { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}` },
});

const KINDS = ["instruction", "decision", "note", "shipped", "question"];
const STATUSES = ["open", "done", "blocked", "wontdo"];

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-api-key, content-type",
  "Access-Control-Allow-Methods": "GET, POST, PATCH, OPTIONS",
};
const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data, null, 2), {
    status,
    headers: { "Content-Type": "application/json", "X-Doc-Version": DOC_VERSION, ...cors },
  });
const fail = (status: number, error: string) => json({ error }, status);

async function sha256(s: string) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function authenticate(req: Request) {
  const h = req.headers.get("authorization") ?? "";
  const key = h.toLowerCase().startsWith("bearer ") ? h.slice(7).trim() : (req.headers.get("x-api-key") ?? "").trim();
  if (!key || !key.startsWith("vrk_")) return null;
  const { data } = await db.from("api_keys").select("id, agent, scopes, revoked_at")
    .eq("key_hash", await sha256(key)).maybeSingle();
  if (!data || data.revoked_at) return null;
  db.from("api_keys").update({ last_used_at: new Date().toISOString() }).eq("id", data.id).then(() => {});
  return data as { id: number; agent: "grok" | "claude"; scopes: string[] };
}

const clampLimit = (v: string | null, d = 50) => Math.min(Math.max(parseInt(v ?? "") || d, 1), 500);

// Read-only hub resources: path -> table, default ordering, and which id filters apply
const HUB: Record<string, { table: string; order: string; asc?: boolean; filters?: string[] }> = {
  properties: { table: "properties", order: "id", asc: true },
  leases: { table: "leases", order: "start_date", filters: ["property_id"] },
  vehicles: { table: "vehicles", order: "id", asc: true },
  bookings: { table: "bookings", order: "start_at", filters: ["vehicle_id"] },
  transactions: { table: "transactions", order: "txn_date", filters: ["property_id", "vehicle_id"] },
  maintenance: { table: "maintenance", order: "opened_on", filters: ["property_id", "vehicle_id"] },
  trading: { table: "trading_results", order: "month" },
  content: { table: "content_posts", order: "posted_on" },
  businesses: { table: "businesses", order: "slug", asc: true },
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: cors });
  const url = new URL(req.url);
  const parts = url.pathname.split("/").filter(Boolean);
  const i = parts.indexOf("agent-api");
  const route = i >= 0 ? parts.slice(i + 1) : parts;
  const q = url.searchParams;

  const who = await authenticate(req);
  if (!who) return fail(401, "Missing or invalid API key");
  const can = (s: string) => who.scopes.includes(s);

  try {
    if (route.length === 0 || route[0] === "health") {
      return json({ ok: true, agent: who.agent, scopes: who.scopes, doc_version: DOC_VERSION, time: new Date().toISOString() });
    }

    if (route[0] === "docs") {
      return new Response(AGENT_API_DOC, {
        headers: { "Content-Type": "text/markdown; charset=utf-8", "X-Doc-Version": DOC_VERSION, ...cors },
      });
    }

    // ---------- Journal ----------
    if (route[0] === "journal") {
      if (req.method === "GET") {
        if (!can("journal:read")) return fail(403, "journal:read scope required");
        if (route[1]) {
          const { data, error } = await db.from("journal_entries").select("*").eq("id", Number(route[1])).maybeSingle();
          if (error) throw error;
          return data ? json(data) : fail(404, "Not found");
        }
        let qb = db.from("journal_entries").select("*");
        if (q.get("since")) qb = qb.gte("entry_date", q.get("since")!);
        if (q.get("after_id")) qb = qb.gt("id", Number(q.get("after_id")));
        if (q.get("kind")) qb = qb.eq("kind", q.get("kind")!);
        if (q.get("author")) qb = qb.eq("author", q.get("author")!);
        if (q.get("status")) qb = qb.eq("status", q.get("status")!);
        const { data, error } = await qb.order("id", { ascending: false }).limit(clampLimit(q.get("limit")));
        if (error) throw error;
        return json({ doc_version: DOC_VERSION, entries: data });
      }

      if (req.method === "POST") {
        if (!can("journal:write")) return fail(403, "journal:write scope required");
        const b = await req.json().catch(() => null);
        if (!b || typeof b.body !== "string" || !b.body.trim()) return fail(400, "body (text) is required");
        if (!KINDS.includes(b.kind)) return fail(400, `kind must be one of: ${KINDS.join(", ")}`);
        const row = {
          author: who.agent, // author always comes from the key, never the request
          kind: b.kind,
          body: b.body.trim(),
          reply_to: b.reply_to ? Number(b.reply_to) : null,
          tags: Array.isArray(b.tags) ? b.tags.map(String).slice(0, 20) : [],
          status: b.status && STATUSES.includes(b.status) ? b.status : "open",
          // owner_approved can never be set through the API
        };
        const { data, error } = await db.from("journal_entries").insert(row).select().single();
        if (error) throw error;
        return json(data, 201);
      }

      if (req.method === "PATCH" && route[1]) {
        if (!can("journal:write")) return fail(403, "journal:write scope required");
        const b = await req.json().catch(() => null);
        if (!b || !STATUSES.includes(b.status)) return fail(400, `status must be one of: ${STATUSES.join(", ")}`);
        const { data, error } = await db.from("journal_entries").update({ status: b.status })
          .eq("id", Number(route[1])).select().maybeSingle();
        if (error) throw error;
        return data ? json(data) : fail(404, "Not found");
      }
      return fail(405, "Method not allowed");
    }

    // ---------- Hub data (read-only) ----------
    if (req.method !== "GET") return fail(405, "Hub data is read-only through the API");
    if (!can("hub:read")) return fail(403, "hub:read scope required");

    if (route[0] === "summary") {
      const months = Math.min(Math.max(parseInt(q.get("months") ?? "") || 6, 1), 36);
      const from = new Date();
      from.setUTCDate(1);
      from.setUTCMonth(from.getUTCMonth() - (months - 1));
      const fromStr = from.toISOString().slice(0, 10);
      const [pnl, props, cars, trading] = await Promise.all([
        db.from("v_monthly_pnl").select("*").gte("month", fromStr).order("month", { ascending: false }),
        db.from("v_property_cashflow").select("*").gte("month", fromStr).order("month", { ascending: false }),
        db.from("v_vehicle_pnl").select("*").gte("month", fromStr).order("month", { ascending: false }),
        db.from("trading_results").select("*").gte("month", fromStr).order("month", { ascending: false }),
      ]);
      for (const r of [pnl, props, cars, trading]) if (r.error) throw r.error;
      return json({ from: fromStr, monthly_by_business: pnl.data, properties: props.data, vehicles: cars.data, trading: trading.data });
    }

    const res = HUB[route[0]];
    if (!res) return fail(404, `Unknown route. Try: health, docs, journal, summary, ${Object.keys(HUB).join(", ")}`);
    let qb = db.from(res.table).select("*");
    if (route[1]) {
      const { data, error } = await qb.eq(res.table === "businesses" ? "slug" : "id", route[1]).maybeSingle();
      if (error) throw error;
      return data ? json(data) : fail(404, "Not found");
    }
    if (res.table === "transactions") {
      if (q.get("business")) qb = qb.eq("business", q.get("business")!);
      if (q.get("from")) qb = qb.gte("txn_date", q.get("from")!);
      if (q.get("to")) qb = qb.lte("txn_date", q.get("to")!);
    }
    for (const fk of res.filters ?? []) {
      if (q.get(fk)) qb = qb.eq(fk, Number(q.get(fk)));
    }
    const { data, error } = await qb.order(res.order, { ascending: !!res.asc }).limit(clampLimit(q.get("limit"), 200));
    if (error) throw error;
    return json({ [route[0]]: data });
  } catch (e) {
    console.error(e);
    return fail(500, (e as { message?: string })?.message ?? "Server error");
  }
});
