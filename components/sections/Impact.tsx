"use client";

import { motion } from "framer-motion";
import Reveal from "../Reveal";
import SectionHead from "../SectionHead";

const caseResults = [
  "Close that holds",
  "Weekly KPI pack",
  "Cash visible weeks ahead",
];

export default function Impact() {
  return (
    <section id="impact" className="border-b border-line bg-bg-sunken">
      <div className="mx-auto max-w-[1280px] px-6 py-24 md:px-10 md:py-28">
        <SectionHead
          number="07"
          label="Proof"
          heading="What this looks like"
          dim="when the seat is in the room."
        />

        <Reveal>
          <div
            className="relative overflow-hidden rounded-xl p-8 md:p-12 shadow-[0_24px_60px_-20px_rgba(11,26,42,0.4)]"
            style={{
              background:
                "linear-gradient(160deg, #0F2235 0%, #0B1A2A 70%, #081421 100%)",
            }}
          >
            <div
              className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full blur-3xl"
              style={{ background: "rgba(46,230,201,0.12)" }}
              aria-hidden
            />
            <div className="relative grid gap-10 md:grid-cols-[1fr_1fr] md:gap-14">
              <div>
                <div className="mono-label mb-4" style={{ color: "#2EE6C9" }}>
                  Healthcare & wellness operator
                </div>
                <div className="space-y-6">
                  <div>
                    <div className="mono-label mb-2 !text-[10px]" style={{ color: "#8FA3B5" }}>
                      Before
                    </div>
                    <p className="text-[15px] leading-[1.55]" style={{ color: "#C5D2DD" }}>
                      15-day close, reports pulled by hand, no forward cash.
                    </p>
                  </div>
                  <div>
                    <div className="mono-label mb-2 !text-[10px]" style={{ color: "#8FA3B5" }}>
                      After
                    </div>
                    <p className="text-[15px] leading-[1.55]" style={{ color: "#C5D2DD" }}>
                      Close that holds, weekly KPI pack, cash visible weeks ahead.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <div className="mono-label mb-4 !text-[10px]" style={{ color: "#8FA3B5" }}>
                  After
                </div>
                <ul className="space-y-4">
                  {caseResults.map((r, i) => (
                    <motion.li
                      key={r}
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * i, duration: 0.5 }}
                      className="flex items-start gap-3 text-[15px] leading-[1.45]"
                      style={{ color: "#F0F4F8" }}
                    >
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="mt-[2px] flex-shrink-0" aria-hidden>
                        <circle cx="9" cy="9" r="8" stroke="#2EE6C9" strokeWidth="1.1" />
                        <path d="M5.5 9l2.5 2.5L13 6" stroke="#2EE6C9" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {r}
                    </motion.li>
                  ))}
                </ul>

                <p
                  className="mt-8 border-t pt-5 text-[13px] leading-[1.5]"
                  style={{ color: "#8FA3B5", borderColor: "rgba(240,244,248,0.1)" }}
                >
                  The days aren&apos;t the product. Leadership started deciding
                  on current information.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Stat cards — scoped to this engagement */}
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { stat: "Close", label: "that holds", icon: "M12 7v5l3 2M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
            { stat: "Weekly", label: "KPI pack", icon: "M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z M12 14a2 2 0 100-4 2 2 0 000 4z" },
            { stat: "Weeks", label: "Cash visible ahead", icon: "M4 20V10M10 20V4M16 20v-7M22 20H2" },
            { stat: "Current", label: "information, not a rebuild", icon: "M13 2L4.5 13H11l-1 9 8.5-11H12l1-9z" },
          ].map((c, i) => (
            <Reveal key={c.label} delay={i * 0.06}>
              <div className="card-lift flex items-center gap-4 rounded-xl border border-line bg-bg-raised px-6 py-5 soft-shadow">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-teal/10 text-teal">
                  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d={c.icon} stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <div className="tabular font-display text-[26px] leading-none tracking-[-0.02em] text-ink">
                    {c.stat}
                  </div>
                  <div className="mt-1 text-[12.5px] text-ink-muted">{c.label}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <p className="mt-6 text-[12px] leading-[1.5] text-ink-dim">
            Anonymized at the client&apos;s request. Not a promise of comparable
            outcomes.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
