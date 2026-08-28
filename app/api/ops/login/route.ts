import { NextResponse } from "next/server";
import { OPS_COOKIE, passwordOk, signSession } from "@/lib/ops/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const password = String(body?.password || "");
    if (!process.env.OPS_PASSWORD) {
      return NextResponse.json({ error: "OPS_PASSWORD not set" }, { status: 503 });
    }
    if (!passwordOk(password)) {
      return NextResponse.json({ error: "bad password" }, { status: 401 });
    }
    const res = NextResponse.json({ ok: true });
    res.cookies.set(OPS_COOKIE, signSession(), {
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    return res;
  } catch {
    return NextResponse.json({ error: "bad request" }, { status: 400 });
  }
}
