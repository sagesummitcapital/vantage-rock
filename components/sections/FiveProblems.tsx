import Reveal from "../Reveal";

const problems = [
  { t: "Slow close", d: "10–20 days to see last month." },
  { t: "No cash view", d: "Decisions made off the bank balance." },
  { t: "Stale forecast", d: "Built once, abandoned by Q2." },
  { t: "Blind margins", d: "No profit view by service or location." },
  { t: "Manual reporting", d: "Hours rebuilding the same file." },
];

export default function FiveProblems() {
  return (
    <section className="border-b border-line bg-bg-sunken">
      <div className="mx-auto max-w-[1280px] px-6 py-20 md:px-10 md:py-24">
        <Reveal>
          <span className="mono-label">01 — The real problem</span>
          <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <h2 className="max-w-[660px] font-display text-display-lg">
              <span className="text-ink">You don&apos;t need another dashboard. You need these five </span>
              <span className="gradient-text-teal">problems fixed.</span>
            </h2>
            <p className="max-w-[280px] text-[14px] leading-[1.55] text-ink-muted">
              Two or more sound familiar? Your accounting isn&apos;t the
              problem — the system around it is.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
          {problems.map((p, i) => (
            <Reveal key={p.t} delay={i * 0.05}>
              <div className="group h-full bg-bg-raised p-6 transition-colors hover:bg-white">
                <span className="mono-label !text-[9px] !text-teal">0{i + 1}</span>
                <h3 className="mt-3 font-display text-[19px] leading-tight text-ink">
                  {p.t}
                </h3>
                <p className="mt-1.5 text-[13px] leading-[1.5] text-ink-muted">{p.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
