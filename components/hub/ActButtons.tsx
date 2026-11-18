"use client";

// Small buttons that run an id-based server action. The server page passes the action in.
// QuickAct fires at once (safe, reversible things like "Mark done").
// ConfirmAct is two-step: the first press arms it, the second does it. No browser dialogs.
import { useEffect, useState } from "react";
import type { ActionResult } from "@/app/hub/actions";
import { cn } from "@/lib/utils";
import { useAct } from "./useAct";

type IdAction = (id: number) => Promise<ActionResult>;

const quiet =
  "inline-flex items-center justify-center whitespace-nowrap rounded-md border border-line-strong px-2.5 py-1 text-[12px] font-medium text-ink-muted transition-colors hover:border-ink hover:text-ink disabled:cursor-not-allowed disabled:opacity-60";

function ErrorText({ children }: { children: string | null }) {
  if (!children) return null;
  return (
    <span role="alert" className="text-[12px] text-[#B3322D]">
      {children}
    </span>
  );
}

export function QuickAct({
  action,
  id,
  label,
  pendingLabel = "Saving…",
  ariaLabel,
}: {
  action: IdAction;
  id: number;
  label: string;
  pendingLabel?: string;
  ariaLabel?: string;
}) {
  const { pending, error, run } = useAct();
  return (
    <span className="inline-flex items-center gap-2">
      <ErrorText>{error}</ErrorText>
      <button type="button" disabled={pending} aria-label={ariaLabel} onClick={() => void run(() => action(id), "Could not save")} className={quiet}>
        {pending ? pendingLabel : label}
      </button>
    </span>
  );
}

export function ConfirmAct({
  action,
  id,
  label,
  confirmLabel = "Confirm",
  pendingLabel = "Working…",
  ariaLabel,
  variant = "button",
}: {
  action: IdAction;
  id: number;
  label: string;
  confirmLabel?: string;
  pendingLabel?: string;
  /** Describes the target for screen readers, e.g. "lease for 12 Elm St". */
  ariaLabel?: string;
  /** "link" renders the first step as quiet underlined text (table rows). */
  variant?: "button" | "link";
}) {
  const [armed, setArmed] = useState(false);
  const { pending, error, run, clearError } = useAct();

  // Stand down by itself if the owner walks away from an armed button.
  useEffect(() => {
    if (!armed || pending) return undefined;
    const t = setTimeout(() => setArmed(false), 6000);
    return () => clearTimeout(t);
  }, [armed, pending]);

  if (!armed) {
    return (
      <span className="inline-flex items-center gap-2">
        <ErrorText>{error}</ErrorText>
        <button
          type="button"
          onClick={() => {
            clearError();
            setArmed(true);
          }}
          aria-label={ariaLabel ? `${label}: ${ariaLabel}` : undefined}
          className={cn(
            variant === "link"
              ? "rounded-md px-1.5 py-1 text-[12.5px] text-ink-dim underline decoration-line-strong decoration-1 underline-offset-4 transition-colors hover:text-[#B3322D] hover:decoration-[#B3322D]"
              : quiet
          )}
        >
          {label}
        </button>
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5">
      <button
        type="button"
        autoFocus
        disabled={pending}
        onClick={() => {
          void run(() => action(id), "Could not do that").then((ok) => {
            setArmed(false);
            return ok;
          });
        }}
        aria-label={ariaLabel ? `${confirmLabel}: ${ariaLabel}` : undefined}
        className="whitespace-nowrap rounded-md border border-[#B3322D] bg-[#B3322D] px-2 py-1 text-[12px] font-medium text-white transition-colors hover:bg-[#8F2622] disabled:opacity-60"
      >
        {pending ? pendingLabel : confirmLabel}
      </button>
      <button
        type="button"
        disabled={pending}
        onClick={() => setArmed(false)}
        className="rounded-md border border-line-strong px-2 py-1 text-[12px] text-ink-muted transition-colors hover:border-ink hover:text-ink disabled:opacity-60"
      >
        Keep
      </button>
    </span>
  );
}
