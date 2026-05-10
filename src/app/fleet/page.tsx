import { PageHeader } from "@/components/shared/page-header";
import { CTA } from "@/components/home/cta";
import { Card } from "@/components/ui/card";
import { Truck, Snowflake, Plane, Ship, Zap } from "lucide-react";
import { fleet } from "@/content/site-data";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Fleet overview",
  description:
    "Our owned and partner fleet — long-haul tractors, reefers, charter aircraft, container vessel slot space, and last-mile EVs.",
  path: "/fleet",
});

const icons = [Truck, Snowflake, Plane, Ship, Zap];

export default function FleetPage() {
  return (
    <>
      <PageHeader
        eyebrow="Fleet"
        title={
          <>
            Capacity, owned and{" "}
            <span className="gradient-text">orchestrated</span>
          </>
        }
        description="A blended owned + partner fleet means we can flex with your demand — without exposing you to a single point of failure."
      />

      <section className="container py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {fleet.map((f, i) => {
            const Icon = icons[i % icons.length];
            return (
              <Card
                key={f.name}
                className="group relative overflow-hidden p-6 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-500/10"
              >
                <div
                  className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-brand-500/10 opacity-0 blur-2xl transition-opacity group-hover:opacity-100"
                  aria-hidden
                />
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-950/50 dark:text-brand-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="font-display text-3xl font-bold tabular-nums">
                    {f.count.toLocaleString()}
                  </div>
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold">
                  {f.name}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {f.description}
                </p>
              </Card>
            );
          })}
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-border bg-card p-8">
            <h3 className="font-display text-xl font-semibold">
              Telematics & ELD
            </h3>
            <p className="mt-3 text-muted-foreground">
              Every long-haul asset broadcasts position, engine health, and
              hours-of-service every 60 seconds. Your dispatch team gets the
              same view ours does.
            </p>
          </div>
          <div className="rounded-3xl border border-border bg-card p-8">
            <h3 className="font-display text-xl font-semibold">
              Sustainability
            </h3>
            <p className="mt-3 text-muted-foreground">
              412 last-mile EVs in service, SAF-blended air on key US/EU lanes,
              and biofuel ocean lanes between Rotterdam and Long Beach.
            </p>
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
