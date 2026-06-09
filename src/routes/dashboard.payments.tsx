import { createFileRoute } from "@tanstack/react-router";
import { Download } from "lucide-react";

export const Route = createFileRoute("/dashboard/payments")({
  component: Payments,
});

const payments = [
  { id: "INV-4920", order: "#8820", method: "Visa **4242", amount: "$84.00", tip: "$12.60", time: "12:48", status: "Settled" },
  { id: "INV-4919", order: "#8818", method: "Cash", amount: "$48.00", tip: "$5.00", time: "12:42", status: "Settled" },
  { id: "INV-4918", order: "#8817", method: "Amex **1009", amount: "$76.50", tip: "$15.00", time: "12:33", status: "Settled" },
  { id: "INV-4917", order: "#8815", method: "Mastercard **7711", amount: "$142.00", tip: "$28.00", time: "12:18", status: "Settled" },
  { id: "INV-4916", order: "#8814", method: "Refund", amount: "-$54.00", tip: "—", time: "11:52", status: "Refunded" },
];

function Payments() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="font-display text-3xl italic">Payments & Invoices</h1>
          <p className="text-sm text-muted-foreground">Today's settled transactions.</p>
        </div>
        <button className="px-4 py-2 border border-border bg-surface rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2">
          <Download className="h-4 w-4" /> Export CSV
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-surface border border-border p-5 rounded-xl">
          <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider mb-1">Settled Today</p>
          <p className="text-2xl font-mono">$3,842.00</p>
        </div>
        <div className="bg-surface border border-border p-5 rounded-xl">
          <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider mb-1">Tips Collected</p>
          <p className="text-2xl font-mono">$612.40</p>
        </div>
        <div className="bg-surface border border-border p-5 rounded-xl">
          <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider mb-1">Refunds</p>
          <p className="text-2xl font-mono">$54.00</p>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-accent/40 text-muted-foreground">
            <tr>
              {["Invoice", "Order", "Method", "Amount", "Tip", "Time", "Status"].map((h) => (
                <th key={h} className="p-4 text-left font-medium text-xs uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {payments.map((p) => (
              <tr key={p.id} className="hover:bg-accent/20">
                <td className="p-4 font-mono">{p.id}</td>
                <td className="p-4 font-mono text-muted-foreground">{p.order}</td>
                <td className="p-4">{p.method}</td>
                <td className="p-4 font-mono">{p.amount}</td>
                <td className="p-4 font-mono text-muted-foreground">{p.tip}</td>
                <td className="p-4 text-muted-foreground">{p.time}</td>
                <td className="p-4">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ${
                    p.status === "Settled" ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
                  }`}>{p.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
