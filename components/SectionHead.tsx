import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export default function SectionHead({
  label,
  heading,
  tail,
  dim,
  className,
}: {
  /** No longer shown. Sections are not a numbered sequence. */
  number?: string;
  label: string;
  heading: ReactNode;
  tail?: ReactNode;
  dim?: ReactNode; // quieter continuation of the heading
  className?: string;
}) {
  return (
    <div className={cn("mb-14 max-w-[860px]", className)}>
      <div className="section-label">{label}</div>
      <h2 className="mt-6 font-display text-display-lg">
        <span className="text-ink">{heading}</span>
        {dim && <span className="gradient-text-teal"> {dim}</span>}
        {tail}
      </h2>
    </div>
  );
}
