import Reveal from "../Reveal";
import SectionHead from "../SectionHead";

const metrics = [
  { v: "15 → 3", l: "days to close", s: "Monthly close cycle" },
  { v: "60%", l: "less manual work", s: "In reporting and reconciliation" },
  { v: "Weeks", l: "of forward cash visibility", s: "Previously the bank balance" },
];

export default function Proof() {
  return (
    <section id="proof" className="border-b border-line">
      <div className="mx-auto max-w-[1280px] px-6 py-24 md:px-10 md:py-28">
        <SectionHead
          number="05"
          label="One engagement"
          heading="A healthcare and wellness operator,"
          dim="start to finish."
        />

        <div className="grid gap-px overflow-hidden rounded-xl border border-line bg-line lg:grid-cols-3">
          {[
            {
              k: "The problem",
              b: "Reporting was pulled by hand. The close ran fifteen days, so performance was reviewed halfway through the following month. There was no forward view of cash — only the bank balance — and no reliable read on which parts of the business were actually profitable.",
            },
            {
              k: "What we built",
              b: "Reporting dashboards wired to the source. A cash forecast that updates rather than gets rebuilt. AI-driven workflows across the close and reconciliation, with review gates at every point a number leaves the system. Then the chart of accounts cleanup that made all of it possible.",
            },
            {
              k: "Where it landed",
              b: "The close moved from fifteen days to three. Manual reporting work fell by roughly sixty percent. KPIs became visible across the business in real time, and cash could be seen weeks ahead instead of at the end of a statement.",
            },
          ].map((c, i) => (
            <Reveal key={c.k} delay={i * 0.08}>
              <div className="h-full bg-bg-raised p-8 md:p-9">
                <div className="mono-label mb-5">{c.k}</div>
                <p className="text-[15px] leading-[1.7] text-ink-muted">{c.b}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Metrics */}
        <Reveal delay={0.15}>
          <div
            className="mt-5 grid gap-px overflow-hidden rounded-xl md:grid-cols-3"
            style={{ background: "rgba(240,244,248,0.09)" }}
          >
            {metrics.map((m) => (
              <div
                key={m.l}
                className="p-8 md:p-9"
                style={{
                  background: "linear-gradient(160deg, #0F2235 0%, #0B1A2A 100%)",
                }}
              >
                <div
                  className="tabular font-display text-[clamp(2rem,4vw,2.75rem)] leading-none tracking-tighter2"
                  style={{ color: "#2EE6C9" }}
                >
                  {m.v}
                </div>
                <div className="mt-3 text-[15px] font-medium" style={{ color: "#F0F4F8" }}>
                  {m.l}
                </div>
                <div className="mt-1.5 text-[13px] leading-[1.5]" style={{ color: "#8FA3B5" }}>
                  {m.s}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-6 max-w-[620px] text-[12.5px] leading-[1.6] text-ink-dim">
            Anonymized at the client&apos;s request. One engagement — results depend on
            the state of the books, the systems in place, and how much of the business
            is willing to change. Not a promise of comparable outcomes.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
