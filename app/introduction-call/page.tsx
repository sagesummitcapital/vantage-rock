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

const PATH = "/introduction-call";
const CANONICAL = `${SITE_URL}${PATH}`;
const TITLE =
  "Introduction Call — what a Vantage Rock finance fit call covers";
const DESCRIPTION =
  "What a Vantage Rock Introduction / Finance Systems fit call actually covers — agenda, what we ask, what we don't, and what happens after. Fit-check only, not a sales dump.";

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

const agenda = [
  {
    title: "Five minutes",
    body: "You orient us — what the business does, rough scale, and what prompted you to reach out now.",
  },
  {
    title: "Ten to fifteen minutes",
    body: "We ask a short set of operational questions (listed below) to understand your finance function as it exists today and what the next period demands of it.",
  },
  {
    title: "Five to ten minutes",
    body: "We share a candid read on fit — whether this looks like a match, where the gaps are, or whether a different kind of resource would serve you better.",
  },
];

const weAsk = [
  "Who owns finance decisions today — a part-time bookkeeper, an internal controller, a founder with a spreadsheet?",
  "What does your current close process look like, and how long does it take?",
  "What are the one or two financial decisions you are flying blind on right now?",
  "What does the next stretch require — a capital raise, a board reporting cadence, operational forecasting, sponsor pack, something else?",
  "Have you worked with a fractional CFO or FP&A resource before?",
];

const outcomes = [
  {
    title: "Fit confirmed → scope conversation.",
    body: "If the engagement looks right for both sides, we schedule a separate scoping conversation. That is where we go deeper on your finance infrastructure, define deliverables, and discuss fees. Fees are not quoted on the introduction call — scope has to come first.",
  },
  {
    title: "Not a fit → redirect.",
    body: "If what you need falls outside what we do — tax, audit, full-time on-site daily finance, bookkeeping replacement — we will say so directly and, where we can, point you toward a resource that makes more sense.",
  },
  {
    title: "Too early → what to fix first.",
    body: "Some businesses are at a stage where a fractional CFO or FP&A engagement is not the right use of capital yet. If that is what we see, we will tell you what the foundation needs to look like before a fractional model adds real value, and you can decide what to do with that.",
  },
];

