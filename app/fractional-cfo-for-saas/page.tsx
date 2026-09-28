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

const PATH = "/fractional-cfo-for-saas";
const CANONICAL = `${SITE_URL}${PATH}`;
const TITLE = "Best fractional CFO for founder-led SaaS — when it fits";
const DESCRIPTION =
  "What founder-led SaaS ($1M+) should expect from a fractional CFO — ARR, cash, board packs, FP&A. Tradeoffs vs full-time hire and bookkeeping-only shops.";

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

const wrongFit = [
  "You are pre-revenue and need someone to build the accounting function from scratch — a full-service startup accounting firm is probably a better first call",
  "You are preparing for a public-company audit cycle — you need a full-time CFO with that reporting experience",
  "You want a low-touch, asynchronous finance relationship where you upload documents and receive a report — not our model",
  "You want a software product with a published list price",
];

const faqs = [
  {
    q: "What does a fractional CFO for SaaS typically own vs. delegate?",
    a: "A fractional CFO owns the forecast, the board package, cash management, and financial decision-making. Day-to-day bookkeeping and AP/AR typically sit with a controller or bookkeeper — the fractional CFO reviews, interprets, and acts on that output.",
  },
  {
    q: "How many hours per month does a fractional SaaS CFO engagement require?",
    a: "It varies by stage and complexity. Most founder-led SaaS companies at $1M–$5M ARR need weekly close oversight, monthly board reporting, and ad hoc decision support. We scope this on the Introduction Call based on what your finance function actually needs.",
  },
  {
    q: "Can a fractional CFO run a fundraise or lender process?",
    a: "Yes — with a clear scope and timeline. The constraint is lead time: we need enough runway to build the data room and narrative properly, not a call two weeks before the term sheet conversation.",
  },
  {
    q: "What's the difference between fractional CFO and FP&A?",
    a: "A fractional CFO is an executive function — financial strategy, decision authority, board-level accountability. FP&A is the analytical and reporting layer — models, variance analysis, scenario planning. Some companies need both; some start with one. See our FP&A page for more.",
  },
  {
    q: "When should we replace a fractional CFO with a full-time hire?",
    a: "When the finance function requires daily executive presence — late-stage fundraise, acquisition integration, public readiness — the fractional model has reached its edge. A good fractional CFO will tell you when you are approaching it.",
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
              What&apos;s the best fractional CFO for a founder-led SaaS?
            </h1>
            <p className="mt-6 text-[17px] leading-[1.7] text-ink-muted">
              The best fractional CFO for a founder-led SaaS is a finance
              partner who owns close, cash, and a forecast that matches how SaaS
              actually runs — ARR, deferred revenue, cohort margin, burn — not a
              bookkeeper with a SaaS template. Hire full-time when you need a
              full-time finance presence in every board cycle; go fractional
              when you need senior SaaS finance judgment without the permanent
              hire yet.
            </p>

            <section className="mt-16" aria-labelledby="saas-needs">
              <h2
                id="saas-needs"
                className="font-display text-[28px] tracking-[-0.02em] text-ink"
              >
                What SaaS finance actually needs at $1M–$10M ARR
              </h2>
              <p className="mt-6 text-[17px] leading-[1.7] text-ink">
                At this stage, your biggest risk isn&apos;t bad accounting —
                it&apos;s a forecast that can&apos;t answer the questions your
                board, your lenders, or your own gut are asking. You need
                someone who can model net revenue retention, stress-test a
                hiring plan against runway, and explain why gross margin moved
                without blaming the month.
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                The core deliverables are specific: a rolling 13-week cash
                forecast, a board-ready P&amp;L with ARR waterfall, deferred
                revenue reconciliation that matches your billing system, and
                cohort-level margin visibility if you have any services mix.
                Most SaaS companies at $2M–$5M ARR don&apos;t have all four.
                That gap is where a fractional CFO earns the engagement.
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                If you want to see how FP&amp;A fits alongside the CFO layer,
                see{" "}
                <a href="/fpa" className={linkClass}>
                  FP&amp;A
                </a>
                .
              </p>
            </section>

            <section className="mt-16" aria-labelledby="frac-vs-ft">
              <h2
                id="frac-vs-ft"
                className="font-display text-[28px] tracking-[-0.02em] text-ink"
              >
                Fractional vs full-time for SaaS
              </h2>
              <p className="mt-6 text-[17px] leading-[1.7] text-ink">
                A full-time CFO makes sense when the finance function needs a
                permanent executive voice — daily involvement in commercial
                negotiations, a late-stage raise requiring someone embedded for
                months, or a board that expects a CFO in every meeting without
                exception. That&apos;s a real need, and it&apos;s not what
                fractional solves.
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                Fractional works when you need senior judgment available, not a
                permanent headcount cost at full-time CFO compensation. The
                tradeoff is honest: a fractional CFO is not always available at
                9 a.m. Tuesday, and they carry context across other engagements.
                The upside is that the same person has seen your exact problem —
                deferred revenue treatment, a messy cap table, a lender package
                under time pressure — at other companies and can apply that
                pattern immediately. See the full comparison at{" "}
                <a href="/fractional-cfo-vs-full-time" className={linkClass}>
                  fractional CFO vs full-time
                </a>
                .
              </p>
            </section>

            <section className="mt-16" aria-labelledby="books-vs-leadership">
              <h2
                id="books-vs-leadership"
                className="font-display text-[28px] tracking-[-0.02em] text-ink"
              >
                Bookkeeping shops vs financial leadership
              </h2>
              <p className="mt-6 text-[17px] leading-[1.7] text-ink">
                There is a legitimate market for tech-enabled bookkeeping —
                shops in the Zeni, Pilot, and Numeric class solve a real problem
                for founders who need clean books and basic reporting. That is
                not the same problem as needing a CFO.
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                The difference is authority and judgment. A bookkeeping platform
                closes your books and categorizes transactions correctly. A
                fractional CFO tells you whether your sales commission structure
                is eroding gross margin, whether your current burn rate survives
                a 90-day sales slip, and what the lender is actually looking at
                before you send the package. If your current provider can&apos;t
                answer those questions on a live call, you have a bookkeeper,
                not a finance leader. Both are valid — just not interchangeable.
                Broader fractional CFO scope:{" "}
                <a href="/fractional-cfo" className={linkClass}>
                  fractional CFO
                </a>
                .
              </p>
            </section>

            <section className="mt-16" aria-labelledby="best-practice">
              <h2
                id="best-practice"
                className="font-display text-[28px] tracking-[-0.02em] text-ink"
              >
                What &quot;best&quot; looks like in practice
              </h2>
              <p className="mt-6 text-[17px] leading-[1.7] text-ink">
                Best is not the firm with the longest SaaS client list or the
                most recognizable brand name — Burkland, Propeller, Attivo,
                Graphite, and CFO Alliance all work with SaaS companies and have
                legitimate track records. Best is fit: the person who will be in
                your model weekly, knows your ARR definition, and can tell your
                VP of Sales why the pipeline-to-close assumptions in Q3 are
                optimistic without it becoming a political conversation.
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                In practice, the markers are operational: Do they own the close
                date or hand it to a controller? Do they build the board deck or
                just review it? Do they have a view on your pricing model, not
                just the output? Can they run a vendor financing conversation
                without a script? At Vantage Rock, those are CFO
                responsibilities, not advisory ones.
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
                AI is changing what a small finance team can produce — faster
                variance analysis, automated categorization, scenario modeling
                at a speed that used to require a full FP&amp;A team. The honest
                framing is that AI extends capacity; it does not replace
                judgment.
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                At Vantage Rock, AI-enabled finance means we use the right tools
                to close faster, surface anomalies before they become board
                questions, and run more scenarios without proportional
                headcount. It does not mean an algorithm is your CFO. The human
                — with SaaS finance experience, accountability, and a working
                relationship with your team — is still the function. Details:{" "}
                <a href="/ai-enabled-finance" className={linkClass}>
                  AI-enabled finance
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
                Vantage Rock works best when there is a founder or leadership
                team that wants a real finance conversation — $1M+ ARR,
                founder-led or PE-backed, needing senior SaaS finance judgment
                without a permanent hire.
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
                The Introduction Call is a fit-check, not a sales presentation.
                You describe the current state of your finance function and the
                problem you&apos;re trying to solve — close quality, board
                reporting, fundraise readiness, burn clarity, FP&amp;A build. We
                ask specific questions and tell you honestly whether we are the
                right fit.
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                Nobody diagnoses your business on the call. Nobody sells a
                package. If there is a fit, we scope from there. What the first
                90 days of FP&amp;A typically covers:{" "}
                <a href="/fpa-first-90-days" className={linkClass}>
                  FP&amp;A in the first 90 days
                </a>
                .
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
