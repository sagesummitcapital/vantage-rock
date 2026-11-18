"use client";

// Two-step delete: "Delete" arms the button, "Confirm" does it. No browser dialogs.
import { useEffect, useState } from "react";
import { deleteTransaction } from "@/app/hub/actions";
import { useAct } from "./useAct";

export default function ConfirmDelete({ id, label }: { id: number; label: string }) {
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
        {error ? (
          <span role="alert" className="text-[12px] text-[#B3322D]">
            {error}
          </span>
        ) : null}
        <button
          type="button"
          onClick={() => {
            clearError();
            setArmed(true);
          }}
          aria-label={`Delete ${label}`}
          className="rounded-md px-1.5 py-1 text-[12.5px] text-ink-dim underline decoration-line-strong decoration-1 underline-offset-4 transition-colors hover:text-[#B3322D] hover:decoration-[#B3322D]"
        >
          Delete
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
          void run(() => deleteTransaction(id), "Could not delete").then((ok) => {
            if (!ok) setArmed(false);
          });
        }}
        aria-label={`Confirm delete ${label}`}
        className="rounded-md border border-[#B3322D] bg-[#B3322D] px-2 py-1 text-[12px] font-medium text-white transition-colors hover:bg-[#8F2622] disabled:opacity-60"
      >
        {pending ? "Deleting…" : "Confirm"}
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
