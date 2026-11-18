import type { Metadata } from "next";
import Link from "next/link";
import { JOURNAL_KINDS, JOURNAL_STATUSES, getJournal, type JournalEntry, type JournalKind, type JournalStatus } from "@/lib/hub/data";
import { postJournalEntry } from "@/app/hub/actions";
import ActionForm from "@/components/hub/ActionForm";
import { ApproveButton, RevokeButton, StatusControl } from "@/components/hub/JournalControls";
import { Empty, Field, Figure, DoubleRule, PageHeader, Panel, Pill, SectionHeading, capsCls, inputCls, linkCls } from "@/components/hub/ui";
import { dateTime, dayLong, one } from "@/components/hub/format";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: { absolute: "Journal | Private hub" }, robots: { index: false, follow: false } };

const LIMIT = 100;

const AUTHOR: Record<JournalEntry["author"], { label: string; tone: "navy" | "brass" | "pos"; rule: string }> = {
  owner: { label: "You", tone: "navy", rule: "border-l-navy" },
  grok: { label: "Grok Bot", tone: "brass", rule: "border-l-brass" },
  claude: { label: "Claude", tone: "pos", rule: "border-l-teal" },
};
const KIND_LABEL: Record<JournalKind, string> = {
  instruction: "Instruction",
  decision: "Decision",
  note: "Note",
  shipped: "Shipped",
  question: "Question",
};
const STATUS_LABEL: Record<JournalStatus, string> = { open: "Open", done: "Done", blocked: "Blocked", wontdo: "Won’t do" };

const needsApproval = (e: JournalEntry) => e.author !== "owner" && (e.kind === "instruction" || e.kind === "decision");

function journalHref(params: { kind?: string; status?: string; reply?: string }, hash = "") {
  const sp = new URLSearchParams();
  if (params.kind) sp.set("kind", params.kind);
  if (params.status) sp.set("status", params.status);
  if (params.reply) sp.set("reply", params.reply);
  const qs = sp.toString();
  return `/hub/journal${qs ? `?${qs}` : ""}${hash}`;
}

