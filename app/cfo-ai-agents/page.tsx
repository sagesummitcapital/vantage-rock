import type { Metadata } from "next";
import Image from "next/image";
import {
  SITE_URL,
  SITE_NAME,
  FOUNDER_NAME,
  CONTACT_EMAIL,
} from "@/lib/site";

const PATH = "/cfo-ai-agents";
const CANONICAL = `${SITE_URL}${PATH}`;
const TITLE = "CFO AI agents: close, cash, expense, flux, daily brief";
const DESCRIPTION =
  "Five CFO AI agents. Month-End Close Agent, Cashflow Agent, Expense Agent, Flux Analysis Agent, Daily Brief Agent. Human on the decisions. Agents on the rest. Not a chatbot on last month's file.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "CFO AI agents",
    "Month-End Close Agent",
    "Cashflow Agent",
    "Expense Agent",
    "Flux Analysis Agent",
    "Daily Brief Agent",
    "AI-enabled finance",
    "fractional CFO",
    "AI-native financial leadership",
  ],
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

const agents = [
  {
    id: "month-end-close-agent",
    name: "Month-End Close Agent",
    q: "What's holding up the close, and how much can we run without my team touching it?",
    does: "The agent works accruals, reconciliations, and journal entries. It surfaces what is open, what is blocking, and what can finish without someone clicking the workflow. Controllers keep the judgment layer, not the button-clicking.",
    area: "close and accuracy, process and controls",
  },
  {
    id: "cashflow-agent",
    name: "Cashflow Agent",
    q: "Who owes us, where, which ones are about to slip, and what have we done about it?",
    does: "The agent maps AR by client and by invoice, flags invoices at risk, and tracks follow-up. Every number is tied to a datapoint you can trace. Not a summary someone assembled the morning someone asked.",
    area: "cash and treasury",
  },
  {
    id: "expense-agent",
    name: "Expense Agent",
    q: "Which costs are trending up, and which ones do I need to pay attention to?",
    does: "The agent runs month-over-month across cost lines and pairs the movement with why the line moved. You see the trend and you see the reason.",
    area: "profitability",
  },
  {
    id: "flux-analysis-agent",
    name: "Flux Analysis Agent",
    q: "What changed in the P&L vs. last period, why, and is it a problem I need to address?",
    does: "The agent delivers variance with the why attached, not a column of deltas. Corrections make next month's explanation better.",
    area: "KPIs and reporting",
  },
  {
    id: "daily-brief-agent",
    name: "Daily Brief Agent",
    q: "What's actually on my plate today, and am I walking into every meeting prepared?",
    does: "The agent pulls CRM, email, calendar, call transcripts, Slack, and project trackers into today's priorities and a brief for each meeting on the calendar.",
    area: "KPIs and reporting",
  },
];

const faqs = [
  {
    q: "What is a Month-End Close Agent?",
    a: "A Month-End Close Agent answers what is holding up close and how much can run without the team touching it. It works accruals, reconciliations, and journal entries so controllers are not stuck on button-clicking.",
  },
  {
    q: "What is a Cashflow Agent for a CFO?",
    a: "A Cashflow Agent answers who owes you, which invoices are about to slip, and what follow-up has already happened. AR is mapped by client and invoice. Every number traces to a datapoint.",
  },
  {
    q: "What is a Flux Analysis Agent?",
    a: "A Flux Analysis Agent explains what changed in the P&L versus last period, why it changed, and whether it is a problem. It learns from corrections instead of rebuilding the narrative every month.",
  },
  {
    q: "What is a Daily Brief Agent?",
    a: "A Daily Brief Agent answers what is actually on the plate today and whether you are walking into every meeting prepared. It synthesizes CRM, email, calendar, transcripts, Slack, and trackers into priorities and meeting briefs.",
  },
  {
    q: "How is this different from a chatbot on Excel?",
    a: "A chatbot on last month's file still needs a spreadsheet somebody trusts. These agents run the repeating finance work. The human is on the decisions. Close, cash, expense, flux, and the day.",
  },
  {
    q: "Do these replace a controller?",
    a: "No. The Month-End Close Agent takes the clicking off the controller. Judgment stays with the fractional CFO. The CPA and bookkeeper stay in their lanes.",
  },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: TITLE,
    description: DESCRIPTION,
    url: CANONICAL,
    datePublished: "2026-08-31",
    dateModified: "2026-08-31",
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
    author: {
      "@type": "Person",
      name: FOUNDER_NAME,
      url: SITE_URL,
      email: CONTACT_EMAIL,
    },
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "CFO AI agents",
    itemListElement: agents.map((a, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: a.name,
      url: `${CANONICAL}#${a.id}`,
      description: `${a.q} ${a.does}`,
    })),
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

