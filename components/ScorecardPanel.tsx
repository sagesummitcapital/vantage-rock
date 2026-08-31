"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Hero graphic: a SAMPLE Finance Maturity Scorecard.
 * Sample only — not a form.
 */

const areas = [
  { label: "Close & accuracy", score: 42 },
  { label: "Cash & treasury", score: 28 },
  { label: "Forecasting", score: 35 },
  { label: "Profitability", score: 51 },
  { label: "KPIs & reporting", score: 30 },
  { label: "Process & controls", score: 46 },
  { label: "Automation", score: 22 },
];

const OVERALL = 36;

export default function ScorecardPanel() {
  const reduce = useReducedMotion();

  return (
    <div
      className="relative overflow-hidden rounded-xl border p-6 shadow-[0_24px_60px_-20px_rgba(11,26,42,0.45)]"
      style={{
        background: "linear-gradient(160deg, #0F2235 0%, #0B1A2A 62%, #081421 100%)",
        borderColor: "rgba(11,26,42,0.2)",
      }}
    >
      <div
        className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full blur-3xl"
        style={{ background: "rgba(46,230,201,0.12)" }}
        aria-hidden
      />

      {/* Header */}
      <div
        className="relative mb-5 flex items-start justify-between border-b pb-4"
        style={{ borderColor: "rgba(240,244,248,0.1)" }}
      >
        <div>
          <div
            className="font-mono text-[10px] uppercase tracking-[0.14em]"
            style={{ color: "#2EE6C9" }}
          >
            SAMPLE
          </div>
          <div className="mt-1 text-[12px]" style={{ color: "#8FA3B5" }}>
            not a form
          </div>
        </div>

        {/* Overall score */}
        <div className="text-right">
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="tabular font-display text-[38px] leading-none tracking-[-0.02em]"
            style={{ color: "#F0F4F8" }}
          >
            {OVERALL}
            <span className="text-[18px]" style={{ color: "#5A6B7B" }}>
              /100
            </span>
          </motion.div>
        </div>
      </div>

      {/* Score bars */}
      <div className="relative space-y-[13px]">
        {areas.map((a, i) => (
          <div key={a.label}>
            <div className="mb-[5px] flex items-baseline justify-between">
              <span
                className="font-mono text-[10.5px] uppercase tracking-[0.06em]"
                style={{ color: "#8FA3B5" }}
              >
                {a.label}
              </span>
              <motion.span
                initial={reduce ? false : { opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.08, duration: 0.4 }}
                className="tabular font-mono text-[11px]"
                style={{ color: a.score < 35 ? "#E2A05F" : "#8FA3B5" }}
              >
                {a.score}
              </motion.span>
            </div>
            <div
              className="h-[3px] w-full overflow-hidden rounded-full"
              style={{ background: "rgba(240,244,248,0.08)" }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{
                  background:
                    a.score < 35
                      ? "linear-gradient(90deg,#E2A05F,#D6845F)"
                      : "linear-gradient(90deg,#17A89A,#2EE6C9)",
                }}
                initial={reduce ? { width: `${a.score}%` } : { width: 0 }}
                whileInView={{ width: `${a.score}%` }}
                viewport={{ once: true }}
                transition={{
                  duration: 1,
                  delay: 0.4 + i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Footer verdict */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 6 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="relative mt-5 flex items-start gap-2.5 rounded-lg p-3.5"
        style={{ background: "rgba(46,230,201,0.07)" }}
      >
        <svg width="15" height="15" viewBox="0 0 16 16" fill="none" className="mt-[1px] flex-shrink-0" aria-hidden>
          <circle cx="8" cy="8" r="7" stroke="#2EE6C9" strokeWidth="1.1" />
          <path d="M8 4.5v4M8 11h.01" stroke="#2EE6C9" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
        <p className="text-[12.5px] leading-[1.45]" style={{ color: "#C5D2DD" }}>
          Biggest gaps: <span style={{ color: "#F0F4F8" }}>automation, cash
          visibility, and forecasting</span> — the three fixes with the
          shortest payback.
        </p>
      </motion.div>
    </div>
  );
}
