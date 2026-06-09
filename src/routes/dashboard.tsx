import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard, Receipt, ChefHat, LayoutGrid, CreditCard,
  BarChart3, Boxes, Users, Settings, Bell, Search, UtensilsCrossed,
} from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — Mise en Place" },
      { name: "description", content: "Live operations dashboard for restaurant cashiers and managers." },
    ],
  }),
  component: DashboardLayout,
});

type NavItem = {
  to: string;
  label: string;
  icon: typeof LayoutDashboard;
  exact?: boolean;
  badge?: string;
};

const nav: NavItem[] = [
  { to: "/dashboard", label: "Overview", icon: LayoutDashboard, exact: true },
  { to: "/dashboard/orders", label: "Orders", icon: Receipt, badge: "12" },
  { to: "/dashboard/menu", label: "Menu & Products", icon: ChefHat },
  { to: "/dashboard/tables", label: "Floor Map", icon: LayoutGrid },
  { to: "/dashboard/payments", label: "Payments", icon: CreditCard },
  { to: "/dashboard/reports", label: "Reports", icon: BarChart3 },
  { to: "/dashboard/suppliers", label: "Suppliers", icon: Boxes },
  { to: "/dashboard/users", label: "Users & Roles", icon: Users },
  { to: "/dashboard/settings", label: "Settings", icon: Settings },
];

function DashboardLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-surface flex flex-col shrink-0">
        <Link to="/" className="p-6 border-b border-border flex items-center gap-2">
          <UtensilsCrossed className="h-5 w-5 text-primary" />
          <span className="font-display italic text-xl font-bold tracking-tight text-primary">Mise en Place</span>
        </Link>
        <div className="p-4">
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3 px-3">Main Menu</p>
          <nav className="space-y-1">
            {nav.map((item) => {
              const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    active ? "bg-accent text-primary" : "text-foreground/70 hover:bg-accent/50"
                  }`}
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  <span className="flex-1">{item.label}</span>
                  {"badge" in item && item.badge ? (
                    <span className="font-mono text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded">{item.badge}</span>
                  ) : null}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="mt-auto p-4 border-t border-border">
          <div className="flex items-center gap-3 px-2">
            <div className="h-9 w-9 rounded-full bg-primary text-primary-foreground grid place-items-center font-semibold text-sm">EM</div>
            <div className="text-xs">
              <div className="font-semibold">Elena Marchetti</div>
              <div className="text-muted-foreground">Manager · Shift A</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-border bg-surface px-8 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Search className="h-4 w-4" />
            <input placeholder="Search orders, tables, items…" className="bg-transparent outline-none text-foreground placeholder:text-muted-foreground text-sm w-80" />
          </div>
          <div className="flex items-center gap-4">
            <div className="py-1.5 px-3 flex items-center gap-2 bg-success/10 text-success text-xs font-medium rounded-full">
              <div className="h-2 w-2 bg-success rounded-full animate-pulse" /> Kitchen Live
            </div>
            <button className="relative p-2 rounded-lg hover:bg-accent">
              <Bell className="h-4 w-4" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary" />
            </button>
          </div>
        </header>
        <div className="flex-1 p-8 overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
