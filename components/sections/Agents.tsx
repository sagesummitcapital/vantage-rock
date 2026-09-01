import Link from "next/link";
import Reveal from "../Reveal";
import SectionHead from "../SectionHead";

const agents = [
  {
    name: "Month-End Close Agent",
    q: "What is holding up the close, and how much can finish without my team touching it?",
    does: "Works accruals, reconciliations and journal entries, and knows the state of the close at any hour — what is open, what is blocking, and on whom. The controller keeps every judgment call.",
  },
  {
    name: "Cashflow Agent",
    q: "Who owes us, which invoices are about to slip, and what have we done about it?",
    does: "Maps AR by client and invoice, flags what is at risk, and tracks follow-up. Every figure ties to a datapoint you can trace, not a summary assembled the morning it was asked for.",
  },
  {
    name: "Expense Agent",
    q: "Which costs are trending up, and which ones need my attention?",
    does: "Runs cost lines month over month and pairs each movement with the reason it moved. Trend and cause in one pass.",
  },
  {
    name: "Flux Analysis Agent",
    q: "What changed in the P&L, why, and is it a problem?",
    does: "Produces variance with the explanation attached rather than a column of deltas. Corrections are captured, so next month's narrative is better than this month's.",
  },
  {
    name: "Daily Brief Agent",
    q: "What is on my plate today, and am I walking into every meeting prepared?",
    does: "Pulls CRM, email, calendar, call transcripts and project trackers into today's priorities and a brief for each meeting on the calendar.",
  },
];

export default function Agents() {
  return (
    <section id="agents" className="border-b border-line">
      <div className="mx-auto max-w-[1280px] px-6 py-24 md:px-10 md:py-28">
        <SectionHead
          number="04"
          label="The agents"
          heading="Agents we've built."
          dim="Not five products."
        />

        <Reveal>
          <p className="-mt-6 mb-12 max-w-[620px] text-[16.5px] leading-[1.65] text-ink-muted">
            Five pieces of one job that used to be done by hand every month. They run on
            your data, in your systems, under review. We run Vantage Rock this way first,
            which is how we know what actually holds.
          </p>
        </Reveal>

        <div className="overflow-hidden rounded-xl border border-line">
          {agents.map((a, i) => (
            <Reveal key={a.name} delay={i * 0.05}>
              <div
                className={`grid gap-4 bg-bg-raised p-7 md:grid-cols-[minmax(0,230px)_1fr] md:gap-10 md:p-8 ${
                  i > 0 ? "border-t border-line" : ""
                }`}
              >
                <div>
                  <h3 className="font-display text-[19px] leading-[1.25] tracking-tighter2 text-ink">
                    {a.name}
                  </h3>
                </div>
                <div>
                  <p className="border-l-2 border-teal/40 pl-4 text-[15.5px] italic leading-[1.5] text-ink">
                    {a.q}
                  </p>
                  <p className="mt-4 text-[15px] leading-[1.65] text-ink-muted">{a.does}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <Link
            href="/cfo-ai-agents"
            className="mt-8 inline-flex items-center gap-2 text-[13.5px] font-medium text-teal transition-colors hover:text-teal-deep"
          >
            How each agent works
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
              <path
                d="M3 9L9 3M9 3H4M9 3V8"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </svg>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
