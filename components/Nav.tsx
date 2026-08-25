"use client";

import { motion, useScroll, useTransform, useMotionTemplate, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import CTAButton from "./CTAButton";

const links = [
  { href: "#diagnostic", label: "Diagnostic" },
  { href: "#packages", label: "Engagements" },
  { href: "#about", label: "About" },
  { href: "#impact", label: "Results" },
];

export default function Nav() {
  const { scrollY } = useScroll();
  const backdropOpacity = useTransform(scrollY, [0, 100], [0.6, 0.92]);
  const borderOpacity = useTransform(scrollY, [0, 100], [0, 1]);
  const backgroundColor = useMotionTemplate`rgba(250, 251, 252, ${backdropOpacity})`;
  const [open, setOpen] = useState(false);

  // Lock body scroll when the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <motion.nav
      style={{ backgroundColor }}
      className="sticky top-0 z-50 border-b border-line backdrop-blur-md"
    >
      <motion.div
        style={{ opacity: borderOpacity }}
        className="absolute bottom-0 left-0 right-0 h-px bg-line"
      />
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-4 md:px-10">
        <a
          href="#top"
          className="group flex items-center"
          aria-label="Vantage Rock Financial — home"
        >
          <Image
            src="/logo-light.png"
            alt="Vantage Rock Financial"
            width={1042}
            height={459}
            priority
            unoptimized
            className="h-9 w-auto transition-opacity group-hover:opacity-80 md:h-10"
          />
        </a>

        {/* Desktop links */}
        <div className="hidden gap-8 text-[13px] text-ink-muted md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition-colors hover:text-teal">
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <CTAButton variant="ghost" href="#book">
              Book a call
            </CTAButton>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setOpen((o) => !o)}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-line-strong text-ink transition-colors hover:border-teal hover:text-teal md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <motion.path
                d="M2 4h12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                animate={open ? { d: "M3 3l10 10" } : { d: "M2 4h12" }}
                transition={{ duration: 0.25 }}
              />
              <motion.path
                d="M2 8h12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                animate={{ opacity: open ? 0 : 1 }}
                transition={{ duration: 0.15 }}
              />
              <motion.path
                d="M2 12h12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                animate={open ? { d: "M3 13l10 -10" } : { d: "M2 12h12" }}
                transition={{ duration: 0.25 }}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-line bg-bg-raised md:hidden"
          >
            <div className="flex flex-col px-6 py-4">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.3 }}
                  className="border-b border-line py-4 font-display text-[18px] text-ink transition-colors hover:text-teal"
                >
                  {l.label}
                </motion.a>
              ))}
              <a
                href="#book"
                onClick={() => setOpen(false)}
                className="mt-5 inline-flex items-center justify-center gap-2 rounded-md bg-navy px-5 py-3 text-[14px] font-medium text-ink-invert transition-colors hover:bg-teal hover:text-white"
              >
                Book a Finance Systems Review
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
