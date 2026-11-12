"use client";

import { motion, useReducedMotion } from "framer-motion";
import CTAButton from "../CTAButton";
import Contours from "../Contours";
import { CTA_LABEL } from "@/lib/site";

const pillars = ["Fractional CFO", "FP&A", "AI Implementation"];

const facts = [
  {
    k: "Who it's for",
    v: "Founder-led and sponsor-backed companies from $1M in revenue.",
  },
  {
    k: "Where it's strongest",
    v: "Healthcare, retail, professional services, technology and SaaS, and multi-entity groups.",
  },
  {
    k: "What you get",
    v: "Senior finance leadership, with AI on the work, without a full-time hire.",
  },
];

export default function Hero() {
  const reduce = useReducedMotion();

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
  };
  const item = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section id="top" className="relative overflow-hidden bg-navy text-ink-invert">
      {/* The rock, drawn as a survey map draws it. Fades out behind the copy. */}
      <div
        className="pointer-events-none absolute inset-y-0 right-[-18%] w-[115%] text-teal-bright opacity-50 md:right-[-8%] md:w-[78%] md:opacity-100"
        style={{
          maskImage: "linear-gradient(90deg, transparent 0%, #000 46%, #000 100%)",
          WebkitMaskImage: "linear-gradient(90deg, transparent 0%, #000 46%, #000 100%)",
        }}
        aria-hidden
      >
        <Contours className="h-full w-full" />
      </div>

      <div className="relative mx-auto max-w-[1280px] px-6 pb-24 pt-24 md:px-10 md:pb-36 md:pt-36">
        <motion.div
          variants={container}
          initial={reduce ? false : "hidden"}
          animate="show"
          className="max-w-[900px]"
        >
          <motion.ul
            variants={item}
            className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] font-medium text-ink-invert/70"
          >
            {pillars.map((p, i) => (
              <li key={p} className="flex items-center gap-5">
                {i > 0 && <span className="h-3 w-px bg-brass" aria-hidden />}
                {p}
              </li>
            ))}
          </motion.ul>

          <motion.h1 variants={item} className="mt-9 font-display text-display-2xl">
            <span className="block">AI-enabled finance.</span>
            <span className="block italic text-teal-bright">
              Fractional CFO. Without the full-time hire.
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-10 max-w-[600px] text-[18.5px] leading-[1.65] text-ink-invert/75"
          >
            Vantage Rock is a fractional CFO firm that uses AI so close, cash, and
            reporting keep up with the business. You get senior finance leadership
            without the cost or commitment of a full-time hire.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-12 flex flex-wrap items-center gap-x-7 gap-y-4"
          >
            <CTAButton variant="light" href="#book">
              {CTA_LABEL}
            </CTAButton>
            <span className="max-w-[300px] text-[13.5px] leading-[1.5] text-ink-invert/55">
              Direct with the founder. A fit-check. We don&apos;t diagnose on the call.
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Tells the right visitor they are in the right place */}
      <div className="relative border-t border-white/10 bg-navy-deep/80">
        <dl className="mx-auto grid max-w-[1280px] md:grid-cols-3">
          {facts.map((c, i) => (
            <div
              key={c.k}
              className={`px-6 py-8 md:px-10 md:py-9 ${
                i > 0 ? "border-t border-white/10 md:border-l md:border-t-0" : ""
              }`}
            >
              <dt className="text-[12.5px] font-medium text-brass-soft">{c.k}</dt>
              <dd className="mt-3 text-[15px] leading-[1.6] text-ink-invert/80">{c.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
