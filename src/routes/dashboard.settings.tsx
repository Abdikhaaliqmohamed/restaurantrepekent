import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/settings")({
  component: Settings,
});

function Field({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="grid grid-cols-3 gap-6 py-5 border-b border-border last:border-0">
      <div>
        <div className="text-sm font-medium">{label}</div>
        {hint && <div className="text-xs text-muted-foreground mt-1">{hint}</div>}
      </div>
      <div className="col-span-2">
        <input defaultValue={value} className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm font-mono" />
      </div>
    </div>
  );
}

function Toggle({ label, hint, on }: { label: string; hint?: string; on: boolean }) {
  return (
    <div className="grid grid-cols-3 gap-6 py-5 border-b border-border last:border-0 items-center">
      <div>
        <div className="text-sm font-medium">{label}</div>
        {hint && <div className="text-xs text-muted-foreground mt-1">{hint}</div>}
      </div>
      <div className="col-span-2">
        <div className={`relative inline-flex h-6 w-11 rounded-full transition-colors ${on ? "bg-primary" : "bg-border"}`}>
          <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${on ? "translate-x-5" : "translate-x-0.5"}`} />
        </div>
      </div>
    </div>
  );
}

function Settings() {
  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="font-display text-3xl italic">Settings</h1>
        <p className="text-sm text-muted-foreground">Restaurant profile, tax and preferences.</p>
      </div>

      <section className="bg-surface border border-border rounded-xl p-6">
        <h2 className="text-sm font-bold uppercase tracking-widest mb-2">Restaurant Profile</h2>
        <Field label="Restaurant name" value="Mise en Place — Mercer" />
        <Field label="Address" value="222 Mercer St, New York, NY" />
        <Field label="Default currency" value="USD" hint="Used on all receipts and reports." />
        <Field label="Tax rate" value="8.875%" />
      </section>

      <section className="bg-surface border border-border rounded-xl p-6">
        <h2 className="text-sm font-bold uppercase tracking-widest mb-2">Service</h2>
        <Toggle label="Auto-print kitchen tickets" hint="Send new orders to the kitchen printer immediately." on />
        <Toggle label="Require manager PIN for refunds" on />
        <Toggle label="Enable tipping at checkout" on />
        <Toggle label="Multi-language menu" hint="Allow guests to switch the menu language." on={false} />
      </section>

      <section className="bg-surface border border-border rounded-xl p-6">
        <h2 className="text-sm font-bold uppercase tracking-widest mb-2">Backups</h2>
        <Toggle label="Nightly database backup" hint="03:00 local time, retained for 30 days." on />
        <Toggle label="Export reports to email" on={false} />
      </section>

      <div className="flex justify-end gap-3">
        <button className="px-4 py-2 border border-border bg-surface rounded-lg text-xs font-bold uppercase tracking-wider">Discard</button>
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-xs font-bold uppercase tracking-wider">Save Changes</button>
      </div>
    </div>
  );
}
