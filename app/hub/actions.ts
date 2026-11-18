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
      txn_date: str(f, "txn_date") || new Date().toISOString().slice(0, 10),
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
  }, ["/hub", "/hub/money", "/hub/properties", "/hub/cars"]);
}

export async function deleteTransaction(id: number): Promise<ActionResult> {
  return run(async () => {
    const { error } = await db().from("transactions").delete().eq("id", id);
    if (error) throw new Error(error.message);
  }, ["/hub", "/hub/money", "/hub/properties", "/hub/cars"]);
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
