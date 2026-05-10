import { PageHeader } from "@/components/shared/page-header";
import { QuoteForm } from "@/components/forms/quote-form";
import { buildMetadata } from "@/lib/seo";
import { Check } from "lucide-react";

export const metadata = buildMetadata({
  title: "Pricing & quotes",
  description:
    "Get a freight quote in under 2 business hours. No long-term contract, no implementation fee — just rates that hold up against your benchmarks.",
  path: "/pricing",
});

const tiers = [
  {
    name: "Lane",
    price: "Per-shipment",
    description:
      "Pay-as-you-go for occasional spot moves. Same network, no commitment.",
    features: [
      "Live tracking & POD",
      "Standard SLA",
      "Email support",
      "Cargo insurance optional",
    ],
  },
  {
    name: "Network",
    price: "Volume-tiered",
    description:
      "Best for growing teams shipping monthly. Lane-level rate cards with quarterly reviews.",
    features: [
      "Everything in Lane",
      "Named ops lead",
      "API & webhooks",
      "Priority customs queue",
      "Quarterly business reviews",
    ],
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description:
      "Multi-region programs with dedicated capacity, EDI, and bonded warehousing.",
    features: [
      "Everything in Network",
      "Dedicated capacity",
      "EDI 856/214/204",
      "On-site implementation",
      "24/7 control tower",
    ],
  },
];

export default function PricingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Pricing"
        title={
          <>
            Quotes that <span className="gradient-text">hold up</span>
          </>
        }
        description="No surprise accessorial charges, no annual minimums, no implementation fee. Tell us your lane and we'll send a tight, defensible quote in under two business hours."
      />

      <section className="container py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`relative flex flex-col rounded-3xl border p-7 ${
                t.featured
                  ? "border-brand-500 bg-card shadow-xl shadow-brand-500/10"
                  : "border-border bg-card/60"
              }`}
            >
              {t.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-brand-500 to-brand-700 px-3 py-1 text-xs font-medium text-white shadow">
                  Most popular
                </span>
              )}
              <h3 className="font-display text-xl font-semibold">{t.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {t.description}
              </p>
              <p className="mt-6 font-display text-3xl font-bold">{t.price}</p>
              <ul className="mt-6 space-y-3">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="container py-12">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="font-display text-3xl font-bold">
              Request a freight quote
            </h2>
            <p className="mt-3 text-muted-foreground">
              Fill in your shipment details. A solutions engineer will respond
              with a quote and a network plan within two business hours.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              {[
                "Your data is encrypted in transit and at rest.",
                "We don't share or sell your information.",
                "No spam — one reply, then it's your move.",
              ].map((line) => (
                <li
                  key={line}
                  className="flex items-start gap-2 text-muted-foreground"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                  {line}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-border bg-card p-6 sm:p-8">
              <QuoteForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
