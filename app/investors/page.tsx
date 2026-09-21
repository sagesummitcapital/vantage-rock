import type { ReactNode } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { SITE_URL, SITE_NAME } from "@/lib/site";

const PATH = "/investors";
const CANONICAL = `${SITE_URL}${PATH}`;
const TITLE = "Investors";
const DESCRIPTION =
  "For PE groups and investors: AI-enabled finance for portfolio companies, with intent to acquire an AI implementation team in 2027.";
const INVESTORS_EMAIL = "investors@vantagerockfinancial.com";
const MAILTO = `mailto:${INVESTORS_EMAIL}`;
const MAILTO_INTRO = `mailto:${INVESTORS_EMAIL}?subject=${encodeURIComponent("AI implementation intro")}`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
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

const thesis = [
  {
    title: "PE intros",
    body: "Partner with private equity groups and investors who care about portco finance quality and AI leverage.",
  },
  {
    title: "Portfolio company work",
    body: "Deliver AI-enabled finance / fractional CFO / FP&A where the books, cash, and board pack actually live.",
  },
  {
    title: "2027 AI implementation acquisition",
    body: "Prepare to acquire an AI implementation team so delivery capacity matches demand.",
  },
  {
    title: "Combine",
    body: "Finance operator depth + implementation muscle → an AI-finance implementation firm that can sit next to a PE portfolio and ship.",
  },
];

const whyPartner = [
  "We lead with finance — fractional CFO and FP&A — not slide-deck automation.",
  "AI is how the work gets delivered: workflows and agents on close, cash, expense, commission, recurring reporting — with a human still owning the number.",
  "Delivery is already practiced across small businesses, founder-led teams, and PE-backed companies when fit.",
  "Soft partnership: we can work alongside value-creation / ops teams as the finance + AI wedge inside the portfolio.",
];

const capitalEnables = [
  {
    title: "Depth on portcos",
    body: "More capacity for PE-backed finance engagements alongside the existing practice, without diluting delivery quality.",
  },
  {
    title: "AI implementation readiness",
    body: "Relationships, diligence muscle, and operating readiness for a 2027 acquisition of an AI implementation team.",
  },
  {
    title: "Combined platform",
    body: "After that acquisition: one stack that can sell and deliver AI-finance implementation — finance leadership + implementation — into PE portfolios and complex operating companies.",
  },
];

const acquisitionFit = [
  "Implement AI in real operating environments (not demo-only)",
  "Share delivery discipline and client ownership, and can work inside finance-grade controls",
  "Fit PE / mid-market complexity — and the small-business / founder-led implementation work we already do",
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: `${TITLE} | ${SITE_NAME}`,
  description: DESCRIPTION,
  url: CANONICAL,
  isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
  about: {
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    email: INVESTORS_EMAIL,
  },
  publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
};

function MailCta({
  href = MAILTO,
  label = `Email ${INVESTORS_EMAIL}`,
}: {
  href?: string;
  label?: string;
}) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-2 rounded-md bg-navy px-[20px] py-[12px] text-[13px] font-medium text-ink-invert transition-colors hover:bg-teal hover:text-white"
    >
      {label}
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
        <path
          d="M3 9L9 3M9 3H4M9 3V8"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    </a>
  );
}

function MailLink({
  href = MAILTO,
  children = INVESTORS_EMAIL,
}: {
  href?: string;
  children?: ReactNode;
}) {
  return (
    <a
      href={href}
      className="text-teal underline decoration-teal/30 underline-offset-2 transition-colors hover:text-teal-deep"
    >
      {children}
    </a>
  );
}

