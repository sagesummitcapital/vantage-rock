import type { Metadata } from "next";
import Image from "next/image";
import {
  SITE_URL,
  SITE_NAME,
  FOUNDER_NAME,
  CONTACT_EMAIL,
  LOCATION,
} from "@/lib/site";

const PATH = "/pe-portfolio-finance";
const CANONICAL = `${SITE_URL}${PATH}`;
const TITLE = "PE portfolio finance — fractional CFO for sponsor-backed companies";
const DESCRIPTION =
  "PE portfolio finance for operator-led portcos: close cadence, cash visibility, board packs sponsors trust, and AI on repeating work. Scottsdale AZ. Introduction Call — fit-check only.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "PE portfolio finance",
    "private equity portfolio CFO",
    "PE portfolio company CFO",
    "fractional CFO private equity",
    "sponsor-backed finance",
    "board reporting private equity",
    "portfolio company FP&A",
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
    q: "Who is PE portfolio finance for?",
    a: "Operator-led portfolio companies where the founder or CEO is still running the business, and the sponsor needs numbers they can trust. Also useful when a PE ops or deal partner is shopping scoped finance support for a portco — without a full-time CFO seat or a PE sprint SKU. If books are not closed yet, that is a controller conversation first.",
  },
  {
    q: "How is this different from an LP / investor page?",
    a: "This page is for portco operations and sponsor-facing reporting cadence. Investor relations for LPs lives elsewhere and stays link-only. The work here is close, cash, forecast, board packs, and the systems underneath so the file does not depend on a hero weekend.",
  },
  {
    q: "What does a fractional CFO do in a portco?",
    a: "Owns the judgment layer the operating partner will probe: cash timing, forecasts that survive diligence questions, flux that explains the why, margin and pricing calls, and a close calendar with named owners. Bookkeeping and tax stay with existing providers. Scoped leadership — not a full-time hire you do not need yet.",
  },
  {
    q: "Where does AI fit for PE finance teams?",
    a: "AI drafts close work, cash follow-up, expense trends, and the first flux narrative under review. A person still signs what leaves. How PE finance teams actually use tools like Claude — with methodology and context, not a blank chat — is covered in our Insights. See also CFO AI agents.",
  },
  {
    q: "How does an engagement start?",
    a: "The Introduction Call is a fit-check with the operator (and sponsor if they join). We do not diagnose on the call. If it is a fit, a diagnostic and scope come next. Fees are quoted from scope. No list prices. No PE sprint package.",
  },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${CANONICAL}#service`,
    name: "PE Portfolio Finance",
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
      "PE portfolio finance",
      "Private equity portfolio CFO",
      "Fractional CFO",
      "Board and investor reporting",
      "FP&A",
      "AI-Enabled Finance",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "PE Portfolio Finance",
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

export default function PePortfolioFinancePage() {
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
              PE portfolio finance for operator-led companies that need sponsor-ready numbers
            </h1>
            <p className="mt-5 font-display text-[22px] italic leading-[1.35] tracking-[-0.02em] text-ink-muted md:text-[24px]">
              Close, cash, and board packs the operating partner can trust. AI on
              the repeating work. A human on the decisions. No PE sprint SKU.
            </p>

            <div className="mt-12 space-y-6 text-[17px] leading-[1.7] text-ink">
              <p>
                Private equity portfolio companies that still run founder- or
                CEO-led often hit the same wall: the file that got through
                diligence does not hold under operating pressure. Month-end
                slips. Cash timing surprises mid-week. The board pack is rebuilt
                from memory the night before. The sponsor asks for the why and
                gets a dump of last month. That is a finance leadership gap —
                not a software gap.
              </p>
              <p>
                Vantage Rock Financial is a{" "}
                <a href="/fractional-cfo" className={linkClass}>
                  fractional CFO
                </a>{" "}
                firm for founder-led and sponsor-backed companies from roughly
                $1M in revenue. For portcos, the engagement stays operator-led:
                close cadence, cash visibility,{" "}
                <a href="/fpa" className={linkClass}>
                  FP&amp;A
                </a>{" "}
                and scenarios, margin and pricing calls, and board packs built
                for the operating partner — not for filing. Typically the
                bookkeeper or controller stays. We do not replace your CPA, and
                we do not do tax, audit, or bookkeeping.
              </p>
              <p>
                AI is how the repeating work gets delivered — close drafts,
                receivables follow-up, expense trends, flux narrative, daily
                brief — under review. A person still signs what leaves. That is{" "}
                <a href="/ai-enabled-finance" className={linkClass}>
                  AI-enabled finance
                </a>
                , delivered through{" "}
                <a href="/cfo-ai-agents" className={linkClass}>
                  CFO AI agents
                </a>
                . How PE finance teams actually use tools like Claude — with
                business context and methodology, not a blank chat — is covered
                in{" "}
                <a
                  href="/insights/how-private-equity-finance-teams-use-claude"
                  className={linkClass}
                >
                  how private equity finance teams use Claude
                </a>
                .
              </p>
              <p>
                Sponsors and operators usually call when one of a few triggers
                shows up. The close is always late and the CEO is still the
                spreadsheet. Cash no longer matches the P&amp;L story. The board
                wants a pack that explains variance, not just the result. A
                full-time CFO hire is on the table but the function is not ready
                for that seat. Those are the same patterns as{" "}
                <a
                  href="/insights/top-5-reasons-fractional-cfo"
                  className={linkClass}
                >
                  why operators look for a fractional CFO
                </a>{" "}
                and{" "}
                <a
                  href="/insights/why-month-end-close-is-late"
                  className={linkClass}
                >
                  why month-end close runs late
                </a>
                .
              </p>
              <p>
                This page is for portco ops voice — not an LP fundraising pitch.
                There is no PE sprint package and no invented diligence theater.
                The bar is numbers someone will put their name on, on a cadence
                the sponsor can calendar.
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
                <li>Close calendar with named owners — not a hero weekend</li>
                <li>Rolling cash and forecast views the operator owns weekly</li>
                <li>Board packs with flux and the why the OP can probe</li>
                <li>Margin, pricing, and capacity calls grounded in the file</li>
                <li>AI on repeating work; human sign-off on what leaves</li>
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
                <a href="/fpa" className={linkClass}>
                  FP&amp;A
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
