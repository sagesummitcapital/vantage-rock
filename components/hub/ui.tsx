// Shared presentational pieces for the hub. No hooks, no server imports:
// usable from server and client components alike.
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { money, tone } from "./format";

// ---------- Type styles ----------
/** Small tracked capitals: the hub's column-heading voice. */
export const capsCls = "text-[11px] font-medium uppercase tracking-[0.13em] text-ink-dim";
export const inputCls =
  "mt-1.5 block w-full rounded-md border border-line-strong bg-bg-raised px-3 py-2 text-[14px] text-ink placeholder:text-ink-dim/70 transition-colors focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal";
export const linkCls =
  "text-teal-deep underline decoration-brass/60 decoration-1 underline-offset-[5px] transition-colors hover:text-ink hover:decoration-ink";
export const buttonCls =
  "inline-flex items-center justify-center gap-2 rounded-md bg-navy px-4 py-2 text-[13.5px] font-medium text-ink-invert transition-colors hover:bg-teal-deep disabled:cursor-not-allowed disabled:opacity-60";
export const quietButtonCls =
  "inline-flex items-center justify-center gap-1.5 rounded-md border border-line-strong bg-transparent px-2.5 py-1 text-[12.5px] font-medium text-ink-muted transition-colors hover:border-ink hover:text-ink disabled:cursor-not-allowed disabled:opacity-60";

const TONE_TEXT = {
  pos: "text-teal-deep",
  // A deeper cut of the warn red: the brand value is too light for body-size text on paper.
  neg: "text-[#B3322D]",
  flat: "text-ink-muted",
} as const;

// ---------- Stationery ----------
/** Statement rule: a navy bar with a brass hairline beneath it. */
export function DoubleRule({ className }: { className?: string }) {
  return (
    <div className={className} aria-hidden>
      <div className="h-[2px] bg-navy" />
      <div className="mt-[3px] h-px bg-brass" />
    </div>
  );
}

export function PageHeader({
  folio,
  section,
  title,
  lede,
  aside,
}: {
  folio: string;
  section: string;
  title: ReactNode;
  lede?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <header className="pb-10 pt-10 md:pb-12 md:pt-14">
      <div className="flex items-center gap-3.5 text-[11px] font-medium uppercase tracking-[0.16em] text-ink-dim">
        <span className="font-display text-[15px] normal-case italic tracking-normal text-[#7A6238]">{folio}</span>
        <span className="h-px w-9 bg-brass" aria-hidden />
        <span>{section}</span>
      </div>
      <div className="mt-5 flex flex-wrap items-end justify-between gap-x-10 gap-y-5">
        <div className="max-w-[640px]">
          <h1 className="font-display text-[clamp(2rem,4.2vw,3rem)] font-light leading-[1.05] tracking-[-0.028em] text-ink">
            {title}
          </h1>
          {lede ? <p className="mt-4 text-[15px] leading-relaxed text-ink-muted">{lede}</p> : null}
        </div>
        {aside ? <div className="shrink-0">{aside}</div> : null}
      </div>
    </header>
  );
}

export function SectionHeading({
  title,
  note,
  action,
  id,
}: {
  title: ReactNode;
  note?: ReactNode;
  action?: ReactNode;
  id?: string;
}) {
  return (
    <div id={id} className="scroll-mt-32">
      <DoubleRule />
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 pb-4 pt-4">
        <h2 className="font-display text-[22px] leading-tight tracking-[-0.018em] text-ink">{title}</h2>
        {action ? <div className="text-[13px]">{action}</div> : note ? <p className="text-[13px] text-ink-dim">{note}</p> : null}
      </div>
    </div>
  );
}

export function Panel({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("rounded-lg border border-line bg-bg-raised", className)}>{children}</div>;
}

// ---------- Figures ----------
export function Amount({
  value,
  currency = "USD",
  cents,
  signed,
  colored,
  className,
}: {
  value: unknown;
  currency?: string | null;
  cents?: boolean;
  signed?: boolean;
  colored?: boolean;
  className?: string;
}) {
  return (
    <span className={cn("tabular whitespace-nowrap", colored && TONE_TEXT[tone(value)], className)}>
      {money(value, currency, { cents, signed })}
    </span>
  );
}

