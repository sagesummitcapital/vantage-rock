import Link from "next/link";
import Reveal from "../Reveal";
import SectionHead from "../SectionHead";

const pillars = [
  {
    n: "01",
    name: "Fractional CFO Services",
    lead: "A CFO's judgment without a full-time hire.",
    body: "Capital planning, unit economics, pricing, lender and investor relationships, board and investor reporting, and the operating discipline that comes with them. Engagements are scoped and led by me — there is no account manager between you and the work.",
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
    lead: "Automation built into the function and left there.",
    body: "Faster closes. Forecasts that update continuously instead of quarterly. Analysis that doesn't take a week of preparation. The AI is not the product — it is how the work gets delivered, which is why clients get answers in days rather than weeks.",
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
    lead: "The function rebuilt for how work actually gets done now.",
    body: "Not automation bolted onto a manual process. A finance function designed from the start around the assumption that systems do the mechanical work and people do the judgment — with the controls that this requires.",
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
          heading="Three services."
          dim="One finance function."
        />

        <Reveal>
          <p className="-mt-6 mb-14 max-w-[620px] text-[16.5px] leading-[1.65] text-ink-muted">
            These are not separate offerings you choose between. They describe the same
            engagement from three angles: who is accountable, how the work gets done,
            and what the function looks like when it is finished.
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