const faqs = [
  {
    q: "How long is the call?",
    a: "Twenty to thirty minutes. We keep it short by design. There is not enough to cover to justify longer at this stage, and a bloated intro call usually signals that someone is trying to sell you something.",
  },
  {
    q: "Who should join from our side?",
    a: "Whoever owns financial decision-making — typically the founder, CEO, or COO. If you have a controller or head of finance, they are welcome, but the conversation will focus on business context and strategic need, not technical accounting detail. Sponsor ops partners are welcome on portco calls when that is useful.",
  },
  {
    q: "Do I need to prepare anything?",
    a: "No formal prep required. If you can arrive knowing roughly what your current finance function looks like and what the next stretch demands of it, that is enough.",
  },
  {
    q: "Are fees discussed on the call?",
    a: "No. Fees follow scope, and scope follows fit. We will not quote a number on an introduction call because it would be a fabricated number — the actual engagement design has not happened yet. If fit is confirmed, we schedule a scope conversation, and fees are discussed there. No published tiers.",
  },
  {
    q: "Is this remote?",
    a: "Yes. All introduction calls are conducted remotely — video or phone, your preference. We work with companies across the U.S. Our Scottsdale, AZ base does not define our geography.",
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
              What a Vantage Rock Introduction Call actually covers
            </h1>
            <p className="mt-6 text-[17px] leading-[1.7] text-ink-muted">
              A Vantage Rock Introduction Call is a fit-check: you describe
              where finance sits today and what the next stretch requires; we
              say whether our fractional CFO / FP&A / practical AI model fits —
              or point you elsewhere. Nobody diagnoses your business on the
              call, and nobody sells a package.
            </p>
            <p className="mt-6 text-[17px] leading-[1.7] text-ink">
              That is the whole point of the call. Mutual clarity before either
              side spends more time.
            </p>

            <section className="mt-16" aria-labelledby="fit-check">
              <h2
                id="fit-check"
                className="font-display text-[28px] tracking-[-0.02em] text-ink"
              >
                What &quot;fit-check&quot; means here
              </h2>
              <p className="mt-6 text-[17px] leading-[1.7] text-ink">
                Fit-check is not a euphemism for a sales conversation with a
                soft close at the end. It means both sides are evaluating
                whether the engagement makes sense before either party commits
                time, energy, or money to a scoping conversation.
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                From your side: you need to know whether a fractional finance
                model — delivered remotely, structured around real output rather
                than hourly presence — actually addresses what your business
                needs right now. From our side: we need to understand enough
                about your current finance infrastructure, your stage, and your
                near-term demands to know whether we can add real value or
                whether you would be better served elsewhere. Mutual clarity is
                the only useful outcome.
              </p>
            </section>

            <section className="mt-16" aria-labelledby="agenda">
              <h2
                id="agenda"
                className="font-display text-[28px] tracking-[-0.02em] text-ink"
              >
                Typical agenda — about 20–30 minutes
              </h2>
              <p className="mt-6 text-[17px] leading-[1.7] text-ink">
                The call runs 20 to 30 minutes. There is no deck. The structure
                is roughly:
              </p>
              <ul className="mt-4 space-y-5">
                {agenda.map((item) => (
                  <li key={item.title} className="text-[17px] leading-[1.7] text-ink">
                    <strong className="font-medium">{item.title}:</strong>{" "}
                    {item.body}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-[17px] leading-[1.7] text-ink">
                If fit is clear, we discuss what a scoping conversation would
                look like. If it is not, we say so and explain why.
              </p>
            </section>

            <section className="mt-16" aria-labelledby="what-we-ask">
              <h2
                id="what-we-ask"
                className="font-display text-[28px] tracking-[-0.02em] text-ink"
              >
                What we ask
              </h2>
              <p className="mt-6 text-[17px] leading-[1.7] text-ink">
                The questions are practical, not a free diagnostic. Expect
                something along these lines:
              </p>
              <ul className="mt-4 space-y-3 border-l-2 border-teal/40 pl-5 text-[17px] leading-[1.6] text-ink">
                {weAsk.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
              <p className="mt-6 text-[17px] leading-[1.7] text-ink">
                These are not intake forms. They are the minimum we need to give
                you an honest read on fit.
              </p>
            </section>

            <section className="mt-16" aria-labelledby="what-we-dont">
              <h2
                id="what-we-dont"
                className="font-display text-[28px] tracking-[-0.02em] text-ink"
              >
                What we do not do on the call
              </h2>
              <p className="mt-6 text-[17px] leading-[1.7] text-ink">
                We do not review your financials, build a forecast, or offer
                recommendations on your business. We do not quote fees. We do
                not close a retainer. We do not send you a proposal at the end
                of the call unless fit is confirmed and a scope conversation has
                been scheduled separately.
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                The introduction call is not free consulting. If you are looking
                for someone to solve a finance problem in 30 minutes, this call
                is not that, and we would rather tell you upfront.
              </p>
            </section>

            <section className="mt-16" aria-labelledby="finance-systems">
              <h2
                id="finance-systems"
                className="font-display text-[28px] tracking-[-0.02em] text-ink"
              >
                What &quot;Finance Systems&quot; means in this context
              </h2>
              <p className="mt-6 text-[17px] leading-[1.7] text-ink">
                When we refer to finance systems, we mean the combination of
                tools, processes, and human review that your business runs on —
                not a software product and not a demo. This includes your
                accounting layer, your forecasting and reporting workflow, how
                data moves between systems, and where manual effort is creating
                risk or delay.
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                Practical AI implementation, in our context, means applying
                automation and AI-assist where it reduces friction in financial
                workflows — under human oversight, integrated into the actual
                stack your team uses. It is not a platform pitch. If your
                current stack has gaps, we identify them during scoping, not on
                the introduction call.
              </p>
            </section>

            <section className="mt-16" aria-labelledby="outcomes">
              <h2
                id="outcomes"
                className="font-display text-[28px] tracking-[-0.02em] text-ink"
              >
                After the call — three honest outcomes
              </h2>
              <ul className="mt-6 space-y-5">
                {outcomes.map((item) => (
                  <li key={item.title} className="text-[17px] leading-[1.7] text-ink">
                    <strong className="font-medium">{item.title}</strong>{" "}
                    {item.body}
                  </li>
                ))}
              </ul>
            </section>

            <section className="mt-16" aria-labelledby="who-should">
              <h2
                id="who-should"
                className="font-display text-[28px] tracking-[-0.02em] text-ink"
              >
                Who should book — and who shouldn&apos;t
              </h2>
              <p className="mt-6 text-[17px] leading-[1.7] text-ink">
                <strong className="font-medium">
                  A good fit for this call:
                </strong>{" "}
                You are operating a real business with revenue, you have a
                finance function (however basic), and you are facing a specific
                operational or strategic finance challenge — forecasting,
                reporting, capital planning, finance team structure, sponsor
                cadence — that your current setup is not built to handle.
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                <strong className="font-medium">
                  Not a fit for this call:
                </strong>{" "}
                You are pre-revenue and looking for a founding CFO. You need
                someone on-site daily. You are looking for a bookkeeper or tax
                preparer. You want a SaaS tool with a list price. If any of
                those describe your situation, this call will not be productive
                for either of us.
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
                We work remotely and U.S.-wide, with roots in Scottsdale, AZ. We
                are not the right resource if you require full-time, on-site
                daily finance presence as a condition of the engagement. We do
                not replace tax preparers, auditors, or bookkeeping services. We
                do not serve pre-revenue companies that have not yet established
                a baseline finance function. We are not a software vendor. If
                the fit is not there, we will say so plainly — on the call, not
                after weeks of back and forth.
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