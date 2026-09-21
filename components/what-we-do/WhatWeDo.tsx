"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";
import CTAButton from "@/components/CTAButton";
import BookingForm from "@/components/BookingForm";
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
  description: string;
  popular?: boolean;
  inheritsLabel: string;
  features: string[];
  idealFor: string;
};

const packages: Pkg[] = [
  {
    name: "Essentials",
    tagline: "Financial Clarity. Better Decisions.",
    description:
      "Core financial support to give you visibility, structure, and confidence in your numbers.",
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
    description:
      "Expanded financial support and strategic insights to help you optimize performance and scale.",
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
    description:
      "A full strategic finance partner to help you scale efficiently and prepare for what's next.",
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
  { name: "AI Reporting", blurb: "Real-time financial reporting." },
  { name: "Forecasting & Modeling", blurb: "AI-driven forecasting & scenario modeling." },
  { name: "Dashboards & Analytics", blurb: "Executive insights & operational intelligence." },
  { name: "Treasury & Cash", blurb: "Intelligent cash forecasting & treasury workflows." },
  { name: "Commissions", blurb: "Automated commission calculations & tracking." },
  { name: "KPI Intelligence", blurb: "AI-powered KPI monitoring & performance insights." },
  { name: "Close Acceleration", blurb: "Automated close workflows & reconciliation intelligence." },
  { name: "Portfolio Visibility", blurb: "Enterprise visibility across all portfolio entities." },
];

const partners = [
  "Private Equity Firms",
  "Portfolio Companies",
  "Founder-Led Businesses",
  "Middle-Market Operators",
  "Professional Services & Agencies",
];

const impactThemes = [
  { title: "Faster closes", detail: "Close cycles that hold without a hero week." },
  { title: "Leaner overhead", detail: "Less manual work across the finance function." },
  { title: "Clearer reporting", detail: "Real-time visibility into performance and cash." },
  { title: "Better decisions", detail: "Insights leadership can actually run on." },
];

/* ─── icons ────────────────────────────────────────────── */

function Check({ bright = false }: { bright?: boolean }) {
  const stroke = bright ? "#2EE6C9" : "#17A89A";
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 16 16"
      fill="none"
      className="mt-[2px] flex-shrink-0"
      aria-hidden
    >
      <circle cx="8" cy="8" r="7" stroke={stroke} strokeWidth="1.1" opacity="0.5" />
      <path
        d="M5 8l2 2 4-4.5"
        stroke={stroke}
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function XMark() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 16 16"
      fill="none"
      className="mt-[2px] flex-shrink-0"
      aria-hidden
    >
      <circle cx="8" cy="8" r="7" stroke="#8597A6" strokeWidth="1.1" opacity="0.55" />
      <path
        d="M5.5 5.5l5 5M10.5 5.5l-5 5"
        stroke="#8597A6"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ─── page ─────────────────────────────────────────────── */

export default function WhatWeDo() {
  return (
    <>
      {/* ── Hero ───────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="aurora-glow" aria-hidden />
        <div className="grid-bg pointer-events-none absolute inset-0" aria-hidden />

        <div className="relative mx-auto max-w-[1280px] px-6 pb-20 pt-16 md:px-10 md:pb-28 md:pt-24">
          <Reveal>
            <span className="mono-label">What we do</span>
          </Reveal>

          <Reveal delay={0.06}>
            <h1 className="mt-6 max-w-[920px] font-display text-display-xl text-ink">
              AI-Native Financial Leadership for Smarter Decisions and{" "}
              <span className="gradient-text">Sustainable Growth.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-7 max-w-[620px] text-[17px] leading-[1.7] text-ink-muted">
              Vantage Rock is a fractional CFO firm that combines deep financial
              expertise with AI automation to modernize finance departments,
              improve visibility, and drive measurable results.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <CTAButton href="#book">{CTA_LABEL}</CTAButton>
              <a
                href="#packages"
                className="text-[13px] font-medium text-ink-muted transition-colors hover:text-teal"
              >
                See packages ↓
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── The Shift ──────────────────────────────────── */}
      <section id="shift" className="border-b border-line">
        <div className="mx-auto max-w-[1280px] px-6 py-20 md:px-10 md:py-24">
          <SectionHead
            number="01"
            label="The shift"
            heading="The CFO role is evolving."
            dim="Manual and reactive → AI-native and built for scale."
          />

          <Reveal>
            <p className="-mt-6 mb-12 max-w-[620px] text-[16px] leading-[1.65] text-ink-muted">
              We help growing businesses move from manual, reactive finance to
              AI-native systems that are proactive, automated, and built for scale.
            </p>
          </Reveal>

          <div className="grid gap-6 lg:grid-cols-2">
            <Reveal delay={0.05}>
              <div className="card-lift h-full rounded-xl border border-line bg-bg-raised p-7 soft-shadow md:p-8">
                <div className="mono-label mb-6">Traditional finance model</div>
                <ul className="space-y-3.5">
                  {traditional.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-[14.5px] leading-[1.45] text-ink-muted"
                    >
                      <XMark />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="card-lift h-full rounded-xl border border-teal/35 bg-bg-raised p-7 shadow-[0_16px_50px_-16px_rgba(23,168,154,0.22)] md:p-8">
                <div className="mono-label mb-6 !text-teal">AI-native finance model</div>
                <ul className="space-y-3.5">
                  {aiNative.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-[14.5px] leading-[1.45] text-ink"
                    >
                      <Check />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          {/* AI Oversight Layer */}
          <Reveal delay={0.18}>
            <div
              className="relative mt-6 overflow-hidden rounded-xl p-8 md:p-10 shadow-[0_24px_60px_-20px_rgba(11,26,42,0.4)]"
              style={{
                background:
                  "linear-gradient(160deg, #0F2235 0%, #0B1A2A 70%, #081421 100%)",
              }}
            >
              <div
                className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full blur-3xl"
                style={{ background: "rgba(46,230,201,0.14)" }}
                aria-hidden
              />
              <div className="relative grid gap-8 lg:grid-cols-[220px_1fr] lg:items-center">
                <div>
                  <div className="mono-label mb-4" style={{ color: "#2EE6C9" }}>
                    AI oversight layer
                  </div>
                  <div className="mb-2 flex flex-col items-center gap-[3px] lg:items-start">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <motion.div
                        key={i}
                        className="rounded-sm"
                        style={{
                          width: `${78 - i * 9}%`,
                          height: 7,
                          background: `rgba(46,230,201,${0.75 - i * 0.12})`,
                        }}
                        animate={{ opacity: [0.45, 1, 0.45] }}
                        transition={{
                          duration: 2.4,
                          repeat: Infinity,
                          delay: i * 0.28,
                        }}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {oversight.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border px-3.5 py-1.5 text-[12.5px]"
                      style={{
                        borderColor: "rgba(46,230,201,0.35)",
                        color: "#F0F4F8",
                        background: "rgba(46,230,201,0.06)",
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Packages ───────────────────────────────────── */}
      <section id="packages" className="border-b border-line bg-bg-sunken">
        <div className="mx-auto max-w-[1280px] px-6 py-24 md:px-10 md:py-28">
          <SectionHead
            number="02"
            label="Fractional CFO + AI automation"
            heading="Flexible packages."
            dim="Meet you where you are — take you where you want to go."
          />

          <Reveal>
            <p className="-mt-6 mb-12 max-w-[560px] text-[16px] leading-[1.6] text-ink-muted">
              Designed to meet your business where you are. Contact for pricing —
              every engagement is scoped after fit.
            </p>
          </Reveal>

          <div className="grid gap-6 lg:grid-cols-3">
            {packages.map((pkg, i) => (
              <Reveal key={pkg.name} delay={i * 0.08}>
                <div
                  className={`card-lift relative flex h-full flex-col rounded-xl border p-7 md:p-8 ${
                    pkg.popular
                      ? "border-teal/40 bg-bg-raised shadow-[0_16px_50px_-16px_rgba(23,168,154,0.25)]"
                      : "border-line bg-bg-raised soft-shadow"
                  }`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-3 right-7">
                      <span className="rounded-full bg-teal px-3 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-white">
                        Most popular
                      </span>
                    </div>
                  )}

                  <div className="mb-1 font-display text-[28px] tracking-[-0.02em] text-ink">
                    {pkg.name}
                  </div>
                  <div className="mb-3 text-[13px] font-medium text-teal">{pkg.tagline}</div>
                  <p className="mb-6 text-[14px] leading-[1.55] text-ink-muted">
                    {pkg.description}
                  </p>

                  <div className="mono-label mb-4 border-t border-line pt-5 !text-[10px]">
                    {pkg.inheritsLabel}
                  </div>
                  <ul className="mb-7 flex-1 space-y-3">
                    {pkg.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-3 text-[14px] leading-[1.4] text-ink-muted"
                      >
                        <Check />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div className="rounded-lg bg-bg-sunken p-4">
                    <div className="mono-label mb-1.5 !text-[9px]">Ideal for</div>
                    <p className="mb-3 text-[12.5px] leading-[1.5] text-ink-muted">
                      {pkg.idealFor}
                    </p>
                    <div className="mono-label mb-1 !text-[9px]">Pricing</div>
                    <p className="text-[13px] font-medium text-ink">Contact for pricing</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Audit + Implementation ─────────────────────── */}
      <section id="audit" className="border-b border-line">
        <div className="mx-auto max-w-[1280px] px-6 py-20 md:px-10 md:py-24">
          <SectionHead
            number="03"
            label="Projects"
            heading="Audit + implementation."
            dim="See the opportunity. Then automate it."
          />

          <div className="grid gap-6 lg:grid-cols-2">
            <Reveal delay={0.05}>
              <div className="card-lift flex h-full flex-col rounded-xl border border-line bg-bg-raised p-7 soft-shadow md:p-9">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-teal/10 text-teal">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path
                      d="M12 2a7 7 0 017 7c0 3.5-2.5 6.4-5.8 7v2H10.8v-2C7.5 15.4 5 12.5 5 9a7 7 0 017-7zM10 20h4v2h-4v-2z"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="mono-label mb-2 !text-teal">AI Finance Audit</div>
                <h3 className="mb-3 font-display text-[24px] tracking-[-0.02em] text-ink">
                  See the opportunity. Then automate it.
                </h3>
                <p className="mb-6 text-[15px] leading-[1.6] text-ink-muted">
                  We analyze your current finance processes and identify high-impact
                  AI automation opportunities that save time, reduce costs, and
                  improve accuracy.
                </p>
                <div className="mono-label mb-3 border-t border-line pt-5 !text-[10px]">
                  What you get
                </div>
                <ul className="mb-7 flex-1 space-y-3">
                  {auditGets.map((g) => (
                    <li
                      key={g}
                      className="flex items-start gap-3 text-[14px] leading-[1.4] text-ink-muted"
                    >
                      <Check />
                      {g}
                    </li>
                  ))}
                </ul>
                <p className="text-[13px] font-medium text-ink">Contact for pricing</p>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="card-lift flex h-full flex-col rounded-xl border border-line bg-bg-raised p-7 soft-shadow md:p-9">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-teal/10 text-teal">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path
                      d="M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="mono-label mb-2 !text-teal">Implementation Projects</div>
                <h3 className="mb-3 font-display text-[24px] tracking-[-0.02em] text-ink">
                  Build the systems. Scope what matters.
                </h3>
                <p className="mb-6 flex-1 text-[15px] leading-[1.6] text-ink-muted">
                  Custom scoped projects to design, build, and implement AI-enabled
                  financial systems, models, and workflows for your business.
                </p>
                <div className="rounded-lg bg-bg-sunken p-4">
                  <div className="mono-label mb-1.5 !text-[9px]">Engagement</div>
                  <p className="text-[13px] font-medium text-ink">
                    Contact for pricing — scoped to the work
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Core Services ──────────────────────────────── */}
      <section id="services" className="border-b border-line bg-bg-sunken">
        <div className="mx-auto max-w-[1280px] px-6 py-20 md:px-10 md:py-24">
          <SectionHead
            number="04"
            label="Core services"
            heading="What we deliver."
            dim="Leadership, systems, and the work in between."
          />

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {coreServices.map((s, i) => (
              <Reveal key={s.name} delay={i * 0.05}>
                <div className="card-lift h-full rounded-xl border border-line bg-bg-raised p-6 soft-shadow md:p-7">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-teal/10 text-teal">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path
                        d={s.icon}
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h3 className="mb-2 text-[15px] font-medium text-ink">{s.name}</h3>
                  <p className="text-[13.5px] leading-[1.55] text-ink-muted">{s.blurb}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Operating Model ────────────────────────────── */}
      <section id="operating-model" className="border-b border-line">
        <div
          className="relative overflow-hidden"
          style={{
            background:
              "linear-gradient(180deg, #0F2235 0%, #0B1A2A 55%, #081421 100%)",
          }}
        >
          <div
            className="pointer-events-none absolute left-1/2 top-0 h-40 w-[60%] -translate-x-1/2 rounded-full blur-3xl"
            style={{ background: "rgba(46,230,201,0.1)" }}
            aria-hidden
          />
          <div className="relative mx-auto max-w-[1280px] px-6 py-16 md:px-10 md:py-20">
            <Reveal>
              <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <span className="mono-label" style={{ color: "#2EE6C9" }}>
                    05 — Operating model
                  </span>
                  <h2
                    className="mt-4 max-w-[560px] font-display text-[28px] tracking-[-0.02em] md:text-[32px]"
                    style={{ color: "#F0F4F8" }}
                  >
                    The AI-native finance operating model.
                  </h2>
                </div>
                <p
                  className="max-w-[360px] text-[14px] leading-[1.55]"
                  style={{ color: "#8FA3B5" }}
                >
                  Eight capabilities we wire into the function — so reporting,
                  cash, and decisions stay current.
                </p>
              </div>
            </Reveal>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {operatingModel.map((item, i) => (
                <Reveal key={item.name} delay={i * 0.04}>
                  <div
                    className="rounded-xl border p-5"
                    style={{
                      borderColor: "rgba(240,244,248,0.1)",
                      background: "rgba(240,244,248,0.03)",
                    }}
                  >
                    <div
                      className="mb-3 flex h-8 w-8 items-center justify-center rounded-full"
                      style={{
                        background: "rgba(46,230,201,0.12)",
                        color: "#2EE6C9",
                      }}
                    >
                      <span className="font-mono text-[10px] tabular">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <div className="mb-1.5 text-[14px] font-medium" style={{ color: "#F0F4F8" }}>
                      {item.name}
                    </div>
                    <p className="text-[12.5px] leading-[1.5]" style={{ color: "#8FA3B5" }}>
                      {item.blurb}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Partners · Impact · Case ───────────────────── */}
      <section id="proof" className="border-b border-line">
        <div className="mx-auto max-w-[1280px] px-6 py-20 md:px-10 md:py-24">
          <SectionHead
            number="06"
            label="Proof"
            heading="Who we partner with."
            dim="And what changes when finance can lead."
          />

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Partners */}
            <Reveal delay={0.05}>
              <div className="card-lift h-full rounded-xl border border-line bg-bg-raised p-7 soft-shadow">
                <div className="mono-label mb-5">Who we partner with</div>
                <ul className="space-y-3">
                  {partners.map((p) => (
                    <li
                      key={p}
                      className="flex items-start gap-3 text-[14.5px] leading-[1.45] text-ink"
                    >
                      <Check />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Impact themes */}
            <Reveal delay={0.1}>
              <div className="card-lift h-full rounded-xl border border-line bg-bg-raised p-7 soft-shadow">
                <div className="mono-label mb-5">Measurable impact</div>
                <ul className="space-y-5">
                  {impactThemes.map((t) => (
                    <li key={t.title}>
                      <div className="text-[14.5px] font-medium text-ink">{t.title}</div>
                      <p className="mt-1 text-[13px] leading-[1.5] text-ink-muted">
                        {t.detail}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Case study */}
            <Reveal delay={0.15}>
              <div
                className="relative h-full overflow-hidden rounded-xl p-7 shadow-[0_24px_60px_-20px_rgba(11,26,42,0.4)]"
                style={{
                  background:
                    "linear-gradient(160deg, #0F2235 0%, #0B1A2A 70%, #081421 100%)",
                }}
              >
                <div
                  className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full blur-3xl"
                  style={{ background: "rgba(46,230,201,0.12)" }}
                  aria-hidden
                />
                <div className="relative">
                  <div className="mono-label mb-4" style={{ color: "#2EE6C9" }}>
                    Case study · Healthcare & wellness
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="mono-label mb-1.5 !text-[10px]" style={{ color: "#8FA3B5" }}>
                        Challenge
                      </div>
                      <p className="text-[13.5px] leading-[1.55]" style={{ color: "#C5D2DD" }}>
                        Manual reporting, delayed close, limited visibility into
                        performance.
                      </p>
                    </div>
                    <div>
                      <div className="mono-label mb-1.5 !text-[10px]" style={{ color: "#8FA3B5" }}>
                        Solution
                      </div>
                      <p className="text-[13.5px] leading-[1.55]" style={{ color: "#C5D2DD" }}>
                        Reporting dashboards, cash flow forecasting, and AI-driven
                        automations across key workflows.
                      </p>
                    </div>
                    <div>
                      <div className="mono-label mb-1.5 !text-[10px]" style={{ color: "#8FA3B5" }}>
                        Outcome
                      </div>
                      <p className="text-[13.5px] leading-[1.55]" style={{ color: "#F0F4F8" }}>
                        Close that holds. Leaner manual work. Real-time KPI
                        visibility. Cash the operator can see ahead.
                      </p>
                    </div>
                  </div>
                  <p
                    className="mt-5 border-t pt-4 text-[11.5px] leading-[1.45]"
                    style={{ color: "#5A6B7B", borderColor: "rgba(240,244,248,0.1)" }}
                  >
                    Anonymized at the client&apos;s request. Not a promise of
                    comparable outcomes.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Dark CTA + Book ────────────────────────────── */}
      <section id="book" className="relative overflow-hidden">
        <div
          className="relative overflow-hidden"
          style={{
            background:
              "linear-gradient(160deg, #0F2235 0%, #0B1A2A 60%, #081421 100%)",
          }}
        >
          <div
            className="pointer-events-none absolute -right-20 top-0 h-64 w-64 rounded-full blur-3xl"
            style={{ background: "rgba(46,230,201,0.12)" }}
            aria-hidden
          />
          <div className="relative mx-auto max-w-[1280px] px-6 py-16 md:px-10 md:py-20">
            <Reveal>
              <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-[560px]">
                  <span className="mono-label" style={{ color: "#2EE6C9" }}>
                    Ready to transform?
                  </span>
                  <h2
                    className="mt-4 font-display text-[28px] tracking-[-0.02em] md:text-[36px]"
                    style={{ color: "#F0F4F8" }}
                  >
                    Ready to transform your finance function?
                  </h2>
                  <p
                    className="mt-4 text-[15px] leading-[1.65]"
                    style={{ color: "#C5D2DD" }}
                  >
                    Let&apos;s identify opportunities to automate, streamline, and
                    elevate your finance organization. The Introduction Call is a
                    fit-check — we don&apos;t diagnose on the call.
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center lg:flex-col lg:items-end">
                  <CTAButton href="#book-form" className="!bg-teal !text-white hover:!bg-teal-bright hover:!text-navy">
                    {CTA_LABEL}
                  </CTAButton>
                  <div className="flex flex-wrap gap-x-5 gap-y-2 text-[13px]" style={{ color: "#8FA3B5" }}>
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      className="transition-colors hover:text-[#2EE6C9]"
                    >
                      {CONTACT_EMAIL}
                    </a>
                    <a
                      href={COMPANY_LINKEDIN}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-[#2EE6C9]"
                    >
                      LinkedIn
                    </a>
                    <a
                      href={SITE_URL}
                      className="transition-colors hover:text-[#2EE6C9]"
                    >
                      vantagerockfinancial.com
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Booking form band */}
        <div id="book-form" className="relative overflow-hidden bg-bg-sunken">
          <div className="aurora-glow" aria-hidden />
          <div className="grid-bg pointer-events-none absolute inset-0" aria-hidden />
          <div className="relative mx-auto max-w-[1280px] px-6 py-16 md:px-10 md:py-20">
            <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
              <div>
                <Reveal>
                  <span className="mono-label">07 — Next step</span>
                </Reveal>
                <Reveal delay={0.08}>
                  <h2 className="mt-5 max-w-[480px] font-display text-display-lg">
                    <span className="text-ink">Book a 15–30 minute </span>
                    <span className="gradient-text">Introduction Call.</span>
                  </h2>
                </Reveal>
                <Reveal delay={0.14}>
                  <p className="mt-5 max-w-[420px] text-[15.5px] leading-[1.65] text-ink-muted">
                    Fit-check, not a sales call. You talk to the founder. Reply
                    within one business day.
                  </p>
                </Reveal>
              </div>
              <Reveal delay={0.12}>
                <BookingForm />
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
