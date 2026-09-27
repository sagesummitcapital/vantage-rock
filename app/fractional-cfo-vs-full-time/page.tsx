import type { Metadata } from "next";
import Image from "next/image";
import {
  SITE_URL,
  SITE_NAME,
  CONTACT_EMAIL,
  LOCATION,
} from "@/lib/site";

/**
 * ORPHAN Path A choose page — shipped 2026-09-27.
 * Rules: index/follow + sitemap; NO Nav/Footer/homepage/Insights hub links.
 * Self-contained chrome (match /about). One CTA: /#book.
 */

const PATH = "/fractional-cfo-vs-full-time";
const CANONICAL = `${SITE_URL}${PATH}`;
const TITLE = "Fractional CFO vs full-time hire — when each makes sense";
const DESCRIPTION =
  "When a fractional CFO beats a full-time hire for founder-led and PE-backed companies — and when hiring wins. Close, cash, board packs, tradeoffs named.";

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

const fractionalTriggers = [
  "The board or investors are asking for reporting you do not currently produce",
  "You are raising capital (debt or equity) and do not have a model a lender or investor will trust",
  "The close takes three weeks and nobody knows why",
  "Cash timing surprises you more than once a quarter",
  "You have a controller but no one above them translating numbers into decisions",
  "Revenue is somewhere between $1M and $20M and a full-time CFO hire is not yet justified by volume",
  "You need a finance voice in a specific process (acquisition, covenant reset, new entity) without a permanent hire",
];

const fullTimeTriggers = [
  "The finance function has daily volume that requires full attention: multi-entity consolidation, complex treasury, dozens of banking relationships",
  "You are in a transaction that will run for a year and needs a finance leader embedded",
  "You are PE-backed or late-stage with a CFO reporting expectation that requires permanent presence",
  "Board or investors explicitly require a full-time CFO as a condition of the relationship",
  "You need someone building and managing a finance team of five or more people in-house",
];

