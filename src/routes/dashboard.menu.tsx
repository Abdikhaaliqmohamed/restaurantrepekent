import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/dashboard/menu")({
  component: Menu,
});

const categories = ["All", "Starters", "Mains", "Pasta", "Desserts", "Wine", "Cocktails"];

const items = [
  { name: "Truffle Tagliatelle", cat: "Pasta", price: 32, stock: "In stock" },
  { name: "Wagyu Ribeye 12oz", cat: "Mains", price: 84, stock: "Low (4)" },
  { name: "Burrata & Heirloom", cat: "Starters", price: 18, stock: "In stock" },
  { name: "Branzino al Sale", cat: "Mains", price: 46, stock: "In stock" },
  { name: "Tiramisu Classico", cat: "Desserts", price: 14, stock: "In stock" },
  { name: "Barolo 2018", cat: "Wine", price: 120, stock: "In stock" },
  { name: "Negroni Sbagliato", cat: "Cocktails", price: 18, stock: "In stock" },
  { name: "Pistachio Cannoli", cat: "Desserts", price: 12, stock: "Out" },
  { name: "Vitello Tonnato", cat: "Starters", price: 22, stock: "In stock" },
];

function Menu() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="font-display text-3xl italic">Menu & Products</h1>
          <p className="text-sm text-muted-foreground">Curate dishes, prices, categories and stock.</p>
        </div>
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2">
          <Plus className="h-4 w-4" /> Add Item
        </button>
      </div>

      <div className="flex gap-2 flex-wrap">
        {categories.map((c, i) => (
          <button key={c} className={`px-3 py-1.5 rounded-full text-xs font-medium border ${i === 0 ? "bg-foreground text-background border-foreground" : "border-border text-muted-foreground hover:text-foreground"}`}>
            {c}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((it) => (
          <div key={it.name} className="bg-surface border border-border rounded-xl p-5 hover:border-primary/40 transition-colors">
            <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">{it.cat}</div>
            <h3 className="font-display text-xl mb-3">{it.name}</h3>
            <div className="flex justify-between items-center">
              <span className="font-mono text-lg">${it.price}.00</span>
              <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full ${
                it.stock === "Out" ? "bg-destructive/10 text-destructive" :
                it.stock.startsWith("Low") ? "bg-warning/15 text-warning-foreground" :
                "bg-success/10 text-success"
              }`}>{it.stock}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
