import Reveal from "../Reveal";
import SectionHead from "../SectionHead";
import CTAButton from "../CTAButton";
import { CTA_LABEL } from "@/lib/site";

type Engagement = {
  name: string;
  stage: string;
  lead: string;
  inherits: string;
  features: string[];
};

const engagements: Engagement[] = [
  {
    name: "Essentials",
    stage: "The books exist. Finance isn't in the decisions yet.",
    lead: "Clear financials, on a schedule, that you can trust enough to act on.",
    inherits: "What's included",
    features: [
      "Monthly financial review",
      "KPI dashboard, up to ten measures",
      "Monthly executive summary",
      "Monthly strategy call",
      "Email support",
    ],
  },
  {
    name: "Growth",
    stage: "Cash and forecast need to lead, not trail.",
    lead: "Forward visibility, and the analysis to act on it before the quarter closes.",
    inherits: "Everything in Essentials, plus",
    features: [
      "Cash flow forecasting",
      "Budget versus actual analysis",
      "AI opportunity assessment",
      "Process improvement recommendations",
      "Two strategy calls per month",
      "Priority email and chat support",
    ],
  },
  {
    name: "Scale",
    stage: "Multi-entity, a board pack, a CFO needed in the room.",
    lead: "Executive finance leadership and the systems to support it across entities.",
    inherits: "Everything in Growth, plus",
    features: [
      "Full fractional CFO leadership",
      "AI implementation roadmap",
      "Advanced KPI dashboards",
      "Board and investor reporting",
      "Weekly or on-demand availability",
      "Strategic planning and scenario modeling",
    ],
  },
];

function Check() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 16 16"
      fill="none"
      className="mt-[3px] flex-shrink-0"
      aria-hidden
    >
      <circle cx="8" cy="8" r="7" stroke="#17A89A" strokeWidth="1.1" opacity="0.45" />
      <path
        d="M5 8l2 2 4-4.5"
        stroke="#17A89A"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Engagements() {
  return (
    <section id="engagements" className="border-b border-line bg-bg-sunken">
      <div className="mx-auto max-w-[1280px] px-6 py-24 md:px-10 md:py-28">
        <SectionHead
          number="03"
          label="Engagements"
          heading="Scoped to the business,"
          dim="not to a package."
        />

        <Reveal>
          <p className="-mt-6 mb-14 max-w-[620px] text-[16.5px] leading-[1.65] text-ink-muted">
            Three shapes of the same work. Fees are scoped after we talk — entity
            count, systems, and how much needs rebuilding versus running.
          </p>
        </Reveal>

        <div className="grid gap-px overflow-hidden rounded-xl border border-line bg-line lg:grid-cols-3">
          {engagements.map((e, i) => (
            <Reveal key={e.name} delay={i * 0.08}>
              <div className="flex h-full flex-col bg-bg-raised p-8 md:p-9">
                <div className="font-display text-[27px] tracking-tighter2 text-ink">
                  {e.name}
                </div>
                <p className="mt-2 text-[13.5px] leading-[1.45] text-teal">{e.stage}</p>

                <p className="mt-5 text-[15px] leading-[1.6] text-ink">{e.lead}</p>

                <div className="mono-label mb-4 mt-7 border-t border-line pt-6">
                  {e.inherits}
                </div>
                <ul className="flex-1 space-y-3">
                  {e.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-3 text-[14px] leading-[1.5] text-ink-muted"
                    >
                      <Check />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        {/* How an engagement starts */}
        <Reveal delay={0.2}>
          <div className="mt-8 grid gap-8 rounded-xl border border-line bg-bg-raised p-8 md:grid-cols-[1.3fr_1fr] md:items-center md:p-10">
            <div>
              <div className="mono-label mb-4">How it starts</div>
              <ol className="space-y-4">
                {[
                  "A 30-minute Finance Systems Review. Fit-check — we don't diagnose on the call. Nothing to prepare.",
                  "If it's a fit, a short diagnostic — what to fix, in what order, and what it's worth fixing.",
                  "Then the engagement, scoped from that. You always know what you're buying before you buy it.",
                ].map((s, i) => (
                  <li key={s} className="flex gap-4">
                    <span className="tabular mt-[2px] font-mono text-[12px] text-teal">
                      0{i + 1}
                    </span>
                    <span className="text-[15px] leading-[1.6] text-ink-muted">{s}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="flex flex-col items-start gap-4 md:items-end">
              <CTAButton href="#book">{CTA_LABEL}</CTAButton>
              <p className="max-w-[280px] text-[13.5px] leading-[1.55] text-ink-dim md:text-right">
                You&apos;ll talk to me, not a salesperson. Reply within one business day.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
