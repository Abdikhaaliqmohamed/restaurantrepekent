import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/dashboard/users")({
  component: Users,
});

const users = [
  { name: "Elena Marchetti", role: "Admin", email: "elena@miseenplace.app", shift: "Day", active: true },
  { name: "Marcus Lin", role: "Cashier", email: "marcus@miseenplace.app", shift: "Day", active: true },
  { name: "Sarah Okafor", role: "Cashier", email: "sarah@miseenplace.app", shift: "Evening", active: true },
  { name: "Diego Alvarez", role: "Waiter", email: "diego@miseenplace.app", shift: "Evening", active: true },
  { name: "Yuki Tanaka", role: "Waiter", email: "yuki@miseenplace.app", shift: "Day", active: false },
];

function Users() {
  const roleColor = (r: string) => r === "Admin" ? "bg-primary/10 text-primary" : r === "Cashier" ? "bg-success/10 text-success" : "bg-accent text-accent-foreground";

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="font-display text-3xl italic">Users & Roles</h1>
          <p className="text-sm text-muted-foreground">Admin, cashier and waiter accounts.</p>
        </div>
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2">
          <Plus className="h-4 w-4" /> Invite User
        </button>
      </div>

      <div className="bg-surface border border-border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-accent/40 text-muted-foreground">
            <tr>
              {["Member", "Role", "Email", "Shift", "Status"].map((h) => (
                <th key={h} className="p-4 text-left font-medium text-xs uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {users.map((u) => (
              <tr key={u.email} className="hover:bg-accent/20">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-primary text-primary-foreground grid place-items-center font-semibold text-xs">
                      {u.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <span className="font-medium">{u.name}</span>
                  </div>
                </td>
                <td className="p-4">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ${roleColor(u.role)}`}>{u.role}</span>
                </td>
                <td className="p-4 font-mono text-xs text-muted-foreground">{u.email}</td>
                <td className="p-4 text-muted-foreground">{u.shift}</td>
                <td className="p-4">
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${u.active ? "text-success" : "text-muted-foreground"}`}>
                    {u.active ? "● Active" : "○ Inactive"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
