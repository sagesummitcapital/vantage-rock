"use client";

import Link from "next/link";
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

const layers = [
  {
    label: "The shop",
    href: undefined,
    body: "AI runs the operating work of Vantage Rock Financial. The operator stays on clients: Reviews, the Diagnostic, the seat. Same rule we sell: human on the decisions, system on the rest.",
  },
  {
    label: "The seat",
    href: "/cfo-ai-agents",
    body: "Five named agents go into the finance function. Close, cash, expense, flux, the day. Not a chatbot on last month's file. Not five SKUs.",
  },
  {
    label: "The map",
    href: "#diagnostic",
    body: "SCORECARD first. Seven areas, sample only. Then a 30-minute Review — fit-check, we don't diagnose on the call. Diagnostic and the agents only after fit.",
  },
];

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
          label="The picture"
          heading="We run the firm the same way we run the finance seat."
          dim="AI on the work. A human on the decisions."
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {layers.map((layer, i) => {
            const inner = (
              <>
                <div className={`mono-label mb-6 ${i === 1 ? "!text-teal" : ""}`}>
                  {layer.label}
                </div>
                <p className="text-[15px] leading-[1.6] text-ink">{layer.body}</p>
              </>
            );
            const className =
              "card-lift block h-full rounded-xl border border-line bg-bg-raised p-7 soft-shadow" +
              (i === 1 ? " border-teal/30" : "");
            return (
              <Reveal key={layer.label} delay={0.05 + i * 0.07}>
                {layer.href ? (
                  <a href={layer.href} className={className}>
                    {inner}
                  </a>
                ) : (
                  <div className={className}>{inner}</div>
                )}
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.08}>
          <div className="mt-16">
            <p className="mono-label mb-3">Agents in the seat</p>
            <h3 className="max-w-[640px] font-display text-[28px] tracking-[-0.02em] text-ink md:text-[32px]">
              Five agents we deploy. More as the shop grows.
            </h3>
            <p className="mt-3 max-w-[560px] text-[16px] leading-[1.55] text-ink-muted">
              Each one owns a question a CFO already has to answer. This is the
              list today. The SCORECARD tells us which to turn on first.
            </p>

            <ol className="mt-8 divide-y divide-line border-y border-line">
              {agents.map((a) => (
                <li
                  key={a.name}
                  className="grid gap-2 py-6 md:grid-cols-[minmax(0,220px)_1fr] md:gap-10"
                >
                  <p className="font-medium text-[15px] text-ink">{a.name}</p>
                  <div>
                    <p className="text-[15px] italic leading-[1.45] text-ink-muted">
                      {a.q}
                    </p>
                    <p className="mt-2 text-[15px] leading-[1.55] text-ink">
                      {a.does}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link
                href="/cfo-ai-agents"
                className="inline-flex items-center gap-2 text-[13px] font-medium text-teal transition-colors hover:text-teal-deep"
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
              <a
                href="#diagnostic"
                className="inline-flex items-center gap-2 text-[13px] font-medium text-ink-muted transition-colors hover:text-ink"
              >
                SCORECARD is the map
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                  <path
                    d="M6 3v6M3 6h6"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                </svg>
              </a>
            </div>
          </div>
        </Reveal>

        {/* Keep a quiet fractional-CFO tell under the picture */}
        <Reveal delay={0.14}>
          <p className="mt-14 flex items-start gap-3 text-[13px] text-ink-muted">
            <span className="mt-0.5 text-teal">
              <CheckIcon bright />
            </span>
            Fractional CFO is the seat. Score first. Then a Review. Agents after
            fit.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
