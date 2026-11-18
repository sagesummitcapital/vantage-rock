// Twelve thin bars around a zero line. Hand-drawn SVG, no chart library.
// Position (above or below the line) carries the sign; colour only repeats it.
// Each bar has a native tooltip, and every chart sits beside its figures in a table.
import { cn } from "@/lib/utils";
import { money } from "./format";

const W = 240;

export default function SparkBars({
  values,
  labels,
  currency = "USD",
  max,
  min,
  height = 40,
  title,
  className,
}: {
  values: number[];
  /** One label per value, e.g. "Nov 2026". */
  labels: string[];
  currency?: string;
  /** Shared scale: largest positive and most negative value across the comparison group. */
  max: number;
  min: number;
  height?: number;
  title: string;
  className?: string;
}) {
  const count = Math.max(values.length, 1);
  const slot = W / count;
  const barW = Math.min(slot * 0.56, 12);
  const top = Math.max(max, 0);
  const bottom = Math.min(min, 0);
  const range = top - bottom;
  const pad = 2;
  const plot = height - pad * 2;
  // With no data at all the line rests at the foot, like an empty ledger row.
  const zeroY = range === 0 ? height - pad : pad + (top / range) * plot;
  const summary = values.map((v, i) => `${labels[i] ?? ""} ${money(v, currency)}`).join(", ");

  return (
    <svg
      viewBox={`0 0 ${W} ${height}`}
      preserveAspectRatio="none"
      role="img"
      aria-label={`${title}. ${summary}`}
      className={cn("block w-full", className)}
      style={{ height }}
    >
      {/* the current month sits on a faint well */}
      <rect x={W - slot} y={0} width={slot} height={height} className="fill-bg-sunken" />
      {values.map((v, i) => {
        const h = range === 0 || v === 0 ? 0 : Math.max((Math.abs(v) / range) * plot, 1.5);
        const x = i * slot + (slot - barW) / 2;
        const y = v > 0 ? zeroY - h : zeroY;
        return (
          <g key={i}>
            <title>{`${labels[i] ?? ""}: ${money(v, currency)}`}</title>
            <rect x={i * slot} y={0} width={slot} height={height} fill="transparent" />
            {h > 0 ? (
              <rect x={x} y={y} width={barW} height={h} className={v > 0 ? "fill-teal" : "fill-accent-warn"} />
            ) : (
              <rect x={i * slot + slot / 2 - 1} y={zeroY - 2.5} width={2} height={2} className="fill-ink-dim/50" />
            )}
          </g>
        );
      })}
      <line x1={0} x2={W} y1={zeroY} y2={zeroY} className="stroke-line-strong" strokeWidth={1} vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
