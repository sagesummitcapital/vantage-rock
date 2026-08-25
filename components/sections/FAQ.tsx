"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Reveal from "../Reveal";
import SectionHead from "../SectionHead";

const faqs = [
  {
    q: "Do you replace my CPA or bookkeeper?",
    a: "No. They handle accounting, tax, and compliance — we make the finance function useful for management. We build the reporting, forecasting, cash visibility, and automation layer on top of the accounting, and we keep your CPA in the loop.",
  },
  {
    q: "What does it cost?",
    a: "The Diagnostic is a fixed fee, credited toward your engagement if you move forward within 30 days. Ongoing work is a monthly retainer scoped to the complexity of your business — number of entities, systems, reporting cadence, and how much building is involved. We give you exact numbers on the call once we understand the scope, and there is no obligation attached to that conversation.",
  },
  {
    q: "How do you use AI — and is it safe?",
    a: "AI stays where it improves accuracy, speed, or visibility — and always under controls. Automation is supervised and reviewable, a human owns every output that reaches management, and nothing runs unsupervised in your books. We document which tools are approved and what data they can touch.",
  },
  {
    q: "What about confidentiality?",
    a: "Client data is handled under a signed engagement agreement with confidentiality terms. Restricted data is never uploaded to AI tools without an approved handling process, and access is limited to what the work requires.",
  },
  {
    q: "What does onboarding look like?",
    a: "Kickoff within days of signing: we confirm objectives and decision owners, collect system access, and baseline your numbers. You see a first visible win — a cash forecast, KPI pack, or close acceleration — inside the first 30 days.",
  },
  {
    q: "We're not ready for a CFO. Is this still for us?",
    a: "That's usually exactly when fractional works best. The question isn't headcount — it's whether the decisions you're making have outgrown the visibility you have. The diagnostic will tell you precisely where you stand.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="border-b border-line bg-bg-sunken">
      <div className="mx-auto max-w-[1280px] px-6 py-24 md:px-10 md:py-28">
        <SectionHead
          number="08"
          label="Still deciding?"
          heading="The questions we get"
          dim="before every engagement."
        />

        <div className="mx-auto max-w-[820px]">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 0.04}>
                <div className="border-b border-line">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display text-[19px] tracking-[-0.01em] text-ink">
                      {f.q}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.25 }}
                      className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-line text-teal"
                      aria-hidden
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                      </svg>
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-[680px] pb-6 text-[15px] leading-[1.65] text-ink-muted">
                          {f.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
