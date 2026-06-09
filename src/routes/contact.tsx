import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Mise en Place" },
      { name: "description", content: "Get in touch with the Mise en Place team." },
      { property: "og:title", content: "Contact — Mise en Place" },
      { property: "og:description", content: "Talk to a hospitality systems specialist." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-16">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-primary">Contact</span>
          <h1 className="font-display text-5xl mt-3 mb-6">Let's set the table.</h1>
          <p className="text-muted-foreground mb-10">Tell us about your restaurant. We'll respond within one business day.</p>

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-sm">
              <div className="h-10 w-10 rounded-full bg-accent grid place-items-center"><Mail className="h-4 w-4 text-primary" /></div>
              hello@miseenplace.app
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="h-10 w-10 rounded-full bg-accent grid place-items-center"><Phone className="h-4 w-4 text-primary" /></div>
              +1 (415) 555-0188
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="h-10 w-10 rounded-full bg-accent grid place-items-center"><MapPin className="h-4 w-4 text-primary" /></div>
              222 Mercer St · New York, NY
            </div>
          </div>
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); setSent(true); }}
          className="bg-surface border border-border rounded-2xl p-8 space-y-4"
        >
          {sent ? (
            <div className="text-center py-12">
              <h3 className="font-display text-3xl italic text-primary mb-2">Merci.</h3>
              <p className="text-muted-foreground">Your message is in. We'll be in touch shortly.</p>
            </div>
          ) : (
            <>
              <div>
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Name</label>
                <input required className="mt-1 w-full bg-background border border-border rounded-lg px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Restaurant</label>
                <input required className="mt-1 w-full bg-background border border-border rounded-lg px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Email</label>
                <input type="email" required className="mt-1 w-full bg-background border border-border rounded-lg px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Message</label>
                <textarea rows={5} required className="mt-1 w-full bg-background border border-border rounded-lg px-3 py-2 text-sm" />
              </div>
              <button className="w-full bg-primary text-primary-foreground py-3 rounded-lg text-sm font-semibold">Send message</button>
            </>
          )}
        </form>
      </section>
      <SiteFooter />
    </div>
  );
}
