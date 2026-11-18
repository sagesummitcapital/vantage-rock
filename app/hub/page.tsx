import type { Metadata } from "next";
import Link from "next/link";
import { getOverview, type Business, type JournalEntry } from "@/lib/hub/data";
import { buildSeries, hasActivity, scaleFor, totalsByCurrency, type CurrencyTotals, type Totals } from "@/components/hub/rollup";
import SparkBars from "@/components/hub/SparkBars";
import { ApproveButton } from "@/components/hub/JournalControls";
import { Amount, DoubleRule, Empty, Figure, PageHeader, Pill, SectionHeading, capsCls, linkCls } from "@/components/hub/ui";
import { dateTime, money, monthInitial, monthLong, monthYear, num } from "@/components/hub/format";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: { absolute: "Overview | Private hub" }, robots: { index: false, follow: false } };

const AREA_HREF: Record<Business, string> = {
  rentals: "/hub/properties",
  turo: "/hub/cars",
  advisory: "/hub/money?business=advisory",
  trading: "/hub/money?business=trading",
};

const AUTHOR: Record<JournalEntry["author"], string> = { owner: "You", grok: "Grok Bot", claude: "Claude" };

function Statement({ which, label, period, totals }: { which: "month" | "t12"; label: string; period: string; totals: CurrencyTotals[] }) {
  const usd = totals[0];
  const others = totals.slice(1);
  const pick = (t: CurrencyTotals): Totals => (which === "month" ? t.month : t.t12);
  const main = pick(usd);
  return (
    <div className="py-7 md:py-9">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <span className={capsCls}>{label}</span>
        <span className="tabular text-[12.5px] text-ink-dim">{period}</span>
      </div>
      <Figure label={<span className="sr-only">Net</span>} size="lg" className="mt-3">
        <Amount value={main.net} currency={usd.currency} colored />
      </Figure>
      <div className="mt-1 text-[12.5px] text-ink-dim">Net, {usd.currency}</div>
      <dl className="mt-6 grid grid-cols-2 gap-6 border-t border-line pt-5">
        <div>
          <dt className={capsCls}>Income</dt>
          <dd className="tabular mt-1.5 font-display text-[22px] leading-none tracking-[-0.018em]">
            <Amount value={main.income} currency={usd.currency} />
          </dd>
        </div>
        <div>
          <dt className={capsCls}>Expenses</dt>
          <dd className="tabular mt-1.5 font-display text-[22px] leading-none tracking-[-0.018em]">
            <Amount value={main.expenses} currency={usd.currency} />
          </dd>
        </div>
      </dl>
      {others.map((t) => {
        const o = pick(t);
        return (
          <p key={t.currency} className="mt-5 border-t border-dashed border-line-strong pt-4 text-[13px] text-ink-muted">
            <span className="font-medium text-ink">Held in {t.currency}, kept separate:</span> net{" "}
            <Amount value={o.net} currency={t.currency} colored className="font-medium" />, from{" "}
            <Amount value={o.income} currency={t.currency} /> in and <Amount value={o.expenses} currency={t.currency} /> out.
          </p>
        );
      })}
    </div>
  );
}

