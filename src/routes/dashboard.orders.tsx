import { createFileRoute } from "@tanstack/react-router";
import { Plus, Filter } from "lucide-react";

export const Route = createFileRoute("/dashboard/orders")({
  component: Orders,
});

const orders = [
  { id: "#8821", table: "T3", server: "Elena", items: 3, amount: "$18.50", status: "Open", time: "2 min ago" },
  { id: "#8820", table: "T1", server: "Marcus", items: 2, amount: "$84.00", status: "Paid", time: "12 min ago" },
  { id: "#8819", table: "Online", server: "—", items: 1, amount: "$42.00", status: "Pickup", time: "14 min ago" },
  { id: "#8818", table: "T6", server: "Sarah", items: 4, amount: "$48.00", status: "Paid", time: "18 min ago" },
  { id: "#8817", table: "T4", server: "Elena", items: 5, amount: "$76.50", status: "Paid", time: "23 min ago" },
  { id: "#8816", table: "T8", server: "Marcus", items: 2, amount: "$32.00", status: "Open", time: "28 min ago" },
  { id: "#8815", table: "T2", server: "Sarah", items: 6, amount: "$142.00", status: "Paid", time: "35 min ago" },
  { id: "#8814", table: "Bar 1", server: "Marcus", items: 3, amount: "$54.00", status: "Voided", time: "42 min ago" },
];

const tabs = ["All", "Open", "Paid", "Pickup", "Voided"];

function Orders() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="font-display text-3xl italic">Orders</h1>
          <p className="text-sm text-muted-foreground">All tickets across the floor.</p>
        </div>
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2">
          <Plus className="h-4 w-4" /> New Order
        </button>
      </div>

      <div className="flex items-center justify-between border-b border-border">
        <div className="flex">
          {tabs.map((t, i) => (
            <button key={t} className={`px-4 py-3 text-xs font-bold uppercase tracking-wider border-b-2 ${i === 0 ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
              {t}
            </button>
          ))}
        </div>
        <button className="text-xs flex items-center gap-1 text-muted-foreground"><Filter className="h-3 w-3" /> Filter</button>
      </div>

      <div className="bg-surface border border-border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-accent/40 text-muted-foreground">
            <tr>
              {["Order", "Table", "Server", "Items", "Status", "Time", "Amount"].map((h) => (
                <th key={h} className="p-4 text-left font-medium text-xs uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {orders.map((o) => (
              <tr key={o.id} className="hover:bg-accent/20">
                <td className="p-4 font-mono">{o.id}</td>
                <td className="p-4 font-display italic">{o.table}</td>
                <td className="p-4">{o.server}</td>
                <td className="p-4 text-muted-foreground">{o.items}</td>
                <td className="p-4">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ${
                    o.status === "Paid" ? "bg-success/10 text-success" :
                    o.status === "Pickup" ? "bg-warning/15 text-warning-foreground" :
                    o.status === "Voided" ? "bg-destructive/10 text-destructive" :
                    "bg-primary/10 text-primary"
                  }`}>{o.status}</span>
                </td>
                <td className="p-4 text-muted-foreground text-xs">{o.time}</td>
                <td className="p-4 text-right font-mono">{o.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
