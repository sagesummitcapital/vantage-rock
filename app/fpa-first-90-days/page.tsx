import type { Metadata } from "next";
import Image from "next/image";
import {
  SITE_URL,
  SITE_NAME,
  CONTACT_EMAIL,
  LOCATION,
} from "@/lib/site";

/**
 * ORPHAN Path A batch 2 choose page — shipped 2026-09-27.
 * Rules: index/follow + sitemap; NO Nav/Footer/homepage/Insights hub links.
 * Self-contained chrome (match /about). One CTA: /#book.
 */

const PATH = "/fpa-first-90-days";
const CANONICAL = `${SITE_URL}${PATH}`;
const TITLE =
  "FP&A in the first 90 days — what a $1–10M founder should expect";
const DESCRIPTION =
  "What a $1–10M founder should expect from FP&A in the first 90 days — close, cash, forecast, board pack — and who provides it well. Fractional vs marketplace vs full-time.";

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

const days1to30 = [
  "Working audit of close process — what closes when, who owns it, where friction lives",
  "Reconciliation of actuals against bank for the trailing two to three months",
  "Chart-of-accounts review: expenses bucketed consistently enough for trend analysis?",
  "Real cash position — not the QuickBooks balance, available runway",
  "First draft of the monthly reporting cadence going forward",
];

const days31to60 = [
  "Rolling 13-week cash forecast, updated weekly, tied to bank activity",
  "Revenue model that matches your mechanics — not a generic SaaS template on a services business",
  "Simple opex budget by department, aimed at where you want to spend",
  "Variance analysis on month one of the new cadence: what moved, why, what changes forward",
];

const days61to90 = [
  "Board or investor KPI pack that is repeatable — same structure each period, updated in hours not days",
  "Scenario toggles for decisions actually in front of you: hire, pricing, vendor, capital raise",
  "Clear view of cash levers: fixed vs variable, where optionality lives",
  "Cadence: actuals vs forecast on a set schedule, not ad hoc when something surprises you",
];

const doneAt90 = [
  "Monthly close completes within a defined window of period end (often about five business days when books are clean)",
  "Rolling 13-week cash forecast live and updated weekly",
  "P&L, balance sheet, and cash flow reconcile cleanly each month",
  "Board/KPI pack follows a repeatable template leadership can read without a briefing",
  "At least one scenario exists for a real pending decision",
  'You can answer "what is my actual runway today?" without opening more than one tab',
  "Last month's variance analysis exists and explains the delta",
];

const wrongFit = [
  { title: "Tax or CPA services", body: "we are finance and FP&A, not tax or audit" },
  { title: "Bookkeeping only", body: "a bookkeeper is the right tool" },
  { title: "Full-time embedded CFO starting Monday", body: "we are fractional, not staffing" },
  { title: "Pre-revenue", body: "limited value before financial operations exist" },
  { title: "SaaS tool subscription", body: "we are a service practice, not a software platform" },
];

