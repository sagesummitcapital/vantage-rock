import Link from "next/link";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <span className="mono-label">404</span>
      <h1 className="mt-6 font-display text-[clamp(2rem,5vw,3rem)] tracking-[-0.025em] text-ink">
        This page doesn&apos;t exist.
      </h1>
      <p className="mt-4 max-w-[420px] text-[15px] leading-[1.6] text-ink-muted">
        The link may be outdated or mistyped. Everything lives on the
        homepage.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-md bg-navy px-5 py-3 text-[14px] font-medium text-ink-invert transition-colors hover:bg-teal hover:text-white"
      >
        Back to homepage
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
          <path d="M3 9L9 3M9 3H4M9 3V8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      </Link>
    </main>
  );
}
