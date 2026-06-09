import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/dashboard/suppliers")({
  component: Suppliers,
});

const suppliers = [
  { name: "Cascina Verde", category: "Produce", contact: "ordini@cascina.it", lastOrder: "2 days ago", balance: "$1,240" },
  { name: "Pacific Catch Co.", category: "Seafood", contact: "sales@pacificcatch.com", lastOrder: "Today", balance: "$3,580" },
  { name: "Tuscan Wine Imports", category: "Wine & Spirits", contact: "alessandro@tuscanwine.com", lastOrder: "1 week ago", balance: "$0" },
  { name: "Bread & Co.", category: "Bakery", contact: "orders@breadco.com", lastOrder: "Yesterday", balance: "$320" },
  { name: "Highland Beef", category: "Meat", contact: "wholesale@highlandbeef.co", lastOrder: "3 days ago", balance: "$2,140" },
];

function Suppliers() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="font-display text-3xl italic">Suppliers & Purchasing</h1>
          <p className="text-sm text-muted-foreground">Your vendor network and open balances.</p>
        </div>
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2">
          <Plus className="h-4 w-4" /> Add Supplier
        </button>
      </div>

      <div className="bg-surface border border-border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-accent/40 text-muted-foreground">
            <tr>
              {["Supplier", "Category", "Contact", "Last Order", "Balance"].map((h) => (
                <th key={h} className="p-4 text-left font-medium text-xs uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {suppliers.map((s) => (
              <tr key={s.name} className="hover:bg-accent/20">
                <td className="p-4 font-display italic text-base">{s.name}</td>
                <td className="p-4 text-muted-foreground">{s.category}</td>
                <td className="p-4 font-mono text-xs">{s.contact}</td>
                <td className="p-4 text-muted-foreground">{s.lastOrder}</td>
                <td className="p-4 font-mono">{s.balance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
