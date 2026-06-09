import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/tables")({
  component: Tables,
});

const tables = Array.from({ length: 16 }, (_, i) => {
  const id = `T${i + 1}`;
  const r = (i * 7) % 10;
  if (r < 3) return { id, status: "free" as const };
  if (r < 5) return { id, status: "checkout" as const, total: `$${(20 + r * 8).toFixed(2)}`, time: "8m" };
  return { id, status: "occupied" as const, total: `$${(40 + r * 12).toFixed(2)}`, time: `${(r * 5) + 10}m`, guests: 2 + (i % 4) };
});

function Tables() {
  const occupied = tables.filter((t) => t.status !== "free").length;
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl italic">Main Dining Floor</h1>
        <p className="text-sm text-muted-foreground">{occupied} of {tables.length} tables occupied</p>
      </div>

      <div className="flex gap-4 text-xs">
        <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-muted-foreground/30" /> Available</span>
        <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-primary/40" /> Occupied</span>
        <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-primary" /> Checkout</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
        {tables.map((t) => (
          <div
            key={t.id}
            className={`aspect-square rounded-2xl p-4 flex flex-col justify-between cursor-pointer transition-all hover:scale-[1.02] ${
              t.status === "occupied"
                ? "bg-primary/10 border-2 border-primary/30 text-foreground"
                : t.status === "checkout"
                ? "bg-primary text-primary-foreground border-2 border-primary"
                : "bg-surface border-2 border-border text-muted-foreground"
            }`}
          >
            <div className="flex justify-between items-start">
              <span className="font-mono font-bold text-lg">{t.id}</span>
              {t.status !== "free" && "guests" in t && <span className="text-[10px] opacity-70">{t.guests} guests</span>}
            </div>
            <div className="text-xs">
              {t.status === "free" ? (
                <span className="uppercase tracking-wider opacity-60">Available</span>
              ) : (
                <>
                  <div className="font-mono">{t.total}</div>
                  <div className="opacity-70">{t.time}</div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
