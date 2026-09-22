import type { ReactNode } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import {
  SITE_URL,
  SITE_NAME,
  CONTACT_EMAIL,
  FOUNDER_NAME,
  FOUNDER_TITLE,
  FOUNDER_LINKEDIN,
  COMPANY_LINKEDIN,
  X_URL,
  YOUTUBE_URL,
  CTA_LABEL,
  LOCATION,
} from "@/lib/site";

const PATH = "/about";
const CANONICAL = `${SITE_URL}${PATH}`;
const TITLE = "About";
const DESCRIPTION =
  "Vantage Rock Financial is an AI-enabled fractional CFO firm for founder-led and PE-backed companies — senior finance leadership, FP&A, and practical AI in finance.";
const MAILTO = `mailto:${CONTACT_EMAIL}`;

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

const services = [
  {
    title: "Fractional CFO",
    body: "Senior finance leadership without a full-time hire. Close, cash, reporting, scenarios, and board packs — a person still owns the number that leaves.",
  },
  {
    title: "FP&A",
    body: "Forecasts and models leadership can run decisions from — pricing, margin, hiring, and cash scenarios tied to how the business actually runs.",
  },
  {
    title: "AI-enabled finance / AI implementation",
    body: "Practical AI inside finance ops: workflows and agents for close, cash, expense, commission, and recurring reports. A human reviews and signs what leaves.",
  },
];

const differentiators = [
  {
    title: "Finance first, AI second",
    body: "We lead as fractional CFO and FP&A. AI compresses the work; it does not replace accountability — unlike AI tools or automation shops that never own the close.",
  },
  {
    title: "Operator in the room",
    body: "You talk to the founder. Agents handle mechanical lift; Stavros reviews and delivers the answer.",
  },
  {
    title: "Founder-led and PE portco",
    body: "Same services muscle across founder-led teams and sponsor-backed companies when fit — including hold-period speed, first 100 days, and board packs that travel.",
  },
  {
    title: "Scoped engagements, not a product SKU",
    body: "Depth matches the company. Fees after a fit conversation — no published menu prices.",
  },
  {
    title: "Human owns the number",
    body: "A person still signs what leaves. That is the control story for boards and sponsors.",
  },
];

const whoUses = [
  "Founder-led businesses roughly $1M+ revenue that need a finance seat without a full-time hire",
  "PE portfolio company CEOs and CFOs — post-close, finance build, board reporting pressure",
  "Multi-entity and mid-market operators in healthcare, retail, professional services, technology / SaaS",
  "PE ops / value-creation partners looking for a finance + AI wedge alongside their operating system",
];

const howItWorks = [
  {
    title: "Intro / fit-check",
    body: "Short call with the founder. Fit only — we do not diagnose on that call.",
  },
  {
    title: "Scope",
    body: "Engagement depth matched to the company — from lighter essentials through full fractional CFO.",
  },
  {
    title: "Delivery",
    body: "Direct with Stavros; AI workflows under finance ownership; cadence set in the engagement.",
  },
  {
    title: "Ongoing",
    body: "Close, cash, FP&A, and board-ready packs on the rhythm the business needs.",
  },
];

const keyFacts: { term: string; value: string }[] = [
  { term: "Company Name", value: SITE_NAME },
  { term: "Type", value: "Fractional CFO / AI-enabled finance services firm" },
  { term: "Founded", value: "2026" },
  { term: "Founder", value: FOUNDER_NAME },
  {
    term: "Headquarters",
    value: `${LOCATION.city}, ${LOCATION.region}, ${LOCATION.country}`,
  },
  { term: "Website", value: SITE_URL },
  {
    term: "Core Offering",
    value:
      "AI-enabled finance · fractional CFO · FP&A · AI implementation in finance",
  },
  { term: "Pricing", value: "Scoped after intro — no published list prices" },
  {
    term: "Contract Terms",
    value: "Engagement-scoped (not a fixed public product term sheet)",
  },
  {
    term: "Services",
    value: "Fractional CFO, FP&A, AI-enabled finance / AI implementation",
  },
  { term: "Communication", value: "Direct with founder · email · intro call" },
  {
    term: "Customers Served",
    value: "Founder-led and PE-backed companies (~$1M+ revenue)",
  },
  {
    term: "Competitors (category)",
    value:
      "Traditional fractional CFO firms; bookkeeping / controller marketplaces; pure AI tools without a finance owner",
  },
  {
    term: "Social",
    value: "LinkedIn company · LinkedIn Stavros · X @VantageRock · YouTube",
  },
];

