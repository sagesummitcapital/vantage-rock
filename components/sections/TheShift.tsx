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
                Humans on the decisions, systems on the rest. We build finance systems that think.
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
      </div>
    </section>
  );
}
