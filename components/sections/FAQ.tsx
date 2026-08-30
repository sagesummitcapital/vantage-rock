"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Reveal from "../Reveal";
import SectionHead from "../SectionHead";

const faqs = [
  {
    q: "Do you replace my CPA or bookkeeper?",
    a: "No. They handle accounting, tax, compliance. We make finance useful for management. CPA stays in the loop.",
  },
  {
    q: "What does it cost?",
    a: "Quoted after the Review, from scope. No list prices. If it's a fit, next paid step is a diagnostic. Then a retainer. Cash in before work.",
  },
  {
    q: "How do you use AI — and is it safe?",
    a: "AI-enabled finance is not unsupervised books. A human owns every number that reaches management. Tools named, scoped, reviewable.",
  },
  {
    q: "What about confidentiality?",
    a: "Signed engagement. Restricted data doesn't go into tools without an approved process.",
  },
  {
    q: "What does onboarding look like?",
    a: "Kickoff after cash clears. Objectives, decision owners, system access, baseline. First visible win inside 30 days — cash view, KPI pack, or a close that holds.",
  },
  {
    q: "We're not ready for a CFO. Is this still for us?",
    a: "That's usually when fractional works. The Review is the fit-check. It is not a diagnostic and it does not leave you with a plan.",
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
