"use client";

import Image from "next/image";
import {
  CONTACT_EMAIL,
  COMPANY_LINKEDIN,
  SITE_URL,
} from "@/lib/site";

/* ─── data (PDF copy; no list prices) ─────────────────── */

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
  description: string;
  popular?: boolean;
  inheritsLabel: string;
  features: string[];
  idealFor: string;
  icon: "mountain" | "chart" | "rocket";
};

const packages: Pkg[] = [
  {
    name: "ESSENTIALS",
    tagline: "Financial Clarity. Better Decisions.",
    description:
      "Core financial support to give you visibility, structure, and confidence in your numbers.",
    inheritsLabel: "WHAT'S INCLUDED",
    features: [
      "Monthly financial review",
      "KPI dashboard (up to 10 KPIs)",
      "Monthly executive summary",
      "30-min monthly strategy call",
      "Email support",
    ],
    idealFor: "Businesses that need clear financials and visibility.",
    icon: "mountain",
  },
  {
    name: "GROWTH",
    tagline: "Plan Ahead. Drive Growth.",
    description:
      "Expanded financial support and strategic insights to help you optimize performance and scale.",
    popular: true,
    inheritsLabel: "EVERYTHING IN ESSENTIALS, PLUS:",
    features: [
      "Cash flow forecasting",
      "Budget vs. actual analysis",
      "AI opportunity assessment",
      "Process improvement recommendations",
      "Two strategy calls per month",
      "Priority email & chat support",
    ],
    idealFor: "Growing businesses ready to improve performance and profitability.",
    icon: "chart",
  },
  {
    name: "SCALE",
    tagline: "Strategic Leadership. Scalable Systems.",
    description:
      "A full strategic finance partner to help you scale efficiently and prepare for what's next.",
    inheritsLabel: "EVERYTHING IN GROWTH, PLUS:",
    features: [
      "Full fractional CFO support",
      "AI implementation roadmap",
      "Advanced KPI dashboards",
      "Board & investor reporting",
      "Weekly or on-demand support",
      "Strategic planning & scenario modeling",
    ],
    idealFor: "Scaling companies that need executive-level financial leadership.",
    icon: "rocket",
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
    icon: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM19 8v6M22 11h-6",
  },
  {
    name: "Financial Reporting & Dashboards",
    blurb: "Real-time visibility into performance, cash flow, and key KPIs.",
    icon: "M4 20V10M10 20V4M16 20v-7M22 20H2",
  },
  {
    name: "Cash Flow & Forecasting",
    blurb: "AI-powered forecasting to improve planning and decision making.",
    icon: "M3 17l5-5 4 4 8-8M14 8h6v6",
  },
  {
    name: "AI Automation & Integration",
    blurb: "Automate repetitive workflows and integrate intelligent systems.",
    icon: "M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z",
  },
  {
    name: "Process Improvement & Efficiency",
    blurb: "Streamline operations and reduce manual work across finance.",
    icon: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z",
  },
  {
    name: "Strategic Planning & Advisory",
    blurb: "Align financial strategy with business goals and growth initiatives.",
    icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  },
];

const operatingModel = [
  { name: "AI Reporting", blurb: "Real-time financial reporting." },
  { name: "Forecasting & Modeling", blurb: "AI-driven forecasting & scenario modeling." },
  { name: "Dashboards & Analytics", blurb: "Executive insights & operational intelligence." },
  { name: "Treasury & Cash Management", blurb: "Intelligent cash forecasting & treasury workflows." },
  { name: "Commissions Systems", blurb: "Automated commission calculations & tracking." },
  { name: "KPI Intelligence", blurb: "AI-powered KPI monitoring & performance insights." },
  { name: "Close Acceleration", blurb: "Automated close workflows & reconciliation intelligence." },
  { name: "Portfolio Visibility", blurb: "Enterprise visibility across all portfolio entities." },
];

