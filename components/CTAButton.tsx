"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Variant = "primary" | "ghost";

interface CTAButtonProps {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  href?: string;
}

export default function CTAButton({
  children,
  variant = "primary",
  className,
  href = "#book",
}: CTAButtonProps) {
  const base =
    "group relative inline-flex items-center gap-2 rounded-md text-[13px] font-medium transition-all duration-300 focus-visible:outline-teal";

  const styles: Record<Variant, string> = {
    primary:
      "bg-navy text-ink-invert px-[20px] py-[12px] hover:bg-teal hover:text-white hover:shadow-[0_8px_24px_-6px_rgba(23,168,154,0.5)]",
    ghost:
      "border border-line-strong text-ink px-[14px] py-[7px] hover:border-teal hover:text-teal hover:bg-teal/5 text-[12px]",
  };

  return (
    <motion.a
      href={href}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={cn(base, styles[variant], className)}
    >
      <span className="relative z-10">{children}</span>
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        aria-hidden
        className="relative z-10 transition-transform duration-300 group-hover:translate-x-[2px]"
      >
        <path
          d="M3 9L9 3M9 3H4M9 3V8"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    </motion.a>
  );
}
