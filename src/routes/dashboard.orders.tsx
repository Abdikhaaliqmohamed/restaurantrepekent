import { createFileRoute, Link } from "@tanstack/react-router";
import { usePOS, orderTotals, fmt } from "@/lib/pos-store";
import { Receipt, X } from "lucide-react";

export const Route = createFileRoute("/dashboard/orders")({
  component: Orders,
});

function Orders() {
  const orders = usePOS((s) => s.orders);
  const tables = usePOS((s) => s.tables);
  const { setStatus, voidOrder } = usePOS.getState();

  const groups: { key: string; label: string; rows: typeof orders }[] = [
    { key: "open", label: "Open", rows: orders.filter((o) => o.status === "open") },
    { key: "sent", label: "In Kitchen", rows: orders.filter((o) => o.status === "sent") },
    { key: "served", label: "Served", rows: orders.filter((o) => o.status === "served") },
    { key: "paid", label: "Paid (Today)", rows: orders.filter((o) => o.status === "paid").slice(0, 20) },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="font-display text-3xl italic">Orders</h1>
          <p className="text-sm text-muted-foreground">Live order board across stations.</p>
        </div>
        <Link
          to="/dashboard/pos"
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-xs font-bold uppercase tracking-wider"
        >
          + New Check
        </Link>
      </div>

      {orders.length === 0 && (
        <div className="bg-surface border border-dashed border-border rounded-xl p-12 text-center">
          <Receipt className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
          <p className="text-sm text-muted-foreground">No orders yet. Open the cashier to start.</p>
        </div>
      )}

      {groups.map(
        (g) =>
          g.rows.length > 0 && (
            <div key={g.key}>
              <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
                {g.label} · {g.rows.length}
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                {g.rows.map((o) => {
                  const t = tables.find((x) => x.id === o.tableId);
                  const total = orderTotals(o.lines);
                  return (
                    <div key={o.id} className="bg-surface border border-border rounded-xl p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="font-display text-lg">#{o.number}</div>
                          <div className="text-xs text-muted-foreground">
                            {t ? `${t.label} · ${o.guests}p` : "Quick sale"} · {new Date(o.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </div>
                        </div>
                        <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded bg-primary/10 text-primary">
                          {o.status}
                        </span>
                      </div>
                      <ul className="text-xs space-y-1 mb-3 max-h-32 overflow-y-auto">
                        {o.lines.map((l) => (
                          <li key={l.itemId} className="flex justify-between">
                            <span>
                              <span className="font-mono">{l.qty}×</span> {l.name}
                            </span>
                            <span className="font-mono text-muted-foreground">{fmt(l.price * l.qty)}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="flex justify-between items-center pt-2 border-t border-border">
                        <span className="font-mono font-semibold">{fmt(total.total)}</span>
                        <div className="flex gap-1">
                          {o.status === "sent" && (
                            <button
                              onClick={() => setStatus(o.id, "served")}
                              className="text-[10px] uppercase font-bold px-2 py-1 rounded bg-success/10 text-success"
                            >
                              Mark Served
                            </button>
                          )}
                          {o.status !== "paid" && o.status !== "void" && (
                            <button
                              onClick={() => voidOrder(o.id)}
                              className="text-[10px] uppercase font-bold px-2 py-1 rounded text-destructive hover:bg-destructive/10"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )
      )}
    </div>
  );
}
