import type { Metadata } from "next";
import Link from "next/link";
import { BUSINESSES, getLookups, getTransactions, type Business, type Transaction } from "@/lib/hub/data";
import { addTransaction } from "@/app/hub/actions";
import ActionForm from "@/components/hub/ActionForm";
import ConfirmDelete from "@/components/hub/ConfirmDelete";
import { Amount, DoubleRule, Empty, Field, PageHeader, Panel, SectionHeading, capsCls, inputCls } from "@/components/hub/ui";
import { day, money, num, one, phoenixToday } from "@/components/hub/format";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: { absolute: "Income & Expenses | Private hub" }, robots: { index: false, follow: false } };

const LIMIT = 300;
const byCurrency = (a: string, b: string) => (a === "USD" ? -1 : b === "USD" ? 1 : a.localeCompare(b));

function totalsByCurrency(rows: Transaction[]) {
  const acc: Record<string, { income: number; expenses: number }> = {};
  rows.forEach((t) => {
    const cur = (t.currency || "USD").toUpperCase();
    if (!acc[cur]) acc[cur] = { income: 0, expenses: 0 };
    if (t.direction === "income") acc[cur].income += num(t.amount);
    else acc[cur].expenses += num(t.amount);
  });
  return Object.keys(acc)
    .sort(byCurrency)
    .map((currency) => ({ currency, income: acc[currency].income, expenses: acc[currency].expenses, net: acc[currency].income - acc[currency].expenses }));
}

