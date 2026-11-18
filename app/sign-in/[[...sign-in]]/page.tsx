import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ClerkProvider, SignIn } from "@clerk/nextjs";
import { clerkAppearance } from "@/components/hub/clerkAppearance";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: { absolute: "Sign in | Vantage Rock Financial" },
  robots: { index: false, follow: false },
};

export default function SignInPage() {
  const ready = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

  return (
    <main id="main" className="flex min-h-screen flex-col bg-bg text-ink">
      <div className="mx-auto flex w-full max-w-[1080px] items-center justify-between px-6 pt-7 md:px-10">
        <Link href="/" aria-label="Vantage Rock Financial, home">
          <Image src="/logo-light.png" alt="Vantage Rock Financial" width={1042} height={459} priority unoptimized className="h-9 w-auto" />
        </Link>
        <Link href="/" className="text-[13px] text-ink-muted transition-colors hover:text-ink">
          Back to the site
        </Link>
      </div>

      <div className="mx-auto grid w-full max-w-[1080px] flex-1 items-center gap-12 px-6 py-14 md:grid-cols-[1fr_minmax(0,420px)] md:gap-16 md:px-10">
        <div className="max-w-[440px]">
          <div className="section-label">Private hub</div>
          <h1 className="mt-6 font-display text-[clamp(2.2rem,4.6vw,3.3rem)] font-light leading-[1.04] tracking-[-0.03em]">
            The owner&rsquo;s <span className="italic text-teal-deep">ledger.</span>
          </h1>
          <p className="mt-5 text-[15px] leading-relaxed text-ink-muted">
            Properties, cars, income and expenses, and the working journal. This part of the site is for the owner only and is not
            linked from the public pages.
          </p>
          <div className="mt-8" aria-hidden>
            <div className="h-[2px] w-24 bg-navy" />
            <div className="mt-[3px] h-px w-24 bg-brass" />
          </div>
        </div>

        <div className="w-full">
          {ready ? (
            <ClerkProvider appearance={clerkAppearance}>
              <SignIn routing="path" path="/sign-in" fallbackRedirectUrl="/hub" />
            </ClerkProvider>
          ) : (
            <div className="rounded-lg border border-line bg-bg-raised p-7">
              <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#7A6238]">Setup</div>
              <h2 className="mt-3 font-display text-[24px] leading-tight tracking-[-0.02em]">Login is not switched on yet.</h2>
              <p className="mt-3 text-[14px] leading-relaxed text-ink-muted">
                The hub stays closed until the Clerk keys are added in Vercel, under Settings, then Environment Variables:
              </p>
              <ul className="mt-4 space-y-2 border-t border-line pt-4 text-[12.5px] font-medium text-ink">
                <li>NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY</li>
                <li>CLERK_SECRET_KEY</li>
                <li>HUB_OWNER_EMAILS</li>
              </ul>
              <p className="mt-4 text-[13px] leading-relaxed text-ink-dim">Redeploy after adding them and this page becomes the sign-in form.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
