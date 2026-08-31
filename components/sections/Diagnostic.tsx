"use client";

import { motion } from "framer-motion";
import CTAButton from "../CTAButton";
import Reveal from "../Reveal";
import { CONTACT_EMAIL } from "@/lib/site";

const assessed = [
  "close and accuracy",
  "cash and treasury",
  "forecasting",
  "profitability",
  "KPIs and reporting",
  "process and controls",
  "automation",
];

export default function Diagnostic() {
  return (
    <section id="diagnostic" className="border-b border-line bg-bg-sunken">
      <div className="mx-auto max-w-[1280px] px-6 py-24 md:px-10 md:py-28">
        <div className="grid gap-12 md:grid-cols-[1fr_1.1fr] md:gap-16">
          {/* Left — framing */}
          <Reveal>
            <span className="mono-label">03 — Where every engagement starts</span>
            <h2 className="mt-6 font-display text-display-lg">
              <span className="text-ink">Here&apos;s what a </span>
              <span className="gradient-text-teal italic">score</span>
              <span className="text-ink"> looks like.</span>
            </h2>
            <p className="mt-6 max-w-[460px] text-[16px] leading-[1.55] text-ink-muted">
              This is a sample. Not a form.
            </p>

            <div className="mt-8 rounded-lg border border-line bg-bg-raised p-4">
              <div className="mono-label mb-3 !text-[10px]">Seven areas</div>
              <div className="flex flex-wrap gap-2">
                {assessed.map((a) => (
                  <span
                    key={a}
                    className="rounded-full border border-line bg-bg-sunken px-3 py-1 text-[12px] text-ink-muted"
                  >
                    {a}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-col items-start gap-4">
              <CTAButton href="#book">Request the Review</CTAButton>
              <p className="max-w-[460px] text-[15px] leading-[1.55] text-ink-muted">
                Want more?{" "}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="font-medium text-teal transition-colors hover:text-ink"
                >
                  Get in touch
                </a>
                .
              </p>
            </div>
          </Reveal>

          {/* Right — sample score */}
          <Reveal delay={0.15}>
            <motion.div
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="card-lift relative overflow-hidden rounded-xl border border-teal/30 bg-bg-raised p-8 soft-shadow md:p-10"
            >
              <div
                className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full blur-3xl"
                style={{ background: "rgba(23,168,154,0.08)" }}
                aria-hidden
              />

              <div className="relative">
                <div className="mb-6 flex items-center justify-between border-b border-line pb-4">
                  <span className="mono-label !text-teal">SAMPLE</span>
                </div>

                <div className="mb-8">
                  <div className="tabular font-display text-[48px] leading-none tracking-[-0.02em] text-ink">
                    36
                    <span className="text-[22px] text-ink-dim">/100</span>
                  </div>
                  <p className="mt-3 text-[14px] leading-[1.5] text-ink-muted">
                    This is a sample. Not a form.
                  </p>
                </div>

                <div className="mono-label mb-4 !text-[10px]">Seven areas</div>
                <ul className="space-y-3">
                  {assessed.map((d, i) => (
                    <motion.li
                      key={d}
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * i, duration: 0.5 }}
                      className="flex items-start gap-3 text-[15px] leading-[1.5] text-ink"
                    >
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="mt-[2px] flex-shrink-0" aria-hidden>
                        <circle cx="9" cy="9" r="8" stroke="#17A89A" strokeWidth="1.1" />
                        <path d="M5.5 9l2.5 2.5L13 6" stroke="#17A89A" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {d}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
