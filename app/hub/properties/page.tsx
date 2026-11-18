import type { Metadata } from "next";
import Link from "next/link";
import { getProperties, monthStart } from "@/lib/hub/data";
import { updateProperty } from "@/app/hub/actions";
import ActionForm from "@/components/hub/ActionForm";
import SparkBars from "@/components/hub/SparkBars";
import { Amount, DoubleRule, Empty, Field, Figure, PageHeader, Pill, SectionHeading, capsCls, inputCls, linkCls } from "@/components/hub/ui";
import { day, money, monthYear, num } from "@/components/hub/format";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: { absolute: "Properties | Private hub" }, robots: { index: false, follow: false } };

type PropertyRow = Awaited<ReturnType<typeof getProperties>>[number];

const STATUS: Record<PropertyRow["status"], { label: string; tone: "pos" | "neg" | "brass" | "mute" }> = {
  rented: { label: "Rented", tone: "pos" },
  vacant: { label: "Vacant", tone: "neg" },
  listed: { label: "Listed", tone: "brass" },
  renovation: { label: "Renovation", tone: "brass" },
  sold: { label: "Sold", tone: "mute" },
};
const STATUS_ORDER: PropertyRow["status"][] = ["rented", "vacant", "listed", "renovation", "sold"];

const byCurrency = (a: string, b: string) => (a === "USD" ? -1 : b === "USD" ? 1 : a.localeCompare(b));

function sumBy(rows: PropertyRow[], value: (p: PropertyRow) => number): { currency: string; total: number }[] {
  const acc: Record<string, number> = {};
  rows.forEach((p) => {
    const cur = (p.currency || "USD").toUpperCase();
    acc[cur] = (acc[cur] ?? 0) + value(p);
  });
  return Object.keys(acc)
    .sort(byCurrency)
    .map((currency) => ({ currency, total: acc[currency] }));
}

function RentLine({ p }: { p: PropertyRow }) {
  const lease = p.activeLease;
  const target = p.target_rent;
  const rent = lease ? num(lease.monthly_rent) : null;
  const cur = lease?.currency || p.currency;
  const gap = rent != null && target != null ? rent - target : null;
  const fill = rent != null && target != null && target > 0 ? Math.max(0, Math.min(100, (rent / target) * 100)) : rent != null ? 100 : 0;

  return (
    <div>
      <div className="grid grid-cols-2 gap-6">
        <Figure label="Lease rent" size="md" sub={lease ? "per month, active lease" : "no active lease on file"}>
          {rent != null ? <Amount value={rent} currency={cur} /> : <span className="text-ink-dim">&mdash;</span>}
        </Figure>
        <Figure label="Target rent" size="md" sub="per month">
          {target != null ? <Amount value={target} currency={p.currency} /> : <span className="text-ink-dim">&mdash;</span>}
        </Figure>
      </div>
      {/* lease rent as a share of target; the brass tick marks the target */}
      <div className="relative mt-5 h-[3px] bg-line" aria-hidden>
        <div className="absolute inset-y-0 left-0 bg-teal" style={{ width: `${fill}%` }} />
        <div className="absolute -top-[4px] right-0 h-[11px] w-px bg-brass" />
      </div>
      <p className="mt-3 text-[13px] text-ink-muted">
        {gap == null
          ? rent == null
            ? "Add a lease row in Supabase, or ask Grok Bot to log it, and rent shows against target."
            : "Set a target rent below to see how the lease compares."
          : Math.abs(gap) < 0.5
            ? "At target."
            : gap > 0
              ? `${money(gap, cur)} above target.`
              : `${money(Math.abs(gap), cur)} under target.`}
        {lease?.tenant_label ? ` Tenant: ${lease.tenant_label}.` : ""}
        {lease?.end_date ? ` Lease runs to ${day(lease.end_date)}.` : ""}
      </p>
    </div>
  );
}

