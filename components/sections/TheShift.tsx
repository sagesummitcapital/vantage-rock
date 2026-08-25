"use client";

import { motion } from "framer-motion";
import Reveal from "../Reveal";
import SectionHead from "../SectionHead";

const traditional = [
  "Manual reporting & data pulls",
  "Reactive forecasting",
  "Siloed systems",
  "High operational overhead",
  "Limited real-time visibility",
  "Spreadsheets & manual models",
];

const aiNative = [
  "AI-assisted reporting, human-reviewed",
  "AI-driven forecasting",
  "Integrated intelligent systems",
  "Scalable operational infrastructure",
  "Real-time visibility & insights",
  "AI-supervised workflows",
];

const oversight = [
  "AI Monitoring",
  "Anomaly Detection",
  "Workflow Intelligence",
  "Decision Support",
  "Outcome Optimization",
];

function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0" aria-hidden>
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
      <path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function CheckIcon({ bright = false }: { bright?: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0" aria-hidden>
      <circle cx="8" cy="8" r="7" stroke={bright ? "#2EE6C9" : "currentColor"} strokeWidth="1.2" />
      <path d="M5 8l2 2 4-4.5" stroke={bright ? "#2EE6C9" : "currentColor"} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function TheShift() {
  return (
    <section id="shift" className="border-b border-line">
      <div className="mx-auto max-w-[1280px] px-6 py-20 md:px-10 md:py-24">
        <SectionHead
          number="02"
          label="The shift"
          heading="The CFO role"
          dim="is evolving."
        />

        <div className="grid gap-6 lg:grid-cols-[1fr_1fr_0.8fr]">
          {/* Traditional */}
          <Reveal delay={0.05}>
            <div className="card-lift h-full rounded-xl border border-line bg-bg-raised p-7 soft-shadow">
              <div className="mono-label mb-6">Traditional finance model</div>
              <ul className="space-y-4">
                {traditional.map((t) => (
                  <li key={t} className="flex items-center gap-3 text-[14px] text-ink-muted">
                    <span className="text-ink-dim">
                      <XIcon />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* AI-Native */}
          <Reveal delay={0.12}>
            <div className="card-lift relative h-full rounded-xl border border-teal/30 bg-bg-raised p-7 soft-shadow">
              <span className="absolute right-6 top-7 h-px w-8 bg-teal/40" />
              <div className="mono-label mb-6 !text-teal">AI-native finance model</div>
              <ul className="space-y-4">
                {aiNative.map((t) => (
                  <li key={t} className="flex items-center gap-3 text-[14px] text-ink">
                    <span className="text-teal">
                      <CheckIcon />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* AI Oversight Layer — dark panel */}
          <Reveal delay={0.19}>
            <div
              className="relative h-full overflow-hidden rounded-xl p-7 shadow-[0_24px_60px_-20px_rgba(11,26,42,0.4)]"
              style={{
                background:
                  "linear-gradient(160deg, #0F2235 0%, #0B1A2A 70%, #081421 100%)",
              }}
            >
              <div
                className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full blur-3xl"
                style={{ background: "rgba(46,230,201,0.15)" }}
                aria-hidden
              />
              <div
                className="mono-label mb-6"
                style={{ color: "#2EE6C9" }}
              >
                AI oversight layer
              </div>

              {/* Stacked layers visual */}
              <div className="mb-6 flex flex-col items-center gap-[3px]">
                {[0, 1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    className="rounded-sm"
                    style={{
                      width: `${70 - i * 8}%`,
                      height: 8,
                      background: `rgba(46,230,201,${0.7 - i * 0.13})`,
                    }}
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                  />
                ))}
              </div>

              <ul className="space-y-3">
                {oversight.map((o) => (
                  <li
                    key={o}
                    className="flex items-center gap-3 text-[13px]"
                    style={{ color: "#C5D2DD" }}
                  >
                    <CheckIcon bright />
                    {o}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
