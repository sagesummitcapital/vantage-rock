"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Reveal from "../Reveal";
import SectionHead from "../SectionHead";
import { FAQS } from "@/lib/faqs";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="border-b border-line">
      <div className="mx-auto max-w-[1280px] px-6 py-24 md:px-10 md:py-28">
        <SectionHead
          number="08"
          label="Before you book"
          heading="The questions that come up"
          dim="every time."
        />

        <div className="max-w-[840px]">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 0.03}>
                <div className="border-b border-line first:border-t">
                  <h3>
                    <button
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-6 py-6 text-left"
                      aria-expanded={isOpen}
                    >
                      <span className="font-display text-[19px] leading-[1.3] tracking-tighter2 text-ink">
                        {f.q}
                      </span>
                      <motion.span
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.25 }}
                        className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-line text-teal"
                        aria-hidden
                      >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path
                            d="M7 2v10M2 7h10"
                            stroke="currentColor"
                            strokeWidth="1.4"
                            strokeLinecap="round"
                          />
                        </svg>
                      </motion.span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-[700px] pb-7 text-[15.5px] leading-[1.7] text-ink-muted">
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