export default async function MoneyPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const requested = one(searchParams.business);
  const business = BUSINESSES.find((b) => b.slug === requested)?.slug as Business | undefined;
  const businessName = BUSINESSES.find((b) => b.slug === business)?.name;

  const [transactions, lookups] = await Promise.all([getTransactions({ business, limit: LIMIT }), getLookups()]);
  const totals = totalsByCurrency(transactions);
  const today = phoenixToday();

  const propertyName: Record<number, string> = {};
  lookups.properties.forEach((p) => {
    propertyName[p.id] = p.name;
  });
  const vehicleName: Record<number, string> = {};
  lookups.vehicles.forEach((v) => {
    vehicleName[v.id] = v.name;
  });
  const bizName: Record<string, string> = {};
  BUSINESSES.forEach((b) => {
    bizName[b.slug] = b.name;
  });

  const tabs: { href: string; label: string; active: boolean }[] = [
    { href: "/hub/money", label: "All books", active: !business },
    ...BUSINESSES.map((b) => ({ href: `/hub/money?business=${b.slug}`, label: b.name, active: business === b.slug })),
  ];

  return (
    <>
      <PageHeader
        folio="iv."
        section="Income & Expenses"
        title={
          <>
            The ledger{businessName ? "," : "."} {businessName ? <span className="italic text-teal-deep">{businessName}.</span> : null}
          </>
        }
        lede="Every entry across the four books, newest first. Dollars and euros are totalled separately and never mixed."
        aside={
          <a
            href="#add"
            className="inline-flex items-center rounded-md bg-navy px-4 py-2 text-[13.5px] font-medium text-ink-invert transition-colors hover:bg-teal-deep"
          >
            Add an entry
          </a>
        }
      />

      {/* Filter: plain links, no client script */}
      <nav aria-label="Filter by business" className="-mx-5 overflow-x-auto px-5 md:mx-0 md:px-0">
        <ul className="flex min-w-max gap-2 pb-6">
          {tabs.map((t) => (
            <li key={t.href}>
              <Link
                href={t.href}
                aria-current={t.active ? "page" : undefined}
                className={cn(
                  "inline-flex items-center rounded-md border px-3.5 py-1.5 text-[13px] transition-colors",
                  t.active ? "border-navy bg-navy font-medium text-ink-invert" : "border-line-strong text-ink-muted hover:border-ink hover:text-ink"
                )}
              >
                {t.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Totals */}
      <section aria-label="Totals for the entries shown">
        <DoubleRule />
        {totals.length === 0 ? (
          <div className="grid grid-cols-3 gap-6 py-7">
            {["Income", "Expenses", "Net"].map((l) => (
              <div key={l}>
                <div className={capsCls}>{l}</div>
                <div className="tabular mt-1.5 font-display text-[26px] leading-none text-ink-dim">{money(0, "USD")}</div>
              </div>
            ))}
          </div>
        ) : (
          totals.map((t) => (
            <div key={t.currency} className="grid grid-cols-[52px_repeat(3,minmax(0,1fr))] items-end gap-x-6 gap-y-2 border-b border-line py-6 last:border-b-0">
              <div className="pb-0.5 text-[11px] font-medium uppercase tracking-[0.13em] text-[#7A6238]">{t.currency}</div>
              <div>
                <div className={capsCls}>Income</div>
                <div className="mt-1.5 font-display text-[clamp(1.15rem,3.6vw,1.65rem)] leading-none tracking-[-0.02em]">
                  <Amount value={t.income} currency={t.currency} />
                </div>
              </div>
              <div>
                <div className={capsCls}>Expenses</div>
                <div className="mt-1.5 font-display text-[clamp(1.15rem,3.6vw,1.65rem)] leading-none tracking-[-0.02em]">
                  <Amount value={t.expenses} currency={t.currency} />
                </div>
              </div>
              <div>
                <div className={capsCls}>Net</div>
                <div className="mt-1.5 font-display text-[clamp(1.15rem,3.6vw,1.65rem)] leading-none tracking-[-0.02em]">
                  <Amount value={t.net} currency={t.currency} colored />
                </div>
              </div>
            </div>
          ))
        )}
        <p className="border-t border-line pt-3 text-[12.5px] text-ink-dim">
          Totals cover the {transactions.length} {transactions.length === 1 ? "entry" : "entries"} shown
          {businessName ? ` for ${businessName}` : ""}.
          {transactions.length >= LIMIT ? ` The list stops at the latest ${LIMIT}; older entries are not in these totals.` : ""}
        </p>
      </section>

      {/* Ledger */}
      <section className="mt-12" aria-labelledby="entries">
        <SectionHeading id="entries" title="Entries" note={businessName ?? "All books"} />
        {transactions.length === 0 ? (
          <Empty title={businessName ? `No entries for ${businessName} yet.` : "The ledger is empty."}>
            Add the first transaction below. Rent received, a Turo payout, a repair bill, a Breakout fee: each one is a single line.
            Grok Bot and Claude can also post entries through the agent API, and they land in this same table.
          </Empty>
        ) : (
          <div className="-mx-5 overflow-x-auto px-5 md:mx-0 md:px-0">
            <table className="w-full min-w-[760px] border-collapse text-left text-[13.5px]">
              <thead>
                <tr className="border-b border-line-strong">
                  <th scope="col" className={cn(capsCls, "w-[112px] py-2.5 pr-4")}>
                    Date
                  </th>
                  <th scope="col" className={cn(capsCls, "w-[120px] py-2.5 pr-4")}>
                    Book
                  </th>
                  <th scope="col" className={cn(capsCls, "py-2.5 pr-4")}>
                    Category and note
                  </th>
                  <th scope="col" className={cn(capsCls, "w-[150px] py-2.5 pr-4")}>
                    Against
                  </th>
                  <th scope="col" className={cn(capsCls, "w-[140px] py-2.5 pr-4 text-right")}>
                    Amount
                  </th>
                  <th scope="col" className="w-[150px] py-2.5">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((t) => {
                  const against = t.property_id != null ? propertyName[t.property_id] : t.vehicle_id != null ? vehicleName[t.vehicle_id] : undefined;
                  const signedAmount = t.direction === "income" ? num(t.amount) : -num(t.amount);
                  return (
                    <tr key={t.id} className="border-b border-line align-top transition-colors hover:bg-bg-raised">
                      <td className="tabular whitespace-nowrap py-3 pr-4 text-ink-muted">{day(t.txn_date)}</td>
                      <td className="py-3 pr-4 text-ink">{bizName[t.business] ?? t.business}</td>
                      <td className="py-3 pr-4">
                        <span className="font-medium text-ink">{t.category}</span>
                        {t.description ? <span className="text-ink-muted"> &middot; {t.description}</span> : null}
                        {t.source && t.source !== "manual" ? (
                          <span className="ml-2 text-[11px] uppercase tracking-[0.1em] text-ink-dim">via {t.source}</span>
                        ) : null}
                      </td>
                      <td className="py-3 pr-4 text-ink-muted">{against ?? <span className="text-ink-dim">&mdash;</span>}</td>
                      <td className="py-3 pr-4 text-right">
                        <Amount value={signedAmount} currency={t.currency} cents signed colored className="font-medium" />
                      </td>
                      <td className="py-2 text-right">
                        <ConfirmDelete id={t.id} label={`${t.category} on ${day(t.txn_date)}, ${money(t.amount, t.currency, { cents: true })}`} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Add */}
      <section className="mt-16" aria-labelledby="add">
        <SectionHeading id="add" title="Add an entry" note="Amounts are entered as positive numbers." />
        <Panel className="p-5 md:p-7">
          <ActionForm
            key={business ?? "all"}
            action={addTransaction}
            submitLabel="Record entry"
            pendingLabel="Recording…"
            successMessage="Recorded. It is in the ledger above."
          >
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <Field label="Date">
                <input name="txn_date" type="date" defaultValue={today.iso} required className={`${inputCls} tabular`} />
              </Field>
              <Field label="Book">
                <select name="business" defaultValue={business ?? "rentals"} required className={inputCls}>
                  {BUSINESSES.map((b) => (
                    <option key={b.slug} value={b.slug}>
                      {b.name}
                    </option>
                  ))}
                </select>
              </Field>
              <fieldset className="sm:col-span-2">
                <legend className={capsCls}>Direction</legend>
                <div className="mt-1.5 grid grid-cols-2 gap-2">
                  {(["income", "expense"] as const).map((d) => (
                    <label
                      key={d}
                      className="flex cursor-pointer items-center gap-2.5 rounded-md border border-line-strong bg-bg-raised px-3 py-2 text-[14px] text-ink transition-colors has-[:checked]:border-navy has-[:checked]:bg-bg-sunken"
                    >
                      <input type="radio" name="direction" value={d} defaultChecked={d === "expense"} required className="accent-[#0B1A2A]" />
                      {d === "income" ? "Income" : "Expense"}
                    </label>
                  ))}
                </div>
              </fieldset>
              <Field label="Amount">
                <input name="amount" inputMode="decimal" required placeholder="0.00" autoComplete="off" className={`${inputCls} tabular`} />
              </Field>
              <Field label="Currency">
                <select name="currency" defaultValue="USD" className={inputCls}>
                  <option value="USD">USD, US dollar</option>
                  <option value="EUR">EUR, euro</option>
                </select>
              </Field>
              <Field label="Category" hint="e.g. rent, repair, payout" className="sm:col-span-2">
                <input name="category" placeholder="rent" className={inputCls} />
              </Field>
              <Field label="Property" hint="optional" className="sm:col-span-2">
                <select name="property_id" defaultValue="" className={inputCls}>
                  <option value="">No property</option>
                  {lookups.properties.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.currency})
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Car" hint="optional" className="sm:col-span-2">
                <select name="vehicle_id" defaultValue="" className={inputCls}>
                  <option value="">No car</option>
                  {lookups.vehicles.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.name}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Note" hint="optional" className="sm:col-span-2 lg:col-span-4">
                <input name="description" placeholder="What it was for" className={inputCls} />
              </Field>
            </div>
          </ActionForm>
        </Panel>
        <p className="mt-3 text-[12.5px] text-ink-dim">
          Greek properties are kept in euros: pick EUR when the entry is for one of them. Entries made here are marked as manual.
        </p>
      </section>
    </>
  );
}