const faqs = [
  {
    q: "What is Vantage Rock Financial?",
    a: "An AI-enabled fractional CFO firm for founder-led and PE-backed companies. Senior finance leadership, FP&A, and practical AI in finance — without the full-time hire.",
  },
  {
    q: "Who do you work with?",
    a: "Founder-led businesses from about $1M in revenue, and PE portfolio companies when fit — including post-close and board-reporting pressure.",
  },
  {
    q: "How is this different from hiring a bookkeeper or buying an AI tool?",
    a: "Bookkeepers own the books. AI tools automate tasks. We own the finance seat: judgment, cash, board packs, and a human who signs what leaves — with AI compressing the mechanical work.",
  },
  {
    q: "How do we start?",
    a: "Book an introduction call on the main site, or email info@vantagerockfinancial.com. Fit-check first; scoped engagement after.",
  },
  {
    q: "Do you publish prices?",
    a: "No. Fees are scoped after we talk — different companies need different depth.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: `${TITLE} | ${SITE_NAME}`,
  description: DESCRIPTION,
  url: CANONICAL,
  isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
  about: {
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    email: CONTACT_EMAIL,
    founder: { "@type": "Person", name: FOUNDER_NAME, url: FOUNDER_LINKEDIN },
    address: {
      "@type": "PostalAddress",
      addressLocality: LOCATION.city,
      addressRegion: LOCATION.region,
      addressCountry: LOCATION.country,
    },
    sameAs: [FOUNDER_LINKEDIN, COMPANY_LINKEDIN, X_URL, YOUTUBE_URL],
  },
  publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
};

function MailCta({
  href = MAILTO,
  label = `Email ${CONTACT_EMAIL}`,
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

function ExtLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-teal underline decoration-teal/30 underline-offset-2 transition-colors hover:text-teal-deep"
    >
      {children}
    </a>
  );
}

export default function AboutPage() {
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
            <div className="flex items-center gap-3">
              <a
                href="/#book"
                className="hidden text-[13px] font-medium text-ink-muted transition-colors hover:text-teal sm:inline"
              >
                {CTA_LABEL}
              </a>
              <MailCta />
            </div>
          </div>
        </header>

        <article className="relative overflow-hidden border-b border-line">
          <div className="aurora-glow" aria-hidden />
          <div className="grid-bg pointer-events-none absolute inset-0" aria-hidden />

          <div className="relative mx-auto max-w-[720px] px-6 py-16 md:px-10 md:py-24">
            <section aria-labelledby="about-hero">
              <p className="font-mono text-[12px] uppercase tracking-[0.08em] text-ink-muted">
                About us
              </p>
              <h1
                id="about-hero"
                className="mt-3 font-display text-display-xl text-ink"
              >
                Vantage Rock Financial is an AI-enabled fractional CFO firm that
                delivers senior finance leadership, FP&amp;A, and practical AI
                in finance for founder-led and PE-backed companies from about
                $1M in revenue.
              </h1>
              <p className="mt-6 text-[17px] leading-[1.7] text-ink-muted">
                Faster closes, real cash visibility, and numbers you can run the
                business on — with a human still owning what leaves.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="/#book"
                  className="inline-flex items-center gap-2 rounded-md bg-navy px-[20px] py-[12px] text-[13px] font-medium text-ink-invert transition-colors hover:bg-teal hover:text-white"
                >
                  {CTA_LABEL}
                </a>
                <MailCta />
              </div>
            </section>

            <section className="mt-16" id="what-we-do" aria-labelledby="what-we-do-h">
              <h2
                id="what-we-do-h"
                className="font-display text-[28px] tracking-[-0.02em] text-ink"
              >
                What Vantage Rock does
              </h2>
              <div className="mt-8 space-y-8">
                {services.map((s) => (
                  <div key={s.title}>
                    <h3 className="font-display text-[22px] tracking-[-0.02em] text-ink">
                      {s.title}
                    </h3>
                    <p className="mt-3 text-[17px] leading-[1.7] text-ink">
                      {s.body}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section
              className="mt-16"
              id="different"
              aria-labelledby="different-h"
            >
              <h2
                id="different-h"
                className="font-display text-[28px] tracking-[-0.02em] text-ink"
              >
                What makes Vantage Rock different
              </h2>
              <div className="mt-8 space-y-8">
                {differentiators.map((d) => (
                  <div key={d.title}>
                    <h3 className="font-display text-[22px] tracking-[-0.02em] text-ink">
                      {d.title}
                    </h3>
                    <p className="mt-3 text-[17px] leading-[1.7] text-ink">
                      {d.body}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-16" id="who-uses" aria-labelledby="who-uses-h">
              <h2
                id="who-uses-h"
                className="font-display text-[28px] tracking-[-0.02em] text-ink"
              >
                Who uses Vantage Rock
              </h2>
              <ul className="mt-6 space-y-3 border-l-2 border-teal/40 pl-5 text-[17px] leading-[1.6] text-ink">
                {whoUses.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </section>

            <section className="mt-16" id="team" aria-labelledby="team-h">
              <h2
                id="team-h"
                className="font-display text-[28px] tracking-[-0.02em] text-ink"
              >
                The team behind Vantage Rock
              </h2>
              <div className="mt-8 flex flex-col gap-8 sm:flex-row sm:items-start">
                <div className="relative mx-auto w-full max-w-[220px] shrink-0 sm:mx-0">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-line bg-bg-raised">
                    <Image
                      src="/founder.jpg"
                      alt={`${FOUNDER_NAME}, ${FOUNDER_TITLE} at ${SITE_NAME}`}
                      fill
                      className="object-cover"
                      sizes="220px"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="font-display text-[22px] tracking-[-0.02em] text-ink">
                    {FOUNDER_NAME}
                  </h3>
                  <p className="mt-1 font-mono text-[12px] uppercase tracking-[0.08em] text-ink-muted">
                    {FOUNDER_TITLE}
                  </p>
                  <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                    Stavros Christias has spent over a decade in finance and
                    operations across retail, healthcare, SaaS, startups, and
                    PE-backed businesses — FP&amp;A, controllership, close,
                    cash, and reporting. That includes a month-end close that
                    moved from fifteen days to three.
                  </p>
                  <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                    Vantage Rock is that work with AI on it. Agents handle the
                    mechanical lift. Stavros reviews and delivers the answer.
                    When you reach out, you talk to him.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[14px]">
                    <ExtLink href={FOUNDER_LINKEDIN}>LinkedIn — Stavros</ExtLink>
                    <ExtLink href={COMPANY_LINKEDIN}>
                      LinkedIn — Vantage Rock
                    </ExtLink>
                    <ExtLink href={X_URL}>@VantageRock</ExtLink>
                    <a
                      href={MAILTO}
                      className="text-teal underline decoration-teal/30 underline-offset-2 transition-colors hover:text-teal-deep"
                    >
                      {CONTACT_EMAIL}
                    </a>
                  </div>
                </div>
              </div>
            </section>

            <section className="mt-16" id="how" aria-labelledby="how-h">
              <h2
                id="how-h"
                className="font-display text-[28px] tracking-[-0.02em] text-ink"
              >
                How Vantage Rock works
              </h2>
              <ol className="mt-8 space-y-6">
                {howItWorks.map((step, i) => (
                  <li key={step.title} className="border-l-2 border-teal/40 pl-5">
                    <p className="font-mono text-[12px] tracking-[0.08em] text-ink-muted">
                      {String(i + 1).padStart(2, "0")} — {step.title}
                    </p>
                    <p className="mt-2 text-[17px] leading-[1.7] text-ink">
                      {step.body}
                    </p>
                  </li>
                ))}
              </ol>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="/#book"
                  className="inline-flex items-center gap-2 rounded-md bg-navy px-[20px] py-[12px] text-[13px] font-medium text-ink-invert transition-colors hover:bg-teal hover:text-white"
                >
                  {CTA_LABEL}
                </a>
                <MailCta />
              </div>
            </section>

            <section className="mt-16" id="key-facts" aria-labelledby="key-facts-h">
              <h2
                id="key-facts-h"
                className="font-display text-[28px] tracking-[-0.02em] text-ink"
              >
                Key facts
              </h2>
              <dl className="mt-8 divide-y divide-line border border-line rounded-xl overflow-hidden">
                {keyFacts.map((row) => (
                  <div
                    key={row.term}
                    className="grid gap-1 bg-bg-raised px-5 py-4 sm:grid-cols-[200px_1fr] sm:gap-4"
                  >
                    <dt className="font-mono text-[12px] uppercase tracking-[0.06em] text-ink-muted">
                      {row.term}
                    </dt>
                    <dd className="text-[15px] leading-[1.55] text-ink">
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>

            <section className="mt-16" id="faq" aria-labelledby="faq-h">
              <h2
                id="faq-h"
                className="font-display text-[28px] tracking-[-0.02em] text-ink"
              >
                Frequently asked questions
              </h2>
              <div className="mt-8 space-y-8">
                {faqs.map((item) => (
                  <div key={item.q}>
                    <h3 className="font-display text-[20px] tracking-[-0.02em] text-ink">
                      {item.q}
                    </h3>
                    <p className="mt-3 text-[17px] leading-[1.7] text-ink">
                      {item.a}
                    </p>
                  </div>
                ))}
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
              {SITE_NAME} ·{" "}
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
                {CONTACT_EMAIL}
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
