"use client";

import { motion, useReducedMotion } from "framer-motion";
import CTAButton from "../CTAButton";
import { CTA_LABEL } from "@/lib/site";

const pillars = ["Fractional CFO", "FP&A", "AI Implementation"];

export default function Hero() {
  const reduce = useReducedMotion();

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
  };
  const item = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section id="top" className="relative overflow-hidden border-b border-line">
      <div className="aurora-glow" aria-hidden />
      <div className="grid-bg pointer-events-none absolute inset-0" aria-hidden />

      <div className="relative mx-auto max-w-[1280px] px-6 pb-20 pt-20 md:px-10 md:pb-28 md:pt-28">
        <motion.div
          variants={container}
          initial={reduce ? false : "hidden"}
          animate="show"
          className="max-w-[860px]"
        >
          <motion.div variants={item} className="mono-label">
            {pillars.join("  ·  ")}
          </motion.div>

          <motion.h1 variants={item} className="mt-7 font-display text-display-2xl">
            <span className="block text-ink">AI-enabled finance.</span>
            <span className="gradient-text block">
              A human between the systems and the decisions.
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-8 max-w-[620px] text-[18px] leading-[1.65] text-ink-muted"
          >
            Vantage Rock is a fractional CFO firm. I build the finance function —
            the close, the forecast, the cash view, the reporting — and put AI on the
            mechanical work, so the numbers arrive while they can still change a
            decision.
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-4">
            <CTAButton href="#book">{CTA_LABEL}</CTAButton>
            <span className="font-mono text-[11.5px] tracking-[0.05em] text-ink-dim">
              Direct with the founder. A fit-check — we don&apos;t diagnose on the call.
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Qualifying strip — tells the right visitor they're in the right place */}
      <div className="relative border-t border-line bg-bg-raised/60">
        <div className="mx-auto grid max-w-[1280px] gap-px bg-line px-0 md:grid-cols-3">
          {[
            {
              k: "Who it's for",
              v: "Founder-led and sponsor-backed companies from $1M in revenue, usually alongside an existing bookkeeper or controller.",
            },
            {
              k: "Where it's strongest",
              v: "Healthcare, professional services, technology and SaaS, and multi-entity groups.",
            },
            {
              k: "What you get",
              v: "A finance function that produces answers in days, and a system that keeps producing them after I'm gone.",
            },
          ].map((c) => (
            <div key={c.k} className="bg-bg-raised px-6 py-7 md:px-8">
              <div className="mono-label">{c.k}</div>
              <p className="mt-3 text-[14.5px] leading-[1.6] text-ink-muted">{c.v}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
