import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/reports")({
  component: Reports,
});

const week = [
  { day: "Mon", revenue: 3120, covers: 98 },
  { day: "Tue", revenue: 3890, covers: 124 },
  { day: "Wed", revenue: 4280, covers: 142 },
  { day: "Thu", revenue: 4680, covers: 158 },
  { day: "Fri", revenue: 6420, covers: 212 },
  { day: "Sat", revenue: 7980, covers: 268 },
  { day: "Sun", revenue: 5240, covers: 184 },
];

const max = Math.max(...week.map((w) => w.revenue));

const topItems = [
  { name: "Truffle Tagliatelle", qty: 84, rev: "$2,688" },
  { name: "Wagyu Ribeye", qty: 42, rev: "$3,528" },
  { name: "Burrata & Heirloom", qty: 68, rev: "$1,224" },
  { name: "Negroni Sbagliato", qty: 96, rev: "$1,728" },
  { name: "Tiramisu Classico", qty: 58, rev: "$812" },
];

function Reports() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl italic">Reports & Analytics</h1>
        <p className="text-sm text-muted-foreground">Weekly performance · last 7 days</p>
      </div>

      <div className="bg-surface border border-border rounded-xl p-6">
        <h3 className="text-sm font-bold uppercase tracking-widest mb-6">Revenue by Day</h3>
        <div className="flex items-end gap-4 h-64">
          {week.map((w) => (
            <div key={w.day} className="flex-1 flex flex-col items-center gap-2">
              <div className="text-xs font-mono">${(w.revenue / 1000).toFixed(1)}k</div>
              <div className="w-full bg-primary/15 rounded-t-lg flex items-end" style={{ height: `${(w.revenue / max) * 100}%` }}>
                <div className="w-full bg-primary rounded-t-lg" style={{ height: `${(w.covers / 268) * 100}%` }} />
              </div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{w.day}</div>
            </div>
          ))}
        </div>
        <div className="flex gap-6 mt-6 text-xs">
          <span className="flex items-center gap-2"><span className="h-3 w-3 bg-primary rounded-sm" /> Covers</span>
          <span className="flex items-center gap-2"><span className="h-3 w-3 bg-primary/15 rounded-sm" /> Revenue</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-surface border border-border rounded-xl overflow-hidden">
          <div className="p-4 border-b border-border">
            <h3 className="text-sm font-bold uppercase tracking-widest">Top Items · This Week</h3>
          </div>
          <table className="w-full text-sm">
            <tbody className="divide-y divide-border">
              {topItems.map((it) => (
                <tr key={it.name}>
                  <td className="p-4 font-medium">{it.name}</td>
                  <td className="p-4 text-muted-foreground text-right font-mono">{it.qty} sold</td>
                  <td className="p-4 text-right font-mono">{it.rev}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-surface border border-border rounded-xl p-6">
          <h3 className="text-sm font-bold uppercase tracking-widest mb-6">Shift Summary</h3>
          <div className="space-y-4">
            {[
              { l: "Avg. Service Time", v: "32 min" },
              { l: "Avg. Cover Spend", v: "$30.15" },
              { l: "Server of the Week", v: "Elena Marchetti" },
              { l: "Peak Hour", v: "20:00 – 21:00" },
              { l: "Refund Rate", v: "0.8%" },
            ].map((r) => (
              <div key={r.l} className="flex justify-between border-b border-border pb-3 last:border-0">
                <span className="text-sm text-muted-foreground">{r.l}</span>
                <span className="text-sm font-mono">{r.v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
