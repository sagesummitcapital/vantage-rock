import type { Metadata } from "next";
import Image from "next/image";
import {
  SITE_URL,
  SITE_NAME,
  FOUNDER_NAME,
  CONTACT_EMAIL,
} from "@/lib/site";

const PATH = "/ai-enabled-finance";
const CANONICAL = `${SITE_URL}${PATH}`;
const TITLE = "What AI-enabled finance actually means";
const DESCRIPTION =
  "AI-enabled finance is a finance function that can lead, not a dashboard with a prompt box. Fractional CFO. 30-minute Review — fit-check. We don't diagnose on the call.";

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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: TITLE,
  description: DESCRIPTION,
  url: CANONICAL,
  mainEntityOfPage: CANONICAL,
  datePublished: "2026-08-30",
  dateModified: "2026-08-30",
  author: {
    "@type": "Person",
    name: FOUNDER_NAME,
    url: SITE_URL,
    email: CONTACT_EMAIL,
  },
  publisher: {
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
  },
};

export default function AiEnabledFinancePage() {
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
            <h1 className="font-display text-display-xl text-ink">
              What AI-enabled finance actually means
            </h1>
            <p className="mt-5 font-display text-[22px] italic leading-[1.35] tracking-[-0.02em] text-ink-muted md:text-[24px]">
              Not a chatbot on last month&apos;s file.
            </p>
            <p className="mt-6 text-[17px] leading-[1.7] text-ink">
              Five named agents sit in that seat.{" "}
              <a
                href="/cfo-ai-agents"
                className="text-teal underline decoration-teal/30 underline-offset-2 transition-colors hover:text-teal-deep"
              >
                Month-End Close Agent, Cashflow Agent, Expense Agent, Flux Analysis
                Agent, Daily Brief Agent
              </a>
              — what each one actually does.
            </p>

            <div className="mt-12 space-y-6 text-[17px] leading-[1.7] text-ink">
              <p>
                Most shops using that phrase are running a prompt box on a
                spreadsheet nobody trusts.
              </p>
              <p>
                AI-enabled finance is a finance function that can actually lead.
                Not a dashboard. Not automation bolted onto a close that still
                needs a hero. A system that holds, cash you can see, and a human
                on the decisions.
              </p>
              <p>
                If month-end still needs a hero, that&apos;s usually how you can
                tell the system is slow. That&apos;s a tell. It is not the
                product.
              </p>
              <p>Write down three things:</p>
              <ol className="space-y-3 border-l-2 border-teal/40 pl-5 text-[17px] leading-[1.6]">
                <li>Who owns cash this week.</li>
                <li>Who owns the numbers.</li>
                <li>What decision the reporting pack is actually for.</li>
              </ol>
              <p>
                If that doesn&apos;t fit on one page with real names, you
                don&apos;t have a finance system. You have a file. Automation on
                a file just makes the wrong answer faster.
              </p>
              <p>
                The sequence: a system that holds. Then cash you can see weeks
                out. Then automate, with a human on top. Not the other way
                around.
              </p>
              <p>
                Vantage Rock Financial is the fractional CFO seat built around
                that. AI-native financial leadership means humans on the
                decisions and systems on the rest.
              </p>
              <p>
                The 30-minute Finance Systems Review is a fit-check. We
                don&apos;t diagnose on the call. Want the sample seven-area
                scorecard? Email{" "}
                <a
                  href="mailto:info@vantagerockfinancial.com?subject=SCORECARD"
                  className="text-teal underline decoration-teal/30 underline-offset-2 transition-colors hover:text-teal-deep"
                >
                  info@vantagerockfinancial.com
                </a>{" "}
                with SCORECARD. It&apos;s a sample, not your score, not a form.
                Want the 30 minutes?{" "}
                <a
                  href="/#book"
                  className="text-teal underline decoration-teal/30 underline-offset-2 transition-colors hover:text-teal-deep"
                >
                  Request the Review
                </a>
                .
              </p>
            </div>

            <div className="mt-12">
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
