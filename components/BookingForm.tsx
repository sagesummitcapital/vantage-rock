"use client";

import { useState, type FormEvent } from "react";

type FormData = {
  name: string;
  email: string;
  title: string;
  company: string;
  revenue: string;
  interest: string;
  message: string;
  /** Honeypot — real users never fill this. Bots do. */
  website: string;
};

type Status = "idle" | "submitting" | "success" | "error";

const initialData: FormData = {
  name: "",
  email: "",
  title: "",
  company: "",
  revenue: "",
  interest: "",
  message: "",
  website: "",
};

const revenueRanges = [
  "Pre-revenue",
  "< $1M",
  "$1M – $5M",
  "$5M – $10M",
  "$10M – $25M",
  "$25M – $50M",
  "$50M+",
];

const interests = [
  "Fractional CFO",
  "FP&A",
  "AI implementation in finance",
  "PE portfolio finance",
  "Not sure yet",
];

export default function BookingForm() {
  const [data, setData] = useState<FormData>(initialData);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Submission failed");
      }

      setStatus("success");
      setData(initialData);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  function update<K extends keyof FormData>(key: K, val: FormData[K]) {
    setData((d) => ({ ...d, [key]: val }));
  }

  if (status === "success") {
    return (
      <div className="relative z-10 mx-auto max-w-[640px] rounded-xl border border-white/10 bg-bg-raised p-10 text-center text-ink">
        <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-teal bg-teal/10">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M4 10l4 4 8-8"
              stroke="#0F7F78"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h3 className="font-display text-[28px] tracking-[-0.02em] text-ink">
          Request received.
        </h3>
        <p className="mt-3 text-[15px] leading-[1.5] text-ink-muted">
          Thanks. You&apos;ll hear back from Stavros within one business day
          with a calendar link.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 font-mono text-[11px] uppercase tracking-[0.1em] text-teal transition-colors hover:text-ink"
        >
          Submit another →
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="relative z-10 mx-auto max-w-[760px] rounded-xl border border-white/10 bg-bg-raised p-7 text-ink md:p-10"
    >
      <div className="mb-8 flex items-center justify-between border-b border-line pb-5">
        <span className="mono-label !text-teal">15–30 minute Introduction Call</span>
        <span className="font-mono text-[11px] tracking-[0.06em] text-ink-dim">
          Reply within 1 business day
        </span>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Full name" required>
          <input
            type="text"
            required
            value={data.name}
            onChange={(e) => update("name", e.target.value)}
            className={inputClass}
            placeholder="Jane Smith"
          />
        </Field>

        <Field label="Work email" required>
          <input
            type="email"
            required
            value={data.email}
            onChange={(e) => update("email", e.target.value)}
            className={inputClass}
            placeholder="jane@company.com"
          />
        </Field>

        <Field label="Title" required>
          <input
            type="text"
            required
            value={data.title}
            onChange={(e) => update("title", e.target.value)}
            className={inputClass}
            placeholder="CEO / COO / Founder"
          />
        </Field>

        <Field label="Company" required>
          <input
            type="text"
            required
            value={data.company}
            onChange={(e) => update("company", e.target.value)}
            className={inputClass}
            placeholder="Company name"
          />
        </Field>

        <Field label="Annual revenue" required>
          <select
            required
            value={data.revenue}
            onChange={(e) => update("revenue", e.target.value)}
            className={inputClass}
          >
            <option value="" disabled>
              Select range
            </option>
            {revenueRanges.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </Field>

        <Field label="What do you need help with?">
          <select
            value={data.interest}
            onChange={(e) => update("interest", e.target.value)}
            className={inputClass}
          >
            <option value="">Select one (optional)</option>
            {interests.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="mt-5">
        <Field label="What's the #1 finance problem you need solved?">
          <textarea
            rows={3}
            value={data.message}
            onChange={(e) => update("message", e.target.value)}
            className={`${inputClass} resize-none`}
            placeholder="Optional · 1-2 sentences is enough"
          />
        </Field>
      </div>

      {/* Honeypot — visually hidden, ignored by humans, filled by bots */}
      <div className="absolute left-[-9999px]" aria-hidden>
        <label>
          Website
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={data.website}
            onChange={(e) => update("website", e.target.value)}
          />
        </label>
      </div>

      {status === "error" && (
        <div className="mt-5 rounded-md border border-accent-warn/40 bg-accent-warn/10 px-4 py-3 text-[13px] text-accent-warn">
          {errorMsg}
        </div>
      )}

      <div className="mt-8 flex flex-col-reverse gap-4 border-t border-line pt-6 md:flex-row md:items-center md:justify-between">
        <span className="font-mono text-[11px] tracking-[0.05em] text-ink-dim">
          Direct to the founder · no spam · no mailing list
        </span>

        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex items-center justify-center rounded-md bg-navy px-7 py-[15px] text-[14px] font-medium tracking-[0.01em] text-ink-invert transition-colors duration-200 hover:bg-teal-deep disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? "Sending…" : "Book an Introduction Call"}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mono-label mb-2 block !text-[10px]">
        {label}
        {required && <span className="ml-1 text-teal">*</span>}
      </span>
      {children}
    </label>
  );
}

const inputClass =
  "w-full rounded-md border border-line-strong bg-bg-sunken px-4 py-[11px] text-[14px] text-ink placeholder:text-ink-dim outline-none transition-all duration-200 focus:border-teal focus:bg-white focus:shadow-[0_0_0_3px_rgba(15,127,120,0.12)]";