function PropertyFolio({ p, months }: { p: PropertyRow; months: string[] }) {
  const st = STATUS[p.status] ?? { label: p.status, tone: "mute" as const };
  const location = [p.city, p.country].filter(Boolean).join(", ");
  const values = months.map((m) => p.monthly.find((r) => String(r.month).slice(0, 7) === m.slice(0, 7))?.net ?? 0);
  const max = Math.max(0, ...values);
  const min = Math.min(0, ...values);

  return (
    <article id={`property-${p.id}`} className="scroll-mt-32 border-b border-line-strong py-9">
      <div className="flex flex-wrap items-start justify-between gap-x-8 gap-y-3">
        <div>
          <h3 className="font-display text-[26px] leading-tight tracking-[-0.022em] text-ink">{p.name}</h3>
          <p className="mt-1.5 text-[13.5px] text-ink-muted">
            {[p.address, location].filter(Boolean).join(" · ") || "Location not recorded"}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Pill tone={st.tone}>{st.label}</Pill>
          <Pill dot={false}>{p.currency}</Pill>
        </div>
      </div>

      <dl className="mt-5 flex flex-wrap gap-x-10 gap-y-2 text-[13px]">
        <div className="flex gap-2">
          <dt className="text-ink-dim">Platform</dt>
          <dd className="font-medium text-ink">{p.platform || "Not set"}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="text-ink-dim">Managed by</dt>
          <dd className="font-medium text-ink">{p.managed_by || "Not set"}</dd>
        </div>
      </dl>

      <div className="mt-8 grid gap-x-14 gap-y-10 lg:grid-cols-2">
        <RentLine p={p} />

        <div>
          <div className="grid grid-cols-3 gap-6">
            <Figure label="Income" size="sm">
              <Amount value={p.last12.income} currency={p.currency} />
            </Figure>
            <Figure label="Expenses" size="sm">
              <Amount value={p.last12.expenses} currency={p.currency} />
            </Figure>
            <Figure label="Net cash flow" size="sm">
              <Amount value={p.last12.net} currency={p.currency} colored />
            </Figure>
          </div>
          <div className="mt-4">
            <SparkBars
              values={values}
              labels={months.map((m) => monthYear(m))}
              currency={p.currency}
              max={max}
              min={min}
              height={34}
              title={`${p.name} net cash flow by month, ${p.currency}`}
            />
          </div>
          <p className="mt-2 text-[12.5px] text-ink-dim">
            Trailing twelve months, {monthYear(months[0])} to {monthYear(months[months.length - 1])}.{" "}
            <Link href="/hub/money?business=rentals" className={linkCls}>
              See the entries
            </Link>
          </p>
        </div>
      </div>

      <div className="mt-8">
        <div className={capsCls}>Open maintenance</div>
        {p.openMaintenance.length === 0 ? (
          <p className="mt-2 text-[13.5px] text-ink-muted">Nothing open.</p>
        ) : (
          <ul className="mt-2 border-t border-line">
            {p.openMaintenance.map((m) => (
              <li key={m.id} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-line py-2.5 text-[13.5px]">
                <span className="text-ink">
                  {m.title}
                  {m.vendor ? <span className="text-ink-dim"> &middot; {m.vendor}</span> : null}
                </span>
                <span className="flex items-baseline gap-4 text-ink-dim">
                  <span className="text-[11px] uppercase tracking-[0.1em]">{m.status}</span>
                  <span className="tabular text-[12.5px]">opened {day(m.opened_on)}</span>
                  {m.cost != null ? <Amount value={m.cost} currency={m.currency || p.currency} cents className="text-ink" /> : null}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {p.notes ? <p className="mt-6 max-w-[720px] border-l border-brass pl-4 text-[13.5px] leading-relaxed text-ink-muted">{p.notes}</p> : null}

      <details className="group mt-7">
        <summary className="inline-flex cursor-pointer list-none items-center gap-2 text-[13px] font-medium text-teal-deep transition-colors hover:text-ink [&::-webkit-details-marker]:hidden">
          <span aria-hidden className="inline-block transition-transform group-open:rotate-90">
            &rsaquo;
          </span>
          Edit details
        </summary>
        <div className="mt-5 rounded-lg border border-line bg-bg-raised p-5 md:p-7">
          <ActionForm action={updateProperty} submitLabel="Save changes" successMessage="Saved." resetOnSuccess={false}>
            <input type="hidden" name="id" value={p.id} />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <Field label="Name">
                <input name="name" defaultValue={p.name} required className={inputCls} />
              </Field>
              <Field label="Address">
                <input name="address" defaultValue={p.address ?? ""} className={inputCls} />
              </Field>
              <Field label="City">
                <input name="city" defaultValue={p.city ?? ""} className={inputCls} />
              </Field>
              <Field label="Platform" hint="e.g. TurboTenant">
                <input name="platform" defaultValue={p.platform ?? ""} className={inputCls} />
              </Field>
              <Field label="Managed by">
                <input name="managed_by" defaultValue={p.managed_by ?? ""} className={inputCls} />
              </Field>
              <Field label="Target rent" hint={`${p.currency} per month`}>
                <input name="target_rent" inputMode="decimal" defaultValue={p.target_rent ?? ""} className={`${inputCls} tabular`} />
              </Field>
              <Field label="Status">
                <select name="status" defaultValue={p.status} className={inputCls}>
                  {STATUS_ORDER.map((s) => (
                    <option key={s} value={s}>
                      {STATUS[s].label}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Notes" className="sm:col-span-2">
                <textarea name="notes" rows={2} defaultValue={p.notes ?? ""} className={inputCls} />
              </Field>
            </div>
          </ActionForm>
        </div>
      </details>
    </article>
  );
}

export default async function PropertiesPage() {
  const properties = await getProperties();
  const held = properties.filter((p) => p.status !== "sold");
  const rented = held.filter((p) => p.status === "rented").length;
  const rentRoll = sumBy(held, (p) => (p.activeLease ? num(p.activeLease.monthly_rent) : 0));
  const net = sumBy(properties, (p) => p.last12.net);
  const openJobs = properties.reduce((s, p) => s + p.openMaintenance.length, 0);

  // The same twelve month keys the data layer uses for its trailing window, oldest first.
  const months = Array.from({ length: 12 }, (_, i) => monthStart(11 - i));

  return (
    <>
      <PageHeader
        folio="ii."
        section="Properties"
        title={
          <>
            The rental <span className="italic text-teal-deep">register.</span>
          </>
        }
        lede="Phoenix runs through TurboTenant in dollars. Greece is handled locally in euros. Each property keeps its own account below."
      />

      <section aria-label="Portfolio summary">
        <DoubleRule />
        <div className="grid grid-cols-2 gap-x-8 gap-y-8 py-8 lg:grid-cols-4">
          <Figure label="Properties held" sub={held.length > 0 ? `${rented} rented, ${held.length - rented} not` : "none on file yet"}>
            {held.length}
          </Figure>
          <Figure label="Monthly rent roll" sub="active leases">
            {rentRoll.length === 0 ? (
              <span className="text-ink-dim">&mdash;</span>
            ) : (
              <span className="flex flex-col gap-1.5">
                {rentRoll.map((r) => (
                  <Amount key={r.currency} value={r.total} currency={r.currency} />
                ))}
              </span>
            )}
          </Figure>
          <Figure label="Net cash flow" sub="trailing twelve months">
            {net.length === 0 ? (
              <span className="text-ink-dim">&mdash;</span>
            ) : (
              <span className="flex flex-col gap-1.5">
                {net.map((r) => (
                  <Amount key={r.currency} value={r.total} currency={r.currency} colored />
                ))}
              </span>
            )}
          </Figure>
          <Figure label="Open maintenance" sub={openJobs === 0 ? "nothing outstanding" : "across all properties"}>
            {openJobs}
          </Figure>
        </div>
      </section>

      <section className="mt-6" aria-labelledby="register">
        <SectionHeading id="register" title="Property register" note={`${properties.length} on file`} />
        {properties.length === 0 ? (
          <Empty title="No properties on file yet.">
            The properties are added once, as rows in the <span className="font-medium text-ink">properties</span> table in Supabase.
            After that, rent targets, platform and status are edited right here, and Grok Bot can read
            the register through the agent API.
          </Empty>
        ) : (
          <div className="border-t border-line-strong">
            {properties.map((p) => (
              <PropertyFolio key={p.id} p={p} months={months} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
