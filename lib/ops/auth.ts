import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const OPS_COOKIE = "vr_ops";

function secret() {
  const s = process.env.OPS_SECRET || process.env.OPS_PASSWORD;
  if (!s) throw new Error("OPS_SECRET or OPS_PASSWORD is required");
  return s;
}

export function signSession(): string {
  const hmac = createHmac("sha256", secret());
  hmac.update("ops-ok");
  return hmac.digest("hex");
}

export function isValidSession(token: string | undefined): boolean {
  if (!token) return false;
  try {
    const expected = signSession();
    const a = Buffer.from(token);
    const b = Buffer.from(expected);
    return a.length === b.length && timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export function passwordOk(password: string): boolean {
  const expected = process.env.OPS_PASSWORD;
  if (!expected) return false;
  const a = Buffer.from(password);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export function bearerOk(header: string | null): boolean {
  const secretEnv = process.env.OPS_SECRET;
  if (!secretEnv || !header?.startsWith("Bearer ")) return false;
  const token = header.slice(7);
  const a = Buffer.from(token);
  const b = Buffer.from(secretEnv);
  return a.length === b.length && timingSafeEqual(a, b);
}

export function cookieAuthed(): boolean {
  return isValidSession(cookies().get(OPS_COOKIE)?.value);
}

export function requestAuthed(req: Request): boolean {
  if (bearerOk(req.headers.get("authorization"))) return true;
  const cookie = req.headers.get("cookie") || "";
  const match = cookie.match(new RegExp(`${OPS_COOKIE}=([^;]+)`));
  return isValidSession(match?.[1]);
}
