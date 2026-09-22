import type { Metadata } from "next";
import Image from "next/image";
import {
  SITE_URL,
  SITE_NAME,
  FOUNDER_NAME,
  CONTACT_EMAIL,
  LOCATION,
} from "@/lib/site";

const PATH = "/fractional-cfo";
const CANONICAL = `${SITE_URL}${PATH}`;
const TITLE = "Fractional CFO for founder-led and PE-backed companies";
const DESCRIPTION =
  "Fractional CFO services for founder-led and sponsor-backed companies from $1M in revenue. Close, cash, board reporting, and AI on the repeating work. Scottsdale AZ. Introduction Call — fit-check only.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "fractional CFO",
    "fractional CFO services",
    "outsourced CFO",
    "part-time CFO",
    "AI-enabled finance",
    "FP&A",
    "founder-led business finance",
    "private equity portfolio CFO",
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
    q: "What does a fractional CFO actually do?",
    a: "A fractional CFO owns the judgment layer: cash timing, forecasts you can run the business on, board and lender packs, pricing and margin calls, and the design of the finance system. Bookkeeping and tax stay with your existing providers. The work is scoped to the shop, not a full-time seat you do not need yet.",
  },
  {
    q: "Who is this for?",
    a: "Founder-led and sponsor-backed companies from roughly $1M in revenue — strongest in healthcare, retail, professional services, technology and SaaS, and multi-entity groups. PE-backed fits when the operator is still running the company. If you do not have books yet, that is a bookkeeping engagement first.",
  },
  {
    q: "How is this different from a bookkeeper or controller?",
    a: "A bookkeeper records what happened. A controller closes the books correctly. A fractional CFO uses that information to decide what happens next. If close is unreliable, fix the controller layer first — judgment on dirty books is expensive noise. More on that in bookkeeper vs controller vs CFO.",
  },
  {
    q: "Where does AI fit?",
    a: "AI runs the repeating mechanical work — close drafts, cash follow-up, expense trends, flux narrative, daily brief — under review. A person still signs what leaves. See CFO AI agents and what AI-enabled finance actually means.",
  },
  {
    q: "How does an engagement start?",
    a: "The Introduction Call is a fit-check. We do not diagnose on the call. If it is a fit, a diagnostic and scope come next. Fees are quoted from scope. No list prices.",
  },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${CANONICAL}#service`,
    name: "Fractional CFO Services",
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
      "Fractional CFO",
      "Outsourced CFO",
      "FP&A",
      "AI-Enabled Finance",
      "Board and investor reporting",
      "Cash flow forecasting",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Fractional CFO",
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

export default function FractionalCfoPage() {
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
              Fractional CFO for companies that need judgment, not another title
            </h1>
            <p className="mt-5 font-display text-[22px] italic leading-[1.35] tracking-[-0.02em] text-ink-muted md:text-[24px]">
              Close, cash, and reporting that leadership can run on. AI on the
              repeating work. A human on the decisions.
            </p>

            <div className="mt-12 space-y-6 text-[17px] leading-[1.7] text-ink">
              <p>
                Most shops that say they need a CFO are really naming a gap:
                cash that surprises mid-week, a close that lands late, a board
                pack rebuilt from memory, or ops that outgrew the books. Hiring
                a full-time seat is slow and expensive when the function still
                needs design. A fractional CFO is the scoped answer — senior
                finance leadership without a full-time hire.
              </p>
              <p>
                Vantage Rock Financial is a fractional CFO firm for founder-led
                and sponsor-backed companies from roughly $1M in revenue. The
                work covers close cadence, cash visibility, forecasts and
                scenarios, margin and pricing, board and investor reporting, and
                the systems underneath so the file stops depending on a hero.
                Typically the bookkeeper or controller stays. We do not replace
                your CPA, and we do not do tax, audit, or bookkeeping.
              </p>
              <p>
                AI is how the repeating work gets delivered — not a chatbot on
                last month&apos;s spreadsheet. Agents draft close work, track
                receivables, surface expense trends, write the first flux
                narrative, and assemble the daily brief. A person still reviews
                what posts and signs what leaves. That is{" "}
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
                Operators usually call when one of a few triggers shows up. Cash
                timing no longer matches the P&L story. Month-end is always late
                and the founder is still the spreadsheet. The board or PE
                partner wants a pack that explains the why, not just the result.
                A hire is on the table but the function is not ready for a
                full-time seat. Those are the same patterns we write about in{" "}
                <a
                  href="/insights/top-5-reasons-fractional-cfo"
                  className={linkClass}
                >
                  top reasons operators look for a fractional CFO
                </a>{" "}
                and in{" "}
                <a
                  href="/insights/bookkeeper-vs-controller-vs-cfo"
                  className={linkClass}
                >
                  bookkeeper vs controller vs CFO
                </a>
                .
              </p>
              <p>
                For sponsor-backed shops, the bar is the same: numbers the
                operating partner can trust, a close that holds, and AI used
                where finance teams already work — not as a demo. How PE finance
                teams actually use tools like Claude is covered in{" "}
                <a
                  href="/insights/how-private-equity-finance-teams-use-claude"
                  className={linkClass}
                >
                  how private equity finance teams use Claude
                </a>
                . The engagement stays operator-led; there is no PE sprint SKU.
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
                <li>Rolling cash and forecast views someone owns every week</li>
                <li>Close calendar with named owners — not a hero weekend</li>
                <li>Board- and lender-ready packs with the why attached</li>
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
                <a href="/ai-enabled-finance" className={linkClass}>
                  AI-enabled finance
                </a>{" "}
                and{" "}
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
              Stavros Christas
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
