"use client";

import { motion } from "framer-motion";
import Reveal from "../Reveal";
import SectionHead from "../SectionHead";

type Pkg = {
  name: string;
  tagline: string;
  popular?: boolean;
  inheritsLabel: string;
  pricingApproach: string;
  iconPath: string;
  features: string[];
  idealFor: string;
};

const packages: Pkg[] = [
  {
    name: "Essentials",
    tagline: "Financial clarity. Better decisions.",
    inheritsLabel: "What's included",
    features: [
      "Monthly financial review",
      "KPI dashboard (up to 10 KPIs)",
      "Monthly executive summary",
      "30-min monthly strategy call",
      "Email support",
    ],
    idealFor: "Businesses that need clear financials and visibility.",
    pricingApproach: "Best for companies needing foundational visibility. Scoped as a lighter monthly engagement after the Diagnostic.",
    iconPath: "M4 20V10M10 20V4M16 20v-7M22 20H2",
  },
  {
    name: "Growth",
    tagline: "Plan ahead. Drive growth.",
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
    pricingApproach: "Best for companies ready to improve forecasting and profitability. Scope expands with systems and reporting needs.",
    iconPath: "M3 16l5-5 4 4 8-8M20 7v4h-4",
  },
  {
    name: "Scale",
    tagline: "Strategic leadership. Scalable systems.",
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
    pricingApproach: "Best for companies needing executive-level finance leadership. Scope is custom based on complexity and cadence.",
    iconPath: "M3 21h18M5 21V10M12 21V10M19 21V10M3 10l9-6 9 6",
  },
];

function Check() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" className="mt-[2px] flex-shrink-0" aria-hidden>
      <circle cx="8" cy="8" r="7" stroke="#17A89A" strokeWidth="1.1" opacity="0.5" />
      <path d="M5 8l2 2 4-4.5" stroke="#17A89A" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Packages() {
  return (
    <section id="packages" className="border-b border-line">
      <div className="mx-auto max-w-[1280px] px-6 py-24 md:px-10 md:py-28">
        <SectionHead
          number="04"
          label="Fractional CFO + AI automation"
          heading="Packages that meet you"
          dim="where you are."
        />

        <Reveal>
          <p className="-mt-6 mb-12 max-w-[560px] text-[16px] leading-[1.6] text-ink-muted">
            Every engagement starts with the Diagnostic, then scales to the
            level of support the business actually needs.
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

                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-teal/10 text-teal">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d={pkg.iconPath} stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="mb-1 font-display text-[28px] tracking-[-0.02em] text-ink">
                  {pkg.name}
                </div>
                <div className="mb-6 text-[13px] text-teal">{pkg.tagline}</div>

                <div className="mono-label mb-4 border-t border-line pt-5 !text-[10px]">
                  {pkg.inheritsLabel}
                </div>
                <ul className="mb-7 flex-1 space-y-3">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-[14px] leading-[1.4] text-ink-muted">
                      <Check />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="rounded-lg bg-bg-sunken p-4">
                  <div className="mono-label mb-1.5 !text-[9px]">Pricing approach</div>
                  <p className="text-[12.5px] leading-[1.5] text-ink-muted">
                    {pkg.pricingApproach}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <div className="mt-8 flex flex-col gap-4 rounded-xl border border-line bg-bg-sunken px-7 py-6 md:flex-row md:items-start">
            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-teal/10 text-teal">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                <circle cx="9" cy="6" r="2" fill="currentColor" />
                <circle cx="15" cy="12" r="2" fill="currentColor" />
                <circle cx="7" cy="18" r="2" fill="currentColor" />
              </svg>
            </div>
            <div>
              <p className="text-[15px] leading-[1.55] text-ink">
                <span className="font-medium text-teal">How pricing works:</span>{" "}
                set by scope, complexity, and reporting cadence after the
                Diagnostic — not published, because the work is built around
                your systems.
              </p>
            </div>
          </div>
        </Reveal>

        {/* Who we work with — compact */}
        <Reveal delay={0.35}>
          <div className="mt-14 border-t border-line pt-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div>
                <span className="mono-label">Who we work with</span>
                <p className="mt-3 max-w-[440px] text-[16px] leading-[1.55] text-ink">
                  Founder-led and PE-backed companies that have outgrown basic
                  accounting. We go deepest where financial complexity is
                  highest — and where we&apos;ve operated.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 md:max-w-[440px] md:justify-end">
                {[
                  { x: "Healthcare & medtech", core: true },
                  { x: "Technology & SaaS", core: true },
                  { x: "PE-backed portfolio cos.", core: true },
                  { x: "Multi-entity groups", core: true },
                  { x: "Professional services", core: false },
                  { x: "Founder-led services", core: false },
                ].map(({ x, core }) => (
                  <span
                    key={x}
                    className={`rounded-full border px-3.5 py-1.5 text-[12.5px] ${
                      core
                        ? "border-teal/40 bg-teal/5 text-ink"
                        : "border-line bg-bg-raised text-ink-muted"
                    }`}
                  >
                    {x}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
