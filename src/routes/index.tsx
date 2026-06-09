import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { ArrowRight, ChefHat, Receipt, BarChart3, Users, Boxes, Bell } from "lucide-react";
import heroImage from "@/assets/hero-restaurant.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mise en Place — Restaurant Cashier Management" },
      { name: "description", content: "A Laravel-powered cashier and operations platform for modern restaurants. Orders, tables, payments and analytics in one place." },
      { property: "og:title", content: "Mise en Place — Restaurant Cashier Management" },
      { property: "og:description", content: "The cashier system for restaurants that value precision as much as hospitality." },
    ],
  }),
  component: Home,
});

const features = [
  { icon: Receipt, title: "Live Orders", desc: "Cashiers and waiters move tickets through the kitchen in real time." },
  { icon: ChefHat, title: "Menu & Categories", desc: "Curate dishes, modifiers, prices and stock with role-based control." },
  { icon: BarChart3, title: "Reports & Analytics", desc: "Daily revenue, top items and shift performance, exportable on demand." },
  { icon: Users, title: "Roles & Permissions", desc: "Admin, cashier and waiter accounts gated by Laravel middleware." },
  { icon: Boxes, title: "Suppliers & Stock", desc: "Track purchases, suppliers and inventory levels across branches." },
  { icon: Bell, title: "Notifications", desc: "Alerts for new orders, low stock and end-of-shift reconciliation." },
];

function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-24 text-center">
        <span className="inline-block text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground mb-6">
          Built on Laravel · For Modern Restaurants
        </span>
        <h1 className="font-display text-6xl md:text-7xl leading-[0.95] text-balance mb-8">
          The art of service,<br />
          <span className="text-primary italic">digitally plated.</span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-muted-foreground text-pretty mb-10">
          A high-performance cashier system for restaurants that value precision
          as much as hospitality. Tables, orders, payments and analytics — all in one elegant interface.
        </p>
        <div className="flex gap-3 justify-center mb-16">
          <Link to="/dashboard" className="bg-primary text-primary-foreground px-6 py-3 rounded-lg text-sm font-semibold inline-flex items-center gap-2 hover:opacity-90">
            Launch Dashboard <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/features" className="border border-border bg-surface px-6 py-3 rounded-lg text-sm font-semibold hover:bg-accent">
            Explore Features
          </Link>
        </div>

        <div className="max-w-5xl mx-auto aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/5">
          <img src={heroImage} alt="Restaurant interior with dashboard tablet" width={1600} height={1000} className="w-full h-full object-cover" />
        </div>
      </section>

      {/* Features */}
      <section className="bg-surface border-y border-border py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-16">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-primary">Capabilities</span>
            <h2 className="font-display text-4xl md:text-5xl mt-3 mb-4">Everything a service needs, nothing it doesn't.</h2>
            <p className="text-muted-foreground">Twenty-eight days of an internship distilled into a production-ready platform.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-xl overflow-hidden">
            {features.map((f) => (
              <div key={f.title} className="bg-surface p-8 hover:bg-accent/40 transition-colors">
                <f.icon className="h-6 w-6 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { v: "28", l: "Days Engineered" },
            { v: "12+", l: "Core Modules" },
            { v: "<200ms", l: "Order Latency" },
            { v: "99.9%", l: "Uptime Target" },
          ].map((s) => (
            <div key={s.l}>
              <div className="font-display text-5xl text-primary">{s.v}</div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mt-2">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-24">
        <div className="max-w-5xl mx-auto bg-foreground text-background rounded-3xl p-12 md:p-16 text-center">
          <h2 className="font-display text-4xl md:text-5xl italic mb-4">Ready for service?</h2>
          <p className="text-background/70 mb-8 max-w-lg mx-auto">Walk through the full dashboard — orders, tables, payments and reports — no signup required.</p>
          <Link to="/dashboard" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90">
            Open the Dashboard <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
