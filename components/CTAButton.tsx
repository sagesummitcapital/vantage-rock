import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Variant = "primary" | "ghost" | "light";

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
    "inline-flex items-center justify-center rounded-md font-medium tracking-[0.01em] transition-colors duration-200";

  const styles: Record<Variant, string> = {
    // On the light page
    primary: "bg-navy text-ink-invert px-7 py-[15px] text-[14px] hover:bg-teal-deep",
    // On navy sections
    light: "bg-ink-invert text-navy px-7 py-[15px] text-[14px] hover:bg-white",
    // Nav
    ghost:
      "border border-line-strong text-ink px-[16px] py-[9px] text-[12.5px] hover:border-navy hover:bg-navy hover:text-ink-invert",
  };

  return (
    <a href={href} className={cn(base, styles[variant], className)}>
      {children}
    </a>
  );
}
