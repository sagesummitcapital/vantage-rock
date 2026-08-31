import Reveal from "../Reveal";

const problems = [
  { t: "The system is slow.", d: "Close is usually how you can tell." },
  { t: "Cash is the bank balance.", d: "Rear-view, not a decision." },
  { t: "The forecast died in Q2.", d: "" },
  { t: "Margins are a rebuild", d: "every time someone asks." },
  { t: "Reporting is a Monday file.", d: "" },
];

export default function FiveProblems() {
  return (
    <section className="border-b border-line bg-bg-sunken">
      <div className="mx-auto max-w-[1280px] px-6 py-20 md:px-10 md:py-24">
        <Reveal>
          <span className="mono-label">01 — The real problem</span>
          <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <h2 className="max-w-[720px] font-display text-display-lg">
              <span className="text-ink">If two or more of these sound familiar, that&apos;s not an accounting problem. Finance isn&apos;t in the room.</span>
            </h2>
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
                {p.d ? (
                  <p className="mt-1.5 text-[13px] leading-[1.5] text-ink-muted">{p.d}</p>
                ) : null}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
