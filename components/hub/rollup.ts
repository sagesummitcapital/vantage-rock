// Shapes the raw monthly roll-up into one series per business and currency.
// Server-side only (imports the hub data layer). Currencies are never added together.
import { BUSINESSES, type Business, type getRollup } from "@/lib/hub/data";
import { monthKey, num } from "./format";

type Rollup = Awaited<ReturnType<typeof getRollup>>;

export type Totals = { income: number; expenses: number; net: number };
export type Series = {
  business: Business;
  name: string;
  currency: string;
  /** One entry per month in rollup.months, oldest first. */
  monthly: Totals[];
  /** The current (last) month. */
  month: Totals;
  /** Sum of all months in the window. */
  t12: Totals;
};
export type CurrencyTotals = { currency: string; month: Totals; t12: Totals };

const zero = (): Totals => ({ income: 0, expenses: 0, net: 0 });
const sum = (list: Totals[]): Totals =>
  list.reduce<Totals>((s, t) => ({ income: s.income + t.income, expenses: s.expenses + t.expenses, net: s.net + t.net }), zero());

// USD first, then alphabetical.
const byCurrency = (a: string, b: string) => (a === "USD" ? -1 : b === "USD" ? 1 : a.localeCompare(b));

export function buildSeries(rollup: Rollup): Series[] {
  const index: Record<string, number> = {};
  rollup.months.forEach((m, i) => {
    index[monthKey(m)] = i;
  });
  const blank = () => rollup.months.map(() => zero());

  // If the monthly view already carries trading rows, trust it. Otherwise derive the
  // top line from trading_results: payouts in, fees out.
  const viewHasTrading = rollup.rows.some((r) => r.business === "trading");

  const out: Series[] = [];
  BUSINESSES.forEach((b) => {
    const buckets: Record<string, Totals[]> = {};
    const add = (currency: string, month: string, income: number, expenses: number, net: number) => {
      const i = index[monthKey(month)];
      if (i === undefined) return;
      const cur = (currency || "USD").toUpperCase();
      if (!buckets[cur]) buckets[cur] = blank();
      buckets[cur][i].income += income;
      buckets[cur][i].expenses += expenses;
      buckets[cur][i].net += net;
    };

    rollup.rows
      .filter((r) => r.business === b.slug)
      .forEach((r) => add(r.currency, r.month, num(r.income), num(r.expenses), num(r.net)));

    if (b.slug === "trading" && !viewHasTrading) {
      rollup.trading.forEach((t) => add("USD", t.month, num(t.payouts), num(t.fees), num(t.payouts) - num(t.fees)));
    }

    if (Object.keys(buckets).length === 0) buckets.USD = blank();

    Object.keys(buckets)
      .sort(byCurrency)
      .forEach((currency) => {
        const monthly = buckets[currency];
        out.push({
          business: b.slug,
          name: b.name,
          currency,
          monthly,
          month: monthly[monthly.length - 1] ?? zero(),
          t12: sum(monthly),
        });
      });
  });
  return out;
}

export function totalsByCurrency(series: Series[]): CurrencyTotals[] {
  const groups: Record<string, Series[]> = { USD: [] };
  series.forEach((s) => {
    if (!groups[s.currency]) groups[s.currency] = [];
    groups[s.currency].push(s);
  });
  return Object.keys(groups)
    .sort(byCurrency)
    .map((currency) => ({
      currency,
      month: sum(groups[currency].map((s) => s.month)),
      t12: sum(groups[currency].map((s) => s.t12)),
    }));
}

/** Shared vertical scale for every series in one currency, so bar heights compare honestly. */
export function scaleFor(series: Series[], currency: string): { max: number; min: number } {
  let max = 0;
  let min = 0;
  series
    .filter((s) => s.currency === currency)
    .forEach((s) =>
      s.monthly.forEach((m) => {
        if (m.net > max) max = m.net;
        if (m.net < min) min = m.net;
      })
    );
  return { max, min };
}

/** Does this series have any activity at all in the window? */
export const hasActivity = (s: Series) => s.monthly.some((m) => m.income !== 0 || m.expenses !== 0 || m.net !== 0);