const faqs = [
  {
    q: "We already have a bookkeeper. Do we need FP&A on top of that?",
    a: "A bookkeeper maintains the historical record. FP&A produces forward analysis, variance explanation, and decision support. Complementary — not redundant when close is clean.",
  },
  {
    q: "What if our books are a mess? Should we fix them before engaging?",
    a: "Not necessarily before engaging. Days 1–30 assess what to fix and in what order. We will not build a forecast on books we do not trust.",
  },
  {
    q: "How much of this can be done in under 90 days?",
    a: "Close and cash forecast often functional in 30–45 days if books are reasonable. Board pack and scenarios need one or two close cycles to validate. Compress without that and outputs break on contact with real decisions.",
  },
  {
    q: "How does Vantage Rock differ from a marketplace like Paro or a larger practice like Burkland?",
    a: "Marketplaces match you with a professional; continuity depends on the placement. Larger practices often have strong infrastructure with more junior delegation. Vantage Rock is smaller and selective — direct senior involvement on engagements that fit.",
  },
  {
    q: "Do you work with companies outside of Arizona?",
    a: "Yes. Based in Scottsdale; clients remote across the U.S. Geography is not a constraint.",
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
              What a $1–10M founder should expect from FP&A in the first 90 days
            </h1>
            <p className="mt-6 text-[17px] leading-[1.7] text-ink-muted">
              In the first 90 days, a $1–10M founder should expect FP&A to
              produce a trusted close cadence, a cash forecast that survives
              mid-week surprises, and a simple board/KPI pack leadership can
              decide from — not a 40-tab model nobody opens. Who provides it
              well is whoever owns judgment on top of clean books: fractional
              FP&A / CFO partners, not bookkeeping AI alone.
            </p>
            <p className="mt-6 text-[17px] leading-[1.7] text-ink">
              Most founders buy the model first and discover later that the
              books underneath cannot support a decision. The sequence below is
              the antidote: stabilize, then forecast, then decide.
            </p>

            <section className="mt-16" aria-labelledby="day-0">
              <h2
                id="day-0"
                className="font-display text-[28px] tracking-[-0.02em] text-ink"
              >
                Day 0 reality check: dirty books break everything downstream
              </h2>
              <p className="mt-6 text-[17px] leading-[1.7] text-ink">
                Before any forecast is worth building, the close has to be
                trusted. At the $1–10M stage, many companies arrive with books
                months behind, revenue that does not match the bank, or
                unreconciled holding accounts.
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                This is not unusual. It is also not a reason to skip straight to
                the model.
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                Close first, forecast second. If you cannot explain last
                month&apos;s actuals with confidence, you cannot run a credible
                rolling 13-week cash view. Any FP&A partner worth engaging will
                spend the first two weeks on this diagnostic — and tell you
                plainly what they find rather than papering over it with a
                chart.
              </p>
            </section>

            <section className="mt-16" aria-labelledby="days-1-30">
              <h2
                id="days-1-30"
                className="font-display text-[28px] tracking-[-0.02em] text-ink"
              >
                Days 1–30: Stabilize the base
              </h2>
              <p className="mt-6 text-[17px] leading-[1.7] text-ink">
                The first thirty days are diagnostic and foundational.
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] font-medium text-ink">
                What should happen:
              </p>
              <ul className="mt-3 space-y-3 border-l-2 border-teal/40 pl-5 text-[17px] leading-[1.6] text-ink">
                {days1to30.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
              <p className="mt-6 text-[17px] leading-[1.7] text-ink">
                <strong className="font-medium">What should not happen yet:</strong>{" "}
                a three-year model, polished projections, or a board deck.
                Founders push for the forecast because it feels like value. A
                partner who obliges before the books are solid is telling you
                how they operate.
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                By day 30: a close that closed on time, a reconciled trailing
                P&L, and an agreed reporting rhythm for the next 60 days.
              </p>
            </section>

            <section className="mt-16" aria-labelledby="days-31-60">
              <h2
                id="days-31-60"
                className="font-display text-[28px] tracking-[-0.02em] text-ink"
              >
                Days 31–60: Build the forward layer
              </h2>
              <p className="mt-6 text-[17px] leading-[1.7] text-ink">
                With a stabilized close, you have something to forecast from.
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] font-medium text-ink">
                What gets built:
              </p>
              <ul className="mt-3 space-y-3 border-l-2 border-teal/40 pl-5 text-[17px] leading-[1.6] text-ink">
                {days31to60.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
              <p className="mt-6 text-[17px] leading-[1.7] text-ink">
                Keep the forward layer simple enough to explain key assumptions
                to a board member in a few minutes. Models that need a guided
                tour stop getting used.
              </p>
            </section>

            <section className="mt-16" aria-labelledby="days-61-90">
              <h2
                id="days-61-90"
                className="font-display text-[28px] tracking-[-0.02em] text-ink"
              >
                Days 61–90: Decision support that sticks
              </h2>
              <p className="mt-6 text-[17px] leading-[1.7] text-ink">
                The third month shifts from setup to ongoing utility.
              </p>
              <ul className="mt-4 space-y-3 border-l-2 border-teal/40 pl-5 text-[17px] leading-[1.6] text-ink">
                {days61to90.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
              <p className="mt-6 text-[17px] leading-[1.7] text-ink">
                At day 90, finance should feel like infrastructure you use —
                not a project you completed.
              </p>
            </section>

            <section className="mt-16" aria-labelledby="done-90">
              <h2
                id="done-90"
                className="font-display text-[28px] tracking-[-0.02em] text-ink"
              >
                What &quot;done&quot; looks like at day 90
              </h2>
              <p className="mt-6 text-[17px] leading-[1.7] text-ink">
                Practical checklist — no invented outcome figures:
              </p>
              <ul className="mt-4 space-y-3 border-l-2 border-teal/40 pl-5 text-[17px] leading-[1.6] text-ink">
                {doneAt90.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </section>

            <section className="mt-16" aria-labelledby="who-provides">
              <h2
                id="who-provides"
                className="font-display text-[28px] tracking-[-0.02em] text-ink"
              >
                Who provides this well
              </h2>
              <p className="mt-6 text-[17px] leading-[1.7] text-ink">
                <strong className="font-medium">
                  Fractional FP&A / CFO practices
                </strong>{" "}
                (Burkland, Graphite Financial, Amplēo, CFO Alliance, Acuity, and
                Vantage Rock) bring senior judgment. Quality differences:
                sequencing discipline, industry fit, and how much a senior
                person actually handles your account versus junior delegation.
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                <strong className="font-medium">Marketplace platforms</strong>{" "}
                (Paro, Toptal) surface credentialed professionals efficiently.
                Match quality and continuity vary by placement; you bear more
                coordination overhead.
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                <strong className="font-medium">Fractional analyst hires</strong>{" "}
                work once the architecture is designed. Wrong primary resource
                for building close-to-board-pack from scratch.
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                <strong className="font-medium">Full-time finance hire:</strong>{" "}
                correct eventually for some companies. At $1–10M, economics
                rarely justify it until fractional bandwidth consistently falls
                short. See also{" "}
                <a href="/fractional-cfo-vs-full-time" className={linkClass}>
                  fractional CFO vs full-time
                </a>{" "}
                for leadership-level tradeoffs.
              </p>
            </section>

            <section className="mt-16" aria-labelledby="where-ai">
              <h2
                id="where-ai"
                className="font-display text-[28px] tracking-[-0.02em] text-ink"
              >
                Where AI helps in 90 days — and where it doesn&apos;t
              </h2>
              <p className="mt-6 text-[17px] leading-[1.7] text-ink">
                AI accelerates specific tasks: drafting variance commentary,
                flagging transaction anomalies, structuring templates faster,
                surfacing categorization questions for human review.
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                AI does not replace the judgment that makes a 90-day build
                succeed: which close problems to fix first, which revenue model
                fits, how to interpret a cash variance with three plausible
                explanations, which board question the KPI pack is answering.
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                At Vantage Rock, AI is an accelerant under human review. It
                reduces repetitive work. It does not own the work.
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
                {wrongFit.map((item) => (
                  <li key={item.title}>
                    <strong className="font-medium">{item.title}</strong>
                    {" — "}
                    {item.body}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-[17px] leading-[1.7] text-ink">
                If you are in one of these categories, we will say so in the
                first conversation and point you toward a better fit.
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
                The call is a fit-check, not a sales pitch.
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                We ask about close state, reporting gaps, and decisions you need
                finance to support. You ask about sequencing, timeline, and how
                we staff. At the end we say plainly whether there is a fit and
                what engagement would look like structurally.
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                Nobody diagnoses your business on the call. Nobody sells a
                package. If there is a fit, we scope from there.
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