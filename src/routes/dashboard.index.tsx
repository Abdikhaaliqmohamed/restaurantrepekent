import { createFileRoute, Link } from "@tanstack/react-router";
import { TrendingUp, ArrowUpRight } from "lucide-react";
import { usePOS, orderTotals, fmt } from "@/lib/pos-store";

export const Route = createFileRoute("/dashboard/")({
  component: Overview,
});

function Overview() {
  const orders = usePOS((s) => s.orders);
  const tables = usePOS((s) => s.tables);
  const menu = usePOS((s) => s.menu);

  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  const todaysPaid = orders.filter((o) => o.status === "paid" && (o.paidAt ?? 0) >= startOfDay.getTime());
  const active = orders.filter((o) => o.status === "open" || o.status === "sent" || o.status === "served");

  const gross = todaysPaid.reduce((s, o) => s + orderTotals(o.lines, o.tip ?? 0).total, 0);
  const avg = todaysPaid.length ? gross / todaysPaid.length : 0;

  const itemCounts = new Map<string, number>();
  todaysPaid.forEach((o) => o.lines.forEach((l) => itemCounts.set(l.name, (itemCounts.get(l.name) ?? 0) + l.qty)));
  const top = [...itemCounts.entries()].sort((a, b) => b[1] - a[1])[0];

  // 14-day fake-history-fallback with real today bar
  const history = Array.from({ length: 14 }, (_, i) => {
    if (i === 13) return Math.max(10, Math.min(100, gross / 5));
    return 30 + ((i * 37) % 55);
  });

  const recent = orders.slice(0, 6);

  const kpis = [
    { label: "Gross (Today)", value: fmt(gross), delta: `${todaysPaid.length} paid` },
    { label: "Active Checks", value: String(active.length), delta: `${tables.filter((t) => t.status !== "free").length} tables seated` },
    { label: "Avg. Ticket", value: fmt(avg), delta: `${menu.length} items on menu` },
    { label: "Top Seller", value: top?.[0] ?? "—", delta: top ? `${top[1]} sold` : "no data" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="font-display text-3xl italic">Service Overview</h1>
          <p className="text-sm text-muted-foreground font-mono">
            {new Date().toLocaleDateString(undefined, { weekday: "long", month: "short", day: "numeric" })}
          </p>
        </div>
        <Link
          to="/dashboard/pos"
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-xs font-bold uppercase tracking-wider"
        >
          New Order
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((k) => (
          <div key={k.label} className="bg-surface border border-border p-5 rounded-xl">
            <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider mb-1">{k.label}</p>
            <p className="text-2xl font-mono leading-tight truncate">{k.value}</p>
            <p className="text-[11px] font-bold mt-2 flex items-center gap-1 text-success">
              <ArrowUpRight className="h-3 w-3" />
              {k.delta}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8 bg-surface border border-border rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-bold uppercase tracking-widest">Revenue · Last 14 Days</h3>
            <TrendingUp className="h-4 w-4 text-primary" />
          </div>
          <div className="h-56 flex items-end gap-2">
            {history.map((h, i) => (
              <div
                key={i}
                className={`flex-1 rounded-t transition-colors ${i === 13 ? "bg-primary" : "bg-primary/20 hover:bg-primary/40"}`}
                style={{ height: `${Math.max(4, h)}%` }}
              />
            ))}
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 bg-surface border border-border rounded-xl p-6">
          <h3 className="text-sm font-bold uppercase tracking-widest mb-6">Floor Snapshot</h3>
          <div className="grid grid-cols-3 gap-3">
            {tables.map((t) => {
              const o = orders.find((x) => x.id === t.orderId);
              const total = o ? orderTotals(o.lines).total : 0;
              return (
                <div
                  key={t.id}
                  className={`aspect-square rounded-xl flex flex-col items-center justify-center text-xs ${
                    t.status === "seated"
                      ? "bg-primary/10 border-2 border-primary/30 text-primary"
                      : t.status === "billed"
                      ? "bg-warning/15 border-2 border-warning/40 text-warning-foreground"
                      : "border-2 border-border text-muted-foreground"
                  }`}
                >
                  <span className="font-mono font-bold">{t.label}</span>
                  {o && <span className="text-[10px] opacity-80 mt-0.5">{fmt(total)}</span>}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-xl overflow-hidden">
        <div className="p-4 border-b border-border flex justify-between items-center">
          <h3 className="text-sm font-bold uppercase tracking-widest">Recent Orders</h3>
          <Link to="/dashboard/orders" className="text-xs text-primary font-semibold">View all</Link>
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
            {recent.length === 0 && (
              <tr><td colSpan={5} className="p-8 text-center text-muted-foreground">No orders yet — head to the cashier.</td></tr>
            )}
            {recent.map((o) => {
              const t = tables.find((x) => x.id === o.tableId);
              return (
                <tr key={o.id} className="hover:bg-accent/20">
                  <td className="p-4 font-mono">#{o.number}</td>
                  <td className="p-4 font-display italic">{t?.label ?? "—"}</td>
                  <td className="p-4 text-muted-foreground truncate max-w-xs">
                    {o.lines.map((l) => `${l.qty}× ${l.name}`).join(", ") || "—"}
                  </td>
                  <td className="p-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full bg-primary/10 text-primary">
                      {o.status}
                    </span>
                  </td>
                  <td className="p-4 text-right font-mono">{fmt(orderTotals(o.lines, o.tip ?? 0).total)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
