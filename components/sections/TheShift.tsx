"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Reveal from "../Reveal";
import SectionHead from "../SectionHead";

function CheckIcon({ bright = false }: { bright?: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0" aria-hidden>
      <circle cx="8" cy="8" r="7" stroke={bright ? "#2EE6C9" : "currentColor"} strokeWidth="1.2" />
      <path d="M5 8l2 2 4-4.5" stroke={bright ? "#2EE6C9" : "currentColor"} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const agents = [
  {
    name: "Month-End Close Agent",
    q: "What's holding up the close, and how much can we run without my team touching it?",
    does: "Accruals, recons, journal entries. What's open, what's blocking, what can move without a click.",
  },
  {
    name: "Cashflow Agent",
    q: "Who owes us, where, which ones are about to slip, and what have we done about it?",
    does: "AR by client and invoice. Follow-up tracked. Every number tied to a datapoint you can trace.",
  },
  {
    name: "Expense Agent",
    q: "Which costs are trending up, and which ones do I need to pay attention to?",
    does: "Month-over-month on the cost lines, with the why — not just the delta.",
  },
  {
    name: "Flux Analysis Agent",
    q: "What changed in the P&L vs. last period, why, and is it a problem I need to address?",
    does: "Variance with the narrative. Learns from corrections.",
  },
  {
    name: "Daily Brief Agent",
    q: "What's actually on my plate today, and am I walking into every meeting prepared?",
    does: "CRM, email, calendar, transcripts, Slack, trackers. Priorities and a brief for each meeting.",
  },
];

export default function TheShift() {
  return (
    <section id="shift" className="border-b border-line">
      <div className="mx-auto max-w-[1280px] px-6 py-20 md:px-10 md:py-24">
        <SectionHead
          number="02"
          label="The shift"
          heading="The finance function either leads or it files."
          dim="Most file."
        />

        <div className="grid gap-6 lg:grid-cols-[1fr_1fr_0.8fr]">
          {/* AI-enabled finance */}
          <Reveal delay={0.05}>
            <Link
              href="/ai-enabled-finance"
              className="card-lift block h-full rounded-xl border border-line bg-bg-raised p-7 soft-shadow"
            >
              <div className="mono-label mb-6">AI-enabled finance</div>
              <p className="text-[15px] leading-[1.6] text-ink">
                A function that can actually lead. Not a dashboard with a prompt box.
              </p>
            </Link>
          </Reveal>

          {/* AI-native financial leadership */}
          <Reveal delay={0.12}>
            <div className="card-lift relative h-full rounded-xl border border-teal/30 bg-bg-raised p-7 soft-shadow">
              <span className="absolute right-6 top-7 h-px w-8 bg-teal/40" />
              <div className="mono-label mb-6 !text-teal">AI-native financial leadership</div>
              <p className="text-[15px] leading-[1.6] text-ink">
                Humans on the decisions, agents on the rest. We build finance systems that think.
              </p>
            </div>
          </Reveal>

          {/* Fractional CFO — dark panel */}
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
                Fractional CFO
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

              <p className="flex items-start gap-3 text-[13px]" style={{ color: "#C5D2DD" }}>
                <span className="mt-0.5"><CheckIcon bright /></span>
                The seat. Score first. Then a Review.
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.08}>
          <div className="mt-16">
            <p className="mono-label mb-3">What the seat actually runs</p>
            <h3 className="max-w-[640px] font-display text-[28px] tracking-[-0.02em] text-ink md:text-[32px]">
              Five agents. One fractional CFO.
            </h3>
            <p className="mt-3 max-w-[560px] text-[16px] leading-[1.55] text-ink-muted">
              Each agent owns a question the finance seat already has to answer.
              Human on the decisions. Agents on the rest.
            </p>

            <ol className="mt-8 divide-y divide-line border-y border-line">
              {agents.map((a) => (
                <li key={a.name} className="grid gap-2 py-6 md:grid-cols-[minmax(0,220px)_1fr] md:gap-10">
                  <p className="font-medium text-[15px] text-ink">{a.name}</p>
                  <div>
                    <p className="text-[15px] italic leading-[1.45] text-ink-muted">{a.q}</p>
                    <p className="mt-2 text-[15px] leading-[1.55] text-ink">{a.does}</p>
                  </div>
                </li>
              ))}
            </ol>

            <Link
              href="/cfo-ai-agents"
              className="mt-8 inline-flex items-center gap-2 text-[13px] font-medium text-teal transition-colors hover:text-teal-deep"
            >
              How each agent works
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                <path
                  d="M3 9L9 3M9 3H4M9 3V8"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              </svg>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
