import type { Metadata } from "next";
import Link from "next/link";
import { getVehicles } from "@/lib/hub/data";
import { addVehicle } from "@/app/hub/actions";
import ActionForm from "@/components/hub/ActionForm";
import { Amount, DoubleRule, Empty, Field, Figure, PageHeader, Panel, Pill, SectionHeading, capsCls, inputCls, linkCls } from "@/components/hub/ui";
import { dateInPhoenix, day, num } from "@/components/hub/format";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: { absolute: "Cars | Private hub" }, robots: { index: false, follow: false } };

type VehicleRow = Awaited<ReturnType<typeof getVehicles>>[number];

const STATUS: Record<VehicleRow["status"], { label: string; tone: "pos" | "neg" | "brass" | "mute" }> = {
  active: { label: "Active", tone: "pos" },
  paused: { label: "Paused", tone: "mute" },
  maintenance: { label: "In the shop", tone: "brass" },
  planned: { label: "Planned", tone: "brass" },
  sold: { label: "Sold", tone: "mute" },
};
const STATUS_ORDER: VehicleRow["status"][] = ["active", "planned", "paused", "maintenance", "sold"];

const isOwn = (party: string | null | undefined) => !party || party.trim().toLowerCase() === "owner";
const partyLabel = (party: string | null | undefined) => (isOwn(party) ? "Yours" : String(party).trim());

// Vehicle P&L carries no currency column; the Turo book is kept in US dollars.
const CUR = "USD";

