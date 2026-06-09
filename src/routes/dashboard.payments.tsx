import { createFileRoute } from "@tanstack/react-router";
import { usePOS, orderTotals, fmt } from "@/lib/pos-store";
import { CreditCard, Banknote, SplitSquareHorizontal } from "lucide-react";

export const Route = createFileRoute("/dashboard/payments")({
  component: Payments,
});

function Payments() {
  const orders = usePOS((s) => s.orders);
  const tables = usePOS((s) => s.tables);
  const paid = orders.filter((o) => o.status === "paid").sort((a, b) => (b.paidAt ?? 0) - (a.paidAt ?? 0));

  const totals = paid.reduce(
    (acc, o) => {
      const t = orderTotals(o.lines, o.tip ?? 0);
      acc.gross += t.total;
      acc.tips += o.tip ?? 0;
      if (o.paymentMethod === "card") acc.card += t.total;
      else if (o.paymentMethod === "cash") acc.cash += t.total;
      else acc.split += t.total;
      return acc;
    },
    { gross: 0, tips: 0, card: 0, cash: 0, split: 0 }
  );

  const icons = { cash: Banknote, card: CreditCard, split: SplitSquareHorizontal };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl italic">Payments</h1>
        <p className="text-sm text-muted-foreground">Settled checks and reconciliation.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        <Stat label="Gross" value={fmt(totals.gross)} />
        <Stat label="Tips" value={fmt(totals.tips)} />
        <Stat label="Card" value={fmt(totals.card)} />
        <Stat label="Cash" value={fmt(totals.cash)} />
        <Stat label="Split" value={fmt(totals.split)} />
      </div>

      <div className="bg-surface border border-border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-background border-b border-border text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="text-left p-3">Check</th>
              <th className="text-left p-3">Table</th>
              <th className="text-left p-3">Method</th>
              <th className="text-right p-3">Subtotal</th>
              <th className="text-right p-3">Tax</th>
              <th className="text-right p-3">Tip</th>
              <th className="text-right p-3">Total</th>
              <th className="text-right p-3">Paid</th>
            </tr>
          </thead>
          <tbody>
            {paid.length === 0 && (
              <tr>
                <td colSpan={8} className="p-12 text-center text-muted-foreground">No payments recorded yet.</td>
              </tr>
            )}
            {paid.map((o) => {
              const t = orderTotals(o.lines);
              const table = tables.find((x) => x.id === o.tableId);
              const Icon = icons[o.paymentMethod ?? "card"];
              return (
                <tr key={o.id} className="border-b border-border/60 hover:bg-accent/30">
                  <td className="p-3 font-mono">#{o.number}</td>
                  <td className="p-3">{table?.label ?? "—"}</td>
                  <td className="p-3">
                    <span className="inline-flex items-center gap-1.5 capitalize">
                      <Icon className="h-3.5 w-3.5" /> {o.paymentMethod}
                    </span>
                  </td>
                  <td className="p-3 text-right font-mono">{fmt(t.subtotal)}</td>
                  <td className="p-3 text-right font-mono text-muted-foreground">{fmt(t.tax)}</td>
                  <td className="p-3 text-right font-mono text-muted-foreground">{fmt(o.tip ?? 0)}</td>
                  <td className="p-3 text-right font-mono font-semibold">{fmt(t.total + (o.tip ?? 0))}</td>
                  <td className="p-3 text-right text-xs text-muted-foreground">
                    {o.paidAt ? new Date(o.paidAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "—"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-surface border border-border rounded-xl p-4">
      <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="font-display text-2xl mt-1">{value}</div>
    </div>
  );
}
