import type { Metadata } from "next";
import Link from "next/link";
import { BUSINESSES, getLookups, getRecentMonthly, getTrading } from "@/lib/hub/data";
import { addTransaction, deleteTradingMonth, saveTradingMonth } from "@/app/hub/actions";
import ActionForm from "@/components/hub/ActionForm";
import { ConfirmAct } from "@/components/hub/ActButtons";
import ConfirmDelete from "@/components/hub/ConfirmDelete";
import { Amount, DoubleRule, Empty, Field, PageHeader, Panel, SectionHeading, capsCls, inputCls, linkCls } from "@/components/hub/ui";
import { day, money, monthLong, monthYear, num, one, phoenixLastMonth } from "@/components/hub/format";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: { absolute: "Monthly entries | Private hub" }, robots: { index: false, follow: false } };

const RECENT = 20;

export default async function MonthlyPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const [trading, recent, lookups] = await Promise.all([getTrading(36), getRecentMonthly(RECENT), getLookups()]);

  const editId = Number(one(searchParams.edit));
  const editing = Number.isInteger(editId) && editId > 0 ? trading.find((t) => t.id === editId) ?? null : null;
  const lastMonth = phoenixLastMonth();

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

  const year = trading.slice(0, 12).reduce(
    (s, t) => ({ pnl: s.pnl + num(t.net_pnl), payouts: s.payouts + num(t.payouts), fees: s.fees + num(t.fees) }),
    { pnl: 0, payouts: 0, fees: 0 }
  );

  return (
    <>
      <PageHeader
        folio="v."
        section="Monthly entries"
        title={
          <>
            Close the month, <span className="italic text-teal-deep">one line at a time.</span>
          </>
        }
        lede="Two forms. The first is the Breakout top line for a month. The second is any other income or expense you want to put against a month, such as an advisory retainer or the Greek rent."
      />

      <section aria-label="How the two forms differ">
        <DoubleRule />
        <div className="grid gap-x-12 gap-y-5 py-7 md:grid-cols-2">
          <p className="text-[14px] leading-relaxed text-ink-muted">
            <a href="#trading" className={cn(linkCls, "font-medium")}>
              Breakout and prop trading
            </a>{" "}
            takes three numbers per month: the account result, what was paid out to you, and what you paid in fees. Saving a month
            again replaces it.
          </p>
          <p className="border-l border-brass pl-5 text-[14px] leading-relaxed text-ink-muted">
            <a href="#other" className={cn(linkCls, "font-medium")}>
              Other income or expense
            </a>{" "}
            adds a ledger line dated the 1st of the month you pick.{" "}
            <span className="font-medium text-ink">Do not enter Breakout payouts here as well</span>, or they are counted twice.
          </p>
        </div>
      </section>

      {/* (a) Trading */}
      <section className="mt-8" aria-labelledby="trading">
        <SectionHeading id="trading" title="Breakout, month by month" note="Top line only" />
        <Panel className="p-5 md:p-7">
          {editing ? (
            <p className="mb-5 flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-line pb-4 text-[13.5px] text-ink">
              <span className="text-[11px] font-medium uppercase tracking-[0.13em] text-[#7A6238]">Editing</span>
              <span className="font-medium">
                {monthLong(editing.month)} &middot; {editing.account}
              </span>
              <Link href="/hub/monthly#trading" className="text-[12.5px] text-ink-muted underline decoration-line-strong underline-offset-4 hover:text-ink">
                Cancel, enter a new month instead
              </Link>
            </p>
          ) : null}
          <ActionForm
            key={editing ? `edit-${editing.id}` : "new"}
            action={saveTradingMonth}
            submitLabel={editing ? "Save changes" : "Save month"}
            successMessage="Saved. The table below is up to date."
            resetOnSuccess={!editing}
          >
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
              <Field label="Month">
                <input name="month" type="month" required defaultValue={editing ? String(editing.month).slice(0, 7) : lastMonth} className={`${inputCls} tabular`} />
              </Field>
              <Field label="Account">
                <input name="account" defaultValue={editing?.account ?? "Breakout"} className={inputCls} />
              </Field>
              <Field label="Account P&L" hint="may be negative">
                <input name="net_pnl" inputMode="decimal" defaultValue={editing ? editing.net_pnl : ""} placeholder="0.00" autoComplete="off" className={`${inputCls} tabular`} />
              </Field>
              <Field label="Payouts" hint="paid to you">
                <input name="payouts" inputMode="decimal" defaultValue={editing ? editing.payouts : ""} placeholder="0.00" autoComplete="off" className={`${inputCls} tabular`} />
              </Field>
              <Field label="Fees" hint="paid by you">
                <input name="fees" inputMode="decimal" defaultValue={editing ? editing.fees : ""} placeholder="0.00" autoComplete="off" className={`${inputCls} tabular`} />
              </Field>
              <Field label="Notes" hint="optional" className="sm:col-span-2 lg:col-span-5">
                <input name="notes" defaultValue={editing?.notes ?? ""} className={inputCls} />
              </Field>
            </div>
            <p className="mt-4 text-[12.5px] leading-relaxed text-ink-dim">
              One row per month and account. Saving a month and account that already exist overwrites that row, so this form is also
              how you correct one. Blank figures are saved as zero. Trade-level detail stays out of the hub.
            </p>
          </ActionForm>
        </Panel>

        <div className="mt-8">
          {trading.length === 0 ? (
            <Empty title="No trading months saved yet.">
              Enter last month above: the account result, any payout, any fees. Each saved month becomes a line here and feeds the
              Prop trading row on the Overview.
            </Empty>
          ) : (
            <div className="-mx-5 overflow-x-auto px-5 md:mx-0 md:px-0">
              <table className="w-full min-w-[720px] border-collapse text-left text-[13.5px]">
                <thead>
                  <tr className="border-b border-line-strong">
                    <th scope="col" className={cn(capsCls, "py-2.5 pr-4")}>
                      Month
                    </th>
                    <th scope="col" className={cn(capsCls, "py-2.5 pr-4")}>
                      Account
                    </th>
                    <th scope="col" className={cn(capsCls, "py-2.5 pr-4 text-right")}>
                      Account P&amp;L
                    </th>
                    <th scope="col" className={cn(capsCls, "py-2.5 pr-4 text-right")}>
                      Payouts
                    </th>
                    <th scope="col" className={cn(capsCls, "py-2.5 pr-4 text-right")}>
                      Fees
                    </th>
                    <th scope="col" className={cn(capsCls, "py-2.5 pr-4 text-right")}>
                      Cash to you
                    </th>
                    <th scope="col" className="w-[170px] py-2.5">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {trading.map((t) => (
                    <tr
                      key={t.id}
                      id={`trading-${t.id}`}
                      className={cn("border-b border-line align-top transition-colors hover:bg-bg-raised", editing?.id === t.id && "bg-bg-raised")}
                    >
                      <td className="tabular whitespace-nowrap py-3 pr-4 font-medium text-ink">
                        {monthYear(t.month)}
                        {t.notes ? <div className="mt-0.5 max-w-[260px] whitespace-normal text-[12.5px] font-normal text-ink-dim">{t.notes}</div> : null}
                      </td>
                      <td className="py-3 pr-4 text-ink-muted">{t.account}</td>
                      <td className="py-3 pr-4 text-right">
                        <Amount value={t.net_pnl} cents signed colored />
                      </td>
                      <td className="py-3 pr-4 text-right">
                        <Amount value={t.payouts} cents />
                      </td>
                      <td className="py-3 pr-4 text-right">
                        <Amount value={t.fees} cents />
                      </td>
                      <td className="py-3 pr-4 text-right">
                        <Amount value={num(t.payouts) - num(t.fees)} cents signed colored className="font-medium" />
                      </td>
                      <td className="py-2 text-right">
                        <span className="inline-flex items-center gap-1">
                          <Link
                            href={`/hub/monthly?edit=${t.id}#trading`}
                            className="rounded-md px-1.5 py-1 text-[12.5px] text-ink-muted underline decoration-line-strong decoration-1 underline-offset-4 transition-colors hover:text-ink hover:decoration-ink"
                            aria-label={`Edit ${monthYear(t.month)}, ${t.account}`}
                          >
                            Edit
                          </Link>
                          <ConfirmAct
                            action={deleteTradingMonth}
                            id={t.id}
                            label="Delete"
                            pendingLabel="Deleting…"
                            variant="link"
                            ariaLabel={`${monthYear(t.month)}, ${t.account}`}
                          />
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-b border-line-strong">
                    <th scope="row" colSpan={2} className={cn(capsCls, "py-3 pr-4 text-left")}>
                      Latest {Math.min(trading.length, 12)} {Math.min(trading.length, 12) === 1 ? "row" : "rows"}
                    </th>
                    <td className="py-3 pr-4 text-right">
                      <Amount value={year.pnl} cents signed colored />
                    </td>
                    <td className="py-3 pr-4 text-right">
                      <Amount value={year.payouts} cents />
                    </td>
                    <td className="py-3 pr-4 text-right">
                      <Amount value={year.fees} cents />
                    </td>
                    <td className="py-3 pr-4 text-right">
                      <Amount value={year.payouts - year.fees} cents signed colored className="font-medium" />
                    </td>
                    <td />
                  </tr>
                </tfoot>
              </table>
            </div>
          )}
        </div>
      </section>

      {/* (b) Other monthly income or expense */}
      <section className="mt-16" aria-labelledby="other">
        <SectionHeading id="other" title="Other income or expense for a month" note="Booked on the 1st of the month" />
        <Panel className="p-5 md:p-7">
          <ActionForm action={addTransaction} submitLabel="Record entry" pendingLabel="Recording…" successMessage="Recorded. It is in the list below.">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <Field label="Month">
                <input name="month" type="month" required defaultValue={lastMonth} className={`${inputCls} tabular`} />
              </Field>
              <Field label="Book">
                <select name="business" defaultValue="advisory" required className={inputCls}>
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
                      <input type="radio" name="direction" value={d} defaultChecked={d === "income"} required className="accent-[#0B1A2A]" />
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
              <Field label="Category" hint="e.g. retainer, rent" className="sm:col-span-2">
                <input name="category" placeholder="retainer" className={inputCls} />
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
                <input name="description" placeholder="e.g. October retainer, client A" className={inputCls} />
              </Field>
            </div>
            <p className="mt-4 text-[12.5px] leading-relaxed text-ink-dim">
              For Greek rent, choose Rentals, the property, and EUR. For a Phoenix property choose USD. Pick the property so the amount
              shows in that property&rsquo;s own cash flow. Need an exact day instead of a month? Use{" "}
              <Link href="/hub/money#add" className={linkCls}>
                Income &amp; Expenses
              </Link>
              .
            </p>
          </ActionForm>
        </Panel>

        <div className="mt-10">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-line-strong pb-2.5">
            <h3 className="font-display text-[18px] italic tracking-[-0.01em] text-ink">Latest {RECENT} ledger entries</h3>
            <Link href="/hub/money" className={cn(linkCls, "text-[13px]")}>
              Open the full ledger
            </Link>
          </div>
          {recent.length === 0 ? (
            <Empty title="Nothing in the ledger yet." className="mt-4 border-t-0">
              Record the first entry above, for example last month&rsquo;s advisory retainer or the rent from one of the properties.
            </Empty>
          ) : (
            <div className="-mx-5 overflow-x-auto px-5 md:mx-0 md:px-0">
              <table className="w-full min-w-[720px] border-collapse text-left text-[13.5px]">
                <thead>
                  <tr className="border-b border-line">
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
                  {recent.map((t) => {
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
        </div>
      </section>
    </>
  );
}
