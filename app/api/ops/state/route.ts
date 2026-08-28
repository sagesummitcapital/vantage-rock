import { NextResponse } from "next/server";
import { bearerOk, requestAuthed } from "@/lib/ops/auth";
import { getState, patchState, patchStates } from "@/lib/ops/state";
import type { SeatPatch } from "@/lib/ops/types";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  if (!requestAuthed(req)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const state = await getState();
  return NextResponse.json(state, {
    headers: { "Cache-Control": "no-store" },
  });
}

function isBatch(body: unknown): body is { seats: SeatPatch[] } {
  return !!body && typeof body === "object" && Array.isArray((body as { seats?: unknown }).seats);
}

export async function POST(req: Request) {
  if (!bearerOk(req.headers.get("authorization"))) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  try {
    const body = (await req.json()) as SeatPatch | { seats: SeatPatch[] };
    if (isBatch(body)) {
      if (body.seats.some((p) => !p?.id)) {
        return NextResponse.json({ error: "id required" }, { status: 400 });
      }
      const state = await patchStates(body.seats);
      return NextResponse.json(state);
    }
    const patch = body as SeatPatch;
    if (!patch.id) {
      return NextResponse.json({ error: "id required" }, { status: 400 });
    }
    const state = await patchState(patch);
    return NextResponse.json(state);
  } catch {
    return NextResponse.json({ error: "bad request" }, { status: 400 });
  }
}
