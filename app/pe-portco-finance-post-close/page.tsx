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

const PATH = "/pe-portco-finance-post-close";
const CANONICAL = `${SITE_URL}${PATH}`;
const TITLE =
  "PE portco finance post-close — partners, fractionals, systems that hold";
const DESCRIPTION =
  "How PE-backed portfolio companies keep accounting and finance from failing after close — partners, fractional CFO/FP&A, and systems. Tradeoffs vs Accordion/Consero/NetSuite-class stacks.";

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

const fails = [
  {
    title: "Close ownership is assumed, not assigned.",
    body: "The seller's controller leaves or disengages. The sponsor assumes the CEO is managing the books. The CEO assumes the bookkeeper owns the close. Nobody owns Day 15 or Day 30.",
  },
  {
    title: "Systems cannot produce what sponsors need.",
    body: "A QuickBooks file that served an $8M business cannot produce consolidated actuals, entity-level margin, or intercompany eliminations on a sponsor cadence. The workaround is usually manual workbooks that multiply and diverge.",
  },
  {
    title: "There is no senior finance judgment in the room.",
    body: "Controllers and bookkeepers own the entries. Neither is positioned to tell the board the covenant is tighter than the model assumed, or to reforecast cash when collections shift. That gap is where portcos get hurt.",
  },
  {
    title: "The 100-day plan has a finance line item but no finance lead.",
    body: "A line item is not a person with accountability.",
  },
];

const stackDays = [
  {
    title: "Days 1–15",
    body: "Confirm close ownership. Named individual or FaaS for the first post-close month-end. No assumptions.",
  },
  {
    title: "Days 1–30",
    body: "Audit chart of accounts, system capabilities, and reporting gaps against sponsor needs. Identify the delta before it becomes a board-pack problem.",
  },
  {
    title: "Days 30–60",
    body: "Interim reporting in whatever system exists, with caveats. Clean and caveated beats delayed and perfect. Begin system evaluation if the stack cannot support sponsor cadence.",
  },
  {
    title: "Days 60–90",
    body: "FP&A structure. Operating budget management can update and sponsors can interrogate. Monthly cadence — actuals, variance, cash forecast — that persists through the hold.",
  },
];

const wrongFit = [
  "You need a large PE ops sprint team for a complex carve-out or multi-acquisition platform — Accordion-class firms are built for that",
  "You need FaaS to own the books end-to-end — not our primary service",
  "You need a full-time embedded CFO starting immediately",
  "You are pre-close and need diligence as a standalone engagement",
  "You want a software product with a published list price",
];

