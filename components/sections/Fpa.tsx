import Link from "next/link";
import Reveal from "../Reveal";
import SectionHead from "../SectionHead";

/**
 * AI-forward FP&A. The five practices below are the setup we build for a
 * planning team: context, a written variance process, drafted Excel work,
 * connected files, and a forecast that gets questioned before the board does.
 */
const practices = [
  {
    name: "One project with the planning context",
    q: "Why did gross margin drop in March?",
    does: "The budget, driver assumptions, KPI definitions, chart of accounts mapping, and the last few board decks sit in one place. The answer comes back in your definitions, not generic ones.",
  },
  {
    name: "The variance process, written down",
    q: "What moved, why, and what does it change in the forecast?",
    does: "A skill spells out what gets flagged, how each variance is explained, and in what order. Commentary arrives in the same format every month, and analysts spend their time checking the reasons.",
  },
  {
    name: "The heavy Excel work, drafted",
    q: "Why did EBITDA move between these two forecast versions?",
    does: "Version bridges, hardcoded numbers found, price and volume sensitivity tables built. The formulas stay in the workbook, so anyone can follow the math.",
  },
  {
    name: "Connected to the files you already use",
    q: "Is this forecast built on this week's numbers?",
    does: "ERP exports, department budgets, and the CRM pipeline are read where they already live. Each forecast refresh starts from current files instead of last month's copy.",
  },
  {
    name: "A forecast that gets pressure-tested",
    q: "Which three assumptions would our lead investor question first?",
    does: "The soft spots surface before the board meeting, not in it. The team decides what to change.",
  },
];

export default function Fpa() {
  return (
    <section id="fpa" className="border-b border-line bg-bg-sunken">
      <div className="mx-auto max-w-[1280px] px-6 py-24 md:px-10 md:py-28">
        <SectionHead
          number="05"
          label="FP&A"
          heading="FP&A, built AI-forward."
          dim="Planning that keeps up with the business."
        />

        <Reveal>
          <p className="-mt-6 mb-12 max-w-[640px] text-[16.5px] leading-[1.65] text-ink-muted">
            The forecast, the variance commentary, and the board pack are the same
            work every month, and most of it is drafting and checking. We set up
            your FP&A so that work runs on your rules, with a person reviewing
            every output. Your team gets the time back to spend with the business.
          </p>
        </Reveal>

        <div className="overflow-hidden rounded-xl border border-line">
          {practices.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.05}>
              <div
                className={`grid gap-4 bg-bg-raised p-7 md:grid-cols-[minmax(0,280px)_1fr] md:gap-10 md:p-8 ${
                  i > 0 ? "border-t border-line" : ""
                }`}
              >
                <div className="flex gap-4">
                  <span className="tabular mt-[3px] font-mono text-[12px] text-teal">
                    0{i + 1}
                  </span>
                  <h3 className="font-display text-[19px] leading-[1.25] tracking-tighter2 text-ink">
                    {p.name}
                  </h3>
                </div>
                <div>
                  <p className="border-l-2 border-teal/40 pl-4 text-[15.5px] italic leading-[1.5] text-ink">
                    {p.q}
                  </p>
                  <p className="mt-4 text-[15px] leading-[1.65] text-ink-muted">{p.does}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <p className="max-w-[560px] text-[15.5px] leading-[1.6] text-ink">
              AI takes on more of the drafting and checking. Your team owns the
              assumptions and signs what leaves.
            </p>
            <div className="flex flex-wrap gap-x-7 gap-y-3">
              {[
                { href: "/fpa", label: "FP&A services" },
                { href: "/insights/how-fpa-teams-use-claude", label: "How FP&A teams use Claude" },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="inline-flex items-center gap-2 text-[13.5px] font-medium text-teal transition-colors hover:text-teal-deep"
                >
                  {l.label}
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                    <path
                      d="M3 9L9 3M9 3H4M9 3V8"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                    />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
