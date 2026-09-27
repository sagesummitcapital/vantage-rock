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

const PATH = "/ai-in-finance-ops";
const CANONICAL = `${SITE_URL}${PATH}`;
const TITLE = "AI in finance ops without vaporware — forecast, close, cash";
const DESCRIPTION =
  "Practical ways to put AI into finance ops for forecast, close, and cash — and when a fractional CFO should own the stack instead of another tool.";

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

const faqs = [
  {
    q: "Does Vantage Rock replace the bookkeeper or controller?",
    a: "No. Those roles typically stay. The fractional CFO layer sits above them and owns the strategic and analytical work.",
  },
  {
    q: "Which tools does Vantage Rock use?",
    a: "Tool selection depends on the company's existing stack, GL, and workflow. There is no standard platform requirement. The right tool is the one that fits the actual process.",
  },
  {
    q: "What company stage is this built for?",
    a: "Founder-led companies and PE-backed businesses roughly from $1M revenue upward where the finance function needs senior leadership but not a full-time hire.",
  },
  {
    q: "How long before the AI layer is actually running?",
    a: "That depends on data quality and how much process work exists already. Realistic timelines get discussed in the fit conversation, not promised on a webpage.",
  },
  {
    q: 'What does "practical AI implementation" actually mean?',
    a: "It means identifying the tasks in your finance function that repeat every month, building a reviewed workflow around them, and using tools to compress the mechanical portion. It does not mean buying a platform and calling it done.",
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
              Practical AI into finance ops without buying vaporware
            </h1>
            <p className="mt-6 text-[17px] leading-[1.7] text-ink-muted">
              Put AI into finance ops where the work already repeats: forecast
              drafts, close checklists, cash follow-up, flux narrative. Skip
              vaporware that demos well and never owns the number. A fractional
              CFO or FP&amp;A owner should still sign what leaves.
            </p>

            <section className="mt-16" aria-labelledby="practical">
              <h2
                id="practical"
                className="font-display text-[28px] tracking-[-0.02em] text-ink"
              >
                What practical means in a finance shop
              </h2>
              <p className="mt-6 text-[17px] leading-[1.7] text-ink">
                Practical means the AI touches a task that happens every month,
                produces a draft or an alert, and a human checks it before it
                moves.
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                It does not mean replacing judgment. Forecast assumptions still
                need someone who understands the business. Variance commentary
                still needs someone who can explain why Q3 missed without hiding
                behind passive voice. The mechanical part (pulling the prior
                period, populating the template, flagging what changed) can
                compress from hours to minutes.
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                That compression is real. It just does not mean the work
                disappears. It means the senior person spends time reviewing and
                deciding instead of copying and pasting.
              </p>
            </section>

            <section className="mt-16" aria-labelledby="forecast">
              <h2
                id="forecast"
                className="font-display text-[28px] tracking-[-0.02em] text-ink"
              >
                Forecast
              </h2>
              <p className="mt-6 text-[17px] leading-[1.7] text-ink">
                A rolling forecast is the most repeatable FP&amp;A task in a
                mid-market shop. Same structure, same cadence, same driver
                logic, just updated actuals and new assumptions.
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                The workflow that holds up: an FP&amp;A layer (Mosaic, Runway,
                or a well-built model with an automation layer feeding it) pulls
                actuals from the GL, populates the driver model, and surfaces a
                draft. A CFO or FP&amp;A owner reviews the draft, challenges the
                assumptions, adjusts where the business changed, and publishes.
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                The AI drafts. The human publishes.
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                What breaks this: no owner on the assumptions. If the tool
                auto-publishes a forecast with last quarter&apos;s churn rate
                and nobody caught that a major customer left in week two, the
                board sees a forecast that is wrong by design. The tool did not
                fail. The process failed because there was no senior person in
                the loop.
              </p>
            </section>

            <section className="mt-16" aria-labelledby="close">
              <h2
                id="close"
                className="font-display text-[28px] tracking-[-0.02em] text-ink"
              >
                Close
              </h2>
              <p className="mt-6 text-[17px] leading-[1.7] text-ink">
                Monthly close is a checklist problem. Same reconciliations, same
                journal entries, same review steps, every cycle. Tools like
                FloQast and Numeric formalize that checklist, flag open items,
                and surface anomalies in the trial balance.
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                That is useful. The close moves faster when nobody is chasing
                status by email and every preparer knows what is open.
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                What still needs a person: deciding whether the anomaly is a
                reclass or a real problem. Approving estimates. Signing the flux
                commentary before it goes to the board. The tool tells you the
                accrual looks different from last month. The controller or CFO
                tells you whether that difference is intentional or a mistake.
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                Bookkeepers and controllers typically stay in this setup. The
                tool gives them better visibility and fewer status meetings. The
                fractional CFO reviews output and owns the narrative.
              </p>
            </section>

            <section className="mt-16" aria-labelledby="cash">
              <h2
                id="cash"
                className="font-display text-[28px] tracking-[-0.02em] text-ink"
              >
                Cash
              </h2>
              <p className="mt-6 text-[17px] leading-[1.7] text-ink">
                Cash follow-up is the most neglected repeatable task in a
                founder-led business. AR ages out because nobody sent the
                sequence. Collections stall because the founder does not want to
                make the call and there is no process behind them.
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                AI helps here in a narrow but real way: automated follow-up
                sequences triggered by invoice age, cash position dashboards
                that update daily, mid-week alerts when the 13-week cash outlook
                shifts by a material amount.
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                The alert is only valuable if someone acts on it. A dashboard
                nobody opens is not a cash management system. The fractional CFO
                or an operator on the team has to be the one who sees the alert
                Wednesday morning and decides whether to accelerate a collection
                call, draw on the line, or adjust the payables sequence.
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                The tool sends the signal. The human decides what to do with it.
              </p>
            </section>

            <section className="mt-16" aria-labelledby="vaporware">
              <h2
                id="vaporware"
                className="font-display text-[28px] tracking-[-0.02em] text-ink"
              >
                The vaporware tells
              </h2>
              <p className="mt-6 text-[17px] leading-[1.7] text-ink">
                A few patterns that should slow you down before you sign a
                contract:
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                The demo uses clean, pre-loaded data. Your books are not that.
                Ask what happens during implementation when accounts are mapped
                wrong or the chart of accounts is nonstandard.
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                The pitch is about the AI replacing your CFO function. It will
                not. Scenario modeling, board communication, covenant
                compliance, working capital decisions: these require judgment,
                context, and accountability. Software does not have any of
                those.
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                The vendor cannot name who owns the output. If you ask &quot;who
                signs the forecast?&quot; and the answer is the platform or the
                algorithm, walk away. Someone has to own the number. If that
                someone is not named, the number is not owned.
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                The ROI is speculative and large. Real ROI from finance AI at
                this company size is time compression and fewer errors in
                mechanical work. It is not a percentage claim on revenue or a
                margin expansion figure. If the pitch leads with those numbers
                and cannot source them from your actual business, they are
                invented.
              </p>
            </section>

            <section className="mt-16" aria-labelledby="own-stack">
              <h2
                id="own-stack"
                className="font-display text-[28px] tracking-[-0.02em] text-ink"
              >
                When a fractional CFO should own the stack
              </h2>
              <p className="mt-6 text-[17px] leading-[1.7] text-ink">
                When the company does not have a full-time CFO or a senior
                FP&amp;A person, tool selection and implementation without that
                ownership layer is how you buy software that sits unused.
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                A fractional CFO who is finance-first (not a tool vendor) will
                scope the tooling to the actual workflow, not the other way
                around. They will push back on tools that create work rather
                than compress it. They will decide what connects to what, what
                the review cadence looks like, and what the output standard is
                before any tool goes live.
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                At Vantage Rock, the approach is finance-first. The AI layer
                compresses mechanical work. The CFO or FP&amp;A owner reviews
                everything before it leaves the finance function. The bookkeeper
                and controller typically stay in their roles. The fractional
                engagement sits above that layer and owns the judgment calls.
              </p>
            </section>

            <section className="mt-16" aria-labelledby="tool-vs">
              <h2
                id="tool-vs"
                className="font-display text-[28px] tracking-[-0.02em] text-ink"
              >
                Tool classes vs leadership
              </h2>
              <p className="mt-6 text-[17px] leading-[1.7] text-ink">
                To be direct about the tool landscape:
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                Close management tools (FloQast, Numeric) are useful when there
                is a controller who will run the checklist. Without that person,
                the checklist is empty.
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                FP&amp;A platforms (Mosaic, Runway) are useful when there is an
                FP&amp;A owner who will drive the forecast cadence and challenge
                the assumptions. Without that person, the platform surfaces
                numbers nobody interprets.
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                Cash and AR tools are useful when someone has the authority and
                the habit of acting on what the tool surfaces. Without that
                person, the alerts go unread.
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                The tools are not the leadership. The tools give a leader better
                raw material to work with faster.
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
                If the books are materially behind and need a cleanup engagement
                before any reporting or forecasting is viable, start with a
                bookkeeper or accounting firm that specializes in cleanup. We
                are not that.
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                If the company is pre-revenue or very early stage with minimal
                transaction volume, a fractional CFO engagement is probably not
                the right use of budget yet. A strong part-time bookkeeper and a
                founder who understands a cash projection may be sufficient.
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                If the goal is to fully automate the finance function with no
                human review layer, that is not how we work and not something we
                would stand behind.
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                If you want software only with list prices and no finance owner
                in the loop, buy a tool. Do not hire us for that.
              </p>
            </section>

            <section className="mt-16" aria-labelledby="how-start">
              <h2
                id="how-start"
                className="font-display text-[28px] tracking-[-0.02em] text-ink"
              >
                How to start
              </h2>
              <p className="mt-6 text-[17px] leading-[1.7] text-ink">
                Scope is determined after a fit conversation, not before. The
                engagement structure depends on what the finance function looks
                like today, what the company needs in the next twelve months,
                and where the real gaps are.
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                Most engagements cover some combination of fractional CFO
                leadership, FP&amp;A process, and practical AI implementation
                into the workflows that already repeat. Some are narrower. Fees
                are scoped after that conversation.
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
