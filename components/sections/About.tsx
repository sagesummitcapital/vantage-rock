import Image from "next/image";
import Reveal from "../Reveal";

/**
 * ABOUT — update the name below to your own before launch.
 */
const FOUNDER_NAME = "Founder & Principal";

const domains = [
  "FP&A and controllership",
  "Financial reporting & close",
  "Budgeting, forecasting & cash flow",
  "Profitability & pricing",
  "Revenue operations",
  "Financial systems & implementation",
];

export default function About() {
  return (
    <section id="about" className="border-b border-line bg-bg-sunken">
      <div className="mx-auto max-w-[1280px] px-6 py-24 md:px-10 md:py-28">
        <div className="grid items-center gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
          {/* Photo */}
          <Reveal>
            <div className="relative mx-auto w-full max-w-[360px]">
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-line bg-bg-raised soft-shadow">
                <Image
                  src="/founder.jpg"
                  alt={FOUNDER_NAME}
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 100vw, 360px"
                  className="object-cover"
                />
              </div>
              {/* Accent frame */}
              <div
                className="pointer-events-none absolute -bottom-3 -right-3 -z-10 h-full w-full rounded-xl border border-teal/30"
                aria-hidden
              />
            </div>
          </Reveal>

          {/* Copy */}
          <Reveal delay={0.12}>
            <span className="mono-label">05 — Who you&apos;re working with</span>
            <h2 className="mt-6 font-display text-display-lg">
              <span className="text-ink">CFO-level judgment, </span>
              <span className="gradient-text-teal">without the full-time hire.</span>
            </h2>

            <p className="mt-6 max-w-[540px] text-[16px] leading-[1.65] text-ink-muted">
              Led by a finance and operations leader with 10+ years across
              healthcare, technology, startups, and private-equity-backed
              businesses. Engagements are scoped and led at that level, then
              delivered by a small senior team — your numbers never go to a
              junior analyst.
            </p>

            <div className="mt-8">
              <div className="mono-label mb-3 !text-[10px]">Depth across</div>
              <div className="flex flex-wrap gap-2">
                {domains.map((d) => (
                  <span
                    key={d}
                    className="rounded-full border border-line bg-bg-raised px-3 py-1.5 text-[12.5px] text-ink-muted"
                  >
                    {d}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-9 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3">
              {[
                { k: "10+ yrs", v: "Finance & operations leadership" },
                { k: "4 sectors", v: "Healthcare, tech, startups, PE-backed" },
                { k: "End to end", v: "Strategy through implementation" },
              ].map((c) => (
                <div key={c.k} className="bg-bg-raised px-5 py-4">
                  <div className="tabular font-display text-[20px] leading-none text-ink">
                    {c.k}
                  </div>
                  <div className="mt-1.5 text-[12.5px] leading-[1.4] text-ink-muted">
                    {c.v}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
