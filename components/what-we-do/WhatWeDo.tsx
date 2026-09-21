"use client";

import {
  CTA_LABEL,
  CONTACT_EMAIL,
  COMPANY_LINKEDIN,
  SITE_URL,
} from "@/lib/site";

/* ─── data ─────────────────────────────────────────────── */

const traditional = [
  "Manual reporting & data pulls",
  "Reactive forecasting",
  "Siloed systems",
  "High operational overhead",
  "Limited real-time visibility",
  "Spreadsheets & manual models",
];

const aiNative = [
  "Autonomous reporting",
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

type Pkg = {
  name: string;
  tagline: string;
  popular?: boolean;
  inheritsLabel: string;
  features: string[];
  idealFor: string;
};

const packages: Pkg[] = [
  {
    name: "Essentials",
    tagline: "Financial Clarity. Better Decisions.",
    inheritsLabel: "What's included",
    features: [
      "Monthly financial review",
      "KPI dashboard (up to 10 KPIs)",
      "Monthly executive summary",
      "30-min monthly strategy call",
      "Email support",
    ],
    idealFor: "Businesses that need clear financials and visibility.",
  },
  {
    name: "Growth",
    tagline: "Plan Ahead. Drive Growth.",
    popular: true,
    inheritsLabel: "Everything in Essentials, plus",
    features: [
      "Cash flow forecasting",
      "Budget vs. actual analysis",
      "AI opportunity assessment",
      "Process improvement recommendations",
      "Two strategy calls per month",
      "Priority email & chat support",
    ],
    idealFor: "Growing businesses ready to improve performance and profitability.",
  },
  {
    name: "Scale",
    tagline: "Strategic Leadership. Scalable Systems.",
    inheritsLabel: "Everything in Growth, plus",
    features: [
      "Full fractional CFO support",
      "AI implementation roadmap",
      "Advanced KPI dashboards",
      "Board & investor reporting",
      "Weekly or on-demand support",
      "Strategic planning & scenario modeling",
    ],
    idealFor: "Scaling companies that need executive-level financial leadership.",
  },
];

const auditGets = [
  "Current state assessment",
  "Process map & workflow review",
  "AI opportunities & impact analysis",
  "Cost savings estimate",
  "Implementation roadmap",
];

const coreServices = [
  {
    name: "Fractional CFO Services",
    blurb: "Executive-level financial leadership without the full-time cost.",
    icon: "M3 21h18M5 21V10M12 21V10M19 21V10M3 10l9-6 9 6",
  },
  {
    name: "Financial Reporting & Dashboards",
    blurb: "Real-time visibility into performance, cash flow, and key KPIs.",
    icon: "M4 20V10M10 20V4M16 20v-7M22 20H2",
  },
  {
    name: "Cash Flow & Forecasting",
    blurb: "AI-powered forecasting for better planning and decision making.",
    icon: "M3 16l5-5 4 4 8-8M20 7v4h-4",
  },
  {
    name: "AI Automation & Integration",
    blurb: "Automate repetitive workflows and integrate intelligent systems.",
    icon: "M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83",
  },
  {
    name: "Process Improvement & Efficiency",
    blurb: "Streamline operations and reduce manual work across finance.",
    icon: "M4 6h16M4 12h16M4 18h16",
  },
  {
    name: "Strategic Planning & Advisory",
    blurb: "Align financial strategy with business goals and growth initiatives.",
    icon: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
  },
];

const operatingModel = [
  "AI Reporting",
  "Forecasting & Modeling",
  "Dashboards & Analytics",
  "Treasury & Cash",
  "Commissions Systems",
  "KPI Intelligence",
  "Close Acceleration",
  "Portfolio Visibility",
];

const partners = [
  { name: "Private Equity Firms", blurb: "Drive value through modern finance." },
  { name: "Portfolio Companies", blurb: "Modernize finance operations and improve performance." },
  { name: "Founder-Led Businesses", blurb: "Build scalable financial infrastructure." },
  { name: "Middle-Market Operators", blurb: "Improve profitability and operational efficiency." },
  { name: "Professional Services & Agencies", blurb: "Clarity, insight, and automation for the books." },
];

const impactThemes = [
  { stat: "50%+", label: "Faster Close Cycles" },
  { stat: "30–60%", label: "Reduced Finance Overhead" },
  { stat: "3–5×", label: "Improved Reporting Visibility" },
  { stat: "Better", label: "Decisions from real-time insights" },
];

const caseResults = [
  "Close cycle reduced from 15 days to 3 days",
  "60% reduction in manual work",
  "Real-time KPI visibility across the business",
  "Better cash flow management and decisions",
];

/* ─── icons ────────────────────────────────────────────── */

function Check({ bright = false }: { bright?: boolean }) {
  const stroke = bright ? "#2EE6C9" : "#17A89A";
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" className="mt-[2px] flex-shrink-0" aria-hidden>
      <circle cx="8" cy="8" r="7" stroke={stroke} strokeWidth="1.1" opacity="0.5" />
      <path d="M5 8l2 2 4-4.5" stroke={stroke} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function XMark() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" className="mt-[2px] flex-shrink-0" aria-hidden>
      <circle cx="8" cy="8" r="7" stroke="#8597A6" strokeWidth="1.1" opacity="0.55" />
      <path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="#8597A6" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

/* ─── page ─────────────────────────────────────────────── */

export default function WhatWeDo() {
  return (
    <article className="bg-bg text-ink">
      {/* ── Header band: logo feel + headline (PDF-like) ─ */}
      <section className="border-b border-line">
        <div className="mx-auto grid max-w-[1100px] gap-6 px-5 py-8 md:grid-cols-[0.9fr_1.4fr] md:items-end md:gap-10 md:px-8 md:py-10">
          <div>
            <div className="mono-label !text-teal">AI-Native Financial Leadership</div>
            <p className="mt-3 max-w-[320px] text-[13px] leading-[1.55] text-ink-muted">
              Fractional CFO + AI automation for growing businesses.
            </p>
          </div>
          <div>
            <h1 className="font-display text-[clamp(1.55rem,3.2vw,2.15rem)] leading-[1.15] tracking-[-0.025em] text-ink">
              AI-Native Financial Leadership for Smarter Decisions and Sustainable Growth.
            </h1>
            <p className="mt-3 max-w-[560px] text-[13.5px] leading-[1.6] text-ink-muted">
              Vantage Rock is a fractional CFO firm that combines deep financial
              expertise with AI automation to modernize finance departments,
              improve visibility, and drive measurable results.
            </p>
          </div>
        </div>
      </section>

      {/* ── The Shift — 3-col ──────────────────────────── */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-[1100px] px-5 py-8 md:px-8 md:py-9">
          <div className="grid gap-5 lg:grid-cols-[0.85fr_1.35fr_0.95fr] lg:items-stretch">
            {/* Intro */}
            <div className="flex flex-col justify-center">
              <div className="mono-label mb-2 !text-teal">The Shift</div>
              <h2 className="font-display text-[22px] leading-[1.2] tracking-[-0.02em] text-ink md:text-[24px]">
                The CFO role is evolving.
              </h2>
              <p className="mt-3 text-[13px] leading-[1.55] text-ink-muted">
                We help growing businesses move from manual, reactive finance to
                AI-native systems that are proactive, automated, and built for scale.
              </p>
            </div>

            {/* Traditional vs AI-native side-by-side */}
            <div className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
              <div className="bg-bg-raised p-4 md:p-5">
                <div className="mono-label mb-3 !text-[9px]">Traditional Finance Model</div>
                <ul className="space-y-2">
                  {traditional.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-[12px] leading-[1.4] text-ink-muted">
                      <XMark />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-bg-raised p-4 md:p-5">
                <div className="mono-label mb-3 !text-[9px] !text-teal">AI-Native Finance Model</div>
                <ul className="space-y-2">
                  {aiNative.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-[12px] leading-[1.4] text-ink">
                      <Check />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* AI Oversight Layer */}
            <div
              className="relative overflow-hidden rounded-lg p-5"
              style={{
                background: "linear-gradient(160deg, #0F2235 0%, #0B1A2A 70%, #081421 100%)",
              }}
            >
              <div
                className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full blur-3xl"
                style={{ background: "rgba(46,230,201,0.16)" }}
                aria-hidden
              />
              <div className="relative">
                <div className="mono-label mb-3 !text-[9px]" style={{ color: "#2EE6C9" }}>
                  AI Oversight Layer
                </div>
                <div className="mb-4 flex flex-col items-start gap-[3px]">
                  {[0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="rounded-sm"
                      style={{
                        width: `${72 - i * 10}%`,
                        height: 6,
                        background: `rgba(46,230,201,${0.72 - i * 0.14})`,
                      }}
                    />
                  ))}
                </div>
                <ul className="space-y-2">
                  {oversight.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-[12px] leading-[1.4]"
                      style={{ color: "#C5D2DD" }}
                    >
                      <Check bright />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Packages — 3 compact cards ─────────────────── */}
      <section id="packages" className="border-b border-line bg-bg-sunken">
        <div className="mx-auto max-w-[1100px] px-5 py-8 md:px-8 md:py-9">
          <div className="mb-5 flex flex-col gap-1 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mono-label mb-1.5 !text-teal">Fractional CFO + AI Automation</div>
              <h2 className="font-display text-[20px] tracking-[-0.02em] text-ink md:text-[22px]">
                Flexible packages designed to meet your business where you are.
              </h2>
            </div>
            <p className="text-[12px] text-ink-dim md:text-right">Contact for pricing · scoped after fit</p>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className={`relative flex h-full flex-col rounded-lg border bg-bg-raised p-5 ${
                  pkg.popular
                    ? "border-teal/45 shadow-[0_12px_36px_-14px_rgba(23,168,154,0.28)]"
                    : "border-line"
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-2.5 right-4">
                    <span className="rounded-full bg-teal px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.12em] text-white">
                      Most popular
                    </span>
                  </div>
                )}
                <div className="font-display text-[22px] tracking-[-0.02em] text-ink">{pkg.name}</div>
                <div className="mt-1 text-[12px] font-medium text-teal">{pkg.tagline}</div>

                <div className="mono-label mb-2.5 mt-4 border-t border-line pt-3.5 !text-[9px]">
                  {pkg.inheritsLabel}
                </div>
                <ul className="mb-4 flex-1 space-y-2">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-[12.5px] leading-[1.4] text-ink-muted">
                      <Check />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="rounded-md bg-bg-sunken px-3.5 py-3">
                  <div className="mono-label mb-1 !text-[8.5px]">Ideal for</div>
                  <p className="mb-2.5 text-[12px] leading-[1.45] text-ink-muted">{pkg.idealFor}</p>
                  <div className="mono-label mb-0.5 !text-[8.5px]">Pricing</div>
                  <p className="text-[12.5px] font-medium text-ink">Contact for pricing</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Audit + Implementation — tight band ────────── */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-[1100px] px-5 py-7 md:px-8">
          <div className="grid gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-2">
            <div className="bg-bg-raised p-5 md:p-6">
              <div className="mono-label mb-2 !text-teal">AI Finance Audit</div>
              <h3 className="font-display text-[18px] tracking-[-0.02em] text-ink">
                See the opportunity. Then automate it.
              </h3>
              <p className="mt-2 text-[12.5px] leading-[1.55] text-ink-muted">
                We analyze your current finance processes and identify high-impact
                AI automation opportunities that save time, reduce costs, and
                improve accuracy.
              </p>
              <div className="mono-label mb-2 mt-4 !text-[9px]">What you get</div>
              <ul className="mb-4 space-y-1.5">
                {auditGets.map((g) => (
                  <li key={g} className="flex items-start gap-2 text-[12px] leading-[1.4] text-ink-muted">
                    <Check />
                    {g}
                  </li>
                ))}
              </ul>
              <p className="text-[12.5px] font-medium text-ink">Contact for pricing</p>
            </div>

            <div className="bg-bg-raised p-5 md:p-6">
              <div className="mono-label mb-2 !text-teal">Implementation Projects</div>
              <h3 className="font-display text-[18px] tracking-[-0.02em] text-ink">
                Build the systems. Scope what matters.
              </h3>
              <p className="mt-2 text-[12.5px] leading-[1.55] text-ink-muted">
                Custom scoped projects to design, build, and implement AI-enabled
                financial systems, models, and workflows for your business.
              </p>
              <div className="mt-5 rounded-md bg-bg-sunken px-3.5 py-3">
                <div className="mono-label mb-1 !text-[8.5px]">Engagement</div>
                <p className="text-[12.5px] font-medium text-ink">
                  Contact for pricing — scoped to the work
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Core Services — 6 compact icon row ─────────── */}
      <section className="border-b border-line bg-bg-sunken">
        <div className="mx-auto max-w-[1100px] px-5 py-7 md:px-8">
          <div className="mono-label mb-4 !text-teal">Core Services</div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {coreServices.map((s) => (
              <div
                key={s.name}
                className="rounded-lg border border-line bg-bg-raised px-3.5 py-4"
              >
                <div className="mb-2.5 flex h-8 w-8 items-center justify-center rounded-md bg-teal/10 text-teal">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path
                      d={s.icon}
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3 className="text-[12.5px] font-medium leading-[1.3] text-ink">{s.name}</h3>
                <p className="mt-1.5 text-[11px] leading-[1.45] text-ink-muted">{s.blurb}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Operating Model — dark strip ───────────────── */}
      <section
        style={{
          background: "linear-gradient(180deg, #0F2235 0%, #0B1A2A 55%, #081421 100%)",
        }}
      >
        <div className="mx-auto max-w-[1100px] px-5 py-6 md:px-8 md:py-7">
          <div className="mb-4 flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
            <h2 className="mono-label !text-[10px]" style={{ color: "#2EE6C9" }}>
              The AI-Native Finance Operating Model
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
            {operatingModel.map((name, i) => (
              <div key={name} className="flex flex-col items-center text-center">
                <div
                  className="mb-2 flex h-9 w-9 items-center justify-center rounded-full"
                  style={{
                    background: "rgba(46,230,201,0.12)",
                    color: "#2EE6C9",
                    border: "1px solid rgba(46,230,201,0.25)",
                  }}
                >
                  <span className="font-mono text-[9px] tabular">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="text-[11px] font-medium leading-[1.3]" style={{ color: "#F0F4F8" }}>
                  {name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom grid: Partners · Impact · Case · CTA ── */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-[1100px] px-5 py-8 md:px-8 md:py-9">
          <div className="grid gap-4 lg:grid-cols-4">
            {/* Who we partner with */}
            <div className="rounded-lg border border-line bg-bg-raised p-5">
              <div className="mono-label mb-3.5">Who we partner with</div>
              <ul className="space-y-3">
                {partners.map((p) => (
                  <li key={p.name}>
                    <div className="text-[12.5px] font-medium text-ink">{p.name}</div>
                    <p className="mt-0.5 text-[11px] leading-[1.4] text-ink-muted">{p.blurb}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Measurable impact */}
            <div className="rounded-lg border border-line bg-bg-raised p-5">
              <div className="mono-label mb-3.5">Measurable impact</div>
              <ul className="space-y-3.5">
                {impactThemes.map((t) => (
                  <li key={t.label} className="flex items-baseline gap-2.5">
                    <span className="tabular font-display text-[18px] leading-none text-teal">
                      {t.stat}
                    </span>
                    <span className="text-[12px] leading-[1.35] text-ink-muted">{t.label}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Case study */}
            <div className="rounded-lg border border-line bg-bg-raised p-5">
              <div className="mono-label mb-3.5">Case study snapshot</div>
              <div className="mb-2 text-[12.5px] font-medium text-ink">
                Healthcare & Wellness Company
              </div>
              <div className="space-y-2.5">
                <div>
                  <div className="mono-label mb-0.5 !text-[8.5px]">Challenge</div>
                  <p className="text-[11.5px] leading-[1.45] text-ink-muted">
                    Manual reporting, delayed close, limited visibility into performance.
                  </p>
                </div>
                <div>
                  <div className="mono-label mb-0.5 !text-[8.5px]">Solution</div>
                  <p className="text-[11.5px] leading-[1.45] text-ink-muted">
                    Reporting dashboards, cash flow forecasting, and AI-driven
                    automations across key workflows.
                  </p>
                </div>
                <div>
                  <div className="mono-label mb-0.5 !text-[8.5px]">Results</div>
                  <ul className="space-y-1">
                    {caseResults.map((r) => (
                      <li key={r} className="flex items-start gap-1.5 text-[11.5px] leading-[1.4] text-ink">
                        <Check />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <p className="mt-3 border-t border-line pt-2.5 text-[10px] leading-[1.4] text-ink-dim">
                Anonymized at the client&apos;s request. Not a promise of comparable outcomes.
              </p>
            </div>

            {/* Dark Schedule CTA */}
            <div
              id="book"
              className="relative overflow-hidden rounded-lg p-5"
              style={{
                background: "linear-gradient(160deg, #0F2235 0%, #0B1A2A 70%, #081421 100%)",
              }}
            >
              <div
                className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full blur-3xl"
                style={{ background: "rgba(46,230,201,0.14)" }}
                aria-hidden
              />
              <div className="relative flex h-full flex-col">
                <div className="mono-label mb-3 !text-[9px]" style={{ color: "#2EE6C9" }}>
                  Next step
                </div>
                <h3
                  className="font-display text-[17px] leading-[1.25] tracking-[-0.02em]"
                  style={{ color: "#F0F4F8" }}
                >
                  Ready to transform your finance function?
                </h3>
                <p className="mt-2.5 text-[12px] leading-[1.5]" style={{ color: "#C5D2DD" }}>
                  Let&apos;s identify opportunities to automate, streamline, and
                  elevate your finance organization. Fit-check — we don&apos;t
                  diagnose on the call.
                </p>
                <a
                  href="/#book"
                  className="mt-5 inline-flex items-center justify-center gap-2 rounded-md bg-teal px-4 py-2.5 text-[12.5px] font-medium text-white transition-colors hover:bg-teal-bright hover:text-navy"
                >
                  {CTA_LABEL}
                  <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden>
                    <path
                      d="M3 9L9 3M9 3H4M9 3V8"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                    />
                  </svg>
                </a>
                <div className="mt-auto space-y-1.5 pt-5 text-[11px]" style={{ color: "#8FA3B5" }}>
                  <a href={SITE_URL} className="block transition-colors hover:text-[#2EE6C9]">
                    vantagerockfinancial.com
                  </a>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="block transition-colors hover:text-[#2EE6C9]"
                  >
                    {CONTACT_EMAIL}
                  </a>
                  <a
                    href={COMPANY_LINKEDIN}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block transition-colors hover:text-[#2EE6C9]"
                  >
                    LinkedIn — Vantage Rock
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer tagline bar (PDF) ───────────────────── */}
      <footer
        style={{
          background: "linear-gradient(180deg, #0B1A2A 0%, #081421 100%)",
        }}
      >
        <div className="mx-auto flex max-w-[1100px] flex-col gap-3 px-5 py-5 md:flex-row md:items-center md:justify-between md:px-8">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span
              className="font-mono text-[11px] font-medium uppercase tracking-[0.18em]"
              style={{ color: "#2EE6C9" }}
            >
              Clarity
            </span>
            <span style={{ color: "#5A6B7B" }}>·</span>
            <span
              className="font-mono text-[11px] font-medium uppercase tracking-[0.18em]"
              style={{ color: "#2EE6C9" }}
            >
              Insight
            </span>
            <span style={{ color: "#5A6B7B" }}>·</span>
            <span
              className="font-mono text-[11px] font-medium uppercase tracking-[0.18em]"
              style={{ color: "#2EE6C9" }}
            >
              Automation
            </span>
          </div>
          <div
            className="font-mono text-[10px] uppercase tracking-[0.14em]"
            style={{ color: "#8FA3B5" }}
          >
            Financial leadership that drives growth.
          </div>
        </div>
      </footer>
    </article>
  );
}
