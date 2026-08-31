"use client";

import { motion, useReducedMotion } from "framer-motion";
import CTAButton from "../CTAButton";
import ScorecardPanel from "../ScorecardPanel";

const steps = [
  {
    title: "Score",
    desc: "Seven areas. Sample only.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.4" />
        <path d="M16 16l5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M8.5 12v-2M11 12V8.5M13.5 12v-3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Fit-check",
    desc: "30 minutes. We don't diagnose on the call.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect x="4" y="3" width="16" height="18" rx="2" stroke="currentColor" strokeWidth="1.4" />
        <path d="M8 8.5l1.5 1.5L12 7M8 15l1.5 1.5L12 13.5M15 9h2M15 15.5h2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "The seat",
    desc: "Named agents on close, cash, expense, flux, and the day. After fit, from scope.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M12 3c3 2.5 4.5 6 4.5 9.5L12 17l-4.5-4.5C7.5 9 9 5.5 12 3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        <circle cx="12" cy="9.5" r="1.6" stroke="currentColor" strokeWidth="1.3" />
        <path d="M9 18.5L7.5 21M15 18.5L16.5 21" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
  },
];

const outcomes = [
  { title: "A finance function that leads" },
  { title: "Cash that isn't the bank balance" },
  { title: "Forecasts that survive Q2" },
  { title: "Reporting that isn't a Monday rebuild" },
];

export default function Hero() {
  const reduce = useReducedMotion();

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
  };
  const item = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
  };
  const float = (delay: number) =>
    reduce
      ? {}
      : {
          animate: { y: [0, -9, 0] },
          transition: { duration: 6, repeat: Infinity, ease: "easeInOut", delay },
        };

  return (
    <section id="top" className="relative overflow-hidden border-b border-line">
      <div className="aurora-glow" />
      <div className="grid-bg pointer-events-none absolute inset-0" aria-hidden />

      <div className="relative mx-auto max-w-[1280px] px-6 pb-16 pt-16 md:px-10 md:pb-20 md:pt-20">
        <motion.div
          variants={container}
          initial={reduce ? false : "hidden"}
          animate="show"
          className="grid items-center gap-14 lg:grid-cols-[1.02fr_1fr] lg:gap-14"
        >
          {/* Left — copy */}
          <div className="max-w-[600px]">
            <motion.h1 variants={item} className="font-display text-display-2xl">
              <span className="block text-ink">AI-enabled finance.</span>
              <span className="gradient-text block italic">Not a chatbot on last month&apos;s file.</span>
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-7 max-w-[500px] text-[17px] leading-[1.6] text-ink-muted"
            >
              Most shops using that phrase are running a prompt box on a
              spreadsheet nobody trusts. We run this firm with AI on the
              operating work so the operator stays on clients. Then we put the
              same idea in your finance seat. Human on the decisions. Agents on
              the rest.
            </motion.p>

            <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-3">
              <CTAButton href="#book">30-minute Finance Systems Review</CTAButton>
            </motion.div>

            <motion.div
              variants={item}
              className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] tracking-[0.05em] text-ink-dim"
            >
              <span>30 minutes</span>
              <span className="text-teal">•</span>
              <span>we see if it&apos;s a fit</span>
              <span className="text-teal">•</span>
              <span>we don&apos;t diagnose on the call</span>
            </motion.div>
          </div>

          {/* Right — scorecard with floating callout cards */}
          <motion.div variants={item} className="relative">
            {/* Floating card: a system that holds */}
            <motion.div
              {...float(0)}
              className="absolute -left-4 top-[14%] z-20 hidden w-[186px] rounded-xl border border-line bg-bg-raised p-3.5 soft-shadow lg:block"
            >
              <div className="flex items-start gap-2.5">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-teal/10 text-teal">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
                    <path d="M12 2v3M12 19v3M2 12h3M19 12h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </div>
                <div>
                  <div className="text-[11px] font-medium leading-[1.35] text-ink">A system that holds</div>
                </div>
              </div>
            </motion.div>

            {/* Floating card: cash you can actually see */}
            <motion.div
              {...float(1.6)}
              className="absolute -left-2 bottom-[13%] z-20 hidden w-[172px] rounded-xl border border-line bg-bg-raised p-3.5 soft-shadow lg:block"
            >
              <div className="text-[11px] font-medium text-ink">Cash you can actually see</div>
              <svg viewBox="0 0 120 26" className="mt-2 w-full" aria-hidden>
                <path
                  d="M0 22 L20 18 L40 20 L60 12 L80 14 L100 6 L120 3"
                  fill="none"
                  stroke="#17A89A"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>

            {/* Floating card: a human on the decisions */}
            <motion.div
              {...float(0.8)}
              className="absolute -right-3 top-[30%] z-20 hidden w-[160px] rounded-xl border border-line bg-bg-raised p-3.5 soft-shadow lg:block"
            >
              <div className="text-[11px] font-medium leading-[1.35] text-ink">A human on the decisions</div>
            </motion.div>

            <div className="relative z-10 lg:px-8">
              <ScorecardPanel />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Three-step strip */}
      <div className="relative mx-auto max-w-[1280px] px-6 pb-6 md:px-10">
        <div className="grid gap-4 md:grid-cols-3">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.09, ease: [0.16, 1, 0.3, 1] }}
              className="card-lift group flex items-start gap-4 rounded-xl border border-line bg-bg-raised p-5 soft-shadow"
            >
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-teal/10 text-teal transition-colors group-hover:bg-teal/15">
                {s.icon}
              </div>
              <div>
                <h3 className="font-display text-[19px] leading-tight text-ink">{s.title}</h3>
                <p className="mt-1 text-[13px] leading-[1.5] text-ink-muted">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Outcomes strip */}
      <div className="relative mx-auto max-w-[1280px] px-6 pb-14 md:px-10">
        <div className="grid divide-y divide-line rounded-xl border border-line bg-bg-raised soft-shadow md:grid-cols-4 md:divide-x md:divide-y-0">
          {outcomes.map((o, i) => (
            <motion.div
              key={o.title}
              initial={reduce ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="flex items-center gap-3.5 px-5 py-5"
            >
              <span className="h-8 w-[2px] flex-shrink-0 rounded-full bg-teal/50" aria-hidden />
              <div>
                <div className="text-[13.5px] font-medium text-ink">{o.title}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