export default function CfoAiAgentsPage() {
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
              Request the Review
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
              AI-enabled finance
            </p>
            <h1 className="mt-3 font-display text-display-xl text-ink">
              Fractional CFO. Five agents on the work.
            </h1>
            <p className="mt-5 font-display text-[22px] italic leading-[1.35] tracking-[-0.02em] text-ink-muted md:text-[24px]">
              Close, cash, expenses, flux, the daily brief. Not five products.
            </p>

            <div className="mt-12 space-y-6 text-[17px] leading-[1.7] text-ink">
              <p>
                AI-enabled finance is a finance function that can actually lead.
                These five agents run the repeating finance work: close, cash,
                expense, flux, and the day. They are not five SKUs with list
                prices.
              </p>
              <p>
                AI-native financial leadership means the operator stays on
                judgment. The agents run the repeating questions a CFO already
                has to answer.
              </p>
            </div>

            <nav aria-label="The five agents" className="mt-10">
              <ul className="space-y-2 font-mono text-[13px] text-teal">
                {agents.map((a) => (
                  <li key={a.id}>
                    <a
                      href={`#${a.id}`}
                      className="underline decoration-teal/30 underline-offset-2 hover:text-teal-deep"
                    >
                      {a.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {agents.map((a) => (
              <section key={a.id} id={a.id} className="mt-14 scroll-mt-24">
                <h2 className="font-display text-[28px] tracking-[-0.02em] text-ink">
                  {a.name}
                </h2>
                <p className="mt-3 font-display text-[18px] italic leading-[1.4] text-ink-muted">
                  {a.q}
                </p>
                <p className="mt-4 text-[17px] leading-[1.7] text-ink">{a.does}</p>
                <p className="mt-3 font-mono text-[12px] tracking-[0.04em] text-ink-muted">
                  SCORECARD: {a.area}
                </p>
              </section>
            ))}

            <section className="mt-16">
              <h2 className="font-display text-[28px] tracking-[-0.02em] text-ink">
                How this starts
              </h2>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                The 30-minute Finance Systems Review is the door. It is a
                fit-check. We don&apos;t diagnose on the call. Diagnostic and the
                work only after fit, quoted from scope. No list prices. Read{" "}
                <a
                  href="/ai-enabled-finance"
                  className="text-teal underline decoration-teal/30 underline-offset-2 hover:text-teal-deep"
                >
                  what AI-enabled finance actually means
                </a>
                .
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                Sample SCORECARD on request. Email{" "}
                <a
                  href="mailto:info@vantagerockfinancial.com?subject=SCORECARD"
                  className="text-teal underline decoration-teal/30 underline-offset-2 hover:text-teal-deep"
                >
                  info@vantagerockfinancial.com
                </a>{" "}
                with SCORECARD. It&apos;s a sample, not your score, not a form.
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

            <p className="mt-12 font-display text-[22px] leading-[1.35] tracking-[-0.02em] text-ink">
              Five jobs. One fractional CFO. Not five products.
            </p>
            <div className="mt-8">
              <a
                href="/#book"
                className="inline-flex items-center gap-2 rounded-md bg-navy px-[20px] py-[12px] text-[13px] font-medium text-ink-invert transition-colors hover:bg-teal hover:text-white"
              >
                Request the Review
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