function CarRow({ v, open }: { v: VehicleRow; open: boolean }) {
  const st = STATUS[v.status] ?? { label: v.status, tone: "mute" as const };
  const spec = [v.year, v.make, v.model].filter(Boolean).join(" ");
  const upcoming = v.upcoming.slice().sort((a, b) => String(a.start_at).localeCompare(String(b.start_at)));
  const next = upcoming[0];

  return (
    <article id={`car-${v.id}`} className="scroll-mt-32 border-b border-line-strong py-7">
      <div className="grid gap-x-8 gap-y-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
        <div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <h3 className="font-display text-[24px] leading-tight tracking-[-0.02em] text-ink">{v.name}</h3>
            <Pill tone={st.tone}>{st.label}</Pill>
            <Pill tone={isOwn(v.owner_party) ? "mute" : "navy"} dot={!isOwn(v.owner_party)}>
              {partyLabel(v.owner_party)}
            </Pill>
          </div>
          {spec && spec !== v.name ? <p className="mt-1.5 text-[13.5px] text-ink-muted">{spec}</p> : null}
          <dl className="mt-4 flex flex-wrap gap-x-9 gap-y-2 text-[13px]">
            <div className="flex gap-2">
              <dt className="text-ink-dim">Platform</dt>
              <dd className="font-medium text-ink">
                {v.listing_url ? (
                  <a href={v.listing_url} target="_blank" rel="noopener noreferrer" className={linkCls}>
                    {v.platform || "Listing"}
                  </a>
                ) : (
                  v.platform || "Not set"
                )}
              </dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-ink-dim">Tracker</dt>
              <dd className="font-medium text-ink">
                {v.tracker_provider || "None fitted"}
                {v.tracker_device_id ? <span className="tabular font-normal text-ink-dim"> &middot; {v.tracker_device_id}</span> : null}
              </dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-ink-dim">Next booking</dt>
              <dd className="tabular font-medium text-ink">{next ? dateInPhoenix(next.start_at) : "None booked"}</dd>
            </div>
          </dl>
        </div>

        <div className="grid grid-cols-2 gap-5 sm:grid-cols-4 lg:justify-items-end lg:text-right">
          <Figure label="Trips" size="sm">
            {v.tripCount}
          </Figure>
          <Figure label="Income" size="sm">
            <Amount value={v.last12.income} currency={CUR} />
          </Figure>
          <Figure label="Expenses" size="sm">
            <Amount value={v.last12.expenses} currency={CUR} />
          </Figure>
          <Figure label="Net" size="sm">
            <Amount value={v.last12.net} currency={CUR} colored />
          </Figure>
        </div>
      </div>

      <details className="group mt-5" open={open}>
        <summary className="inline-flex cursor-pointer list-none items-center gap-2 text-[13px] font-medium text-teal-deep transition-colors hover:text-ink [&::-webkit-details-marker]:hidden">
          <span aria-hidden className="inline-block transition-transform group-open:rotate-90">
            &rsaquo;
          </span>
          Bookings and maintenance
          <span className="tabular font-normal text-ink-dim">
            {upcoming.length} upcoming &middot; {v.openMaintenance.length} open
          </span>
        </summary>

        <div className="mt-5 grid gap-x-12 gap-y-8 lg:grid-cols-2">
          <div>
            <div className={capsCls}>Upcoming bookings</div>
            {upcoming.length === 0 ? (
              <p className="mt-2 text-[13.5px] text-ink-muted">
                None on the calendar. Grok Bot and Claude log Turo bookings through the agent API; nothing to key in here.
              </p>
            ) : (
              <ul className="mt-2 border-t border-line">
                {upcoming.map((b) => (
                  <li key={b.id} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-line py-2.5 text-[13.5px]">
                    <span className="tabular text-ink">
                      {dateInPhoenix(b.start_at)} <span className="text-ink-dim">to</span> {dateInPhoenix(b.end_at)}
                      {b.status === "active" ? <span className="ml-2 text-[11px] uppercase tracking-[0.1em] text-teal-deep">out now</span> : null}
                    </span>
                    <span className="text-ink-dim">
                      net <Amount value={num(b.net)} currency={CUR} cents className="font-medium text-ink" />
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <div className={capsCls}>Open maintenance</div>
            {v.openMaintenance.length === 0 ? (
              <p className="mt-2 text-[13.5px] text-ink-muted">Nothing open.</p>
            ) : (
              <ul className="mt-2 border-t border-line">
                {v.openMaintenance.map((m) => (
                  <li key={m.id} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-line py-2.5 text-[13.5px]">
                    <span className="text-ink">
                      {m.title}
                      {m.vendor ? <span className="text-ink-dim"> &middot; {m.vendor}</span> : null}
                    </span>
                    <span className="flex items-baseline gap-4 text-ink-dim">
                      <span className="text-[11px] uppercase tracking-[0.1em]">{m.status}</span>
                      <span className="tabular text-[12.5px]">opened {day(m.opened_on)}</span>
                      {m.cost != null ? <Amount value={m.cost} currency={m.currency || CUR} cents className="text-ink" /> : null}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        {v.notes ? <p className="mt-6 max-w-[720px] border-l border-brass pl-4 text-[13.5px] leading-relaxed text-ink-muted">{v.notes}</p> : null}
      </details>
    </article>
  );
}

export default async function CarsPage() {
  const vehicles = await getVehicles();
  const fleet = vehicles.filter((v) => v.status !== "sold");
  const active = fleet.filter((v) => v.status === "active").length;
  const partnerCars = fleet.filter((v) => !isOwn(v.owner_party)).length;
  const trips = vehicles.reduce((s, v) => s + v.tripCount, 0);
  const upcoming = vehicles.reduce((s, v) => s + v.upcoming.length, 0);
  const openJobs = vehicles.reduce((s, v) => s + v.openMaintenance.length, 0);
  const totals = vehicles.reduce(
    (s, v) => ({ income: s.income + v.last12.income, expenses: s.expenses + v.last12.expenses, net: s.net + v.last12.net }),
    { income: 0, expenses: 0, net: 0 }
  );

  // Known parties, for the add-car suggestions.
  const parties: string[] = ["owner"];
  vehicles.forEach((v) => {
    const p = (v.owner_party || "").trim();
    if (p && !parties.some((x) => x.toLowerCase() === p.toLowerCase())) parties.push(p);
  });
  if (!parties.some((x) => x.toLowerCase() === "sam")) parties.push("Sam");

  return (
    <>
      <PageHeader
        folio="iii."
        section="Cars"
        title={
          <>
            The Turo <span className="italic text-teal-deep">fleet register.</span>
          </>
        }
        lede="One line per car, whoever owns it. Built so the list can grow from one Audi to a full fleet without changing shape."
        aside={
          <a href="#add-car" className={linkCls}>
            Add a car
          </a>
        }
      />

      <section aria-label="Fleet totals">
        <DoubleRule />
        <div className="grid grid-cols-2 gap-x-8 gap-y-8 py-8 md:grid-cols-3 lg:grid-cols-6">
          <Figure
            label="Cars in fleet"
            sub={fleet.length === 0 ? "none on file yet" : `${active} active${partnerCars > 0 ? `, ${partnerCars} partner-owned` : ""}`}
          >
            {fleet.length}
          </Figure>
          <Figure label="Trips completed" sub="all time on file">
            {trips}
          </Figure>
          <Figure label="Upcoming" sub={`bookings · ${openJobs} open repairs`}>
            {upcoming}
          </Figure>
          <Figure label="Income" sub="trailing 12 months">
            <Amount value={totals.income} currency={CUR} />
          </Figure>
          <Figure label="Expenses" sub="trailing 12 months">
            <Amount value={totals.expenses} currency={CUR} />
          </Figure>
          <Figure label="Net" sub="trailing 12 months">
            <Amount value={totals.net} currency={CUR} colored />
          </Figure>
        </div>
      </section>

      <section className="mt-6" aria-labelledby="fleet">
        <SectionHeading
          id="fleet"
          title="Fleet"
          action={
            <Link href="/hub/money?business=turo" className={linkCls}>
              See Turo entries
            </Link>
          }
        />
        {vehicles.length === 0 ? (
          <Empty title="No cars in the register yet.">
            Add the 2016 Audi with the form below. Once it is here, Turo bookings, the Bouncie tracker and running costs attach to it,
            and Grok Bot can read the fleet through the agent API.
          </Empty>
        ) : (
          <div className="border-t border-line-strong">
            {vehicles.map((v) => (
              <CarRow key={v.id} v={v} open={vehicles.length <= 3} />
            ))}
          </div>
        )}
      </section>

      <section className="mt-16" aria-labelledby="add-car">
        <SectionHeading id="add-car" title="Add a car" note="Yours or a partner's. Figures stay separate per car." />
        <Panel className="p-5 md:p-7">
          <ActionForm action={addVehicle} submitLabel="Add to fleet" pendingLabel="Adding…" successMessage="Added to the fleet.">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <Field label="Name" hint="how you refer to it" className="sm:col-span-2">
                <input name="name" required placeholder="Audi A4" className={inputCls} />
              </Field>
              <Field label="Year">
                <input name="year" type="number" min={1980} max={2100} step={1} placeholder="2016" className={`${inputCls} tabular`} />
              </Field>
              <Field label="Status">
                <select name="status" defaultValue="active" className={inputCls}>
                  {STATUS_ORDER.map((s) => (
                    <option key={s} value={s}>
                      {STATUS[s].label}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Make">
                <input name="make" placeholder="Audi" className={inputCls} />
              </Field>
              <Field label="Model">
                <input name="model" placeholder="A4" className={inputCls} />
              </Field>
              <Field label="Owned by" hint="owner = you">
                <input name="owner_party" list="owner-parties" defaultValue="owner" className={inputCls} />
              </Field>
              <Field label="Tracker">
                <input name="tracker_provider" defaultValue="Bouncie" className={inputCls} />
              </Field>
              <Field label="Listing link" hint="optional" className="sm:col-span-2 lg:col-span-4">
                <input name="listing_url" type="url" placeholder="https://turo.com/..." className={inputCls} />
              </Field>
            </div>
            <datalist id="owner-parties">
              {parties.map((p) => (
                <option key={p} value={p} />
              ))}
            </datalist>
          </ActionForm>
        </Panel>
      </section>
    </>
  );
}
