import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/seo";

export function CTA() {
  return (
    <section className="container py-20 sm:py-28">
      <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-10 sm:p-16">
        <div
          className="absolute inset-0 bg-gradient-to-br from-brand-50 via-background to-background dark:from-brand-950/40"
          aria-hidden
        />
        <div
          className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-brand-500/15 blur-3xl"
          aria-hidden
        />
        <div className="relative grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="text-balance font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">
              Ready to simplify your{" "}
              <span className="gradient-text">supply chain?</span>
            </h2>
            <p className="mt-4 max-w-md text-pretty text-muted-foreground">
              Tell us your origin, destination, and cadence. We'll send a
              quote, a network plan, and a named ops lead within two business
              hours.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" variant="glow">
                <Link href="/pricing">
                  Request a quote
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href={`tel:${siteConfig.contact.phone}`}>
                  <Phone className="h-4 w-4" />
                  {siteConfig.contact.phone}
                </a>
              </Button>
            </div>
          </div>
          <div className="relative hidden md:block">
            <ul className="space-y-3">
              {[
                "Quote in under 2 business hours",
                "Dedicated solutions engineer",
                "Pilot lane within 14 days",
                "No long-term contract required",
              ].map((line) => (
                <li
                  key={line}
                  className="flex items-center gap-3 rounded-2xl border border-border bg-background/60 p-4 backdrop-blur-sm"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-300">
                    ✓
                  </span>
                  <span className="text-sm font-medium">{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
