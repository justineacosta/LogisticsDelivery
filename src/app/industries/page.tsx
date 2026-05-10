import { PageHeader } from "@/components/shared/page-header";
import { CTA } from "@/components/home/cta";
import { industries } from "@/content/site-data";
import { buildMetadata } from "@/lib/seo";
import {
  ShoppingCart,
  Pill,
  Car,
  Factory,
  Plane,
  Leaf,
  type LucideIcon,
} from "lucide-react";

export const metadata = buildMetadata({
  title: "Industries served",
  description:
    "Pharma, automotive, e-commerce, aerospace, energy, and food — Velocita's playbook is tailored to the constraints of each.",
  path: "/industries",
});

const ICONS: Record<string, LucideIcon> = {
  "shopping-cart": ShoppingCart,
  pill: Pill,
  car: Car,
  factory: Factory,
  plane: Plane,
  leaf: Leaf,
};

export default function IndustriesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Industries"
        title={
          <>
            Built for the{" "}
            <span className="gradient-text">specifics of your sector</span>
          </>
        }
        description="Generic 3PLs treat every shipment the same. We don't. Each of these verticals has its own playbook — compliance, packaging, transit windows, exception triggers."
      />

      <section className="container py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((ind) => {
            const Icon = ICONS[ind.icon] ?? Factory;
            return (
              <div
                key={ind.name}
                className="group rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-brand-500/50 hover:shadow-xl hover:shadow-brand-500/5"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-50 to-brand-100 text-brand-600 dark:from-brand-950/50 dark:to-brand-900/50 dark:text-brand-300">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold">
                  {ind.name}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {ind.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <CTA />
    </>
  );
}
