import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ClerkProvider, UserButton } from "@clerk/nextjs";
import { getHubAccess } from "@/lib/hub/owner";
import { isSupabaseConfigured } from "@/lib/hub/data";
import { clerkAppearance } from "@/components/hub/clerkAppearance";
import HubNav from "@/components/hub/HubNav";
import { Code, Notice } from "@/components/hub/ui";
import { phoenixToday } from "@/components/hub/format";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: { absolute: "Private hub | Vantage Rock Financial" },
  robots: { index: false, follow: false },
};

function Chrome({ children, nav, user }: { children: ReactNode; nav: boolean; user: boolean }) {
  const today = phoenixToday();
  return (
    <div className="flex min-h-screen flex-col bg-bg text-ink">
      <header className="sticky top-0 z-40 border-b border-line bg-[rgba(244,245,242,0.94)] backdrop-blur-md">
        <div className="mx-auto max-w-[1180px] px-5 md:px-10">
          <div className="flex items-center justify-between gap-6 pb-2 pt-3.5">
            <Link href="/hub" className="group flex items-center gap-4" aria-label="Vantage Rock Financial private hub, overview">
              <Image
                src="/logo-light.png"
                alt="Vantage Rock Financial"
                width={1042}
                height={459}
                priority
                unoptimized
                className="h-8 w-auto transition-opacity group-hover:opacity-80"
              />
              <span className="hidden h-5 w-px bg-brass sm:block" aria-hidden />
              <span className="hidden text-[11px] font-medium uppercase tracking-[0.18em] text-ink-muted sm:block">Private hub</span>
            </Link>
            <div className="flex items-center gap-5">
              <div className="text-right leading-tight">
                <div className="tabular text-[12.5px] font-medium text-ink">{today.label}</div>
                <div className="text-[10.5px] uppercase tracking-[0.14em] text-ink-dim">Phoenix time</div>
              </div>
              {user ? <UserButton /> : null}
            </div>
          </div>
          {nav ? <HubNav /> : <div className="h-2" />}
        </div>
      </header>

      <main id="main" className="mx-auto w-full max-w-[1180px] flex-1 px-5 pb-24 md:px-10">
        {children}
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-3 px-5 py-6 text-[12px] text-ink-dim md:px-10">
          <span>Private and confidential. Not indexed, not linked from the public site.</span>
          <Link href="/" className="transition-colors hover:text-ink">
            vantagerockfinancial.com
          </Link>
        </div>
      </footer>
    </div>
  );
}

export default async function HubLayout({ children }: { children: ReactNode }) {
  // Without Clerk keys the middleware already sends /hub to /sign-in; this is a second lock.
  const clerkReady = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && process.env.CLERK_SECRET_KEY);
  if (!clerkReady) {
    return (
      <Chrome nav={false} user={false}>
        <Notice label="Setup" title="Login is not switched on yet.">
          <p>
            The hub stays closed until the Clerk keys are added in Vercel: <Code>NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY</Code> and{" "}
            <Code>CLERK_SECRET_KEY</Code>. Redeploy after adding them.
          </p>
        </Notice>
      </Chrome>
    );
  }

  const access = await getHubAccess();
  const email = access.emails[0];

  let body: ReactNode;
  if (!access.allowed) {
    body = (
      <Notice label="Private" title="This hub is private.">
        <p>
          {email ? (
            <>
              You are signed in as <span className="font-medium text-ink">{email}</span>, which is not on the owner list for this hub.
            </>
          ) : (
            <>You are not signed in with an address on the owner list for this hub.</>
          )}{" "}
          If that is a mistake, sign out with the account button above and sign back in with the right address.
        </p>
        {!access.allowlistSet ? (
          <p>
            Nobody can open the hub yet: <Code>HUB_OWNER_EMAILS</Code> has not been set in Vercel. Add the owner&rsquo;s email address there
            (comma-separated for more than one) and redeploy. Until then the hub stays locked for everyone, by design.
          </p>
        ) : null}
        <p>
          <Link href="/" className="text-teal-deep underline decoration-brass/60 decoration-1 underline-offset-[5px] hover:text-ink">
            Back to vantagerockfinancial.com
          </Link>
        </p>
      </Notice>
    );
  } else if (!isSupabaseConfigured()) {
    body = (
      <Notice label="Setup" title="The hub is not connected to its database yet.">
        <p>
          Your login works. The last step is to add <Code>SUPABASE_URL</Code> and <Code>SUPABASE_SERVICE_ROLE_KEY</Code> in Vercel, then
          redeploy. The steps are in <Code>docs/HUB_SETUP.md</Code>.
        </p>
        <p>Nothing is shown here until that connection exists, so no page can fail half-loaded.</p>
      </Notice>
    );
  } else {
    body = children;
  }

  const ready = access.allowed && isSupabaseConfigured();

  return (
    <ClerkProvider appearance={clerkAppearance} afterSignOutUrl="/">
      <Chrome nav={ready} user>
        {body}
      </Chrome>
    </ClerkProvider>
  );
}
