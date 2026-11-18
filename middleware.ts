// Login gate for the private Vantage Rock Financial hub (/hub/*), powered by Clerk.
// Marketing pages, the /ops floor (its own password) and /api/* are NOT affected.
// Grok Bot / Claude use the Supabase agent API with their own keys (see docs/AGENT_API.md).
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse, type NextFetchEvent, type NextRequest } from "next/server";

const isPrivate = createRouteMatcher(["/hub(.*)"]);

const withClerk = clerkMiddleware(async (auth, req) => {
  if (!isPrivate(req)) return;
  const { userId } = await auth();
  if (!userId) {
    const url = new URL("/sign-in", req.url);
    url.searchParams.set("redirect_url", req.nextUrl.pathname + req.nextUrl.search);
    return NextResponse.redirect(url);
  }
});

export default function middleware(req: NextRequest, ev: NextFetchEvent) {
  const clerkReady = Boolean(
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && process.env.CLERK_SECRET_KEY
  );
  // Until the Clerk keys are in Vercel, keep the hub closed; /sign-in explains what's missing.
  if (!clerkReady) {
    if (isPrivate(req)) return NextResponse.redirect(new URL("/sign-in", req.url));
    return NextResponse.next();
  }
  return withClerk(req, ev);
}

export const config = {
  matcher: ["/hub/:path*", "/sign-in/:path*"],
};
