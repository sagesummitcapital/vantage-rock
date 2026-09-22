import type { Metadata } from "next";
import Image from "next/image";
import {
  SITE_URL,
  SITE_NAME,
  FOUNDER_NAME,
  CONTACT_EMAIL,
  LOCATION,
} from "@/lib/site";

const PATH = "/fpa";
const CANONICAL = `${SITE_URL}${PATH}`;
const TITLE = "FP&A services — financial planning & analysis for growing companies";
const DESCRIPTION =
  "FP&A services for founder-led and PE-backed companies: rolling forecasts, cash planning, budgets, KPI packs, and board-ready analysis. Scottsdale AZ. Introduction Call — fit-check only.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "FP&A",
    "FP&A services",
    "FP&A consultant",
    "financial planning and analysis",
    "rolling forecast",
    "cash flow forecasting",
    "budget vs actuals",
    "board reporting",
  ],
  alternates: { canonical: CANONICAL },
  openGraph: {
    type: "website",
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
    q: "What is FP&A, in practice?",
    a: "Financial planning and analysis is the forward layer of finance: budgets, rolling forecasts, cash plans, variance and flux narrative, KPI packs, and the scenarios leadership uses to decide. It sits on top of a reliable close. If the books are late or inconsistent, fix that first — judgment on dirty numbers is expensive noise.",
  },
  {
    q: "How is FP&A different from a controller or bookkeeper?",
    a: "A bookkeeper records what happened. A controller closes the books correctly. FP&A uses that closed file to explain why the numbers moved and what happens next. Controllers own the entries. FP&A owns the model, the story, and the decision support. More on the stack in bookkeeper vs controller vs CFO.",
  },
  {
    q: "Who is this for?",
    a: "Founder-led and sponsor-backed companies from roughly $1M in revenue where the spreadsheet forecast no longer matches how the business runs — multi-channel, multi-entity, or growth that outpaced the model. Strongest in healthcare, retail, professional services, technology and SaaS. If you do not have a close yet, that is a controller conversation first.",
  },
  {
    q: "Where does AI fit in FP&A?",
    a: "AI drafts flux, pulls expense trends, refreshes cash views, and assembles the first narrative for the pack — under review. A person still owns the assumptions and signs what leaves. See CFO AI agents and AI-enabled finance.",
  },
  {
    q: "How does an engagement start?",
    a: "The Introduction Call is a fit-check. We do not diagnose on the call. If it is a fit, a diagnostic and scope come next. Fees are quoted from scope. No list prices. FP&A often sits inside a fractional CFO engagement rather than as a standalone SKU.",
  },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${CANONICAL}#service`,
    name: "FP&A Services",
    description: DESCRIPTION,
    url: CANONICAL,
    provider: {
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
      founder: {
        "@type": "Person",
        name: FOUNDER_NAME,
        url: SITE_URL,
        email: CONTACT_EMAIL,
      },
    },
    areaServed: { "@type": "Country", name: "United States" },
    serviceType: [
      "FP&A",
      "Financial planning and analysis",
      "Rolling forecasts",
      "Cash flow forecasting",
      "Budget vs actuals",
      "Board and KPI reporting",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "FP&A Services",
    description: DESCRIPTION,
    url: CANONICAL,
    provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    areaServed: { "@type": "Country", name: "United States" },
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

export default function FpaPage() {
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
            <p className="font-mono text-[12px] tracking-[0.08em] text-ink-muted uppercase">
              Vantage Rock Financial · Scottsdale, AZ · Founded 2026
            </p>
            <h1 className="mt-3 font-display text-display-xl text-ink">
              FP&A for companies that need a forecast leadership can run on
            </h1>
            <p className="mt-5 font-display text-[22px] italic leading-[1.35] tracking-[-0.02em] text-ink-muted md:text-[24px]">
              Rolling forecasts, cash plans, and board packs with the why
              attached — not a model rebuilt once a quarter and filed.
            </p>

            <div className="mt-12 space-y-6 text-[17px] leading-[1.7] text-ink">
              <p>
                FP&A is financial planning and analysis: the work that turns a
                closed set of books into decisions. Budgets that match how the
                business actually operates. Rolling forecasts that update when
                reality moves. Cash views that explain the next six to thirteen
                weeks, not just the bank balance this morning. Variance and flux
                narrative that answers the board before they ask. KPI packs built
                to be read, not archived.
              </p>
              <p>
                Most shops that say they need “better reporting” are naming an
                FP&A gap. The P&amp;L looks fine and cash still surprises. Three
                forecast tabs disagree on the same week. The board pack is a
                dump of last month with no story. Growth added a channel or an
                entity and the model was never redesigned. Hiring a full-time
                FP&amp;A analyst is slow when the function still needs design —
                and a bookkeeper cannot own the judgment layer alone.
              </p>
              <p>
                Vantage Rock Financial delivers FP&amp;A as part of{" "}
                <a href="/fractional-cfo" className={linkClass}>
                  fractional CFO
                </a>{" "}
                leadership for founder-led and sponsor-backed companies from
                roughly $1M in revenue. The bookkeeper or controller typically
                stays. We do not replace your CPA, and we do not do tax, audit,
                or bookkeeping. The planning layer sits on a close you can trust;
                if close is late, we fix that cadence before we decorate the
                forecast.
              </p>
              <p>
                AI is how the repeating analysis gets drafted — flux narratives,
                expense trends, cash follow-up, the first pass of the pack —
                under review. A person still owns the assumptions and signs what
                leaves. That is{" "}
                <a href="/ai-enabled-finance" className={linkClass}>
                  AI-enabled finance
                </a>
                , delivered through{" "}
                <a href="/cfo-ai-agents" className={linkClass}>
                  CFO AI agents
                </a>
                , under fractional leadership.
              </p>
              <p>
                Operators usually call when runway math stopped matching the bank,{" "}
                <a
                  href="/insights/how-much-runway-do-we-really-have"
                  className={linkClass}
                >
                  cash ÷ burn stopped being a safe shortcut
                </a>
                , or the P&amp;L story and the cash story diverged — the same
                pattern as{" "}
                <a
                  href="/insights/pnl-profit-bank-empty"
                  className={linkClass}
                >
                  profit on the P&amp;L with an empty bank
                </a>
                . For sponsor-backed shops, the bar is a pack the operating
                partner can trust and a model that survives diligence questions.
                Portco-facing work is covered on{" "}
                <a href="/pe-portfolio-finance" className={linkClass}>
                  PE portfolio finance
                </a>
                .
              </p>
              <p>
                Based in Scottsdale, Arizona. Engagements are remote-first across
                the U.S. Fees are quoted after fit and diagnostic, from scope.
                No list prices. The Introduction Call is a fit-check — we do not
                diagnose on the call.
              </p>
            </div>

            <section className="mt-16">
              <h2 className="font-display text-[28px] tracking-[-0.02em] text-ink">
                What you get
              </h2>
              <ul className="mt-6 space-y-3 border-l-2 border-teal/40 pl-5 text-[17px] leading-[1.6] text-ink">
                <li>Rolling forecast and budget vs actuals someone owns weekly</li>
                <li>Cash plan tied to timing — not a single-month burn ratio</li>
                <li>Board- and lender-ready packs with flux and the why</li>
                <li>Scenario views for pricing, hiring, and capacity calls</li>
                <li>AI on repeating analysis; human sign-off on what leaves</li>
              </ul>
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
                <a
                  href="mailto:info@vantagerockfinancial.com"
                  className={linkClass}
                >
                  info@vantagerockfinancial.com
                </a>
                . Read more on{" "}
                <a href="/fractional-cfo" className={linkClass}>
                  fractional CFO services
                </a>
                ,{" "}
                <a href="/ai-enabled-finance" className={linkClass}>
                  AI-enabled finance
                </a>
                , and{" "}
                <a href="/cfo-ai-agents" className={linkClass}>
                  the five CFO AI agents
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
              Stavros Christias
            </p>
            <a
              href="/"
              className="mt-2 inline-block font-mono text-[12px] tracking-[0.04em] transition-colors hover:text-[#2EE6C9]"
              style={{ color: "#8FA3B5" }}
            >
              vantagerockfinancial.com
            </a>
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
