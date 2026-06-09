import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { usePOS, fmt, type MenuItem } from "@/lib/pos-store";

export const Route = createFileRoute("/dashboard/menu")({
  component: Menu,
});

function Menu() {
  const menu = usePOS((s) => s.menu);
  const { addMenuItem, updateMenuItem, deleteMenuItem } = usePOS.getState();
  const [category, setCategory] = useState("All");
  const [editing, setEditing] = useState<MenuItem | null>(null);
  const [showAdd, setShowAdd] = useState(false);

  const categories = ["All", ...Array.from(new Set(menu.map((m) => m.category)))];
  const filtered = menu.filter((m) => category === "All" || m.category === category);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="font-display text-3xl italic">Menu & Products</h1>
          <p className="text-sm text-muted-foreground">Curate dishes, prices, categories and stock.</p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2"
        >
          <Plus className="h-4 w-4" /> Add Item
        </button>
      </div>

      <div className="flex gap-2 flex-wrap">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border ${
              c === category
                ? "bg-foreground text-background border-foreground"
                : "border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((it) => (
          <div key={it.id} className="bg-surface border border-border rounded-xl p-5 group">
            <div className="flex justify-between items-start">
              <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">
                {it.category}
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => setEditing(it)} className="p-1 hover:text-primary">
                  <Pencil className="h-3.5 w-3.5" />
                </button>
                <button onClick={() => deleteMenuItem(it.id)} className="p-1 hover:text-destructive">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
            <h3 className="font-display text-xl mb-3">{it.name}</h3>
            <div className="flex justify-between items-center">
              <span className="font-mono text-lg">{fmt(it.price)}</span>
              <span
                className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full ${
                  it.stock === 0
                    ? "bg-destructive/10 text-destructive"
                    : it.stock > 0 && it.stock <= 5
                    ? "bg-warning/15 text-warning-foreground"
                    : "bg-success/10 text-success"
                }`}
              >
                {it.stock === -1 ? "In stock" : it.stock === 0 ? "Out" : `${it.stock} left`}
              </span>
            </div>
          </div>
        ))}
      </div>

      {(showAdd || editing) && (
        <ItemDialog
          initial={editing ?? undefined}
          onClose={() => {
            setShowAdd(false);
            setEditing(null);
          }}
          onSave={(data) => {
            if (editing) updateMenuItem(editing.id, data);
            else addMenuItem(data);
            setShowAdd(false);
            setEditing(null);
          }}
        />
      )}
    </div>
  );
}

function ItemDialog({
  initial,
  onClose,
  onSave,
}: {
  initial?: MenuItem;
  onClose: () => void;
  onSave: (data: Omit<MenuItem, "id">) => void;
}) {
  const [name, setName] = useState(initial?.name ?? "");
  const [category, setCategory] = useState(initial?.category ?? "Mains");
  const [price, setPrice] = useState(initial?.price ?? 0);
  const [stock, setStock] = useState(initial?.stock ?? -1);
  return (
    <div className="fixed inset-0 bg-foreground/40 grid place-items-center z-50 p-4" onClick={onClose}>
      <div className="bg-surface border border-border rounded-xl p-6 w-full max-w-md space-y-3" onClick={(e) => e.stopPropagation()}>
        <h3 className="font-display text-2xl mb-2">{initial ? "Edit Item" : "Add Item"}</h3>
        <Field label="Name">
          <input value={name} onChange={(e) => setName(e.target.value)} className="input" />
        </Field>
        <Field label="Category">
          <input value={category} onChange={(e) => setCategory(e.target.value)} className="input" />
        </Field>
        <Field label="Price">
          <input type="number" step="0.01" value={price} onChange={(e) => setPrice(parseFloat(e.target.value) || 0)} className="input" />
        </Field>
        <Field label="Stock (-1 = unlimited)">
          <input type="number" value={stock} onChange={(e) => setStock(parseInt(e.target.value))} className="input" />
        </Field>
        <div className="flex gap-2 justify-end pt-2">
          <button onClick={onClose} className="px-4 py-2 text-xs font-bold uppercase tracking-wider">Cancel</button>
          <button
            onClick={() => name && onSave({ name, category, price, stock })}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-xs font-bold uppercase tracking-wider"
          >
            Save
          </button>
        </div>
        <style>{`.input{width:100%;background:hsl(var(--background));border:1px solid hsl(var(--border));border-radius:0.5rem;padding:0.5rem 0.75rem;font-size:0.875rem;outline:none}`}</style>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{label}</span>
      <div className="mt-1">{children}</div>
    </label>
  );
}
