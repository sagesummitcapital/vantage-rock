export default function HubLoading() {
  return (
    <div className="py-14" role="status" aria-live="polite">
      <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-ink-dim">Opening the books</div>
      <div className="loader-bar mt-4 h-[2px] w-full max-w-[320px] bg-line" />
    </div>
  );
}
