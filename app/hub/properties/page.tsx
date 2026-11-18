import type { Metadata } from "next";
import Link from "next/link";
import { getProperties, monthStart } from "@/lib/hub/data";
import { addLease, addProperty, endLease, updateProperty } from "@/app/hub/actions";
import ActionForm from "@/components/hub/ActionForm";
import { ConfirmAct } from "@/components/hub/ActButtons";
import { MaintenanceForm, MaintenanceList } from "@/components/hub/Maintenance";
import SparkBars from "@/components/hub/SparkBars";
import { Amount, Disclosure, DoubleRule, Empty, Field, Figure, PageHeader, Panel, Pill, SectionHeading, inputCls, linkCls } from "@/components/hub/ui";
import { day, money, monthYear, num, phoenixToday } from "@/components/hub/format";

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
            ? "No lease on file. Add one below and rent shows against target."
            : "Set a target rent below to see how the lease compares."
          : Math.abs(gap) < 0.5
            ? "At target."
            : gap > 0
              ? `${money(gap, cur)} above target.`
              : `${money(Math.abs(gap), cur)} under target.`}
        {lease?.tenant_label ? ` Tenant: ${lease.tenant_label}.` : ""}
        {lease?.end_date ? ` Lease runs to ${day(lease.end_date)}.` : ""}
      </p>
      {lease ? (
        <div className="mt-3">
          <ConfirmAct action={endLease} id={lease.id} label="End lease" confirmLabel="End it" pendingLabel="Ending…" ariaLabel={`active lease on ${p.name}`} />
        </div>
      ) : null}
    </div>
  );
}

function PropertyFolio({ p, months, today }: { p: PropertyRow; months: string[]; today: string }) {
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
        <MaintenanceList items={p.openMaintenance} currency={p.currency} />
      </div>

      {p.notes ? <p className="mt-6 max-w-[720px] border-l border-brass pl-4 text-[13.5px] leading-relaxed text-ink-muted">{p.notes}</p> : null}

      <div className="mt-7 flex flex-col gap-3">
        <Disclosure label="Add a lease" meta={p.activeLease ? "replaces the active one" : undefined}>
          <ActionForm action={addLease} submitLabel="Save lease" successMessage="Lease saved.">
            <input type="hidden" name="property_id" value={p.id} />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <Field label="Tenant" hint="a label, not full details" className="sm:col-span-2">
                <input name="tenant_label" placeholder="e.g. Family of four" className={inputCls} />
              </Field>
              <Field label="Monthly rent">
                <input name="monthly_rent" inputMode="decimal" required placeholder="0.00" autoComplete="off" className={`${inputCls} tabular`} />
              </Field>
              <Field label="Currency">
                <select name="currency" defaultValue={p.currency} className={inputCls}>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                </select>
              </Field>
              <Field label="Starts">
                <input name="start_date" type="date" defaultValue={today} className={`${inputCls} tabular`} />
              </Field>
              <Field label="Ends" hint="optional">
                <input name="end_date" type="date" className={`${inputCls} tabular`} />
              </Field>
              <Field label="Deposit" hint="optional">
                <input name="deposit" inputMode="decimal" placeholder="0.00" autoComplete="off" className={`${inputCls} tabular`} />
              </Field>
              <Field label="Status">
                <select name="status" defaultValue="active" className={inputCls}>
                  <option value="active">Active now</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="ended">Ended (for the record)</option>
                </select>
              </Field>
              <Field label="Notes" hint="optional" className="sm:col-span-2 lg:col-span-4">
                <input name="notes" className={inputCls} />
              </Field>
            </div>
            <p className="mt-4 text-[12.5px] text-ink-dim">
              A property has one active lease at a time. Saving a new active lease ends the current one. This records the lease only;
              rent received is entered under Monthly.
            </p>
          </ActionForm>
        </Disclosure>

        <Disclosure label="Log maintenance">
          <MaintenanceForm propertyId={p.id} currency={p.currency} today={today} book="Rentals" />
        </Disclosure>

        <Disclosure label="Edit details">
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
        </Disclosure>
      </div>
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
  const today = phoenixToday().iso;
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
        aside={
          <a href="#add-property" className={linkCls}>
            Add a property
          </a>
        }
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
            Add the first one with the form below: a name, where it is, and the rent you are aiming for. Leases, repairs and the
            monthly figures attach to it from there, and Grok Bot can read the register through the agent API.
          </Empty>
        ) : (
          <div className="border-t border-line-strong">
            {properties.map((p) => (
              <PropertyFolio key={p.id} p={p} months={months} today={today} />
            ))}
          </div>
        )}
      </section>

      <section className="mt-16" aria-labelledby="add-property">
        <SectionHeading id="add-property" title="Add a property" note="One line in the register. Details can be edited later." />
        <Panel className="p-5 md:p-7">
          <ActionForm action={addProperty} submitLabel="Add to register" pendingLabel="Adding…" successMessage="Added to the register.">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <Field label="Name" hint="how you refer to it" className="sm:col-span-2">
                <input name="name" required placeholder="e.g. Camelback house" className={inputCls} />
              </Field>
              <Field label="Address" hint="optional" className="sm:col-span-2">
                <input name="address" className={inputCls} />
              </Field>
              <Field label="City">
                <input name="city" placeholder="Phoenix" className={inputCls} />
              </Field>
              <Field label="Country">
                <select name="country" defaultValue="US" className={inputCls}>
                  <option value="US">United States</option>
                  <option value="GR">Greece</option>
                </select>
              </Field>
              <Field label="Currency">
                <select name="currency" defaultValue="" className={inputCls}>
                  <option value="">By country (US in USD, otherwise EUR)</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                </select>
              </Field>
              <Field label="Status">
                <select name="status" defaultValue="rented" className={inputCls}>
                  {STATUS_ORDER.map((st) => (
                    <option key={st} value={st}>
                      {STATUS[st].label}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Platform" hint="e.g. TurboTenant">
                <input name="platform" className={inputCls} />
              </Field>
              <Field label="Managed by">
                <input name="managed_by" placeholder="Self, or a local agent" className={inputCls} />
              </Field>
              <Field label="Target rent" hint="per month">
                <input name="target_rent" inputMode="decimal" placeholder="0.00" autoComplete="off" className={`${inputCls} tabular`} />
              </Field>
              <Field label="Notes" hint="optional" className="sm:col-span-2 lg:col-span-4">
                <input name="notes" className={inputCls} />
              </Field>
            </div>
          </ActionForm>
        </Panel>
        <p className="mt-3 text-[12.5px] text-ink-dim">Country and currency are fixed once a property is added, so its history stays in one currency.</p>
      </section>
    </>
  );
}
