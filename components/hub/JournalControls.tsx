"use client";

// Owner-only journal controls. Approval is a deliberate, separate act: these buttons
// call server actions that re-check the owner list. Nothing else can set owner_approved.
import { approveEntry, revokeApproval, setEntryStatus } from "@/app/hub/actions";
import type { JournalStatus } from "@/lib/hub/data";
import { cn } from "@/lib/utils";
import { useAct } from "./useAct";

// Kept local: importing the runtime list from lib/hub/data would pull the server client into the browser.
const STATUSES: { value: JournalStatus; label: string }[] = [
  { value: "open", label: "Open" },
  { value: "done", label: "Done" },
  { value: "blocked", label: "Blocked" },
  { value: "wontdo", label: "Won’t do" },
];

function ErrorText({ children }: { children: string | null }) {
  if (!children) return null;
  return (
    <span role="alert" className="text-[12px] text-[#B3322D]">
      {children}
    </span>
  );
}

export function ApproveButton({ id, compact }: { id: number; compact?: boolean }) {
  const { pending, error, run } = useAct();
  return (
    <span className="inline-flex flex-wrap items-center gap-3">
      <button
        type="button"
        disabled={pending}
        onClick={() => void run(() => approveEntry(id), "Could not approve")}
        className={cn(
          "inline-flex items-center gap-2.5 rounded-md border border-navy bg-navy font-medium text-ink-invert transition-colors hover:border-teal-deep hover:bg-teal-deep disabled:cursor-not-allowed disabled:opacity-60",
          compact ? "px-3 py-1.5 text-[12.5px]" : "px-4 py-2 text-[13.5px]"
        )}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
          <path d="M1.5 6.5l3 3 6-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
        </svg>
        {pending ? "Approving…" : `Approve #${id}`}
      </button>
      <ErrorText>{error}</ErrorText>
    </span>
  );
}

export function RevokeButton({ id }: { id: number }) {
  const { pending, error, run } = useAct();
  return (
    <span className="inline-flex items-center gap-2">
      <button
        type="button"
        disabled={pending}
        onClick={() => void run(() => revokeApproval(id), "Could not undo")}
        className="text-[12.5px] text-ink-muted underline decoration-line-strong decoration-1 underline-offset-4 transition-colors hover:text-ink hover:decoration-ink disabled:opacity-60"
      >
        {pending ? "Undoing…" : "Undo approval"}
      </button>
      <ErrorText>{error}</ErrorText>
    </span>
  );
}

export function StatusControl({ id, status }: { id: number; status: JournalStatus }) {
  const { pending, error, run } = useAct();
  return (
    <span className="inline-flex items-center gap-2">
      <label className="sr-only" htmlFor={`status-${id}`}>
        Status of entry {id}
      </label>
      <select
        id={`status-${id}`}
        value={status}
        disabled={pending}
        onChange={(e) => {
          const next = e.target.value as JournalStatus;
          void run(() => setEntryStatus(id, next), "Could not update");
        }}
        className={cn(
          "rounded-md border bg-bg-raised py-1 pl-2 pr-6 text-[11px] font-medium uppercase tracking-[0.1em] transition-colors focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal disabled:opacity-60",
          status === "open" && "border-brass/70 text-[#7A6238]",
          status === "done" && "border-teal/40 text-teal-deep",
          status === "blocked" && "border-accent-warn/40 text-[#B3322D]",
          status === "wontdo" && "border-line-strong text-ink-dim"
        )}
      >
        {STATUSES.map((s) => (
          <option key={s.value} value={s.value}>
            {s.label}
          </option>
        ))}
      </select>
      <ErrorText>{error}</ErrorText>
    </span>
  );
}
