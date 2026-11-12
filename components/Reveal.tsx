import type { ReactNode } from "react";

/**
 * Sections used to fade and slide in one by one on scroll. Content now
 * simply is where it is; the hero's opening sequence is the one piece of
 * motion on the page. The props are kept so existing call sites still work.
 */
export default function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}) {
  return <div className={className}>{children}</div>;
}
