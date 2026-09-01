import Reveal from "../Reveal";
import SectionHead from "../SectionHead";

const stages = [
  {
    k: "Sources",
    items: ["General ledger", "AR / AP sub-ledgers", "Bank feeds", "Payroll", "CRM and billing"],
  },
  {
    k: "Agents",
    items: [
      "Pull and reconcile",
      "Draft accruals and entries",
      "Track receivables",
      "Write the variance narrative",
    ],
  },
];

const outputs = [
  "Board and investor reporting",
  "Cash calls and covenant headroom",
  "Pricing and margin decisions",
  "Hiring and capacity planning",
];

const controls = [
  {
    t: "Every figure traces to a source record.",
    d: "If a number can't be tied back, it isn't produced — not flagged, not produced. A plausible wrong number is more dangerous than one that fails loudly.",
  },
  {
    t: "Nothing posts to the ledger unreviewed.",
    d: "Agents propose journal entries with the calculation and support attached. A person posts them. Every time, including the routine ones.",
  },
  {
    t: "A person signs anything that leaves the building.",
    d: "Board commentary, lender packages, investor reporting. The system drafts. I own it. That is the design, not a transitional arrangement.",
  },
];

function Chevron() {
  return (
    <div className="flex items-center justify-center py-2 lg:py-0" aria-hidden>
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        className="rotate-90 text-teal/50 lg:rotate-0"
      >
        <path
          d="M7 4l6 6-6 6"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function Panel({ k, items }: { k: string; items: string[] }) {
  return (
    <div className="h-full rounded-xl border border-line bg-bg-raised p-6 soft-shadow">
      <div className="mono-label mb-4">{k}</div>
      <ul className="space-y-2">
        {items.map((i) => (
          <li key={i} className="text-[13.5px] leading-[1.5] text-ink-muted">
            {i}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function HowItWorks() {
  return (
    <section id="how" className="border-b border-line bg-bg-sunken">
      <div className="mx-auto max-w-[1280px] px-6 py-24 md:px-10 md:py-28">
        <SectionHead
          number="03"
          label="How the work gets done"
          heading="A human sits between the systems"
          dim="and the decisions."
        />

        <Reveal>
          <p className="-mt-6 mb-14 max-w-[620px] text-[16.5px] leading-[1.65] text-ink-muted">
            Agents handle what repeats. Judgment, context and accountability stay with a
            person — and every number that reaches leadership passes through one. That
            hinge in the middle is the entire architecture, and it is deliberate.
          </p>
        </Reveal>

        {/* The flow */}
        <Reveal delay={0.08}>
          <div className="grid items-stretch gap-2 lg:grid-cols-[1fr_auto_1fr_auto_1.15fr_auto_1fr]">
            <Panel k={stages[0].k} items={stages[0].items} />
            <Chevron />
            <Panel k={stages[1].k} items={stages[1].items} />
            <Chevron />

            {/* The operator — the hinge */}
            <div
              className="relative h-full overflow-hidden rounded-xl p-6 shadow-[0_24px_60px_-20px_rgba(11,26,42,0.45)]"
              style={{
                background: "linear-gradient(160deg, #0F2235 0%, #0B1A2A 70%, #081421 100%)",
              }}
            >
              <div
                className="pointer-events-none absolute -right-14 -top-14 h-44 w-44 rounded-full blur-3xl"
                style={{ background: "rgba(46,230,201,0.16)" }}
                aria-hidden
              />
              <div className="relative">
                <div className="mono-label mb-4" style={{ color: "#2EE6C9" }}>
                  The operator
                </div>
                <p
                  className="font-display text-[20px] leading-[1.25] tracking-tighter2"
                  style={{ color: "#F0F4F8" }}
                >
                  Reviews, decides, and owns the number.
                </p>
                <ul className="mt-5 space-y-2">
                  {["Reviews what the agents produced", "Applies business context", "Signs what goes out", "Answers for it in the room"].map(
                    (i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 text-[13.5px] leading-[1.5]"
                        style={{ color: "#C5D2DD" }}
                      >
                        <span
                          className="mt-[7px] h-[5px] w-[5px] flex-shrink-0 rounded-full"
                          style={{ background: "#2EE6C9" }}
                          aria-hidden
                        />
                        {i}
                      </li>
                    ),
                  )}
                </ul>
              </div>
            </div>

            <Chevron />
            <Panel k="Decisions" items={outputs} />
          </div>
        </Reveal>

        {/* The controls that make it defensible */}
        <div className="mt-16">
          <Reveal>
            <h3 className="font-display text-[24px] tracking-tighter2 text-ink md:text-[27px]">
              The three rules that don&apos;t move
            </h3>
            <p className="mt-3 max-w-[600px] text-[15.5px] leading-[1.6] text-ink-muted">
              This is the first question any serious operator asks, and it should be.
            </p>
          </Reveal>

          <div className="mt-9 grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-3">
            {controls.map((c, i) => (
              <Reveal key={c.t} delay={i * 0.07}>
                <div className="h-full bg-bg-raised p-7">
                  <div className="tabular font-mono text-[12px] text-teal">
                    0{i + 1}
                  </div>
                  <p className="mt-4 text-[15.5px] font-medium leading-[1.45] text-ink">
                    {c.t}
                  </p>
                  <p className="mt-3 text-[14.5px] leading-[1.6] text-ink-muted">{c.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
