import { createFileRoute, Link } from "@tanstack/react-router";
import { usePOS, orderTotals, fmt } from "@/lib/pos-store";

export const Route = createFileRoute("/dashboard/tables")({
  component: Tables,
});

const zoneOrder: Array<"Window" | "Center" | "Bar" | "Patio"> = ["Window", "Center", "Bar", "Patio"];

function Tables() {
  const tables = usePOS((s) => s.tables);
  const orders = usePOS((s) => s.orders);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="font-display text-3xl italic">Floor Map</h1>
          <p className="text-sm text-muted-foreground">Live status across the dining room.</p>
        </div>
        <Link
          to="/dashboard/pos"
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-xs font-bold uppercase tracking-wider"
        >
          Open Cashier
        </Link>
      </div>

      {zoneOrder.map((zone) => {
        const zt = tables.filter((t) => t.zone === zone);
        if (zt.length === 0) return null;
        return (
          <div key={zone}>
            <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">{zone}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {zt.map((t) => {
                const order = orders.find((o) => o.id === t.orderId);
                const total = order ? orderTotals(order.lines).total : 0;
                const color =
                  t.status === "free"
                    ? "border-success/40 bg-success/5"
                    : t.status === "billed"
                    ? "border-warning/50 bg-warning/10"
                    : "border-primary/50 bg-primary/5";
                return (
                  <div key={t.id} className={`rounded-xl border-2 p-4 ${color}`}>
                    <div className="flex justify-between items-baseline mb-1">
                      <span className="font-display text-2xl">{t.label}</span>
                      <span className="text-[10px] uppercase font-bold tracking-wider">{t.status}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">{t.seats} seats</div>
                    {order && (
                      <div className="mt-3 pt-3 border-t border-border/60 text-xs">
                        <div className="font-mono">#{order.number}</div>
                        <div className="font-mono font-semibold">{fmt(total)}</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
