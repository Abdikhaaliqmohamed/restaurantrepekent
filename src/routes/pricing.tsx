import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { Check } from "lucide-react";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — Mise en Place" },
      { name: "description", content: "Simple per-outlet pricing for restaurants of every size." },
      { property: "og:title", content: "Pricing — Mise en Place" },
      { property: "og:description", content: "Plans for cafés, bistros and multi-branch groups." },
    ],
  }),
  component: Pricing,
});

const tiers = [
  { name: "Bistro", price: "$29", period: "/ outlet / mo", desc: "For single-location cafés and bistros.", features: ["Up to 5 staff accounts", "Orders, menu, tables", "Daily sales reports", "Email support"], cta: "Start trial", featured: false },
  { name: "Brasserie", price: "$79", period: "/ outlet / mo", desc: "Full operations for busy restaurants.", features: ["Unlimited staff accounts", "Suppliers & inventory", "PDF receipts & invoices", "Real-time notifications", "Priority support"], cta: "Most popular", featured: true },
  { name: "Group", price: "Custom", period: "", desc: "Multi-branch chains and franchises.", features: ["Multi-branch console", "Centralized reports", "SSO & audit logs", "Dedicated success manager"], cta: "Talk to sales", featured: false },
];

function Pricing() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-primary">Pricing</span>
          <h1 className="font-display text-5xl md:text-6xl mt-3 mb-4">Simple, per outlet.</h1>
          <p className="text-muted-foreground">No hidden fees. Cancel any time. 14-day trial on every paid plan.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-16">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`rounded-2xl p-8 border ${t.featured ? "bg-foreground text-background border-foreground" : "bg-surface border-border"}`}
            >
              <h2 className="font-display text-2xl italic mb-2">{t.name}</h2>
              <p className={`text-sm mb-6 ${t.featured ? "text-background/70" : "text-muted-foreground"}`}>{t.desc}</p>
              <div className="mb-6">
                <span className="font-display text-5xl">{t.price}</span>
                <span className={`text-sm ${t.featured ? "text-background/70" : "text-muted-foreground"}`}>{t.period}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check className={`h-4 w-4 mt-0.5 shrink-0 ${t.featured ? "text-primary" : "text-primary"}`} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/contact"
                className={`block text-center py-3 rounded-lg text-sm font-semibold ${t.featured ? "bg-primary text-primary-foreground" : "bg-foreground text-background"}`}
              >
                {t.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
