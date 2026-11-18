// Maintenance list and add form, shared by the Properties and Cars pages.
// Server components: the actions are imported here and handed to the client wrappers.
import type { Maintenance } from "@/lib/hub/data";
import { addMaintenance, closeMaintenance } from "@/app/hub/actions";
import ActionForm from "./ActionForm";
import { QuickAct } from "./ActButtons";
import { Amount, CheckLine, Field, capsCls, inputCls } from "./ui";
import { day } from "./format";

export function MaintenanceList({ items, currency }: { items: Maintenance[]; currency: string }) {
  return (
    <div>
      <div className={capsCls}>Open maintenance</div>
      {items.length === 0 ? (
        <p className="mt-2 text-[13.5px] text-ink-muted">Nothing open.</p>
      ) : (
        <ul className="mt-2 border-t border-line">
          {items.map((m) => (
            <li key={m.id} className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-line py-2.5 text-[13.5px]">
              <span className="min-w-0 flex-1 basis-[200px] text-ink">
                {m.title}
                {m.vendor ? <span className="text-ink-dim"> &middot; {m.vendor}</span> : null}
              </span>
              <span className="flex flex-wrap items-center gap-x-4 gap-y-1 text-ink-dim">
                <span className="text-[11px] uppercase tracking-[0.1em]">{m.status}</span>
                <span className="tabular text-[12.5px]">opened {day(m.opened_on)}</span>
                {m.cost != null ? <Amount value={m.cost} currency={m.currency || currency} cents className="text-ink" /> : null}
                <QuickAct action={closeMaintenance} id={m.id} label="Mark done" ariaLabel={`Mark done: ${m.title}`} />
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function MaintenanceForm({
  propertyId,
  vehicleId,
  currency,
  today,
  book,
}: {
  propertyId?: number;
  vehicleId?: number;
  currency: string;
  /** YYYY-MM-DD in Phoenix. */
  today: string;
  /** Which book the optional expense lands in, for the small print. */
  book: string;
}) {
  return (
    <ActionForm action={addMaintenance} submitLabel="Log the job" pendingLabel="Logging…" successMessage="Logged.">
      {propertyId != null ? <input type="hidden" name="property_id" value={propertyId} /> : null}
      {vehicleId != null ? <input type="hidden" name="vehicle_id" value={vehicleId} /> : null}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <Field label="Job" className="sm:col-span-2">
          <input name="title" required placeholder="What needs doing" className={inputCls} />
        </Field>
        <Field label="Vendor" hint="optional">
          <input name="vendor" className={inputCls} />
        </Field>
        <Field label="Status">
          <select name="status" defaultValue="open" className={inputCls}>
            <option value="open">Open</option>
            <option value="scheduled">Scheduled</option>
            <option value="done">Done already</option>
          </select>
        </Field>
        <Field label="Cost" hint="optional">
          <input name="cost" inputMode="decimal" placeholder="0.00" autoComplete="off" className={`${inputCls} tabular`} />
        </Field>
        <Field label="Currency">
          <select name="currency" defaultValue={currency} className={inputCls}>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
        </Field>
        <Field label="Opened on">
          <input name="opened_on" type="date" defaultValue={today} className={`${inputCls} tabular`} />
        </Field>
        <Field label="Notes" hint="optional" className="sm:col-span-2 lg:col-span-4">
          <input name="notes" className={inputCls} />
        </Field>
      </div>
      <CheckLine name="log_expense" title="Also book the cost as an expense" className="mt-5">
        Adds one {book} expense line for the cost, dated the day the job was opened. Leave it off if the bill is already in the ledger.
      </CheckLine>
    </ActionForm>
  );
}
