import type { ReactNode } from "react";
import type { MDXComponents } from "mdx/types";

/* ------------------------------------------------------------------ *
 * Components available inside every .mdx article.
 * Styling follows the site tokens in tailwind.config.ts — no new colors.
 * ------------------------------------------------------------------ */

/** A framed aside. Use for caveats, disclosures, and "read this before you act" notes. */
export function Callout({
  label = "Note",
  children,
}: {
  label?: string;
  children: ReactNode;
}) {
  return (
    <aside className="my-8 rounded-md border border-teal/35 bg-teal/[0.06] px-6 py-5">
      <span className="mono-label !text-teal">{label}</span>
      <div className="mt-3 space-y-4 text-[15px] leading-[1.7] text-ink-muted [&>p]:m-0">
        {children}
      </div>
    </aside>
  );
}

/** A single number that carries the argument. Use sparingly — one or two per article. */
export function KeyNumber({
  value,
  label,
  source,
}: {
  value: string;
  label: string;
  source?: string;
}) {
  return (
    <div className="my-8 border-l-2 border-teal pl-6">
      <div className="tabular font-display text-[clamp(2.25rem,5vw,3.25rem)] leading-[1.05] tracking-tighter2 text-ink">
        {value}
      </div>
      <div className="mt-2 max-w-[46ch] text-[15px] leading-[1.6] text-ink-muted">{label}</div>
      {source && <div className="mono-label mt-3">{source}</div>}
    </div>
  );
}

/** Closing summary block. One per article, at the end. */
export function Takeaway({ children }: { children: ReactNode }) {
  return (
    <div className="my-10 rounded-md border border-line-strong bg-bg-sunken px-6 py-6">
      <span className="mono-label">The short version</span>
      <div className="mt-3 space-y-4 text-[15.5px] leading-[1.7] text-ink [&>p]:m-0">
        {children}
      </div>
    </div>
  );
}

/** Wide content (tables, wide code) scrolls inside itself rather than the page. */
function Scroller({ children }: { children: ReactNode }) {
  return (
    <div className="my-8 overflow-x-auto rounded-md border border-line">{children}</div>
  );
}

export const mdxComponents: MDXComponents = {
  h2: ({ children, ...props }) => (
    <h2
      {...props}
      className="mt-16 scroll-mt-28 font-display text-[clamp(1.6rem,3vw,2.15rem)] leading-[1.15] tracking-tighter2 text-ink"
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3
      {...props}
      className="mt-12 scroll-mt-28 font-display text-[clamp(1.25rem,2.2vw,1.55rem)] leading-[1.25] tracking-tighter2 text-ink"
    >
      {children}
    </h3>
  ),
  h4: ({ children, ...props }) => (
    <h4
      {...props}
      className="mt-9 scroll-mt-28 text-[15px] font-semibold uppercase tracking-[0.08em] text-ink"
    >
      {children}
    </h4>
  ),
  p: ({ children }) => (
    <p className="mt-6 text-[17px] leading-[1.72] text-ink-muted">{children}</p>
  ),
  a: ({ children, href }) => (
    <a
      href={href}
      className="text-teal underline decoration-teal/30 underline-offset-[3px] transition-colors hover:decoration-teal"
      {...(href?.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  ),
  ul: ({ children }) => (
    <ul className="mt-6 list-disc space-y-3 pl-6 text-[17px] leading-[1.7] text-ink-muted marker:text-teal">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mt-6 list-decimal space-y-3 pl-6 text-[17px] leading-[1.7] text-ink-muted marker:font-mono marker:text-[13px] marker:text-ink-dim">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="pl-1">{children}</li>,
  strong: ({ children }) => <strong className="font-semibold text-ink">{children}</strong>,
  blockquote: ({ children }) => (
    <blockquote className="my-8 border-l-2 border-line-strong pl-6 font-display text-[clamp(1.15rem,2vw,1.4rem)] leading-[1.45] tracking-tighter2 text-ink [&>p]:mt-0 [&>p]:text-inherit">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-14 border-0 border-t border-line" />,
  table: ({ children }) => (
    <Scroller>
      <table className="w-full min-w-[560px] border-collapse bg-bg-raised text-left">
        {children}
      </table>
    </Scroller>
  ),
  thead: ({ children }) => <thead className="bg-bg-sunken">{children}</thead>,
  th: ({ children }) => (
    <th className="mono-label border-b border-line px-5 py-3 !text-ink-dim">{children}</th>
  ),
  td: ({ children }) => (
    <td className="border-b border-line/60 px-5 py-3 align-top text-[14.5px] leading-[1.6] text-ink-muted">
      {children}
    </td>
  ),
  code: ({ children }) => (
    <code className="rounded bg-bg-sunken px-[5px] py-[2px] font-mono text-[13.5px] text-ink">
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className="my-8 overflow-x-auto rounded-md border border-line bg-navy px-5 py-4 font-mono text-[13px] leading-[1.65] text-ink-invert [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-inherit">
      {children}
    </pre>
  ),
  Callout,
  KeyNumber,
  Takeaway,
};
