import Link from "next/link";
import Reveal from "../Reveal";
import SectionHead from "../SectionHead";

const pillars = [
  {
    n: "01",
    name: "Fractional CFO Services",
    lead: "Senior finance leadership without a full-time hire.",
    body: "Close, cash, and reporting. Launching new products. Finding and capturing incremental revenue from the existing customer base. You talk to the founder. There is no account manager in between.",
    points: [
      "Board- and investor-ready reporting",
      "Rolling forecasts, cash plans, scenario models",
      "Profitability, margin, pricing and cost structure",
      "Due diligence and post-acquisition integration",
    ],
    href: null,
  },
  {
    n: "02",
    name: "AI-Enabled Finance",
    lead: "AI is how the work gets delivered, not a separate product.",
    body: "Close, cash, and reporting that keep up. Forecasts that update instead of getting rebuilt once a quarter. Analysis that does not take a week to prepare.",
    points: [
      "Close acceleration and reconciliation workflows",
      "Continuously updated forecasting and cash visibility",
      "KPI dashboards wired to the source, not rebuilt monthly",
      "Billing, commissions and reporting automation",
    ],
    href: "/ai-enabled-finance",
  },
  {
    n: "03",
    name: "AI-Native Financial Leadership",
    lead: "A CFO that uses AI on the work.",
    body: "We come in as the fractional CFO, then identify where AI should go so the company can report and scale. A person still signs what leaves.",
    points: [
      "Agent-supervised workflows with review gates",
      "Every figure traceable to a source record",
      "Finance systems modernization and migration",
      "Decision support leadership can act on",
    ],
    href: "/cfo-ai-agents",
  },
];

export default function Pillars() {
  return (
    <section id="services" className="border-b border-line">
      <div className="mx-auto max-w-[1280px] px-6 py-24 md:px-10 md:py-28">
        <SectionHead
          number="02"
          label="What we do"
          heading="The fractional CFO,"
          dim="with AI on the work."
        />

        <Reveal>
          <p className="-mt-6 mb-14 max-w-[620px] text-[16.5px] leading-[1.65] text-ink-muted">
            We come in as the fractional CFO. The work includes close, cash, and
            reporting, launching new products, and finding incremental revenue in the
            existing customer base. AI is how that work gets delivered. Typically the
            bookkeeper or controller stays.
          </p>
        </Reveal>

        <div className="grid gap-px overflow-hidden rounded-xl border border-line bg-line lg:grid-cols-3">
          {pillars.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.08}>
              <div className="flex h-full flex-col bg-bg-raised p-8 md:p-9">
                <div className="mono-label !text-teal">{p.n}</div>

                <h3 className="mt-5 font-display text-[25px] leading-[1.2] tracking-tighter2 text-ink">
                  {p.name}
                </h3>

                <p className="mt-4 text-[15.5px] font-medium leading-[1.5] text-ink">
                  {p.lead}
                </p>

                <p className="mt-4 text-[15px] leading-[1.65] text-ink-muted">{p.body}</p>

                <ul className="mt-7 flex-1 space-y-2.5 border-t border-line pt-6">
                  {p.points.map((pt) => (
                    <li
                      key={pt}
                      className="flex items-start gap-3 text-[14px] leading-[1.5] text-ink-muted"
                    >
                      <span
                        className="mt-[7px] h-[5px] w-[5px] flex-shrink-0 rounded-full bg-teal"
                        aria-hidden
                      />
                      {pt}
                    </li>
                  ))}
                </ul>

                {p.href && (
                  <Link
                    href={p.href}
                    className="mt-7 inline-flex items-center gap-2 text-[13px] font-medium text-teal transition-colors hover:text-teal-deep"
                  >
                    Read more
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                      <path
                        d="M3 9L9 3M9 3H4M9 3V8"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                      />
                    </svg>
                  </Link>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
