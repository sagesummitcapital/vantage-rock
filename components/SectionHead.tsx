import Reveal from "./Reveal";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export default function SectionHead({
  number,
  label,
  heading,
  tail,
  dim,
  className,
}: {
  number: string;
  label: string;
  heading: ReactNode;
  tail?: ReactNode;
  dim?: ReactNode; // teal-accented continuation
  className?: string;
}) {
  return (
    <div className={cn("mb-14 flex flex-col justify-between gap-10 md:flex-row md:items-start", className)}>
      <Reveal>
        <span className="mono-label">
          {number} — {label}
        </span>
      </Reveal>
      <Reveal delay={0.1}>
        <h2 className="max-w-[640px] font-display text-display-lg">
          <span className="text-ink">{heading}</span>
          {dim && <span className="gradient-text-teal"> {dim}</span>}
          {tail}
        </h2>
      </Reveal>
    </div>
  );
}