export default function InvestorsPage() {
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
            <MailCta />
          </div>
        </header>

        <article className="relative overflow-hidden border-b border-line">
          <div className="aurora-glow" aria-hidden />
          <div className="grid-bg pointer-events-none absolute inset-0" aria-hidden />

          <div className="relative mx-auto max-w-[720px] px-6 py-16 md:px-10 md:py-24">
            {/* HERO */}
            <section aria-labelledby="investors-hero">
              <p className="font-mono text-[12px] uppercase tracking-[0.08em] text-ink-muted">
                For private equity groups &amp; investors
              </p>
              <h1
                id="investors-hero"
                className="mt-3 font-display text-display-xl text-ink"
              >
                AI-enabled finance for portfolio companies — and a path to an
                AI-finance implementation powerhouse.
              </h1>
              <p className="mt-6 text-[17px] leading-[1.7] text-ink">
                Vantage Rock Financial already does the operating work:
                fractional CFO, FP&amp;A, and practical AI inside finance — for
                small businesses, founder-led teams, and PE-backed companies
                when fit. We are seeking alignment with PE groups and investors
                who want that capability across portcos — and who see the logic
                of combining finance depth with AI implementation talent in
                2027.
              </p>
              <div className="mt-8">
                <MailCta />
              </div>
            </section>

            {/* THESIS */}
            <section className="mt-16 scroll-mt-24" id="thesis" aria-labelledby="thesis-heading">
              <h2
                id="thesis-heading"
                className="font-display text-[28px] tracking-[-0.02em] text-ink"
              >
                Our thesis
              </h2>
              <ol className="mt-8 space-y-6">
                {thesis.map((item, i) => (
                  <li key={item.title} className="border-l-2 border-teal/40 pl-5">
                    <p className="font-mono text-[12px] tracking-[0.08em] text-ink-muted">
                      {String(i + 1).padStart(2, "0")} — {item.title}
                    </p>
                    <p className="mt-2 text-[17px] leading-[1.7] text-ink">
                      {item.body}
                    </p>
                  </li>
                ))}
              </ol>
              <p className="mt-8 text-[17px] leading-[1.7] text-ink-muted">
                This is not a classic VC Fund I story. It is an operator
                overlay: capital that understands portfolio companies, paired
                with a services engine that already speaks finance — including
                an existing small-business implementation practice that funds
                and proves delivery.
              </p>
            </section>

            {/* WHY PE */}
            <section className="mt-16 scroll-mt-24" id="why-pe" aria-labelledby="why-pe-heading">
              <h2
                id="why-pe-heading"
                className="font-display text-[28px] tracking-[-0.02em] text-ink"
              >
                Why private equity
              </h2>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                Private equity already owns the problem VRF solves on portcos.
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                Portcos need trusted close and cash, forecasts leadership will
                use, board-ready reporting, and a path to put AI on repetitive
                finance work without buying vaporware. Sponsors feel that gap in
                diligence, in the first hundred days post-close, and every time
                growth outruns the finance team.
              </p>
              <p className="mt-6 text-[17px] leading-[1.7] text-ink">
                Why partner with VRF instead of another generic AI shop:
              </p>
              <ul className="mt-4 space-y-3 border-l-2 border-teal/40 pl-5 text-[17px] leading-[1.6] text-ink">
                {whyPartner.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
              <p className="mt-6 text-[17px] leading-[1.7] text-ink">
                Serious conversations happen off-page.{" "}
                <MailLink>Email {INVESTORS_EMAIL}</MailLink>
              </p>
            </section>

            {/* WHAT WE DO */}
            <section
              className="mt-16 scroll-mt-24"
              id="what-we-do"
              aria-labelledby="what-we-do-heading"
            >
              <h2
                id="what-we-do-heading"
                className="font-display text-[28px] tracking-[-0.02em] text-ink"
              >
                What VRF does today
              </h2>
              <p className="mt-3 font-display text-[18px] italic leading-[1.4] text-ink-muted">
                AI-enabled finance · AI-native financial leadership and
                fractional CFO services.
              </p>

              <div className="mt-10 space-y-8">
                <div>
                  <h3 className="font-display text-[22px] tracking-[-0.02em] text-ink">
                    Fractional CFO
                  </h3>
                  <p className="mt-3 text-[17px] leading-[1.7] text-ink">
                    Senior finance leadership without a full-time hire. Close,
                    cash, reporting. Scenarios and capital allocation. Board-
                    and investor-ready packs. Diligence and post-acquisition
                    finance integration support when scoped.
                  </p>
                </div>
                <div>
                  <h3 className="font-display text-[22px] tracking-[-0.02em] text-ink">
                    FP&amp;A
                  </h3>
                  <p className="mt-3 text-[17px] leading-[1.7] text-ink">
                    Forecasts and models leadership can run decisions from —
                    not a quarterly rebuild that dies in a folder. Pricing,
                    margin, hiring, and cash scenarios tied to how the business
                    actually runs.
                  </p>
                </div>
                <div>
                  <h3 className="font-display text-[22px] tracking-[-0.02em] text-ink">
                    AI-enabled finance / AI implementation (services)
                  </h3>
                  <p className="mt-3 text-[17px] leading-[1.7] text-ink">
                    Practical AI inside finance ops: workflows and agents for
                    revenue, close, expense, commission, and recurring reports.
                    A person still reviews and signs what leaves. Same services
                    muscle for small businesses and larger PE-backed seats.
                  </p>
                </div>
              </div>

              <p className="mt-8 text-[17px] leading-[1.7] text-ink-muted">
                Public door for companies stays on the{" "}
                <a
                  href="/"
                  className="text-teal underline decoration-teal/30 underline-offset-2 transition-colors hover:text-teal-deep"
                >
                  main site
                </a>{" "}
                (intro call → scoped engagement). This page is for investors and
                PE partners.
              </p>
            </section>

            {/* WHAT CAPITAL ENABLES */}
            <section
              className="mt-16 scroll-mt-24"
              id="capital"
              aria-labelledby="capital-heading"
            >
              <h2
                id="capital-heading"
                className="font-display text-[28px] tracking-[-0.02em] text-ink"
              >
                What capital enables
              </h2>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink-muted">
                Stated as intent — not a priced round. Operating client work
                continues either way.
              </p>
              <div className="mt-8 space-y-6">
                {capitalEnables.map((item) => (
                  <div key={item.title} className="border-l-2 border-teal/40 pl-5">
                    <h3 className="font-display text-[20px] tracking-[-0.02em] text-ink">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[17px] leading-[1.7] text-ink">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-6 font-mono text-[12px] tracking-[0.04em] text-ink-muted">
                No raise size, valuation, or ownership percentage on this page.
              </p>
            </section>

            {/* 2027 ACQUISITION */}
            <section
              className="mt-16 scroll-mt-24"
              id="acquisition-2027"
              aria-labelledby="acquisition-heading"
            >
              <h2
                id="acquisition-heading"
                className="font-display text-[28px] tracking-[-0.02em] text-ink"
              >
                2027 — AI implementation team acquisition
              </h2>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                We intend to acquire an AI implementation team in 2027, then
                combine that capability with Vantage Rock&apos;s existing
                finance operating work.
              </p>
              <p className="mt-6 text-[17px] leading-[1.7] text-ink">
                Intros welcome for teams that:
              </p>
              <ul className="mt-4 space-y-3 border-l-2 border-teal/40 pl-5 text-[17px] leading-[1.6] text-ink">
                {acquisitionFit.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
              <p className="mt-6 text-[17px] leading-[1.7] text-ink-muted">
                This is not an announcement of a signed deal, a named target, or
                a guarantee of timing. It is an open ask for capital partners
                and intros.
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                <MailLink href={MAILTO_INTRO}>{INVESTORS_EMAIL}</MailLink>
                {" — "}
                subject &ldquo;AI implementation intro&rdquo; is enough.
              </p>
            </section>

            {/* CONTACT */}
            <section
              className="mt-16 scroll-mt-24"
              id="contact"
              aria-labelledby="contact-heading"
            >
              <h2
                id="contact-heading"
                className="font-display text-[28px] tracking-[-0.02em] text-ink"
              >
                Contact
              </h2>
              <div className="mt-6 space-y-4 text-[17px] leading-[1.7] text-ink">
                <p>
                  If you are a PE partner, ops / value-creation lead, or
                  investor: email{" "}
                  <MailLink>{INVESTORS_EMAIL}</MailLink> with a short note on
                  portfolio focus and what you want in a finance + AI partner.
                </p>
                <p>
                  If you can intro an AI implementation team we should know
                  before 2027: same inbox.
                </p>
                <p className="text-ink-muted">
                  If you run a company and need fractional CFO / FP&amp;A /
                  AI-enabled finance now: use the{" "}
                  <a
                    href="/#book"
                    className="text-teal underline decoration-teal/30 underline-offset-2 transition-colors hover:text-teal-deep"
                  >
                    main site intro door
                  </a>{" "}
                  — this page stays investor-facing.
                </p>
              </div>
              <div className="mt-8">
                <MailCta />
              </div>
            </section>
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
              Vantage Rock Financial ·{" "}
              <a
                href="/"
                className="transition-colors hover:text-[#2EE6C9]"
                style={{ color: "#8FA3B5" }}
              >
                vantagerockfinancial.com
              </a>{" "}
              ·{" "}
              <a
                href={MAILTO}
                className="transition-colors hover:text-[#2EE6C9]"
                style={{ color: "#F0F4F8" }}
              >
                {INVESTORS_EMAIL}
              </a>
            </p>
            <p
              className="mt-3 font-mono text-[12px] tracking-[0.04em]"
              style={{ color: "#8FA3B5" }}
            >
              Services: Fractional CFO · FP&amp;A · AI-enabled finance · AI
              implementation
            </p>
            <p
              className="mt-4 max-w-[640px] font-mono text-[10px] leading-[1.5] tracking-[0.04em]"
              style={{ color: "#5A6B7B" }}
            >
              This page is informational and does not constitute an offer to
              sell or a solicitation to buy securities.
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
