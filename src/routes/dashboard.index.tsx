import { createFileRoute } from "@tanstack/react-router";
import { TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";

export const Route = createFileRoute("/dashboard/")({
  component: Overview,
});

const kpis = [
  { label: "Gross Revenue", value: "$4,282.50", delta: "+12.4%", up: true },
  { label: "Total Orders", value: "142", delta: "Active: 8", up: true },
  { label: "Avg. Ticket", value: "$30.15", delta: "-2.1%", up: false },
  { label: "Top Item", value: "Truffle Tagliatelle", delta: "24 sold", up: true },
];

const recent = [
  { id: "#8821", table: "T3", items: "2x Espresso, 1x Croissant", amount: "$18.50", status: "Open" },
  { id: "#8820", table: "T1", items: "1x Ribeye, 1x Merlot", amount: "$84.00", status: "Paid" },
  { id: "#8819", table: "Online", items: "1x Truffle Risotto", amount: "$42.00", status: "Pickup" },
  { id: "#8818", table: "T6", items: "3x Negroni, 1x Olives", amount: "$48.00", status: "Paid" },
  { id: "#8817", table: "T4", items: "Brunch for 2", amount: "$76.50", status: "Paid" },
];

const tables = [
  { id: "T1", status: "occupied", total: "$84.00" },
  { id: "T2", status: "free" },
  { id: "T3", status: "checkout", total: "$18.50" },
  { id: "T4", status: "free" },
  { id: "T5", status: "free" },
  { id: "T6", status: "occupied", total: "$120.00" },
  { id: "T7", status: "free" },
  { id: "T8", status: "occupied", total: "$56.00" },
];

function Overview() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="font-display text-3xl italic">Morning Service</h1>
          <p className="text-sm text-muted-foreground font-mono">Tuesday, Jun 9 · Shift A</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-border rounded-lg text-xs font-bold uppercase tracking-wider bg-surface">Print X-Report</button>
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-xs font-bold uppercase tracking-wider">New Order</button>
        </div>
      </div>

      {/* KPI */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((k) => (
          <div key={k.label} className="bg-surface border border-border p-5 rounded-xl">
            <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider mb-1">{k.label}</p>
            <p className="text-2xl font-mono leading-tight">{k.value}</p>
            <p className={`text-[11px] font-bold mt-2 flex items-center gap-1 ${k.up ? "text-success" : "text-warning"}`}>
              {k.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
              {k.delta}
            </p>
          </div>
        ))}
      </div>

      {/* Chart placeholder + activity */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8 bg-surface border border-border rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-bold uppercase tracking-widest">Revenue · Last 14 Days</h3>
            <TrendingUp className="h-4 w-4 text-primary" />
          </div>
          <div className="h-56 flex items-end gap-2">
            {[30, 45, 52, 38, 60, 72, 65, 58, 80, 68, 75, 82, 70, 90].map((h, i) => (
              <div key={i} className="flex-1 bg-primary/20 hover:bg-primary rounded-t transition-colors" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 bg-surface border border-border rounded-xl p-6">
          <h3 className="text-sm font-bold uppercase tracking-widest mb-6">Floor Snapshot</h3>
          <div className="grid grid-cols-4 gap-3">
            {tables.map((t) => (
              <div
                key={t.id}
                className={`aspect-square rounded-xl flex flex-col items-center justify-center text-xs ${
                  t.status === "occupied"
                    ? "bg-primary/10 border-2 border-primary/30 text-primary"
                    : t.status === "checkout"
                    ? "bg-primary text-primary-foreground border-2 border-primary"
                    : "border-2 border-border text-muted-foreground"
                }`}
              >
                <span className="font-mono font-bold">{t.id}</span>
                {t.total && <span className="text-[10px] opacity-80 mt-0.5">{t.total}</span>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent orders */}
      <div className="bg-surface border border-border rounded-xl overflow-hidden">
        <div className="p-4 border-b border-border flex justify-between items-center">
          <h3 className="text-sm font-bold uppercase tracking-widest">Recent Orders</h3>
          <button className="text-xs text-primary font-semibold">View all</button>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-accent/40 text-muted-foreground">
            <tr>
              <th className="p-4 text-left font-medium text-xs uppercase tracking-wider">Order</th>
              <th className="p-4 text-left font-medium text-xs uppercase tracking-wider">Table</th>
              <th className="p-4 text-left font-medium text-xs uppercase tracking-wider">Items</th>
              <th className="p-4 text-left font-medium text-xs uppercase tracking-wider">Status</th>
              <th className="p-4 text-right font-medium text-xs uppercase tracking-wider">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {recent.map((o) => (
              <tr key={o.id} className="hover:bg-accent/20">
                <td className="p-4 font-mono">{o.id}</td>
                <td className="p-4 font-display italic">{o.table}</td>
                <td className="p-4 text-muted-foreground">{o.items}</td>
                <td className="p-4">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ${
                    o.status === "Paid" ? "bg-success/10 text-success" :
                    o.status === "Pickup" ? "bg-warning/15 text-warning-foreground" :
                    "bg-primary/10 text-primary"
                  }`}>{o.status}</span>
                </td>
                <td className="p-4 text-right font-mono">{o.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
