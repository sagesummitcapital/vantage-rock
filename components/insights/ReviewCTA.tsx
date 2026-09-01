import Link from "next/link";

/**
 * The single conversion block used at the foot of every article.
 * One offer, stated the way the homepage states it. No second ask.
 */
export default function ReviewCTA() {
  return (
    <section
      className="mt-20 overflow-hidden rounded-lg px-8 py-12 md:px-12"
      style={{ background: "linear-gradient(180deg, #0B1A2A 0%, #081421 100%)" }}
    >
      <span className="mono-label" style={{ color: "#8FA3B5" }}>
        The offer
      </span>

      <h2
        className="mt-4 max-w-[620px] font-display text-[clamp(1.7rem,3.4vw,2.4rem)] leading-[1.15] tracking-tighter2"
        style={{ color: "#F0F4F8" }}
      >
        30-minute Finance Systems Review.
      </h2>

      <p className="mt-5 max-w-[560px] text-[16px] leading-[1.7]" style={{ color: "#C5D2DD" }}>
        It is a fit-check, not a sales call. We don&apos;t diagnose on the call and you don&apos;t
        leave with a plan. Thirty minutes tells us both whether there&apos;s work here worth doing.
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <Link
          href="/#book"
          className="inline-flex items-center gap-2 rounded-md px-5 py-3 text-[14px] font-medium transition-colors"
          style={{ background: "#2EE6C9", color: "#0B1A2A" }}
        >
          Request the Review
          <span aria-hidden>→</span>
        </Link>
        <a
          href="mailto:info@vantagerockfinancial.com"
          className="font-mono text-[12px] tracking-[0.04em] transition-colors hover:text-[#2EE6C9]"
          style={{ color: "#8FA3B5" }}
        >
          info@vantagerockfinancial.com
        </a>
      </div>
    </section>
  );
}
