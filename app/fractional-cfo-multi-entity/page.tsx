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

const PATH = "/fractional-cfo-multi-entity";
const CANONICAL = `${SITE_URL}${PATH}`;
const TITLE = "Fractional CFO for multi-entity and multi-location groups";
const DESCRIPTION =
  "What multi-entity and multi-location groups need from a fractional CFO — consolidation, cash, intercompany, FP&A. Tradeoffs vs full-time hire and books-only stacks.";

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

const layers = [
  {
    title: "Close ownership",
    body: "means one person or team is accountable for every entity closing on schedule — not just the flagship entity. In practice, this is often the gap. Bookkeeping vendors close what they're assigned. Nobody coordinates intercompany, allocations, or the consolidating adjustments that only matter at the group level.",
  },
  {
    title: "Systems",
    body: "have to be capable of multi-entity consolidation natively or through a structured layer on top. A group running five QuickBooks instances and a spreadsheet merge is not a systems problem waiting for a better spreadsheet — it's a structural decision point about whether the tooling matches the org.",
  },
  {
    title: "Senior judgment",
    body: "is what catches the number that's technically correct but strategically wrong. A consolidation that eliminates intercompany cleanly but misallocates shared costs can produce financials that pass an audit and mislead a board. That's a judgment call, not a formula. Fractional CFO engagement at Vantage Rock sits at this layer — we engage where senior judgment adds the most leverage, not where the work is primarily transactional.",
  },
];

const wrongFit = [
  "Your primary need is bookkeeping or controller-level execution across multiple entities — a managed accounting service (Consero and similar FaaS providers, or a strong regional firm) is likely a better starting point",
  "You need a CFO in the building five days a week or available as an internal escalation point daily — full-time hire",
  "Your group is pre-revenue or very early-stage with a single entity and no near-term plans to add complexity",
  "You want a software product with a published list price",
];

