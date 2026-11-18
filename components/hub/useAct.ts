"use client";

// Runs a server action from a button and tracks pending / error state.
// (React 18's startTransition does not accept async callbacks, so this is done by hand.)
import { useCallback, useState } from "react";
import type { ActionResult } from "@/app/hub/actions";

export function useAct() {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const run = useCallback(async (fn: () => Promise<ActionResult>, fallback: string): Promise<boolean> => {
    setPending(true);
    setError(null);
    try {
      const res = await fn();
      if (!res.ok) setError(res.error ?? fallback);
      return res.ok;
    } catch {
      setError(fallback);
      return false;
    } finally {
      setPending(false);
    }
  }, []);

  return { pending, error, run, clearError: () => setError(null) };
}