const faqs = [
  {
    q: "What is the difference between a fractional CFO and a FaaS controller for a portco?",
    a: "A FaaS controller owns the close — accuracy and timing of the monthly books. A fractional CFO owns interpretation — cash, covenants, board packs, operating decisions. Both are necessary. Neither fully replaces the other.",
  },
  {
    q: "How quickly can a fractional CFO be engaged post-close?",
    a: "In most cases, within one to two weeks of a signed engagement. First priority: orient to the existing close process and sponsor reporting before the first post-close month-end.",
  },
  {
    q: "Do you work alongside an existing FaaS provider or controller?",
    a: "Yes. Common structure: FaaS or in-house controller owns close; Vantage Rock provides senior judgment on reporting, FP&A, board packs, and lender management. We are not competing with the close owner.",
  },
  {
    q: "What systems do you support for portco reporting?",
    a: "NetSuite, Sage Intacct, and spreadsheet-native environments. We advise on selection and reporting design; we do not implement ERPs.",
  },
  {
    q: "What does the first 30 days of a Vantage Rock engagement look like for a new portco?",
    a: "Diagnostic of stack and close. Sponsor package review. First post-close financials with management. Cash forecast established. Board pack template aligned. Goal at Day 30: stable and visible — not still improvising.",
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
              How PE-backed portcos keep finance from failing post-close
            </h1>
            <p className="mt-6 text-[17px] leading-[1.7] text-ink-muted">
              PE-backed portcos keep finance from failing post-close by stacking
              three layers: a clean close owner (controller or FaaS), systems
              that survive sponsor reporting (often NetSuite/Intacct class), and
              senior judgment (fractional CFO / PE ops finance) for cash, board
              packs, and covenant truth. Skip any layer and the file starts
              depending on hero weekends.
            </p>
            <p className="mt-6 text-[17px] leading-[1.7] text-ink">
              Most post-close finance failures accumulate quietly across the
              first two quarters and surface at the wrong moment — a board
              meeting, a covenant test, or a lender call. All of them are
              preventable with the right stack assembled before close — or in
              the first thirty days after it.
            </p>

            <section className="mt-16" aria-labelledby="what-fails">
              <h2
                id="what-fails"
                className="font-display text-[28px] tracking-[-0.02em] text-ink"
              >
                What actually fails after close
              </h2>
              <ul className="mt-6 space-y-5">
                {fails.map((item) => (
                  <li key={item.title} className="text-[17px] leading-[1.7] text-ink">
                    <strong className="font-medium">{item.title}</strong>{" "}
                    <span className="text-ink">{item.body}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="mt-16" aria-labelledby="layer-1">
              <h2
                id="layer-1"
                className="font-display text-[28px] tracking-[-0.02em] text-ink"
              >
                Layer 1 — Close ownership: controller vs FaaS / outsourced
                accounting
              </h2>
              <p className="mt-6 text-[17px] leading-[1.7] text-ink">
                Who owns the monthly close — accuracy and timing?
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                A strong in-house controller is the cleanest answer when you can
                recruit and retain one. Post-close that is often harder than it
                sounds: earnout tension, voluntary exit, or depth that does not
                match sponsor reporting.
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                FaaS providers — outsourced accounting in the Consero, Scrubbed,
                and Bookminders class — fill the bookkeeping and controller
                layer. Legitimate answer. Tradeoffs are real: standardized
                workflows that may not match sponsor preferences, limited
                bandwidth for purchase accounting, earnouts, and new entities,
                and a ceiling below CFO-level judgment. FaaS closes the books.
                It does not interpret what the books mean.
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                For portcos without an established finance team, FaaS plus
                fractional senior finance is often the right post-close
                structure. FaaS owns the close. Fractional CFO owns what the
                numbers mean.
              </p>
            </section>

            <section className="mt-16" aria-labelledby="layer-2">
              <h2
                id="layer-2"
                className="font-display text-[28px] tracking-[-0.02em] text-ink"
              >
                Layer 2 — Systems that survive sponsor cadence
              </h2>
              <p className="mt-6 text-[17px] leading-[1.7] text-ink">
                Sponsors expect consolidated financials, actuals vs budget
                commentary, and flash reports on predictable timelines. Legacy
                QuickBooks and spreadsheet-native stacks are not architected for
                this.
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                The standard upgrade path runs through NetSuite or Sage Intacct
                class ERPs — multi-entity consolidation, custom dimensions,
                audit trail. Planning layers in the Planful, Vena, or Cube class
                often sit on top once the ERP is stable. Stand a system up too
                fast without clean chart-of-accounts design and you create a
                different set of problems.
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                ERP selection and reporting design should be driven by the
                finance lead — not the vendor alone. What dimensions matter for
                the investment thesis? How does management want margin by
                product, geography, or cohort? Answer those before
                implementation starts.
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                Vantage Rock does not implement ERPs and is not a software
                reseller. We advise on selection, reporting architecture, and
                FP&A integration. Implementation stays with a technical partner.
              </p>
            </section>

            <section className="mt-16" aria-labelledby="layer-3">
              <h2
                id="layer-3"
                className="font-display text-[28px] tracking-[-0.02em] text-ink"
              >
                Layer 3 — Senior judgment: fractional and PE ops finance
              </h2>
              <p className="mt-6 text-[17px] leading-[1.7] text-ink">
                This is the layer most portcos underinvest in post-close — and
                the one with the highest consequence when missing.
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                Senior judgment means someone who can tell the board the true
                cash position, spot working-capital assumptions that are not
                tracking, reforecast with decision-grade granularity, review
                covenants before the lender does, and present a board pack the
                sponsor trusts and management can defend.
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                A fractional CFO in a PE portco context is not a part-time
                generalist. It is senior coverage in sponsor-reporting
                environments — GAAP vs what LP reporting actually requires,
                lender conversations when they get hard. Firms in the Burkland
                and CFO Alliance class compete in adjacent fractional lanes. PE
                ops sprint firms in the Accordion class deploy multi-person
                teams for intensive 100-day integration. Real value in complex
                carve-outs or acquisitive platforms. Wrong tool for many
                single-asset lower-middle-market portcos or first-time
                sponsor-backed founders.
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                Vantage Rock sits in the fractional judgment lane: finance-first
                practice, practical AI under human review, scoped for portcos
                that need senior coverage without a permanent full-time hire or
                a PE sprint package. See also{" "}
                <a href="/pe-portfolio-finance" className={linkClass}>
                  PE portfolio finance
                </a>{" "}
                for ongoing sponsor-facing work.
              </p>
            </section>

            <section className="mt-16" aria-labelledby="stack-90">
              <h2
                id="stack-90"
                className="font-display text-[28px] tracking-[-0.02em] text-ink"
              >
                A practical stack sequence for the first 90 days post-close
              </h2>
              <ul className="mt-6 space-y-5">
                {stackDays.map((item) => (
                  <li key={item.title} className="text-[17px] leading-[1.7] text-ink">
                    <strong className="font-medium">{item.title}:</strong>{" "}
                    {item.body}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-[17px] leading-[1.7] text-ink">
                Engage senior judgment at Day 1, not Day 90. Early decisions are
                harder to unwind.
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
                Practical AI means specific, reviewable applications — not a
                platform promise.
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                At Vantage Rock, AI is a working tool inside engagements:
                first-draft variance narrative for board packs, anomaly flagging
                in close checklists, structured extraction from legacy reporting
                — all under human review before anything touches a sponsor or
                lender. Accelerators for repeating analytical work. Not a
                replacement for Layer 3 judgment.
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                Automated output without human review is not appropriate for
                sponsor-facing or lender-facing materials. That is the operating
                standard.
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
                Knowing this upfront saves time for both sides.
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
                We ask about close date, current finance stack, sponsor
                reporting requirements, and obvious gaps. You get a direct read
                on whether our structure matches. If it does not, we say so and
                point you toward what does.
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