import { Link } from "@tanstack/react-router";
import { UtensilsCrossed } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <UtensilsCrossed className="h-5 w-5 text-primary" />
          <span className="font-display italic text-2xl font-bold tracking-tight text-primary">
            Mise en Place
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link to="/features" activeProps={{ className: "text-primary" }} className="hover:text-primary transition-colors">Features</Link>
          <Link to="/pricing" activeProps={{ className: "text-primary" }} className="hover:text-primary transition-colors">Pricing</Link>
          <Link to="/contact" activeProps={{ className: "text-primary" }} className="hover:text-primary transition-colors">Contact</Link>
          <Link
            to="/dashboard"
            className="bg-foreground text-background px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-primary transition-all"
          >
            Open Dashboard
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="py-12 px-6 border-t border-border bg-surface">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <UtensilsCrossed className="h-4 w-4 text-primary" />
          <span className="font-display italic text-xl font-bold tracking-tight text-primary">
            Mise en Place
          </span>
        </div>
        <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
          © 2026 Mise en Place Systems · Built with Laravel
        </p>
        <div className="flex gap-6 text-xs font-medium">
          <Link to="/features" className="hover:text-primary">Features</Link>
          <Link to="/pricing" className="hover:text-primary">Pricing</Link>
          <Link to="/contact" className="hover:text-primary">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
