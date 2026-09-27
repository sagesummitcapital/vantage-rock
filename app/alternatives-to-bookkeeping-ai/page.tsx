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

const PATH = "/alternatives-to-bookkeeping-ai";
const CANONICAL = `${SITE_URL}${PATH}`;
const TITLE = "Alternatives to bookkeeping AI when you need finance leadership";
const DESCRIPTION =
  "When Zeni, Pilot, Numeric-class bookkeeping AI is enough — and when founders need fractional CFO / FP&A leadership instead. Soft comparison, no smear.";

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

const notBuiltFor = [
  "Write a cash runway narrative your board will trust",
  "Tell you which contract terms are compressing gross margin",
  "Run a hiring scenario against your next raise",
  "Explain the flux to your lead investor on a Friday call",
  "Decide when to push receivables or pull a vendor payment",
  "Build a 13-week forecast when the bank asks for one",
];

const faqs = [
  {
    q: "Does working with Vantage Rock mean I have to drop my bookkeeper or accountant?",
    a: "No. Bookkeepers and controllers typically stay. We work alongside the accounting function, not in place of it.",
  },
  {
    q: "Can bookkeeping AI and a fractional CFO coexist?",
    a: "Yes. That is often the right architecture. Bookkeeping AI handles the close and the GL. Fractional CFO pulls that data into decisions.",
  },
  {
    q: "What kind of companies do you typically work with?",
    a: "Founder-led companies from about $1M in revenue, and PE-backed businesses that need embedded finance leadership without a full-time CFO. Industry varies; the gap is usually consistent.",
  },
  {
    q: "How do you handle AI tools in the engagement?",
    a: "Where AI saves real operator time (in modeling, reporting, or synthesis), we use it. We do not sell AI as a product SKU or pitch it as a feature. It is part of how the work gets done.",
  },
  {
    q: "What does an engagement typically involve?",
    a: "That depends on the gap. We scope after the first conversation. Common elements include model ownership, cash forecasting, board pack preparation, and investor-ready reporting.",
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
              Alternatives to bookkeeping AI when you need leadership, not just
              books
            </h1>
            <p className="mt-6 text-[17px] leading-[1.7] text-ink-muted">
              Bookkeeping AI (Zeni, Pilot, Numeric-class tools) is built to keep
              the books clean and automate accounting workflows. If you need
              cash judgment, forecasts leadership can run, and someone who owns
              the board pack, look at fractional CFO and FP&amp;A partners, not
              another bookkeeping product.
            </p>

            <section className="mt-16" aria-labelledby="good-at">
              <h2
                id="good-at"
                className="font-display text-[28px] tracking-[-0.02em] text-ink"
              >
                What bookkeeping AI is good at
              </h2>
              <p className="mt-6 text-[17px] leading-[1.7] text-ink">
                These tools have a real job and they do it well. Automated
                transaction categorization, monthly close acceleration, receipt
                matching, payroll sync, and basic reporting dashboards. For
                early-stage companies without a controller, they remove a lot of
                the grunt work that used to require a full-time bookkeeper.
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                Zeni, Pilot, and Numeric-class platforms have also gotten
                sharper on GL accuracy and integrations. If clean books are the
                constraint, they are a legitimate option. That is an honest
                read.
              </p>
            </section>

            <section className="mt-16" aria-labelledby="not-built">
              <h2
                id="not-built"
                className="font-display text-[28px] tracking-[-0.02em] text-ink"
              >
                What bookkeeping AI is not built to own
              </h2>
              <p className="mt-6 text-[17px] leading-[1.7] text-ink">
                The work that actually drives decisions is not accounting. It is
                judgment. Bookkeeping AI does not:
              </p>
              <ul className="mt-6 space-y-3 border-l-2 border-teal/40 pl-5 text-[17px] leading-[1.6] text-ink">
                {notBuiltFor.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
              <p className="mt-6 text-[17px] leading-[1.7] text-ink">
                These tools report what happened. They are not designed to tell
                you what it means or what to do about it. That distinction is
                where founders get caught.
              </p>
            </section>

            <section className="mt-16" aria-labelledby="gap">
              <h2
                id="gap"
                className="font-display text-[28px] tracking-[-0.02em] text-ink"
              >
                The gap founders actually hit
              </h2>
              <p className="mt-6 text-[17px] leading-[1.7] text-ink">
                Tuesday morning. Books look clean. QuickBooks is reconciled. The
                bookkeeping AI dashboard is green.
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                Then the board deck finance section is still blank. Cash stack
                surprised the CEO again, not because the numbers were wrong, but
                because no one connected vendor payment timing, a slow
                receivables week, and the payroll cycle into a single view with
                a recommendation attached.
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                The flux analysis never got written. The model has not been
                touched since the last raise. And the question the lead investor
                asked last week (&quot;what does CAC payback look like if you
                add two reps in Q3?&quot;) is still sitting in a thread.
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                Clean books and finance leadership are not the same thing.
                Founders who conflate them end up with accurate historical data
                and no one driving forward.
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                Bookkeepers and controllers typically stay in place when you add
                fractional CFO coverage. The accounting function runs. The
                leadership gap is what fractional CFO is hired to close.
              </p>
            </section>

            <section className="mt-16" aria-labelledby="alt-paths">
              <h2
                id="alt-paths"
                className="font-display text-[28px] tracking-[-0.02em] text-ink"
              >
                Alternative paths when you need leadership
              </h2>

              <h3 className="mt-8 font-display text-[22px] tracking-[-0.02em] text-ink">
                1. Fractional CFO or outsourced finance leadership
              </h3>
              <p className="mt-3 text-[17px] leading-[1.7] text-ink">
                This is the most direct substitute when the gap is judgment, not
                data entry. Firms like Burkland, Amplēo, and CFO Alliance
                operate in this space, each with different industry
                concentrations, engagement models, and size thresholds. A
                fractional CFO owns the board pack, runs the model, sits in
                investor calls, and makes the cash call. Engagement is typically
                part-time and scoped. Evaluate on whether you get a named
                operator with relevant sector depth, not just a team-assigned
                resource.
              </p>

              <h3 className="mt-8 font-display text-[22px] tracking-[-0.02em] text-ink">
                2. FP&amp;A tooling plus a human owner
              </h3>
              <p className="mt-3 text-[17px] leading-[1.7] text-ink">
                Mosaic, Runway, and similar FP&amp;A platforms do the scenario
                modeling and dashboard work well. The catch: these tools need
                someone who can build the logic, interpret the outputs, and own
                the narrative. Buying a tool without a human owner is like
                buying accounting software without an accountant. The tool
                surfaces the data; the operator runs the meeting. If you already
                have finance bandwidth, FP&amp;A tooling is high-leverage. If
                you do not, the tool sits half-configured.
              </p>

              <h3 className="mt-8 font-display text-[22px] tracking-[-0.02em] text-ink">
                3. Full-time controller or CFO when volume justifies
              </h3>
              <p className="mt-3 text-[17px] leading-[1.7] text-ink">
                At some point (typically when transaction volume, team size, or
                investor reporting complexity reaches a threshold) the
                fractional model does not fit. A full-time controller handles
                day-to-day accounting and close at scale. A full-time CFO is
                warranted when capital markets work, M&amp;A complexity, or
                board relationships require daily availability. These are
                different roles. Hiring a controller when you need strategic
                finance leadership does not close the gap, and vice versa.
              </p>

              <h3 className="mt-8 font-display text-[22px] tracking-[-0.02em] text-ink">
                4. Hybrid: keep the bookkeeping layer, add fractional judgment
              </h3>
              <p className="mt-3 text-[17px] leading-[1.7] text-ink">
                This is often the right architecture. Bookkeeping AI or a
                bookkeeper handles the close and the GL. A fractional CFO or
                FP&amp;A partner sits on top of that, pulling the data into a
                model, owning the board narrative, and making the cash and
                capital calls. The layers do different things and they stack
                cleanly. You are not replacing one with the other.
              </p>
            </section>

            <section className="mt-16" aria-labelledby="choose">
              <h2
                id="choose"
                className="font-display text-[28px] tracking-[-0.02em] text-ink"
              >
                How to choose without buying vaporware
              </h2>
              <p className="mt-6 text-[17px] leading-[1.7] text-ink">
                Three questions worth asking before signing anything:
              </p>
              <h3 className="mt-8 font-display text-[22px] tracking-[-0.02em] text-ink">
                Who specifically will be in the room?
              </h3>
              <p className="mt-3 text-[17px] leading-[1.7] text-ink">
                Fractional finance firms vary on whether you get a named partner
                or a pooled team. Know who is presenting to your board.
              </p>
              <h3 className="mt-8 font-display text-[22px] tracking-[-0.02em] text-ink">
                What does &quot;CFO&quot; mean in this engagement?
              </h3>
              <p className="mt-3 text-[17px] leading-[1.7] text-ink">
                Some fractional offerings are closer to controller or FP&amp;A
                work. That is fine if it matches the gap, but name it clearly.
                Ask for a sample board pack or model they have built.
              </p>
              <h3 className="mt-8 font-display text-[22px] tracking-[-0.02em] text-ink">
                What is the handoff model if the engagement ends?
              </h3>
              <p className="mt-3 text-[17px] leading-[1.7] text-ink">
                Good fractional work leaves clean documentation, a maintained
                model, and an accounting layer that does not depend on any one
                vendor. Lock-in is a warning sign.
              </p>
              <p className="mt-6 text-[17px] leading-[1.7] text-ink">
                Fees vary across providers. Any firm worth working with will
                scope the engagement before quoting. If you get a list price
                before a conversation about your actual situation, that is
                information.
              </p>
            </section>

            <section className="mt-16" aria-labelledby="where-vr">
              <h2
                id="where-vr"
                className="font-display text-[28px] tracking-[-0.02em] text-ink"
              >
                Where Vantage Rock fits
              </h2>
              <p className="mt-6 text-[17px] leading-[1.7] text-ink">
                Vantage Rock Financial works with founder-led and PE-backed
                businesses from roughly $1M in revenue that need fractional CFO
                and FP&amp;A coverage: strategic finance leadership without a
                full-time hire. The work includes cash forecasting, board and
                investor reporting, model ownership, and practical AI
                implementation where it saves real operator time.
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                We do not do bookkeeping, tax, or audit. We work with your
                existing accountant or bookkeeper (or help you find the right
                one) and sit on top of the accounting layer as the finance
                leadership function.
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                Engagements are scoped after a fit conversation. We do not
                publish list prices because scope varies too much to make that
                meaningful.
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
                If your primary need is clean books, automated close, or tax
                compliance, bookkeeping AI or a CPA firm is the right call, not
                us. We are not set up to replace that layer and we do not try
                to.
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                If you need a full-time CFO presence (daily availability,
                board-seat involvement, or capital markets execution at scale),
                a fractional engagement probably does not cover it. We will say
                that clearly in the first conversation.
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                If your business is pre-revenue with no near-term capital event
                or board reporting requirement, the overhead of fractional CFO
                coverage is likely premature. Get the bookkeeping layer right
                first.
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                If you want a self-serve accounting app with published menu
                prices, that is not what we sell.
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
