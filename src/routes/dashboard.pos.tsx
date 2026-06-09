import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Minus, Plus, Send, Trash2, Search, CreditCard } from "lucide-react";
import { usePOS, orderTotals, fmt, type MenuItem } from "@/lib/pos-store";

export const Route = createFileRoute("/dashboard/pos")({
  component: POSPage,
});

function POSPage() {
  const navigate = useNavigate();
  const menu = usePOS((s) => s.menu);
  const tables = usePOS((s) => s.tables);
  const orders = usePOS((s) => s.orders);
  const { createOrder, addLine, changeQty, removeLine, setStatus, payOrder } = usePOS.getState();

  const openOrders = orders.filter((o) => o.status === "open" || o.status === "sent");
  const [activeOrderId, setActiveOrderId] = useState<string | null>(openOrders[0]?.id ?? null);
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [payOpen, setPayOpen] = useState(false);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(menu.map((m) => m.category)))],
    [menu]
  );
  const filtered = menu.filter(
    (m) =>
      (category === "All" || m.category === category) &&
      m.name.toLowerCase().includes(query.toLowerCase())
  );

  const active = orders.find((o) => o.id === activeOrderId) ?? null;
  const totals = active ? orderTotals(active.lines) : { subtotal: 0, tax: 0, total: 0 };

  const handleAdd = (item: MenuItem) => {
    if (!active) {
      alert("Open a check first (pick a table or start a quick sale).");
      return;
    }
    if (item.stock === 0) return;
    addLine(active.id, item);
  };

  return (
    <div className="grid grid-cols-12 gap-6 h-[calc(100vh-9rem)]">
      {/* Left: open checks */}
      <aside className="col-span-2 bg-surface border border-border rounded-xl p-3 flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Open Checks</h2>
          <button
            onClick={() => setShowNew(true)}
            className="h-7 w-7 rounded-md bg-primary text-primary-foreground grid place-items-center"
            title="New check"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
        <div className="space-y-1.5 overflow-y-auto flex-1">
          {openOrders.length === 0 && (
            <p className="text-xs text-muted-foreground px-2 py-4">No open checks. Tap + to start.</p>
          )}
          {openOrders.map((o) => {
            const table = tables.find((t) => t.id === o.tableId);
            const isActive = o.id === activeOrderId;
            return (
              <button
                key={o.id}
                onClick={() => setActiveOrderId(o.id)}
                className={`w-full text-left p-2.5 rounded-lg border text-xs transition-colors ${
                  isActive ? "border-primary bg-primary/5" : "border-border hover:bg-accent/40"
                }`}
              >
                <div className="flex justify-between font-semibold">
                  <span>#{o.number}</span>
                  <span className="font-mono">{fmt(orderTotals(o.lines).subtotal)}</span>
                </div>
                <div className="text-muted-foreground mt-0.5">
                  {table ? `${table.label} · ${o.guests}p` : "Quick sale"} · {o.lines.length} item{o.lines.length !== 1 ? "s" : ""}
                </div>
                <div className="text-[10px] uppercase tracking-wider mt-1 text-primary">{o.status}</div>
              </button>
            );
          })}
        </div>
      </aside>

      {/* Middle: menu */}
      <section className="col-span-7 flex flex-col min-h-0">
        <div className="flex gap-3 items-center mb-3">
          <div className="flex-1 flex items-center gap-2 bg-surface border border-border rounded-lg px-3 h-10">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search menu…"
              className="bg-transparent outline-none flex-1 text-sm"
            />
          </div>
        </div>
        <div className="flex gap-2 flex-wrap mb-4">
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
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 overflow-y-auto pr-1">
          {filtered.map((m) => {
            const out = m.stock === 0;
            return (
              <button
                key={m.id}
                disabled={out}
                onClick={() => handleAdd(m)}
                className={`text-left bg-surface border border-border rounded-xl p-4 transition-all ${
                  out ? "opacity-40 cursor-not-allowed" : "hover:border-primary hover:shadow-sm active:scale-[0.98]"
                }`}
              >
                <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1.5">
                  {m.category}
                </div>
                <div className="font-medium text-sm mb-3 leading-tight">{m.name}</div>
                <div className="flex justify-between items-center">
                  <span className="font-mono text-base font-semibold">{fmt(m.price)}</span>
                  {m.stock > 0 && m.stock <= 5 && (
                    <span className="text-[10px] uppercase font-bold text-warning-foreground bg-warning/15 px-1.5 py-0.5 rounded">
                      {m.stock} left
                    </span>
                  )}
                  {out && (
                    <span className="text-[10px] uppercase font-bold text-destructive bg-destructive/10 px-1.5 py-0.5 rounded">
                      Out
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Right: current check */}
      <aside className="col-span-3 bg-surface border border-border rounded-xl flex flex-col">
        {!active ? (
          <div className="p-6 text-sm text-muted-foreground">
            Select or create a check to begin.
          </div>
        ) : (
          <>
            <div className="p-4 border-b border-border">
              <div className="flex justify-between items-baseline">
                <h2 className="font-display text-xl">Check #{active.number}</h2>
                <span className="text-[10px] uppercase tracking-wider text-primary">{active.status}</span>
              </div>
              <p className="text-xs text-muted-foreground">
                {active.tableId
                  ? `${tables.find((t) => t.id === active.tableId)?.label} · ${active.guests} guests`
                  : "Quick sale"} · Server: {active.server}
              </p>
            </div>
            <div className="flex-1 overflow-y-auto p-3 space-y-1">
              {active.lines.length === 0 && (
                <p className="text-xs text-muted-foreground p-3">Tap menu items to add.</p>
              )}
              {active.lines.map((l) => (
                <div key={l.itemId} className="flex items-center gap-2 p-2 rounded-lg hover:bg-accent/40 group">
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{l.name}</div>
                    <div className="text-[11px] text-muted-foreground font-mono">{fmt(l.price)}</div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => changeQty(active.id, l.itemId, l.qty - 1)}
                      className="h-6 w-6 grid place-items-center rounded border border-border hover:bg-accent"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-6 text-center font-mono text-sm">{l.qty}</span>
                    <button
                      onClick={() => changeQty(active.id, l.itemId, l.qty + 1)}
                      className="h-6 w-6 grid place-items-center rounded border border-border hover:bg-accent"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                  <div className="w-16 text-right font-mono text-sm">{fmt(l.price * l.qty)}</div>
                  <button
                    onClick={() => removeLine(active.id, l.itemId)}
                    className="opacity-0 group-hover:opacity-100 text-destructive p-1"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
            <div className="border-t border-border p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-mono">{fmt(totals.subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax (8.5%)</span>
                <span className="font-mono">{fmt(totals.tax)}</span>
              </div>
              <div className="flex justify-between text-base font-semibold pt-2 border-t border-border">
                <span>Total</span>
                <span className="font-mono">{fmt(totals.total)}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  disabled={active.lines.length === 0 || active.status === "sent"}
                  onClick={() => setStatus(active.id, "sent")}
                  className="py-2.5 rounded-lg border border-border text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 hover:bg-accent disabled:opacity-40"
                >
                  <Send className="h-3.5 w-3.5" /> Send to Kitchen
                </button>
                <button
                  disabled={active.lines.length === 0}
                  onClick={() => setPayOpen(true)}
                  className="py-2.5 rounded-lg bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 disabled:opacity-40"
                >
                  <CreditCard className="h-3.5 w-3.5" /> Pay
                </button>
              </div>
            </div>
          </>
        )}
      </aside>

      {showNew && (
        <NewCheckDialog
          onClose={() => setShowNew(false)}
          onCreate={(tableId, guests, server) => {
            const id = createOrder(tableId, guests, server);
            setActiveOrderId(id);
            setShowNew(false);
          }}
        />
      )}
      {payOpen && active && (
        <PayDialog
          total={totals.total}
          onClose={() => setPayOpen(false)}
          onPay={(method, tip) => {
            payOrder(active.id, method, tip);
            setPayOpen(false);
            setActiveOrderId(null);
            navigate({ to: "/dashboard/payments" });
          }}
        />
      )}
    </div>
  );
}

function NewCheckDialog({
  onClose,
  onCreate,
}: {
  onClose: () => void;
  onCreate: (tableId: string | null, guests: number, server: string) => void;
}) {
  const tables = usePOS((s) => s.tables).filter((t) => t.status === "free");
  const [tableId, setTableId] = useState<string | null>(null);
  const [guests, setGuests] = useState(2);
  const [server] = useState("Elena Marchetti");
  return (
    <div className="fixed inset-0 bg-foreground/40 grid place-items-center z-50 p-4" onClick={onClose}>
      <div className="bg-surface border border-border rounded-xl p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <h3 className="font-display text-2xl mb-4">New Check</h3>
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Table</label>
        <div className="grid grid-cols-4 gap-2 mt-2 mb-4">
          <button
            onClick={() => setTableId(null)}
            className={`p-2 rounded-lg border text-xs ${tableId === null ? "border-primary bg-primary/5" : "border-border"}`}
          >
            Quick
          </button>
          {tables.map((t) => (
            <button
              key={t.id}
              onClick={() => setTableId(t.id)}
              className={`p-2 rounded-lg border text-xs ${tableId === t.id ? "border-primary bg-primary/5" : "border-border"}`}
            >
              <div className="font-bold">{t.label}</div>
              <div className="text-muted-foreground text-[10px]">{t.seats}p · {t.zone}</div>
            </button>
          ))}
        </div>
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Guests</label>
        <input
          type="number"
          min={1}
          value={guests}
          onChange={(e) => setGuests(parseInt(e.target.value) || 1)}
          className="w-full mt-2 mb-4 bg-background border border-border rounded-lg px-3 py-2 text-sm"
        />
        <div className="flex gap-2 justify-end">
          <button onClick={onClose} className="px-4 py-2 text-xs font-bold uppercase tracking-wider">Cancel</button>
          <button
            onClick={() => onCreate(tableId, guests, server)}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-xs font-bold uppercase tracking-wider"
          >
            Open Check
          </button>
        </div>
      </div>
    </div>
  );
}

function PayDialog({
  total,
  onClose,
  onPay,
}: {
  total: number;
  onClose: () => void;
  onPay: (method: "cash" | "card" | "split", tip: number) => void;
}) {
  const [method, setMethod] = useState<"cash" | "card" | "split">("card");
  const [tipPct, setTipPct] = useState(18);
  const tip = (total * tipPct) / 100;
  return (
    <div className="fixed inset-0 bg-foreground/40 grid place-items-center z-50 p-4" onClick={onClose}>
      <div className="bg-surface border border-border rounded-xl p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <h3 className="font-display text-2xl mb-4">Settle Check</h3>
        <div className="flex gap-2 mb-4">
          {(["cash", "card", "split"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMethod(m)}
              className={`flex-1 py-3 rounded-lg border capitalize text-sm ${method === m ? "border-primary bg-primary/5" : "border-border"}`}
            >
              {m}
            </button>
          ))}
        </div>
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Tip</label>
        <div className="flex gap-2 mt-2 mb-4">
          {[0, 15, 18, 20, 25].map((p) => (
            <button
              key={p}
              onClick={() => setTipPct(p)}
              className={`flex-1 py-2 rounded-lg border text-sm ${tipPct === p ? "border-primary bg-primary/5" : "border-border"}`}
            >
              {p}%
            </button>
          ))}
        </div>
        <div className="bg-background rounded-lg p-4 space-y-1 mb-4 text-sm">
          <div className="flex justify-between"><span>Subtotal+Tax</span><span className="font-mono">{fmt(total)}</span></div>
          <div className="flex justify-between"><span>Tip</span><span className="font-mono">{fmt(tip)}</span></div>
          <div className="flex justify-between font-semibold text-base pt-2 border-t border-border"><span>Charge</span><span className="font-mono">{fmt(total + tip)}</span></div>
        </div>
        <div className="flex gap-2 justify-end">
          <button onClick={onClose} className="px-4 py-2 text-xs font-bold uppercase tracking-wider">Cancel</button>
          <button
            onClick={() => onPay(method, tip)}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-xs font-bold uppercase tracking-wider"
          >
            Charge {fmt(total + tip)}
          </button>
        </div>
      </div>
    </div>
  );
}