export default async function HubOverview() {
  const { rollup, properties, vehicles, journal, openJournal, pendingApprovals } = await getOverview();
  const series = buildSeries(rollup);
  const totals = totalsByCurrency(series);
  const months = rollup.months;
  const thisMonth = months[months.length - 1];
  const labels = months.map((m) => monthYear(m));
  const anyActivity = series.some(hasActivity);

  const live = properties.filter((p) => p.status !== "sold");
  const rented = live.filter((p) => p.status === "rented").length;
  const fleet = vehicles.filter((v) => v.status !== "sold");
  const activeCars = fleet.filter((v) => v.status === "active").length;
  const partners = fleet.filter((v) => v.owner_party && v.owner_party.toLowerCase() !== "owner").length;
  const trading = rollup.trading.reduce(
    (s, t) => ({ pnl: s.pnl + num(t.net_pnl), payouts: s.payouts + num(t.payouts), fees: s.fees + num(t.fees) }),
    { pnl: 0, payouts: 0, fees: 0 }
  );
  const t12 = (b: Business) => series.filter((s) => s.business === b);

  const awaiting = journal.filter((e) => e.author !== "owner" && (e.kind === "instruction" || e.kind === "decision") && !e.owner_approved);

  const areas: { business: Business; name: string; headline: string; detail: string }[] = [
    {
      business: "rentals",
      name: "Rentals",
      headline: live.length === 0 ? "No properties on file" : `${live.length} ${live.length === 1 ? "property" : "properties"}`,
      detail: live.length === 0 ? "Phoenix and Greece, once the rows are in." : `${rented} rented, ${live.length - rented} not. Phoenix in USD, Greece in EUR.`,
    },
    {
      business: "turo",
      name: "Turo",
      headline: fleet.length === 0 ? "No cars on file" : `${fleet.length} ${fleet.length === 1 ? "car" : "cars"}`,
      detail:
        fleet.length === 0
          ? "Add the Audi on the Cars page to start the fleet register."
          : `${activeCars} active${partners > 0 ? `, ${partners} belonging to a partner` : ""}.`,
    },
    {
      business: "advisory",
      name: "Vantage Rock",
      headline: "Advisory and content",
      detail: "Fractional CFO work, plus LinkedIn and X.",
    },
    {
      business: "trading",
      name: "Prop trading",
      headline: "Top line only",
      detail:
        rollup.trading.length === 0
          ? "Breakout payouts and fees, by month. Nothing recorded yet."
          : `Breakout, 12 months: account P&L ${money(trading.pnl)}, payouts ${money(trading.payouts)}, fees ${money(trading.fees)}.`,
    },
  ];

  return (
    <>
      <PageHeader
        folio="i."
        section="Overview"
        title={
          <>
            Consolidated position, <span className="italic text-teal-deep">{monthLong(thisMonth)}.</span>
          </>
        }
        lede="Every business on one page: what came in, what went out, and what is waiting on you."
      />

      {/* Statement */}
      <section aria-label="Consolidated income, expenses and net">
        <DoubleRule />
        <div className="grid md:grid-cols-2 md:divide-x md:divide-line">
          <div className="md:pr-12">
            <Statement which="month" label="This month" period={monthLong(thisMonth)} totals={totals} />
          </div>
          <div className="border-t border-line md:border-t-0 md:pl-12">
            <Statement which="t12" label="Trailing twelve months" period={`${monthYear(months[0])} to ${monthYear(thisMonth)}`} totals={totals} />
          </div>
        </div>
      </section>

      {/* Net by business */}
      <section className="mt-14" aria-labelledby="by-business">
        <SectionHeading id="by-business" title="Net by business" note="Twelve months, oldest on the left. Bars share one scale per currency." />
        <div className="hidden grid-cols-[190px_minmax(0,1fr)_112px_124px] items-end gap-x-8 border-b border-line-strong pb-2 md:grid">
          <span className={capsCls}>Business</span>
          <div className="flex" aria-hidden>
            {months.map((m, i) => (
              <span
                key={m}
                className={cn("flex-1 text-center text-[10px] font-medium uppercase", i === months.length - 1 ? "text-ink" : "text-ink-dim")}
              >
                {monthInitial(m)}
              </span>
            ))}
          </div>
          <span className={cn(capsCls, "text-right")}>This month</span>
          <span className={cn(capsCls, "text-right")}>12 months</span>
        </div>
        <ul>
          {series.map((s) => {
            const scale = scaleFor(series, s.currency);
            return (
              <li
                key={`${s.business}-${s.currency}`}
                className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-8 gap-y-3 border-b border-line py-4 md:grid-cols-[190px_minmax(0,1fr)_112px_124px]"
              >
                <div>
                  <Link href={AREA_HREF[s.business]} className="font-display text-[19px] leading-tight tracking-[-0.015em] text-ink transition-colors hover:text-teal-deep">
                    {s.name}
                  </Link>
                  <div className="mt-0.5 text-[12px] text-ink-dim">{s.currency}</div>
                </div>
                <div className="order-last col-span-2 md:order-none md:col-span-1">
                  <SparkBars
                    values={s.monthly.map((m) => m.net)}
                    labels={labels}
                    currency={s.currency}
                    max={scale.max}
                    min={scale.min}
                    title={`${s.name} net by month, ${s.currency}`}
                  />
                </div>
                <div className="hidden text-right text-[14.5px] md:block">
                  <Amount value={s.month.net} currency={s.currency} colored />
                </div>
                <div className="text-right">
                  <Amount value={s.t12.net} currency={s.currency} colored className="font-display text-[19px] tracking-[-0.015em]" />
                  <div className="text-[11px] text-ink-dim md:hidden">12 months</div>
                </div>
              </li>
            );
          })}
        </ul>
        {!anyActivity ? (
          <p className="mt-4 text-[13.5px] text-ink-muted">
            The books are open but empty. Record the first entry under{" "}
            <Link href="/hub/money#add" className={linkCls}>
              Income &amp; Expenses
            </Link>{" "}
            and these lines fill in. Grok Bot and Claude can also post transactions through the agent API.
          </p>
        ) : (
          <p className="mt-4 text-[12.5px] text-ink-dim">
            Teal bars sit above the line (net positive), red bars below it. Hover a bar for the month&rsquo;s figure. Dollars and euros are
            never added together.
          </p>
        )}
      </section>

      {/* Areas */}
      <section className="mt-16" aria-labelledby="areas">
        <SectionHeading id="areas" title="The four books" />
        <div className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {areas.map((a) => (
            <Link key={a.business} href={AREA_HREF[a.business]} className="group flex flex-col bg-bg-raised p-6 transition-colors hover:bg-bg">
              <span className={capsCls}>{a.name}</span>
              <span className="mt-3 font-display text-[21px] leading-tight tracking-[-0.018em] text-ink">{a.headline}</span>
              <span className="mt-2 text-[13px] leading-relaxed text-ink-muted">{a.detail}</span>
              <span className="mt-5 flex flex-wrap gap-x-4 gap-y-1 border-t border-line pt-4 text-[12.5px] text-ink-dim">
                {t12(a.business).map((s) => (
                  <span key={s.currency}>
                    12-mo net <Amount value={s.t12.net} currency={s.currency} colored className="font-medium" />
                  </span>
                ))}
              </span>
              <span className="mt-4 text-[12.5px] font-medium text-teal-deep transition-colors group-hover:text-ink">
                Open <span aria-hidden>&rarr;</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Journal */}
      <section className="mt-16" aria-labelledby="journal">
        <SectionHeading
          id="journal"
          title="Journal"
          action={
            <Link href="/hub/journal" className={linkCls}>
              Open the journal
            </Link>
          }
        />
        <div className="grid gap-10 lg:grid-cols-[260px_minmax(0,1fr)]">
          <div className="space-y-6">
            <Figure label="Open items" size="md">
              {openJournal}
            </Figure>
            <Figure label="Awaiting your approval" size="md">
              {pendingApprovals}
            </Figure>
            <p className="border-l border-brass pl-4 text-[13px] leading-relaxed text-ink-muted">
              Nothing goes live on Grok Bot&rsquo;s word. It relays; only your own approval, given here, counts.
            </p>
          </div>

          <div>
            {awaiting.length > 0 ? (
              <ul className="mb-8 border border-brass/70 bg-bg-raised">
                {awaiting.map((e) => (
                  <li key={e.id} className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-b border-line px-5 py-4 last:border-b-0">
                    <div className="min-w-0 flex-1 basis-[280px]">
                      <div className="flex flex-wrap items-center gap-2">
                        <Pill tone="brass">Awaiting approval</Pill>
                        <span className="text-[12.5px] text-ink-dim">
                          {AUTHOR[e.author]} &middot; {e.kind} &middot;{" "}
                          <Link href={`/hub/journal#entry-${e.id}`} className="tabular hover:text-ink">
                            #{e.id}
                          </Link>
                        </span>
                      </div>
                      <p className="mt-2 line-clamp-2 text-[14px] leading-relaxed text-ink">{e.body}</p>
                    </div>
                    <ApproveButton id={e.id} compact />
                  </li>
                ))}
              </ul>
            ) : null}

            {journal.length === 0 ? (
              <Empty title="The journal has no entries yet.">
                Write the first note on the{" "}
                <Link href="/hub/journal#compose" className={linkCls}>
                  Journal page
                </Link>
                . Grok Bot and Claude write here too, through the agent API, and anything that needs your approval shows up in this spot.
              </Empty>
            ) : (
              <ol className="border-t border-line">
                {journal.map((e) => (
                  <li key={e.id} className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-6 gap-y-1 border-b border-line py-3.5 sm:grid-cols-[92px_minmax(0,1fr)_auto]">
                    <span className="hidden text-[12.5px] font-medium text-ink sm:block">{AUTHOR[e.author]}</span>
                    <Link href={`/hub/journal#entry-${e.id}`} className="min-w-0 text-[14px] leading-relaxed text-ink transition-colors hover:text-teal-deep">
                      <span className="sm:hidden">
                        <span className="font-medium">{AUTHOR[e.author]}</span>
                        {": "}
                      </span>
                      <span className="line-clamp-2">{e.body}</span>
                    </Link>
                    <span className="flex flex-col items-end gap-1 text-right">
                      <span className="tabular whitespace-nowrap text-[12px] text-ink-dim">{dateTime(e.created_at)}</span>
                      <span className="text-[11px] uppercase tracking-[0.1em] text-ink-dim">
                        {e.kind}
                        {e.status !== "open" ? ` · ${e.status === "wontdo" ? "won’t do" : e.status}` : ""}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
