import type { Metadata } from "next";
import Image from "next/image";
import {
  SITE_URL,
  SITE_NAME,
  CONTACT_EMAIL,
  LOCATION,
} from "@/lib/site";

/**
 * ORPHAN Path A choose page — shipped 2026-09-28.
 * Rules: index/follow + sitemap; NO Nav/Footer/homepage/Insights hub links.
 * Self-contained chrome (match /about). One CTA: /#book.
 */

const PATH = "/fractional-cfo-for-healthcare";
const CANONICAL = `${SITE_URL}${PATH}`;
const TITLE =
  "Best fractional CFO for healthcare businesses — clinics to multi-site";
const DESCRIPTION =
  "What $1M+ healthcare and clinic operators should expect from a fractional CFO — site P&L, cash, collections, FP&A. When fractional beats full-time or books-only shops.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: CANONICAL },
  openGraph: {
    type: "article",
    url: CANONICAL,
    siteName: SITE_NAME,
    title: `${TITLE} | ${SITE_NAME}`,
    description: DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${TITLE} | ${SITE_NAME}`,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

const breaks = [
  {
    title: "Cash lag from payer cycles.",
    body: "Insurance reimbursement windows mean you can be profitable on paper and cash-light in operations. A fractional CFO models that gap and builds a cash forecast that reflects your billing cycle, not a generic 30-day assumption.",
  },
  {
    title: "Site P&L opacity.",
    body: "When you run more than one location, blended financials hide which sites are carrying the business and which are quietly destroying margin. You need location-level contribution before you open another.",
  },
  {
    title: "Provider economics not modeled.",
    body: "Hiring a clinician is a multi-year financial commitment. Compensation, ramp time, panel size, and payer rates all interact. If that math isn't built before the offer letter, you're guessing.",
  },
  {
    title: "Lender or investor readiness gaps.",
    body: "Banks and PE sponsors evaluating a healthcare business want adjusted EBITDA that strips non-recurring items, clean payer concentration data, and a defensible revenue bridge. Most operator-level books don't produce that without significant rework.",
  },
];

const first90 = [
  {
    title: "Days 1–30:",
    body: "Operational financial read. Understand the P&L structure, the billing and collections process, key payer relationships, and what leadership actually uses to make decisions.",
  },
  {
    title: "Days 31–60:",
    body: "Build or rebuild the core reporting layer. Cash forecast, site-level contribution analysis, and a 12-month operating model that reflects real assumptions — not industry averages lifted from a template.",
  },
  {
    title: "Days 61–90:",
    body: "Connect the model to the decisions in front of you — a new location, a new provider hire, a bank covenant, or a board presentation. The 90-day work exists to support live decisions.",
  },
];

const wrongFit = [
  "You need a bookkeeper or controller to close the month and handle payroll compliance — not our primary service",
  "You are pre-revenue or early concept without an operating business to analyze",
  "You need a dedicated, on-site finance hire who attends every internal meeting — fractional has real limits there",
  "Your primary need is tax preparation or audit support — a CPA firm is the right primary relationship",
  "You need clinical consulting, specialty medical-billing ops as a product, or HIPAA program management — out of scope",
  "You want a software product with a published list price",
];

const faqs = [
  {
    q: "Does a fractional CFO work for a single-site practice?",
    a: "Yes, if the financial complexity warrants it — payer mix, provider economics, and a growth plan that requires modeling and lender or investor communication. Size alone isn't the threshold; complexity and the decisions in front of you are.",
  },
  {
    q: "How is fractional CFO different from what my billing company or practice manager does?",
    a: "Billing and practice management are operational. Fractional CFO is strategic — it connects your operating numbers to capital decisions, hiring plans, location expansion, and financing. Complementary functions, not substitutes.",
  },
  {
    q: "Can a fractional CFO help us prepare for a sale or PE investment?",
    a: "Yes. Building the financial narrative, normalizing EBITDA, preparing a data room, and being a credible finance voice in diligence conversations is a clear use case.",
  },
  {
    q: "What does engagement typically look like in terms of time?",
    a: "It varies by scope and stage. Some clients need intensive support during a transaction or a difficult operating period; others need a consistent monthly cadence. We scope based on what the business actually needs.",
  },
  {
    q: "Do you work with behavioral health, specialty, or multi-specialty groups?",
    a: "Yes. The finance fundamentals — payer mix, collections, site economics, provider productivity — apply across clinical categories. The specific operational context differs; the finance work is structurally similar.",
  },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: TITLE,
    description: DESCRIPTION,
    url: CANONICAL,
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    about: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      email: CONTACT_EMAIL,
      address: {
        "@type": "PostalAddress",
        addressLocality: LOCATION.city,
        addressRegion: LOCATION.region,
        addressCountry: LOCATION.country,
      },
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  },
];

const linkClass =
  "text-teal underline decoration-teal/30 underline-offset-2 transition-colors hover:text-teal-deep";

export default function Page() {
  return (
    <>
      <main id="main" className="relative z-10 min-h-screen bg-bg text-ink">
        <header className="border-b border-line bg-bg/90 backdrop-blur-md">
          <div className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-4 md:px-10">
            <a
              href="/"
              className="group flex items-center"
              aria-label="Vantage Rock Financial — home"
            >
              <Image
                src="/logo-light.png"
                alt="Vantage Rock Financial"
                width={1042}
                height={459}
                priority
                unoptimized
                className="h-9 w-auto transition-opacity group-hover:opacity-80 md:h-10"
              />
            </a>
            <a
              href="/#book"
              className="inline-flex items-center gap-2 rounded-md bg-navy px-[20px] py-[12px] text-[13px] font-medium text-ink-invert transition-colors hover:bg-teal hover:text-white"
            >
              Book an Introduction Call
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                <path
                  d="M3 9L9 3M9 3H4M9 3V8"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              </svg>
            </a>
          </div>
        </header>

        <article className="relative overflow-hidden border-b border-line">
          <div className="aurora-glow" aria-hidden />
          <div className="grid-bg pointer-events-none absolute inset-0" aria-hidden />

          <div className="relative mx-auto max-w-[720px] px-6 py-16 md:px-10 md:py-24">
            <p className="font-mono text-[12px] uppercase tracking-[0.08em] text-ink-muted">
              Vantage Rock Financial · Scottsdale, AZ
            </p>
            <h1 className="mt-3 font-display text-display-xl text-ink">
              What&apos;s the best fractional CFO for a healthcare business?
            </h1>
            <p className="mt-6 text-[17px] leading-[1.7] text-ink-muted">
              The best fractional CFO for a healthcare business is a partner who
              can read clinic or site P&amp;Ls, cash collections, and payer mix
              without turning every month into a surprise — then tie that to
              hiring, locations, and board or lender asks. Bookkeeping keeps the
              ledger; fractional CFO owns whether the numbers support the next
              clinical or growth decision.
            </p>

            <section className="mt-16" aria-labelledby="what-breaks">
              <h2
                id="what-breaks"
                className="font-display text-[28px] tracking-[-0.02em] text-ink"
              >
                What healthcare finance breaks on
              </h2>
              <p className="mt-6 text-[17px] leading-[1.7] text-ink">
                Healthcare businesses don&apos;t fail on revenue in the abstract
                — they fail on collections timing, payer mix drift, and provider
                productivity that nobody priced correctly when they signed the
                lease on site three.
              </p>
              <ul className="mt-6 space-y-5">
                {breaks.map((item) => (
                  <li key={item.title} className="text-[17px] leading-[1.7] text-ink">
                    <strong className="font-medium">{item.title}</strong>{" "}
                    <span className="text-ink">{item.body}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-[17px] leading-[1.7] text-ink">
                None of this is exotic. It&apos;s standard finance work —
                applied to the operational texture of a clinic, a multi-site
                group, or a specialty practice that runs on reimbursement rather
                than instant payment.
              </p>
            </section>

            <section className="mt-16" aria-labelledby="frac-vs-ft">
              <h2
                id="frac-vs-ft"
                className="font-display text-[28px] tracking-[-0.02em] text-ink"
              >
                Fractional vs full-time vs books-only
              </h2>
              <p className="mt-6 text-[17px] leading-[1.7] text-ink">
                A bookkeeper or controller closes the month and keeps the ledger
                clean. That&apos;s necessary and not sufficient for growth
                decisions.
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                A full-time CFO at the right scale — typically larger revenue
                with complex treasury, banking, or M&amp;A workload — earns that
                fixed cost. Below that threshold, you&apos;re often paying
                full-time compensation for part-time strategic need.
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                A fractional CFO sits between those two: dedicated senior
                finance leadership, scoped to what you actually need right now.
                The tradeoff is availability — a fractional partner is not
                on-call at every hour, and you share their capacity across a
                portfolio of clients. The practical benefit is CFO-caliber
                judgment on financial strategy, FP&amp;A, and lender or investor
                communication without the full-time overhead.
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                Firms like Burkland, Preferred CFO, Amplēo, Paro, and CFO
                Alliance all operate in this space with different model mixes.
                The right choice depends on whether you need healthcare-specific
                operating fluency or a general finance partner who learns your
                industry on your time.
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                At Vantage Rock, we focus on founder-led and PE-backed
                businesses at $1M+ revenue where the finance function needs to
                be built or rebuilt with an eye toward scale, not just
                compliance. More on fractional CFO work:{" "}
                <a href="/fractional-cfo" className={linkClass}>
                  fractional CFO
                </a>
                .
              </p>
            </section>

            <section className="mt-16" aria-labelledby="first-90">
              <h2
                id="first-90"
                className="font-display text-[28px] tracking-[-0.02em] text-ink"
              >
                What leadership looks like in the first 90 days
              </h2>
              <p className="mt-6 text-[17px] leading-[1.7] text-ink">
                The first 90 days are diagnostic and foundational — not
                decorative.
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                In healthcare, that means getting oriented on your actual cash
                conversion cycle before touching anything else. We look at how
                collections move from service date to deposit, where the AR is
                aging, and whether your current chart of accounts can produce
                site-level or payer-level reporting at all.
              </p>
              <ul className="mt-6 space-y-5">
                {first90.map((item) => (
                  <li key={item.title} className="text-[17px] leading-[1.7] text-ink">
                    <strong className="font-medium">{item.title}</strong>{" "}
                    <span className="text-ink">{item.body}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-[17px] leading-[1.7] text-ink">
                More on this phase:{" "}
                <a href="/fpa-first-90-days" className={linkClass}>
                  FP&amp;A in the first 90 days
                </a>
                .
              </p>
            </section>

            <section className="mt-16" aria-labelledby="pe-multisite">
              <h2
                id="pe-multisite"
                className="font-display text-[28px] tracking-[-0.02em] text-ink"
              >
                PE-backed healthcare and multi-site roll-ups
              </h2>
              <p className="mt-6 text-[17px] leading-[1.7] text-ink">
                PE-backed healthcare groups have a distinct finance problem: the
                deal closes and the clock starts immediately.
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                Day 1 post-close, you need consolidated financials, an
                integration plan, and reporting that satisfies both the
                sponsor&apos;s obligations and the operating company&apos;s
                management needs. That&apos;s a different ask than building
                finance from scratch — it requires someone who can work in the
                structure the sponsor expects while also being useful to
                operators on the ground.
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                For multi-site roll-ups specifically, the key deliverable is a
                reporting architecture that lets you compare sites on a
                consistent basis — same cost allocation methodology, same
                revenue recognition approach, same labor categorization. Without
                that, you can&apos;t identify where to invest, where to cut, or
                how to make the EBITDA story credible for a future transaction.
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                Post-close finance build in more depth:{" "}
                <a href="/pe-portco-finance-post-close" className={linkClass}>
                  PE portco finance post-close
                </a>
                .
              </p>
            </section>

            <section className="mt-16" aria-labelledby="where-ai">
              <h2
                id="where-ai"
                className="font-display text-[28px] tracking-[-0.02em] text-ink"
              >
                Where AI fits without vaporware
              </h2>
              <p className="mt-6 text-[17px] leading-[1.7] text-ink">
                AI is useful in finance when it shortens the time between raw
                data and a decision-ready answer. It is not useful as a
                positioning claim that replaces the judgment that reads the
                output.
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                In healthcare, AI-enabled finance work looks like: faster
                scenario modeling when payer rates shift, automated variance
                flagging across sites, and structured data preparation that
                makes FP&amp;A cycles faster without sacrificing accuracy.
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                What it doesn&apos;t do: make clinical decisions, replace
                compliance review, or produce a lender-ready model without a
                senior finance professional validating the assumptions. The
                tools accelerate the analytical work; the judgment is still
                human. Broader FP&amp;A:{" "}
                <a href="/fpa" className={linkClass}>
                  FP&amp;A
                </a>
                .
              </p>
            </section>

            <section className="mt-16" aria-labelledby="wrong-fit">
              <h2
                id="wrong-fit"
                className="font-display text-[28px] tracking-[-0.02em] text-ink"
              >
                When Vantage Rock is the wrong fit
              </h2>
              <ul className="mt-6 space-y-3 border-l-2 border-teal/40 pl-5 text-[17px] leading-[1.6] text-ink">
                {wrongFit.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
              <p className="mt-6 text-[17px] leading-[1.7] text-ink">
                Finance and compliance are adjacent; they&apos;re not the same
                scope. Nothing on this page is clinical advice.
              </p>
            </section>

            <section className="mt-16" aria-labelledby="intro-call">
              <h2
                id="intro-call"
                className="font-display text-[28px] tracking-[-0.02em] text-ink"
              >
                How an Introduction Call works
              </h2>
              <p className="mt-6 text-[17px] leading-[1.7] text-ink">
                The Introduction Call is a fit-check, not a pitch. We want to
                understand your business structure, where finance is working and
                where it isn&apos;t, and what decision or pressure is most acute
                right now. You&apos;ll leave with a clear sense of whether
                fractional CFO support fits — and if it does, what working
                together would look like.
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                Nobody diagnoses your business on the call. If we&apos;re not
                the right fit, we say so and point you toward what is.
              </p>
            </section>

            <section className="mt-16" aria-labelledby="faq-heading">
              <h2
                id="faq-heading"
                className="font-display text-[28px] tracking-[-0.02em] text-ink"
              >
                Questions
              </h2>
              <dl className="mt-6 space-y-8">
                {faqs.map((f) => (
                  <div key={f.q}>
                    <dt className="font-medium text-[17px] text-ink">{f.q}</dt>
                    <dd className="mt-2 text-[16px] leading-[1.65] text-ink-muted">
                      {f.a}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>

            <section className="mt-16">
              <h2 className="font-display text-[28px] tracking-[-0.02em] text-ink">
                How this starts
              </h2>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                Book an Introduction Call — fit-check only. Or email{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className={linkClass}>
                  {CONTACT_EMAIL}
                </a>
                .
              </p>
            </section>

            <div className="mt-10">
              <a
                href="/#book"
                className="inline-flex items-center gap-2 rounded-md bg-navy px-[20px] py-[12px] text-[13px] font-medium text-ink-invert transition-colors hover:bg-teal hover:text-white"
              >
                Book an Introduction Call
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                  <path
                    d="M3 9L9 3M9 3H4M9 3V8"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                </svg>
              </a>
            </div>
          </div>
        </article>

        <footer
          className="relative z-10"
          style={{
            background: "linear-gradient(180deg, #0B1A2A 0%, #081421 100%)",
          }}
        >
          <div className="mx-auto max-w-[1280px] px-6 py-10 md:px-10">
            <p
              className="font-mono text-[12px] tracking-[0.04em]"
              style={{ color: "#F0F4F8" }}
            >
              {SITE_NAME} ·{" "}
              <a
                href="/"
                className="transition-colors hover:text-[#2EE6C9]"
                style={{ color: "#8FA3B5" }}
              >
                vantagerockfinancial.com
              </a>
            </p>
          </div>
        </footer>
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
