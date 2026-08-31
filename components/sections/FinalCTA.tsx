"use client";

import { motion } from "framer-motion";
import BookingForm from "../BookingForm";
import Reveal from "../Reveal";

export default function FinalCTA() {
  return (
    <section id="book" className="relative overflow-hidden">
      {/* Aurora */}
      <div className="aurora-glow" aria-hidden />
      <div className="grid-bg pointer-events-none absolute inset-0" aria-hidden />

      {/* Accent dots */}
      <motion.div
        className="pointer-events-none absolute left-[20%] top-[25%] h-1 w-1 rounded-full bg-teal"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 3, repeat: Infinity }}
        aria-hidden
      />
      <motion.div
        className="pointer-events-none absolute right-[25%] top-[55%] h-1 w-1 rounded-full bg-teal"
        animate={{ opacity: [0.6, 0.2, 0.6] }}
        transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-[1280px] px-6 py-28 md:px-10 md:py-36">
        <div className="mb-14 text-center">
          <Reveal>
            <span className="mono-label">06 — Next step</span>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="mx-auto mt-6 max-w-[900px] font-display text-display-2xl">
              <span className="text-ink">30 minutes. We see if it&apos;s a </span>
              <span className="gradient-text italic">fit.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mx-auto mt-6 max-w-[520px] text-[17px] leading-[1.5] text-ink-muted">
              We don&apos;t diagnose on the call. No plan to take home. Fit or
              not, you leave knowing whether a fractional CFO is the next move.
            </p>

            <div className="mx-auto mt-8 flex max-w-[640px] flex-wrap items-center justify-center gap-x-7 gap-y-2 text-[13px] text-ink-muted">
              {[
                "Reply within 1 business day",
                "No sales team — you talk to the operator",
                "Nothing to prepare",
              ].map((t) => (
                <span key={t} className="flex items-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
                    <circle cx="8" cy="8" r="7" stroke="#17A89A" strokeWidth="1.1" />
                    <path d="M5 8l2 2 4-4.5" stroke="#17A89A" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {t}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.3}>
          <BookingForm />
        </Reveal>
      </div>
    </section>
  );
}
