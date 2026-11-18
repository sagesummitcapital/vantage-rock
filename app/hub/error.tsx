"use client";

import { Notice } from "@/components/hub/ui";

export default function HubError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <Notice label="Something went wrong" title="This page could not load its figures.">
      <p>
        Nothing was changed. The usual cause is the database being unreachable for a moment, or a table the hub expects not being
        created yet.
      </p>
      {error.digest ? (
        <p className="tabular text-[13px] text-ink-dim">Reference for the Vercel logs: {error.digest}</p>
      ) : null}
      <p>
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center rounded-md bg-navy px-4 py-2 text-[13.5px] font-medium text-ink-invert transition-colors hover:bg-teal-deep"
        >
          Try again
        </button>
      </p>
    </Notice>
  );
}