const faqs = [
  {
    q: "Does the fractional CFO replace my controller?",
    a: "No. Your controller stays in their role. Fractional CFO sits above the controller function, not instead of it.",
  },
  {
    q: "We already have a CPA. Do we still need this?",
    a: "Your CPA handles tax and compliance. Fractional CFO handles financial strategy, forecasting, board reporting, and operational finance decisions. Different functions, different cadence, different output.",
  },
  {
    q: "Is there a minimum revenue or company size?",
    a: "Vantage Rock works with founder-led and PE-backed companies from roughly $1M in revenue. Below that, the engagement may not yet be the right use of the investment.",
  },
  {
    q: "How do you work with remote companies?",
    a: "Primarily remote, across the U.S. Based in Scottsdale, AZ. Geography is rarely a constraint.",
  },
  {
    q: "How is the fee determined?",
    a: "Scope first, then fee. After the Introduction Call, if there is a fit, we define what actually needs doing and price from there. No published tiers or packages.",
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
              Fractional CFO vs full-time hire: when each makes sense
            </h1>
            <p className="mt-6 text-[17px] leading-[1.7] text-ink-muted">
              Hire a full-time CFO when the function is already designed, the
              volume justifies a daily seat, and you need someone in the
              building every day. Choose fractional when cash timing, close,
              board packs, and judgment still need design: senior finance
              leadership without committing to a full headcount line.
            </p>
            <p className="mt-6 text-[17px] leading-[1.7] text-ink">
              Most founders get this decision wrong in one direction. They wait
              too long for full-time (burning board credibility while someone
              guesses at the model), or they jump to full-time too early (paying
              for a function that runs eight hours a week). Neither is fatal.
              Both are expensive.
            </p>

            <section className="mt-16" aria-labelledby="full-time-buys">
              <h2
                id="full-time-buys"
                className="font-display text-[28px] tracking-[-0.02em] text-ink"
              >
                What a full-time CFO actually buys you
              </h2>
              <p className="mt-6 text-[17px] leading-[1.7] text-ink">
                Presence. That is the core product of a full-time hire.
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                When you need someone walking the floor on a Tuesday at 11am
                because the VP of Sales is forecasting six deals that your cash
                balance cannot float, that is a full-time CFO moment. When you
                are in a transaction and need a finance leader in every room,
                every week, for six months, that is a full-time CFO moment. When
                your finance function touches 30 people and three entities and
                the decisions are daily, hire full-time.
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                Full-time also buys organizational ownership. A full-time CFO
                builds the team under them, owns the vendor relationships, sits
                in the executive staff meeting every week. They become
                institutional. That matters when the finance function has scaled
                past the design phase and needs someone managing rather than
                building.
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                The tradeoff is what you carry: base salary, bonus target,
                equity, benefits, and onboarding time. Depending on market, that
                is a significant annual commitment before the function produces
                its first useful output.
              </p>
            </section>

            <section className="mt-16" aria-labelledby="fractional-buys">
              <h2
                id="fractional-buys"
                className="font-display text-[28px] tracking-[-0.02em] text-ink"
              >
                What a fractional CFO actually buys you
              </h2>
              <p className="mt-6 text-[17px] leading-[1.7] text-ink">
                Senior judgment, applied to specific problems, without the
                full-time cost structure.
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                The operator scene looks like this. It is Wednesday. You have a
                board pack due Friday, a lender covenant question nobody has
                modeled, and a controller who is solid on close but has never
                written a proper cash forecast. A fractional CFO comes in,
                touches the model, writes the narrative, answers the lender
                question, and is out. No desk. No equity. No 90-day ramp.
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                Fractional is also where you get the function designed. Most
                companies between roughly $1M and $15M in revenue do not have a
                finance function. They have a bookkeeper, a CPA for taxes, and a
                founder reading a cash balance each morning. A fractional CFO
                builds the close process, the cash cadence, the board reporting
                structure, the model. Then maintains it at whatever cadence the
                company actually needs.
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                Bookkeepers and controllers typically stay in their roles.
                Fractional CFO sits above, not instead of. We do not replace
                your CPA, your tax preparer, your audit firm, or your
                bookkeeper. Those relationships are yours. We work alongside
                them.
              </p>
            </section>

            <section className="mt-16" aria-labelledby="triggers-fractional">
              <h2
                id="triggers-fractional"
                className="font-display text-[28px] tracking-[-0.02em] text-ink"
              >
                Triggers that point to fractional
              </h2>
              <ul className="mt-6 space-y-3 border-l-2 border-teal/40 pl-5 text-[17px] leading-[1.6] text-ink">
                {fractionalTriggers.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </section>

            <section className="mt-16" aria-labelledby="triggers-full-time">
              <h2
                id="triggers-full-time"
                className="font-display text-[28px] tracking-[-0.02em] text-ink"
              >
                Triggers that point to a full-time hire
              </h2>
              <ul className="mt-6 space-y-3 border-l-2 border-teal/40 pl-5 text-[17px] leading-[1.6] text-ink">
                {fullTimeTriggers.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
              <p className="mt-6 text-[17px] leading-[1.7] text-ink">
                None of these are moral judgments. They are function questions.
                When the volume and presence need aligns with a daily hire,
                full-time is the right answer.
              </p>
            </section>

            <section className="mt-16" aria-labelledby="cost-speed">
              <h2
                id="cost-speed"
                className="font-display text-[28px] tracking-[-0.02em] text-ink"
              >
                Cost and speed tradeoffs (no list prices)
              </h2>
              <p className="mt-6 text-[17px] leading-[1.7] text-ink">
                Full-time CFO searches take time. Recruiting, offers, ramp. The
                function is not producing output on week one.
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                Fractional engagements move faster. Scope is defined, work
                starts, the model gets built or the close gets fixed before a
                full-time hire would have finished their first week.
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                On cost: fractional is typically less than a full-time salary
                plus benefits, and the scope is matched to actual need rather
                than a 40-hour week. Vantage Rock does not publish a rate menu.
                Fees are scoped after a fit conversation, because the right
                scope depends on what actually needs doing, not a package tier.
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                Firms like Burkland, Amplēo, and CFO Alliance compete in this
                fractional lane. They are legitimate, and depending on your
                geography, stage, and what you need, one of them might be the
                better fit. Vantage Rock differentiates as a finance-first
                practice that integrates practical AI tooling (under human
                review) into the core workflow. That means faster model
                iteration, cleaner flux analysis, and more analytical work at
                the same engagement depth. It is not automation for its own
                sake. It is a CFO using better tools.
              </p>
            </section>

            <section className="mt-16" aria-labelledby="where-ai">
              <h2
                id="where-ai"
                className="font-display text-[28px] tracking-[-0.02em] text-ink"
              >
                Where AI fits in either path
              </h2>
              <p className="mt-6 text-[17px] leading-[1.7] text-ink">
                Whether you hire fractional or full-time, the finance function
                is being reshaped by AI tooling. Variance analysis that used to
                take a half-day can run faster. First-draft board narratives,
                scenario models, and cash timing analyses have a shorter path
                from data to decision.
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                The relevant question is not whether AI is in your finance
                stack. It is whether the human reviewing that output knows what
                they are looking at.
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                At Vantage Rock, AI is a working tool inside engagements, not a
                pitch. Outputs go through a finance owner before they touch a
                founder, a board, or a lender. The judgment layer does not
                disappear. It just has better inputs.
              </p>
            </section>

            <section className="mt-16" aria-labelledby="wrong-fit">
              <h2
                id="wrong-fit"
                className="font-display text-[28px] tracking-[-0.02em] text-ink"
              >
                When Vantage Rock is the wrong fit
              </h2>
              <p className="mt-6 text-[17px] leading-[1.7] text-ink">
                If you need a full-time, embedded CFO who is in your office five
                days a week, we are not that. We are remote-first with roots in
                Scottsdale, AZ and serve founder-led and PE-backed companies
                across the U.S. If you need in-person daily presence, hire a
                full-time CFO.
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                If your primary finance need is tax preparation, audit, or
                bookkeeping, we are also not the right call. We work alongside
                those providers, not instead of them.
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                If you are pre-revenue or pre-product and do not yet have
                financial activity worth structuring, the timing may be early.
                We work with companies from roughly $1M in revenue upward. Below
                that, the function may not yet justify the engagement.
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                If you want a self-serve software product with list prices, that
                is not what we sell.
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
                The call is a fit-check. You describe where the finance function
                is, what is not working, and what the next stretch requires. We
                describe how we work, whether the model fits, and what
                engagement scope typically looks like for a company in your
                situation.
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                Nobody diagnoses your business on the call. Nobody sells you a
                package. The goal is mutual clarity: does this make sense to
                explore further, or is there a better path for you right now?
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                If there is a fit, we scope from there. If there is not, we will
                tell you, and if we know a better option for your situation, we
                will point you toward it.
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
