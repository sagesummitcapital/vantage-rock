import { NextResponse } from "next/server";
import { bearerOk, requestAuthed } from "@/lib/ops/auth";
import { getState, patchState } from "@/lib/ops/state";
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

export async function POST(req: Request) {
  if (!bearerOk(req.headers.get("authorization"))) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  try {
    const body = (await req.json()) as SeatPatch;
    if (!body?.id) {
      return NextResponse.json({ error: "id required" }, { status: 400 });
    }
    const state = await patchState(body);
    return NextResponse.json(state);
  } catch {
    return NextResponse.json({ error: "bad request" }, { status: 400 });
  }
}