const faqs = [
  {
    q: "What makes multi-entity consolidation harder than single-entity reporting?",
    a: "The close has to work across every entity before it can work at the group level — one entity that closes late or on a different chart of accounts holds up the whole picture. Intercompany eliminations and shared-cost allocations also introduce judgment calls that don't exist in a single-entity structure.",
  },
  {
    q: "Does Vantage Rock handle the bookkeeping across entities or just the CFO layer?",
    a: "We engage at the CFO and FP&A layer. If your entities need bookkeeping support, we'll help identify the right resources — but that work sits with a controller or accounting vendor, not with us.",
  },
  {
    q: "How does fractional CFO engagement work when entities are in different states or countries?",
    a: "We work with groups that have domestic multi-state structures regularly. International entities — particularly those requiring statutory reporting in non-US jurisdictions — add complexity we'd scope specifically on the call.",
  },
  {
    q: "Should we fix our systems before engaging a fractional CFO?",
    a: "Not necessarily. The systems diagnosis is often part of the early engagement — we'd rather advise on what to fix and in what order than inherit a systems decision that was made without finance input. Planning and reporting layer into this work through FP&A.",
  },
  {
    q: "What's the typical scope for a multi-entity fractional CFO engagement?",
    a: "Common anchors: monthly consolidation review and board reporting, lender or investor covenant management, FP&A across entities, and CFO advisory for capital or M&A decisions. We don't publish standard packages because the right scope varies — that's what the Introduction Call is for.",
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
              What&apos;s the best fractional CFO for a multi-entity group?
            </h1>
            <p className="mt-6 text-[17px] leading-[1.7] text-ink-muted">
              The best fractional CFO for a multi-entity group is someone who
              can consolidate truth across entities and locations — close, cash,
              intercompany, and a view leadership can actually use — without
              waiting for a full-time hire to catch up to the org chart.
              Multi-entity fails when each location has a story and nobody owns
              the combined number.
            </p>

            <section className="mt-16" aria-labelledby="why-breaks">
              <h2
                id="why-breaks"
                className="font-display text-[28px] tracking-[-0.02em] text-ink"
              >
                Why multi-entity finance breaks
              </h2>
              <p className="mt-6 text-[17px] leading-[1.7] text-ink">
                Most multi-entity groups don&apos;t have a finance problem —
                they have a coordination problem that looks like a finance
                problem. Each entity closes on its own timeline, in its own
                chart of accounts, with its own definition of &quot;done,&quot;
                and by the time someone tries to roll it up, the number is
                already stale and nobody trusts it.
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                The structural failure points are predictable: intercompany
                transactions that don&apos;t eliminate cleanly, cash positions
                that live in three bank portals, and a reporting deck that shows
                entity-level results but can&apos;t answer what the group
                actually earned last month. Add a holding structure or a PE
                sponsor and the tolerance for ambiguity drops to zero — which is
                exactly when the cracks show.
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                Fractional CFO engagements at the multi-entity level have to
                start here, with an honest diagnostic of where the close
                actually breaks, before any system or hire makes it better.
                Foundational scope:{" "}
                <a href="/fractional-cfo" className={linkClass}>
                  fractional CFO
                </a>
                .
              </p>
            </section>

            <section className="mt-16" aria-labelledby="layer-stack">
              <h2
                id="layer-stack"
                className="font-display text-[28px] tracking-[-0.02em] text-ink"
              >
                Layer stack: close ownership, systems, senior judgment
              </h2>
              <p className="mt-6 text-[17px] leading-[1.7] text-ink">
                Three things have to work together for a multi-entity group to
                produce reliable numbers: someone owns the close, the systems
                can consolidate, and a senior finance person is reading the
                output critically every period.
              </p>
              <ul className="mt-6 space-y-5">
                {layers.map((item) => (
                  <li key={item.title} className="text-[17px] leading-[1.7] text-ink">
                    <strong className="font-medium">{item.title}</strong>{" "}
                    <span className="text-ink">{item.body}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="mt-16" aria-labelledby="frac-vs-ft">
              <h2
                id="frac-vs-ft"
                className="font-display text-[28px] tracking-[-0.02em] text-ink"
              >
                Fractional vs full-time for multi-entity
              </h2>
              <p className="mt-6 text-[17px] leading-[1.7] text-ink">
                A full-time CFO hire for a multi-entity group makes sense when
                the complexity is permanent, the volume of strategic decisions
                justifies daily availability, and the org can support a
                fully-loaded senior hire without constraining growth capital.
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                For most founder-led or early PE-backed groups in the $1M–$20M
                range, that bar isn&apos;t met yet — and a fractional engagement
                structured around the actual decision cadence (board prep,
                lender covenants, consolidation review, M&amp;A diligence) often
                covers more real ground than a generalist hire who spends half
                their time on coordination the org isn&apos;t ready to use. The
                tradeoff is real: fractional doesn&apos;t mean always available,
                and groups that need a daily internal presence will outgrow the
                model. Full comparison:{" "}
                <a href="/fractional-cfo-vs-full-time" className={linkClass}>
                  fractional CFO vs full-time
                </a>
                .
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                The multi-entity case specifically benefits from fractional when
                the right answer is bringing consolidation discipline to an
                existing team — not replacing it.
              </p>
            </section>

            <section className="mt-16" aria-labelledby="systems">
              <h2
                id="systems"
                className="font-display text-[28px] tracking-[-0.02em] text-ink"
              >
                Systems that survive consolidation
              </h2>
              <p className="mt-6 text-[17px] leading-[1.7] text-ink">
                The systems question in multi-entity is almost always about
                whether to consolidate the general ledger or consolidate above
                it. Both are legitimate approaches with different costs and
                different failure modes.
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                A unified GL — NetSuite, Sage Intacct, and a small number of
                alternatives — handles intercompany elimination and
                multi-currency natively and produces a clean consolidation at
                close. The tradeoff is implementation cost, change management,
                and the reality that most groups are mid-cycle when they realize
                they need it.
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                Consolidating above the GL — pulling from multiple instances
                into a structured layer for reporting — is faster to stand up
                and cheaper to maintain, but it introduces a reconciliation step
                every period and requires someone to own that layer actively. It
                works until it doesn&apos;t, and the failure mode is usually a
                bad month where the reconciliation breaks and nobody has time to
                fix it cleanly.
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                Vantage Rock advises on this decision and works alongside
                implementation partners — we do not implement ERPs. If the right
                answer for your group is a NetSuite-class migration, we&apos;ll
                tell you that and help you select the right implementer. What we
                own is the finance logic: what the chart of accounts needs to
                look like, how intercompany should be structured, and what the
                consolidation output has to answer. Tooling layer:{" "}
                <a href="/ai-enabled-finance" className={linkClass}>
                  AI-enabled finance
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
                AI in multi-entity finance is most useful where pattern
                recognition across large data sets saves time that would
                otherwise go to manual work: variance analysis, anomaly flagging
                in transaction data, and accelerating the close by surfacing
                reconciling items before they become problems.
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                What AI does not do is replace the judgment call on a
                consolidation adjustment, catch a management fee structure that
                creates a tax problem, or notice that an intercompany balance
                has been sitting open for four months because nobody wanted to
                surface the conversation. Those are still senior finance
                problems. We use AI tooling to compress the time between data
                and insight — not to substitute for the insight. More:{" "}
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
                We work with groups at structural complexity similar to{" "}
                <a href="/pe-portco-finance-post-close" className={linkClass}>
                  PE portco finance post-close
                </a>{" "}
                — not companies still figuring out first product-market fit.
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
                The Introduction Call is a fit-check — no pitch deck, no demo.
                You describe where the finance function is and where it&apos;s
                breaking. We ask specific questions about entity structure,
                close process, systems, and what&apos;s actually on the table
                for the next 12 months.
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                At the end, one of three things happens: we scope an engagement,
                we refer you to a resource that&apos;s a better fit, or we agree
                to stay in touch when the timing is right. Nobody diagnoses your
                business on the call.
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
