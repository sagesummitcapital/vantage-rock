"use client";

// One client wrapper for every hub form. The server page passes the server action in
// as a prop and renders the fields as children, so pages stay server components.
import { useEffect, useRef, type ReactNode } from "react";
import { useFormState, useFormStatus } from "react-dom";
import type { ActionResult } from "@/app/hub/actions";
import { cn } from "@/lib/utils";
import { buttonCls } from "./ui";

type FormAction = (prev: ActionResult | null, formData: FormData) => Promise<ActionResult>;

function Submit({ label, pendingLabel }: { label: string; pendingLabel: string }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} aria-disabled={pending} className={buttonCls}>
      {pending ? pendingLabel : label}
    </button>
  );
}

export default function ActionForm({
  action,
  children,
  submitLabel,
  pendingLabel = "Saving…",
  successMessage = "Saved.",
  resetOnSuccess = true,
  note,
  className,
}: {
  action: FormAction;
  children: ReactNode;
  submitLabel: string;
  pendingLabel?: string;
  successMessage?: string;
  /** Clear the fields after a successful save (off for edit forms). */
  resetOnSuccess?: boolean;
  /** Small print beside the button. */
  note?: ReactNode;
  className?: string;
}) {
  const [state, formAction] = useFormState<ActionResult | null, FormData>(action, null);
  const ref = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.ok && resetOnSuccess) ref.current?.reset();
  }, [state, resetOnSuccess]);

  return (
    <form ref={ref} action={formAction} className={className}>
      {children}
      <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
        <Submit label={submitLabel} pendingLabel={pendingLabel} />
        <p role="status" aria-live="polite" className={cn("text-[13px]", state && !state.ok ? "text-[#B3322D]" : "text-teal-deep")}>
          {state ? (state.ok ? successMessage : state.error ?? "Something went wrong.") : ""}
        </p>
        {note ? <p className="ml-auto text-[12.5px] text-ink-dim">{note}</p> : null}
      </div>
    </form>
  );
}