function FilterRow({ label, items }: { label: string; items: { href: string; label: string; active: boolean }[] }) {
  return (
    <div className="flex items-baseline gap-4">
      <span className={cn(capsCls, "w-[52px] shrink-0")}>{label}</span>
      <ul className="flex flex-wrap gap-x-1.5 gap-y-2">
        {items.map((i) => (
          <li key={i.label}>
            <Link
              href={i.href}
              aria-current={i.active ? "true" : undefined}
              className={cn(
                "inline-flex rounded-md border px-2.5 py-1 text-[12.5px] transition-colors",
                i.active ? "border-navy bg-navy font-medium text-ink-invert" : "border-transparent text-ink-muted hover:border-line-strong hover:text-ink"
              )}
            >
              {i.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Entry({ e, replyHref }: { e: JournalEntry; replyHref: string }) {
  const a = AUTHOR[e.author] ?? { label: e.author, tone: "brass" as const, rule: "border-l-line-strong" };
  const gated = needsApproval(e);
  const tags = Array.isArray(e.tags) ? e.tags : [];

  return (
    <li id={`entry-${e.id}`} className={cn("scroll-mt-36 border-b border-l-2 border-b-line bg-transparent py-5 pl-5 target:bg-bg-raised md:pl-7", a.rule)}>
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <Pill tone={a.tone} dot={e.author !== "owner"}>
            {a.label}
          </Pill>
          <span className="text-[12.5px] font-medium text-ink">{KIND_LABEL[e.kind] ?? e.kind}</span>
          <a href={`#entry-${e.id}`} className="tabular text-[12.5px] text-ink-dim transition-colors hover:text-ink" aria-label={`Entry ${e.id}, permanent link`}>
            #{e.id}
          </a>
          <time dateTime={e.created_at} className="tabular text-[12.5px] text-ink-dim">
            {dateTime(e.created_at)}
          </time>
        </div>
        <StatusControl id={e.id} status={e.status} />
      </div>

      {e.reply_to != null ? (
        <p className="mt-3 text-[12.5px] text-ink-dim">
          <span aria-hidden>&crarr; </span>In reply to{" "}
          <a href={`#entry-${e.reply_to}`} className={cn(linkCls, "tabular")}>
            #{e.reply_to}
          </a>
        </p>
      ) : null}

      <div className="mt-3 max-w-[760px] whitespace-pre-wrap break-words text-[15px] leading-[1.65] text-ink">{e.body}</div>

      {tags.length > 0 ? (
        <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1" aria-label="Tags">
          {tags.map((t) => (
            <li key={t} className="text-[12px] text-ink-dim">
              <span className="text-brass" aria-hidden>
                /
              </span>
              {t}
            </li>
          ))}
        </ul>
      ) : null}

      {/* The approval line. Only the owner's own act, here, makes a relayed instruction or decision live. */}
      {gated && !e.owner_approved ? (
        <div className="mt-5 flex max-w-[760px] flex-wrap items-center justify-between gap-x-6 gap-y-3 border border-brass/70 bg-bg-raised px-4 py-3.5">
          <div className="min-w-0 flex-1 basis-[260px]">
            <div className="text-[11px] font-medium uppercase tracking-[0.13em] text-[#7A6238]">Not live &middot; awaiting your approval</div>
            <p className="mt-1 text-[13px] leading-relaxed text-ink-muted">
              {a.label} recorded this {e.kind}. Nothing acts on it until you approve it yourself.
            </p>
          </div>
          <ApproveButton id={e.id} />
        </div>
      ) : null}
      {gated && e.owner_approved ? (
        <div className="mt-5 flex max-w-[760px] flex-wrap items-center justify-between gap-x-6 gap-y-2 border-l-2 border-teal bg-bg-raised px-4 py-2.5">
          <span className="flex items-center gap-2.5 text-[13px] font-medium text-teal-deep">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
              <path d="M1.5 6.5l3 3 6-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
            </svg>
            Approved by you
            {e.approved_at ? <span className="tabular font-normal text-ink-dim">&middot; {dateTime(e.approved_at)}</span> : null}
          </span>
          <RevokeButton id={e.id} />
        </div>
      ) : null}
      {!gated && e.author === "owner" && e.owner_approved ? (
        <div className="mt-4 flex max-w-[760px] flex-wrap items-center justify-between gap-x-6 gap-y-2 border-l-2 border-teal bg-bg-raised px-4 py-2.5">
          <span className="text-[13px] font-medium text-teal-deep">
            Recorded as your approval
            {e.approved_at ? <span className="tabular font-normal text-ink-dim"> &middot; {dateTime(e.approved_at)}</span> : null}
          </span>
          <RevokeButton id={e.id} />
        </div>
      ) : null}

      <div className="mt-4">
        <Link href={replyHref} className="text-[12.5px] text-ink-muted underline decoration-line-strong decoration-1 underline-offset-4 transition-colors hover:text-ink hover:decoration-ink">
          Reply to #{e.id}
        </Link>
      </div>
    </li>
  );
}

export default async function JournalPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const kindParam = one(searchParams.kind);
  const statusParam = one(searchParams.status);
  const kind = JOURNAL_KINDS.find((k) => k === kindParam);
  const status = JOURNAL_STATUSES.find((s) => s === statusParam);
  const replyRaw = Number(one(searchParams.reply));
  const reply = Number.isInteger(replyRaw) && replyRaw > 0 ? replyRaw : null;

  const entries = await getJournal({ kind, status, limit: LIMIT });
  const filtered = Boolean(kind || status);
  const awaiting = entries.filter((e) => needsApproval(e) && !e.owner_approved);
  const open = entries.filter((e) => e.status === "open").length;

  // Group by entry_date, keeping newest-first order.
  const groups: { date: string; items: JournalEntry[] }[] = [];
  entries.forEach((e) => {
    const date = String(e.entry_date).slice(0, 10);
    const last = groups[groups.length - 1];
    if (last && last.date === date) last.items.push(e);
    else groups.push({ date, items: [e] });
  });

  const kindItems = [
    { href: journalHref({ status }), label: "All", active: !kind },
    ...JOURNAL_KINDS.map((k) => ({ href: journalHref({ kind: k, status }), label: KIND_LABEL[k], active: kind === k })),
  ];
  const statusItems = [
    { href: journalHref({ kind }), label: "All", active: !status },
    ...JOURNAL_STATUSES.map((s) => ({ href: journalHref({ kind, status: s }), label: STATUS_LABEL[s], active: status === s })),
  ];

  return (
    <>
      <PageHeader
        folio="vi."
        section="Journal"
        title={
          <>
            The working journal, <span className="italic text-teal-deep">shared three ways.</span>
          </>
        }
        lede="You, Grok Bot and Claude all write here. Instructions, decisions, questions and what shipped, in one running record."
      />

      {/* The rule of the house */}
      <section aria-label="How approval works">
        <DoubleRule />
        <div className="grid gap-x-12 gap-y-6 py-7 md:grid-cols-[minmax(0,1fr)_auto]">
          <div className="max-w-[640px]">
            <div className="text-[11px] font-medium uppercase tracking-[0.13em] text-[#7A6238]">The approval rule</div>
            <p className="mt-2 font-display text-[21px] leading-snug tracking-[-0.015em] text-ink">
              Only your own approval makes something go live. Grok Bot relays what you said; it never approves on your behalf.
            </p>
            <p className="mt-2 text-[13.5px] leading-relaxed text-ink-muted">
              Any instruction or decision written by Grok Bot or Claude waits below with an Approve button until you press it. The
              agent API cannot set an approval.
            </p>
          </div>
          <div className="flex gap-10 md:flex-col md:gap-5 md:border-l md:border-line md:pl-10">
            <Figure label="Awaiting you" size="md">
              {awaiting.length}
            </Figure>
            <Figure label="Open" size="md">
              {open}
            </Figure>
          </div>
        </div>
      </section>

      {/* Compose */}
      <section className="mt-8" aria-labelledby="compose">
        <SectionHeading id="compose" title="Write an entry" note="Posted as you" />
        <Panel className="p-5 md:p-7">
          <ActionForm
            key={reply ?? "new"}
            action={postJournalEntry}
            submitLabel="Post to journal"
            pendingLabel="Posting…"
            successMessage="Posted."
            note="Grok Bot and Claude read this on their next pass."
          >
            <div className="grid gap-5 sm:grid-cols-[200px_160px_minmax(0,1fr)]">
              <Field label="Kind">
                <select name="kind" defaultValue={reply ? "note" : "instruction"} required className={inputCls}>
                  {JOURNAL_KINDS.map((k) => (
                    <option key={k} value={k}>
                      {KIND_LABEL[k]}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="In reply to" hint="optional">
                <input name="reply_to" type="number" min={1} step={1} defaultValue={reply ?? ""} placeholder="Entry no." className={`${inputCls} tabular`} />
              </Field>
              <div className="hidden items-end pb-2 text-[12.5px] text-ink-dim sm:flex">
                {reply ? (
                  <span>
                    Replying to{" "}
                    <a href={`#entry-${reply}`} className={cn(linkCls, "tabular")}>
                      #{reply}
                    </a>
                    .{" "}
                    <Link href={journalHref({ kind, status }, "#compose")} className="underline decoration-line-strong underline-offset-4 hover:text-ink">
                      Clear
                    </Link>
                  </span>
                ) : null}
              </div>
            </div>
            <Field label="Entry" className="mt-5">
              <textarea
                name="body"
                rows={4}
                required
                placeholder="Say it in your own words. This is the record the others work from."
                className={cn(inputCls, "leading-relaxed")}
              />
            </Field>
            <label className="mt-5 flex cursor-pointer items-start gap-3 border border-brass/70 bg-bg px-4 py-3.5">
              <input type="checkbox" name="approve" className="mt-[3px] h-4 w-4 shrink-0 accent-[#0B1A2A]" />
              <span>
                <span className="block text-[14px] font-medium text-ink">This is my approval</span>
                <span className="mt-0.5 block text-[13px] leading-relaxed text-ink-muted">
                  Tick only when this entry is you approving something, in your own words. It is recorded as approved by you, with
                  the time.
                </span>
              </span>
            </label>
          </ActionForm>
        </Panel>
      </section>

      {/* Entries */}
      <section className="mt-16" aria-labelledby="entries">
        <SectionHeading
          id="entries"
          title="Entries"
          note={`${entries.length}${entries.length >= LIMIT ? " most recent" : ""} ${entries.length === 1 ? "entry" : "entries"}${filtered ? ", filtered" : ""}`}
        />
        <div className="space-y-3 pb-6">
          <FilterRow label="Kind" items={kindItems} />
          <FilterRow label="Status" items={statusItems} />
        </div>

        {entries.length === 0 ? (
          filtered ? (
            <Empty title="Nothing matches these filters.">
              <Link href="/hub/journal" className={linkCls}>
                Show every entry
              </Link>
            </Empty>
          ) : (
            <Empty title="The journal has no entries yet.">
              Write the first one above: an instruction, a decision, or just a note. Grok Bot and Claude read and write this same
              journal through the agent API, and anything of theirs that needs your approval will wait here for you.
            </Empty>
          )
        ) : (
          <div className="space-y-10">
            {groups.map((g) => (
              <section key={g.date} aria-label={dayLong(g.date)}>
                <h3 className="flex items-center gap-4 border-b border-line-strong pb-2.5">
                  <span className="font-display text-[18px] italic tracking-[-0.01em] text-ink">{dayLong(g.date)}</span>
                  <span className="tabular text-[12px] text-ink-dim">
                    {g.items.length} {g.items.length === 1 ? "entry" : "entries"}
                  </span>
                </h3>
                <ol>
                  {g.items.map((e) => (
                    <Entry key={e.id} e={e} replyHref={journalHref({ kind, status, reply: String(e.id) }, "#compose")} />
                  ))}
                </ol>
              </section>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