/** A labelled figure: small caps label over a serif numeral. */
export function Figure({
  label,
  children,
  sub,
  size = "md",
  className,
}: {
  label: ReactNode;
  children: ReactNode;
  sub?: ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  return (
    <div className={className}>
      <div className={capsCls}>{label}</div>
      <div
        className={cn(
          "tabular mt-1.5 font-display leading-none text-ink",
          size === "lg" && "text-[clamp(2.5rem,5.4vw,3.6rem)] font-light tracking-[-0.03em]",
          size === "md" && "text-[26px] tracking-[-0.02em]",
          size === "sm" && "text-[19px] tracking-[-0.015em]"
        )}
      >
        {children}
      </div>
      {sub ? <div className="mt-2 text-[12.5px] text-ink-dim">{sub}</div> : null}
    </div>
  );
}

// ---------- Marks ----------
type PillTone = "pos" | "neg" | "brass" | "navy" | "mute";
const PILL: Record<PillTone, { box: string; dot: string }> = {
  pos: { box: "border-teal/40 text-teal-deep", dot: "bg-teal" },
  neg: { box: "border-accent-warn/40 text-[#B3322D]", dot: "bg-accent-warn" },
  brass: { box: "border-brass/60 text-[#7A6238]", dot: "bg-brass" },
  navy: { box: "border-navy bg-navy text-ink-invert", dot: "bg-teal-bright" },
  mute: { box: "border-line-strong text-ink-muted", dot: "bg-ink-dim" },
};

export function Pill({ tone: t = "mute", children, dot = true }: { tone?: PillTone; children: ReactNode; dot?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 whitespace-nowrap rounded-md border px-2 py-[3px] text-[10.5px] font-medium uppercase leading-none tracking-[0.11em]",
        PILL[t].box
      )}
    >
      {dot ? <span className={cn("h-[5px] w-[5px]", PILL[t].dot)} aria-hidden /> : null}
      {children}
    </span>
  );
}

// ---------- Empty and notice states ----------
/** An intentional blank: a ruled, quiet block that says what belongs here and what to do next. */
export function Empty({ title, children, className }: { title: ReactNode; children?: ReactNode; className?: string }) {
  return (
    <div className={cn("flex gap-5 border-y border-dashed border-line-strong px-1 py-8 md:px-4", className)}>
      <span className="mt-[11px] h-px w-9 shrink-0 bg-brass" aria-hidden />
      <div className="max-w-[560px]">
        <p className="font-display text-[19px] italic leading-snug text-ink">{title}</p>
        {children ? <div className="mt-2 text-[14px] leading-relaxed text-ink-muted">{children}</div> : null}
      </div>
    </div>
  );
}

/** Full-page notice used when the hub cannot show its contents (private, not set up, error). */
export function Notice({ label, title, children }: { label: string; title: ReactNode; children: ReactNode }) {
  return (
    <div className="mx-auto max-w-[620px] py-20 md:py-28">
      <div className="section-label">{label}</div>
      <h1 className="mt-6 font-display text-[clamp(1.9rem,4vw,2.6rem)] font-light leading-[1.08] tracking-[-0.026em] text-ink">
        {title}
      </h1>
      <div className="mt-6 space-y-4 border-t border-line pt-6 text-[15px] leading-relaxed text-ink-muted">{children}</div>
    </div>
  );
}

export function Code({ children }: { children: ReactNode }) {
  return (
    <code className="rounded-md border border-line bg-bg-sunken px-1.5 py-0.5 text-[12.5px] font-medium tracking-[0.01em] text-ink">
      {children}
    </code>
  );
}

/** A form field: caps label above whatever control is passed in. */
export function Field({
  label,
  hint,
  className,
  children,
}: {
  label: string;
  hint?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <label className={cn("block", className)}>
      <span className={capsCls}>
        {label}
        {hint ? <span className="ml-2 normal-case tracking-normal text-ink-dim/80">{hint}</span> : null}
      </span>
      {children}
    </label>
  );
}

/** A quiet "open to do something" row: a chevron label that unfolds a panel. */
export function Disclosure({
  label,
  meta,
  id,
  open,
  panel = true,
  children,
}: {
  label: ReactNode;
  meta?: ReactNode;
  id?: string;
  open?: boolean;
  /** Wrap the contents in a raised panel (forms). Off for plain lists. */
  panel?: boolean;
  children: ReactNode;
}) {
  return (
    <details id={id} open={open} className="group/d scroll-mt-36">
      <summary className="inline-flex cursor-pointer list-none items-center gap-2 text-[13px] font-medium text-teal-deep transition-colors hover:text-ink [&::-webkit-details-marker]:hidden">
        <span aria-hidden className="inline-block transition-transform group-open/d:rotate-90">
          &rsaquo;
        </span>
        {label}
        {meta ? <span className="tabular font-normal text-ink-dim">{meta}</span> : null}
      </summary>
      {panel ? <div className="mb-3 mt-4 rounded-lg border border-line bg-bg-raised p-5 md:p-7">{children}</div> : <div className="mt-5">{children}</div>}
    </details>
  );
}

/** Checkbox with a title and a line of small print, on a brass-ruled strip. */
export function CheckLine({
  name,
  value,
  defaultChecked,
  title,
  children,
  className,
}: {
  name: string;
  value?: string;
  defaultChecked?: boolean;
  title: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("flex cursor-pointer items-start gap-3 border border-brass/70 bg-bg px-4 py-3", className)}>
      <input type="checkbox" name={name} value={value} defaultChecked={defaultChecked} className="mt-[3px] h-4 w-4 shrink-0 accent-[#0B1A2A]" />
      <span>
        <span className="block text-[13.5px] font-medium text-ink">{title}</span>
        {children ? <span className="mt-0.5 block text-[12.5px] leading-relaxed text-ink-muted">{children}</span> : null}
      </span>
    </label>
  );
}
