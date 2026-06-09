import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { Receipt, ChefHat, BarChart3, Users, Boxes, Bell, CreditCard, Languages, ShieldCheck, Database, Printer, LayoutGrid } from "lucide-react";

export const Route = createFileRoute("/features")({
  head: () => ({
    meta: [
      { title: "Features — Mise en Place" },
      { name: "description", content: "Orders, menu, tables, payments, reports, suppliers, multi-branch, localization and more." },
      { property: "og:title", content: "Features — Mise en Place" },
      { property: "og:description", content: "Every module of the Laravel cashier platform." },
    ],
  }),
  component: Features,
});

const groups = [
  {
    title: "Service Floor",
    items: [
      { icon: Receipt, name: "Order Management", desc: "Open, modify and close orders against tables or takeaway." },
      { icon: LayoutGrid, name: "Table Floor Map", desc: "Visual grid of every table with status and ticket totals." },
      { icon: ChefHat, name: "Menu & Categories", desc: "CRUD for products, categories, modifiers and prices." },
    ],
  },
  {
    title: "Cash & Compliance",
    items: [
      { icon: CreditCard, name: "Payments & Invoices", desc: "Split bills, tips, multiple tenders and PDF receipts." },
      { icon: Printer, name: "Receipt Printing", desc: "ESC/POS thermal printing and downloadable PDFs." },
      { icon: ShieldCheck, name: "Roles & Security", desc: "Admin, cashier and waiter roles via Laravel middleware." },
    ],
  },
  {
    title: "Back Office",
    items: [
      { icon: BarChart3, name: "Reports & Analytics", desc: "Sales by item, shift, server, and time of day." },
      { icon: Boxes, name: "Suppliers & Stock", desc: "Track purchase orders, inventory and waste." },
      { icon: Database, name: "Backups & Recovery", desc: "Scheduled exports and point-in-time restore." },
      { icon: Languages, name: "Multi-Language", desc: "Localized UI for cosmopolitan dining rooms." },
      { icon: Bell, name: "Notifications", desc: "Real-time alerts for new orders and low stock." },
      { icon: Users, name: "Multi-Branch", desc: "Operate several outlets from a single tenant." },
    ],
  },
];

function Features() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="max-w-7xl mx-auto px-6 py-20">
        <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-primary">Features</span>
        <h1 className="font-display text-5xl md:text-6xl mt-3 mb-6 max-w-3xl">Every module, sharpened for service.</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">A complete cashier and back-office suite — assembled module by module across the 28-day build.</p>

        <div className="mt-20 space-y-20">
          {groups.map((g) => (
            <div key={g.title}>
              <h2 className="font-display text-3xl mb-8 italic text-primary">{g.title}</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {g.items.map((it) => (
                  <div key={it.name} className="bg-surface border border-border p-6 rounded-xl">
                    <it.icon className="h-5 w-5 text-primary mb-4" />
                    <h3 className="font-semibold mb-2">{it.name}</h3>
                    <p className="text-sm text-muted-foreground">{it.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
