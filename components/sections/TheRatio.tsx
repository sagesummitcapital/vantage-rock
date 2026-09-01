"use client";

import { motion, useReducedMotion } from "framer-motion";
import Reveal from "../Reveal";
import SectionHead from "../SectionHead";

/**
 * The problem, stated as a ratio rather than a list of symptoms.
 * The bar is a part-to-whole illustration of that ratio — deliberately
 * labelled as illustrative, because it is a description of how the work
 * splits, not a measured statistic.
 */

const PRODUCE = "#C6D2DA"; // recessive remainder
const INTERPRET = "#0E7C72"; // teal-deep — the part that matters

function Legend() {
  return (
    <div className="mb-7 flex flex-wrap items-center gap-x-6 gap-y-2">
      {[
        { c: PRODUCE, l: "Producing numbers" },
        { c: INTERPRET, l: "Interpreting them" },
      ].map((s) => (
        <span key={s.l} className="flex items-center gap-2.5">
          <span
            className="h-[10px] w-[10px] flex-shrink-0 rounded-[2px]"
            style={{ background: s.c }}
            aria-hidden
          />
          <span className="text-[13px] text-ink-muted">{s.l}</span>
        </span>
      ))}
    </div>
  );
}

function RatioBar({
  label,
  produce,
  delay,
}: {
  label: string;
  produce: number; // 0–100
  delay: number;
}) {
  const reduce = useReducedMotion();
  const interpret = 100 - produce;

  return (
    <div>
      <div className="mb-2.5 text-[14px] font-medium text-ink">{label}</div>

      {/* Percentages sit inside the segments; the long labels live in the
          legend, so a narrow segment never truncates its own name. */}
      <div className="flex h-11 w-full gap-[2px] overflow-hidden rounded-[4px]">
        <motion.div
          className="flex items-center justify-end rounded-l-[4px] px-3"
          style={{ background: PRODUCE }}
          initial={reduce ? false : { width: 0 }}
          whileInView={{ width: `${produce}%` }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="tabular text-[12.5px] font-semibold text-navy">
            {produce}%
          </span>
        </motion.div>
        <motion.div
          className="flex items-center rounded-r-[4px] px-3"
          style={{ background: INTERPRET }}
          initial={reduce ? false : { width: 0 }}
          whileInView={{ width: `${interpret}%` }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, delay: delay + 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="tabular text-[12.5px] font-semibold text-white">
            {interpret}%
          </span>
        </motion.div>
      </div>
    </div>
  );
}

export default function TheRatio() {
  return (
    <section id="problem" className="border-b border-line bg-bg-sunken">
      <div className="mx-auto max-w-[1280px] px-6 py-24 md:px-10 md:py-28">
        <SectionHead
          number="01"
          label="The problem"
          heading="Finance teams spend most of their time producing numbers"
          dim="and very little interpreting them."
        />

        <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <Reveal>
            <div className="max-w-[540px] space-y-6 text-[16.5px] leading-[1.7] text-ink-muted">
              <p>
                That ratio is the problem, and it is almost never a talent problem or
                an effort problem. It is a systems problem.
              </p>
              <p>
                When the close takes fifteen days, when the forecast is rebuilt by hand
                each quarter, when margin analysis starts from scratch every time
                someone asks — the mechanical work crowds out the thinking. Leadership
                ends up deciding on information that describes a month already over.
              </p>
              <p className="text-ink">
                Vantage Rock exists to change that ratio. AI compresses the mechanical
                work — the close, the reconciliation, the assembly of the report — so
                the output arrives while it can still influence a decision.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <figure className="rounded-xl border border-line bg-bg-raised p-7 soft-shadow md:p-8">
              <figcaption className="mono-label mb-6">
                Where the finance week goes
              </figcaption>

              <Legend />

              <div className="space-y-7">
                <RatioBar label="A finance function built to report" produce={80} delay={0.1} />
                <RatioBar label="A finance function built to decide" produce={35} delay={0.25} />
              </div>

              <p className="mt-7 border-t border-line pt-5 text-[12.5px] leading-[1.55] text-ink-dim">
                Illustrative. The split varies by business — the direction of the change
                does not.
              </p>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