const partners = [
  { name: "Private Equity Firms", blurb: "Drive value through modern finance." },
  { name: "Portfolio Companies", blurb: "Modernize finance operations and improve performance." },
  { name: "Founder-Led Businesses", blurb: "Build scalable financial infrastructure." },
  { name: "Middle-Market Operators", blurb: "Improve profitability and operational efficiency." },
  { name: "Professional Services & Agencies", blurb: "Clarity, insight, and automation for the books." },
];

const impactThemes = [
  { label: "Faster Close Cycles" },
  { label: "Reduced Finance Overhead" },
  { label: "Improved Reporting Visibility" },
  { label: "Better Decisions — Real-time Insights That Drive Growth." },
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
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="mt-[1px] flex-shrink-0" aria-hidden>
      <circle cx="8" cy="8" r="7" stroke={stroke} strokeWidth="1.2" />
      <path d="M5 8l2 2 4-4.5" stroke={stroke} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function XMark() {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="mt-[1px] flex-shrink-0" aria-hidden>
      <circle cx="8" cy="8" r="7" stroke="#0B1A2A" strokeWidth="1.2" fill="#0B1A2A" />
      <path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function PkgIcon({ kind }: { kind: Pkg["icon"] }) {
  const paths: Record<Pkg["icon"], string> = {
    mountain: "M3 20h18L14 8l-3 5-2-2-6 9z",
    chart: "M4 19V9M10 19V5M16 19v-7M3 19h18M14 8l4-4 3 3",
    rocket: "M5 19c4-1 6-3 8-7l3-1 1 3-1 3c-4 2-6 4-7 8l-3-1-1-3 3-1zM14 8l2-5 5 2-3 4",
  };
  return (
    <div
      className="mx-auto mb-2.5 flex h-10 w-10 items-center justify-center rounded-full"
      style={{ background: "#0B1A2A" }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d={paths[kind]} stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function SectionRule({ title }: { title: string }) {
  return (
    <div className="mb-3.5 flex items-center gap-3">
      <div className="h-px flex-1" style={{ background: "#17A89A" }} />
      <h2
        className="whitespace-nowrap font-sans text-[11px] font-bold uppercase tracking-[0.18em]"
        style={{ color: "#17A89A" }}
      >
        {title}
      </h2>
      <div className="h-px flex-1" style={{ background: "#17A89A" }} />
    </div>
  );
}

/* ─── page — digital PDF one-pager ─────────────────────── */

export default function WhatWeDo() {
  return (
    <div className="wwd-page" style={{ background: "#E6EAEE", minHeight: "100vh" }}>
      {/* Tiny chrome: logo → home only */}
      <div className="mx-auto flex max-w-[1080px] items-center justify-between px-3 pb-2 pt-3 sm:px-4">
        <a href="/" className="inline-flex items-center opacity-80 transition-opacity hover:opacity-100" aria-label="Home">
          <Image
            src="/logo-light.png"
            alt="Vantage Rock Financial"
            width={1042}
            height={459}
            priority
            unoptimized
            className="h-6 w-auto sm:h-7"
          />
        </a>
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="text-[11px] font-medium transition-colors hover:opacity-80"
          style={{ color: "#0B1A2A" }}
        >
          {CONTACT_EMAIL}
        </a>
      </div>

      {/* White document sheet */}
      <article
        className="mx-auto mb-8 max-w-[1040px] overflow-hidden bg-white"
        style={{
          border: "1px solid rgba(11,26,42,0.10)",
          boxShadow: "0 1px 2px rgba(11,26,42,0.04), 0 18px 48px -20px rgba(11,26,42,0.22)",
        }}
      >
        {/* ═══ HEADER ═══ */}
        <header className="grid gap-5 border-b px-5 py-5 sm:px-7 sm:py-6 md:grid-cols-[0.72fr_1.28fr] md:gap-8" style={{ borderColor: "rgba(11,26,42,0.10)" }}>
          <div className="flex flex-col items-start justify-center">
            <Image
              src="/vr-mark.png"
              alt=""
              width={424}
              height={290}
              unoptimized
              className="mb-2 h-11 w-auto"
              aria-hidden
            />
            <div className="font-display text-[17px] font-semibold uppercase leading-none tracking-[0.04em]" style={{ color: "#0B1A2A" }}>
              Vantage Rock
            </div>
            <div className="mt-1.5 flex w-full max-w-[200px] items-center gap-2">
              <span className="h-px flex-1" style={{ background: "#17A89A" }} />
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em]" style={{ color: "#17A89A" }}>
                Financial
              </span>
              <span className="h-px flex-1" style={{ background: "#17A89A" }} />
            </div>
            <div className="mt-2 text-[9px] font-semibold uppercase tracking-[0.16em]" style={{ color: "#0B1A2A" }}>
              AI-Native Financial Leadership
            </div>
          </div>

          <div className="md:border-l md:pl-8" style={{ borderColor: "rgba(11,26,42,0.10)" }}>
            <h1 className="font-display text-[clamp(1.35rem,2.6vw,1.85rem)] leading-[1.18] tracking-[-0.02em]" style={{ color: "#0B1A2A" }}>
              AI-Native Financial Leadership
              <span className="mt-1 block h-[3px] w-16" style={{ background: "#17A89A" }} aria-hidden />
              <span className="mt-1.5 block">
                for{" "}
                <span style={{ color: "#17A89A" }}>Smarter Decisions</span>
                {" "}and{" "}
                <span style={{ color: "#17A89A" }}>Sustainable Growth.</span>
              </span>
            </h1>
            <p className="mt-3 max-w-[540px] text-[12.5px] leading-[1.55]" style={{ color: "#4A5C6C" }}>
              Vantage Rock is a fractional CFO firm that combines deep financial
              expertise with AI automation to modernize finance departments,
              improve visibility, and drive measurable results.
            </p>
          </div>
        </header>

        {/* ═══ THE SHIFT ═══ */}
        <section className="border-b px-5 py-5 sm:px-7 sm:py-5" style={{ borderColor: "rgba(11,26,42,0.10)" }}>
          <div className="grid gap-4 lg:grid-cols-[0.78fr_1.45fr_0.95fr] lg:items-stretch">
            <div className="flex flex-col justify-center">
              <div className="mb-1.5 flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: "#17A89A" }}>
                  The Shift
                </span>
                <span className="h-px w-8" style={{ background: "#17A89A" }} />
              </div>
              <h2 className="font-display text-[20px] leading-[1.2] tracking-[-0.02em]" style={{ color: "#0B1A2A" }}>
                The CFO role is evolving.
              </h2>
              <p className="mt-2.5 text-[12px] leading-[1.5]" style={{ color: "#4A5C6C" }}>
                We help growing businesses move from manual, reactive finance to
                AI-native systems that are proactive, automated, and built for scale.
              </p>
            </div>

            {/* Traditional | AI-Native */}
            <div
              className="relative grid gap-0 overflow-hidden rounded-md border sm:grid-cols-2"
              style={{ borderColor: "rgba(11,26,42,0.12)" }}
            >
              <div className="p-3.5 sm:p-4">
                <div className="mb-2.5 text-[9px] font-bold uppercase tracking-[0.14em]" style={{ color: "#0B1A2A" }}>
                  Traditional Finance Model
                </div>
                <ul className="space-y-1.5">
                  {traditional.map((item) => (
                    <li key={item} className="flex items-start gap-1.5 text-[11.5px] leading-[1.35]" style={{ color: "#4A5C6C" }}>
                      <XMark />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border-t p-3.5 sm:border-l sm:border-t-0 sm:p-4" style={{ borderColor: "rgba(11,26,42,0.10)" }}>
                <div className="mb-2.5 text-[9px] font-bold uppercase tracking-[0.14em]" style={{ color: "#17A89A" }}>
                  AI-Native Finance Model
                </div>
                <ul className="space-y-1.5">
                  {aiNative.map((item) => (
                    <li key={item} className="flex items-start gap-1.5 text-[11.5px] leading-[1.35]" style={{ color: "#0B1A2A" }}>
                      <Check />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              {/* Center arrow */}
              <div
                className="absolute left-1/2 top-1/2 z-10 hidden h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full sm:flex"
                style={{ background: "#17A89A", boxShadow: "0 0 0 3px #fff" }}
                aria-hidden
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M3 6h6M6.5 3.5L9 6l-2.5 2.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>

            {/* AI Oversight Layer */}
            <div
              className="relative overflow-hidden rounded-md p-4"
              style={{ background: "linear-gradient(165deg, #0F2235 0%, #000D1F 100%)" }}
            >
              <div className="mb-2.5 text-[9px] font-bold uppercase tracking-[0.16em]" style={{ color: "#2EE6C9" }}>
                AI Oversight Layer
              </div>
              {/* Stacked planes graphic */}
              <div className="mb-3.5 flex flex-col items-center gap-[3px] py-1">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    style={{
                      width: `${78 - i * 12}%`,
                      height: 9,
                      background: `rgba(46,230,201,${0.55 - i * 0.1})`,
                      transform: `perspective(120px) rotateX(55deg) translateY(${i * -1}px)`,
                      borderRadius: 2,
                      border: "1px solid rgba(46,230,201,0.35)",
                    }}
                  />
                ))}
              </div>
              <ul className="space-y-1.5">
                {oversight.map((item) => (
                  <li key={item} className="flex items-start gap-1.5 text-[11.5px] leading-[1.35]" style={{ color: "#C5D2DD" }}>
                    <Check bright />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ═══ PACKAGES ═══ */}
        <section className="border-b px-5 py-5 sm:px-7" style={{ borderColor: "rgba(11,26,42,0.10)", background: "#F7F9FA" }}>
          <div className="mb-1 text-center">
            <h2 className="text-[12px] font-bold uppercase tracking-[0.16em]" style={{ color: "#0B1A2A" }}>
              Fractional CFO + AI Automation Packages
            </h2>
            <p className="mx-auto mt-1.5 max-w-[560px] text-[11.5px] leading-[1.45]" style={{ color: "#4A5C6C" }}>
              Flexible packages designed to meet your business where you are—and take you where you want to go.
            </p>
          </div>

          <div className="mt-4 grid gap-3 lg:grid-cols-3">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className="relative flex h-full flex-col overflow-hidden rounded-md border bg-white p-4"
                style={{
                  borderColor: pkg.popular ? "#17A89A" : "rgba(11,26,42,0.12)",
                  borderWidth: pkg.popular ? 1.5 : 1,
                }}
              >
                {pkg.popular && (
                  <div
                    className="pointer-events-none absolute -right-8 top-3 z-10 w-[120px] rotate-45 py-[3px] text-center text-[8px] font-bold uppercase tracking-[0.12em] text-white"
                    style={{ background: "#17A89A", boxShadow: "0 2px 6px rgba(11,26,42,0.18)" }}
                  >
                    Most Popular
                  </div>
                )}

                <PkgIcon kind={pkg.icon} />
                <div className="text-center text-[15px] font-bold uppercase tracking-[0.08em]" style={{ color: "#17A89A" }}>
                  {pkg.name}
                </div>
                <div className="mt-0.5 text-center text-[11px] font-medium" style={{ color: "#B4844A" }}>
                  {pkg.tagline}
                </div>
                <p className="mt-2 text-center text-[11px] leading-[1.45]" style={{ color: "#4A5C6C" }}>
                  {pkg.description}
                </p>

                <div className="my-3 flex items-center gap-2">
                  <span className="h-px flex-1" style={{ background: "rgba(23,168,154,0.35)" }} />
                  <span className="text-[8.5px] font-bold uppercase tracking-[0.12em]" style={{ color: "#17A89A" }}>
                    {pkg.inheritsLabel}
                  </span>
                  <span className="h-px flex-1" style={{ background: "rgba(23,168,154,0.35)" }} />
                </div>

                <ul className="mb-3 flex-1 space-y-1.5">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-1.5 text-[11.5px] leading-[1.35]" style={{ color: "#0B1A2A" }}>
                      <Check />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto rounded-sm px-3 py-2.5" style={{ background: "#F2F5F7" }}>
                  <div className="mb-0.5 text-[8.5px] font-bold uppercase tracking-[0.12em]" style={{ color: "#17A89A" }}>
                    Ideal for
                  </div>
                  <p className="mb-2 text-[11px] leading-[1.4]" style={{ color: "#4A5C6C" }}>
                    {pkg.idealFor}
                  </p>
                  <div className="text-[8.5px] font-bold uppercase tracking-[0.12em]" style={{ color: "#8597A6" }}>
                    Pricing
                  </div>
                  <p className="text-[12px] font-semibold" style={{ color: "#0B1A2A" }}>
                    Contact for pricing
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ AI FINANCE AUDIT + IMPLEMENTATION ═══ */}
        <section className="border-b px-5 py-4 sm:px-7" style={{ borderColor: "rgba(11,26,42,0.10)" }}>
          <div
            className="grid gap-0 overflow-hidden rounded-md border md:grid-cols-[1.15fr_0.95fr_1.05fr]"
            style={{ borderColor: "rgba(11,26,42,0.12)", background: "rgba(23,168,154,0.04)" }}
          >
            <div className="flex gap-3 p-4">
              <div
                className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full"
                style={{ background: "rgba(23,168,154,0.15)", color: "#17A89A" }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M12 3c4 0 7 3.5 7 8 0 2-1 4-2.5 5.5L12 21l-4.5-4.5C6 15 5 13 5 11c0-4.5 3-8 7-8z" stroke="currentColor" strokeWidth="1.4" />
                  <circle cx="12" cy="11" r="2.5" stroke="currentColor" strokeWidth="1.3" />
                </svg>
              </div>
              <div>
                <div className="text-[11px] font-bold uppercase tracking-[0.12em]" style={{ color: "#0E7C72" }}>
                  AI Finance Audit
                </div>
                <div className="mt-0.5 text-[9.5px] font-semibold uppercase tracking-[0.1em]" style={{ color: "#17A89A" }}>
                  See the opportunity. Then automate it.
                </div>
                <p className="mt-1.5 text-[11.5px] leading-[1.45]" style={{ color: "#4A5C6C" }}>
                  We analyze your current finance processes and identify high-impact
                  AI automation opportunities that save time, reduce costs, and improve accuracy.
                </p>
              </div>
            </div>

            <div className="border-t p-4 md:border-l md:border-t-0" style={{ borderColor: "rgba(11,26,42,0.10)" }}>
              <div className="mb-2 text-[9.5px] font-bold uppercase tracking-[0.12em]" style={{ color: "#17A89A" }}>
                What you get
              </div>
              <ul className="space-y-1.5">
                {auditGets.map((g) => (
                  <li key={g} className="flex items-start gap-1.5 text-[11.5px] leading-[1.35]" style={{ color: "#0B1A2A" }}>
                    <Check />
                    {g}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-3 border-t p-4 md:border-l md:border-t-0" style={{ borderColor: "rgba(11,26,42,0.10)" }}>
              <div
                className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full"
                style={{ background: "rgba(23,168,154,0.15)", color: "#17A89A" }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M8 4h8v16H8zM8 8h8M8 12h8M8 16h5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <div className="text-[11px] font-bold uppercase tracking-[0.12em]" style={{ color: "#0E7C72" }}>
                  Implementation Projects
                </div>
                <p className="mt-1.5 text-[11.5px] leading-[1.45]" style={{ color: "#4A5C6C" }}>
                  Custom scoped projects to design, build, and implement AI-enabled
                  financial systems, models, and workflows for your business.
                </p>
                <p className="mt-2 text-[11.5px] font-semibold" style={{ color: "#0B1A2A" }}>
                  Contact for pricing
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ CORE SERVICES ═══ */}
        <section className="border-b px-5 py-4 sm:px-7" style={{ borderColor: "rgba(11,26,42,0.10)" }}>
          <SectionRule title="Core Services" />
          <div className="grid gap-0 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {coreServices.map((s, i) => (
              <div
                key={s.name}
                className="px-2.5 py-2 text-center"
                style={{
                  borderLeft: i === 0 ? "none" : "1px solid rgba(11,26,42,0.08)",
                }}
              >
                <div className="mx-auto mb-1.5 flex h-7 w-7 items-center justify-center" style={{ color: "#17A89A" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d={s.icon} stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="text-[11px] font-semibold leading-[1.25]" style={{ color: "#0B1A2A" }}>
                  {s.name}
                </h3>
                <p className="mt-1 text-[10px] leading-[1.4]" style={{ color: "#56697A" }}>
                  {s.blurb}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ OPERATING MODEL — dark strip ═══ */}
        <section style={{ background: "linear-gradient(180deg, #0F2235 0%, #000D1F 100%)" }}>
          <div className="px-5 py-4 sm:px-7">
            <div className="mb-3 text-center text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: "#2EE6C9" }}>
              The AI-Native Finance Operating Model
            </div>
            <div className="grid grid-cols-2 gap-x-2 gap-y-3 sm:grid-cols-4 lg:grid-cols-8">
              {operatingModel.map((item, i) => (
                <div key={item.name} className="flex flex-col items-center text-center">
                  <div
                    className="mb-1.5 flex h-8 w-8 items-center justify-center rounded-full text-[9px] font-bold tabular"
                    style={{
                      background: "rgba(46,230,201,0.12)",
                      color: "#2EE6C9",
                      border: "1px solid rgba(46,230,201,0.3)",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="text-[10px] font-semibold leading-[1.25]" style={{ color: "#F0F4F8" }}>
                    {item.name}
                  </div>
                  <div className="mt-0.5 hidden text-[8.5px] leading-[1.3] lg:block" style={{ color: "#8FA3B5" }}>
                    {item.blurb}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ BOTTOM 4-UP ═══ */}
        <section className="px-5 py-4 sm:px-7">
          <div className="grid gap-3 lg:grid-cols-4">
            {/* Partners */}
            <div>
              <div className="mb-2.5 text-[10px] font-bold uppercase tracking-[0.14em]" style={{ color: "#17A89A" }}>
                Who We Partner With
              </div>
              <ul className="space-y-2">
                {partners.map((p) => (
                  <li key={p.name} className="flex items-start gap-2">
                    <span
                      className="mt-[3px] flex h-3.5 w-3.5 flex-shrink-0 items-center justify-center rounded-full"
                      style={{ background: "rgba(23,168,154,0.15)" }}
                      aria-hidden
                    >
                      <span className="h-1 w-1 rounded-full" style={{ background: "#17A89A" }} />
                    </span>
                    <div>
                      <div className="text-[11.5px] font-semibold leading-[1.25]" style={{ color: "#0B1A2A" }}>
                        {p.name}
                      </div>
                      <p className="text-[10px] leading-[1.35]" style={{ color: "#56697A" }}>
                        {p.blurb}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Impact */}
            <div className="rounded-md border p-3.5" style={{ borderColor: "rgba(11,26,42,0.12)" }}>
              <div className="mb-2.5 text-[10px] font-bold uppercase tracking-[0.14em]" style={{ color: "#17A89A" }}>
                Measurable Impact
              </div>
              <ul className="space-y-2.5">
                {impactThemes.map((t) => (
                  <li key={t.label} className="flex items-start gap-2">
                    <Check />
                    <span className="text-[11.5px] leading-[1.35] font-medium" style={{ color: "#0B1A2A" }}>
                      {t.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Case study */}
            <div className="rounded-md border p-3.5" style={{ borderColor: "rgba(11,26,42,0.12)" }}>
              <div className="mb-1 text-[10px] font-bold uppercase tracking-[0.14em]" style={{ color: "#17A89A" }}>
                Case Study Snapshot
              </div>
              <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.08em]" style={{ color: "#17A89A" }}>
                Healthcare & Wellness Company
              </div>
              <div className="space-y-2">
                <div>
                  <div className="text-[8.5px] font-bold uppercase tracking-[0.12em]" style={{ color: "#17A89A" }}>
                    Challenge
                  </div>
                  <p className="text-[10.5px] leading-[1.4]" style={{ color: "#4A5C6C" }}>
                    Manual reporting, delayed close, limited visibility into performance.
                  </p>
                </div>
                <div>
                  <div className="text-[8.5px] font-bold uppercase tracking-[0.12em]" style={{ color: "#17A89A" }}>
                    Solution
                  </div>
                  <p className="text-[10.5px] leading-[1.4]" style={{ color: "#4A5C6C" }}>
                    Reporting dashboards, cash flow forecasting, and AI-driven automations across key workflows.
                  </p>
                </div>
                <div>
                  <div className="mb-1 text-[8.5px] font-bold uppercase tracking-[0.12em]" style={{ color: "#17A89A" }}>
                    Results
                  </div>
                  <ul className="space-y-1">
                    {caseResults.map((r) => (
                      <li key={r} className="flex items-start gap-1.5 text-[10.5px] leading-[1.35]" style={{ color: "#0B1A2A" }}>
                        <Check />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Dark CTA */}
            <div
              id="book"
              className="flex flex-col rounded-md p-4"
              style={{ background: "linear-gradient(165deg, #0F2235 0%, #000D1F 100%)" }}
            >
              <div className="text-[11px] font-bold uppercase leading-[1.3] tracking-[0.06em]" style={{ color: "#2EE6C9" }}>
                Ready to Transform Your Finance Function?
              </div>
              <p className="mt-2 text-[11px] leading-[1.45]" style={{ color: "#C5D2DD" }}>
                Let&apos;s identify opportunities to automate, streamline, and elevate your finance organization.
              </p>
              <a
                href={`mailto:${CONTACT_EMAIL}?subject=Strategy%20Call%20Request`}
                className="mt-3 inline-flex items-center justify-center gap-1.5 rounded-sm px-3 py-2.5 text-[11.5px] font-semibold text-white transition-opacity hover:opacity-90"
                style={{ background: "#17A89A" }}
              >
                Schedule a Strategy Call
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden>
                  <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <div className="mt-auto space-y-1.5 pt-4 text-[10.5px]" style={{ color: "#A8BBC9" }}>
                <a href={SITE_URL} className="flex items-center gap-1.5 transition-colors hover:text-[#2EE6C9]">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M3 12h18M12 3c2.5 2.8 2.5 15.2 0 18M12 3c-2.5 2.8-2.5 15.2 0 18" stroke="currentColor" strokeWidth="1.3" />
                  </svg>
                  vantagerockfinancial.com
                </a>
                <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-center gap-1.5 transition-colors hover:text-[#2EE6C9]">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <rect x="3" y="5" width="18" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M3 7l9 7 9-7" stroke="currentColor" strokeWidth="1.4" />
                  </svg>
                  {CONTACT_EMAIL}
                </a>
                <a
                  href={COMPANY_LINKEDIN}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 transition-colors hover:text-[#2EE6C9]"
                >
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.5h4V23h-4V8.5zM8.5 8.5h3.8v2h.05c.53-1 1.82-2.05 3.75-2.05 4 0 4.75 2.65 4.75 6.1V23h-4v-5.9c0-1.4-.03-3.2-1.95-3.2-1.95 0-2.25 1.52-2.25 3.1V23h-4V8.5z" />
                  </svg>
                  Vantage Rock Financial
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ FOOTER BAR (REF: navy with teal accents) ═══ */}
        <footer
          className="flex flex-col items-center justify-between gap-2 px-5 py-3.5 sm:flex-row sm:px-7"
          style={{ background: "#000D1F" }}
        >
          <Image
            src="/vr-mark-light.png"
            alt=""
            width={424}
            height={290}
            unoptimized
            className="hidden h-6 w-auto opacity-80 sm:block"
            aria-hidden
          />
          <div className="text-center">
            <div className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white">
              Clarity<span className="mx-2 opacity-40">·</span>Insight<span className="mx-2 opacity-40">·</span>Automation
            </div>
            <div className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.16em]" style={{ color: "#2EE6C9" }}>
              Financial Leadership That Drives Growth.
            </div>
          </div>
          <div className="hidden text-[13px] font-bold tracking-tight sm:block" aria-hidden>
            <span style={{ color: "#fff" }}>V</span>
            <span style={{ color: "#2EE6C9" }}>R</span>
          </div>
        </footer>
      </article>
    </div>
  );
}
