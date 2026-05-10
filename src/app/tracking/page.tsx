import { PageHeader } from "@/components/shared/page-header";
import { TrackingForm } from "@/components/forms/tracking-form";
import { CTA } from "@/components/home/cta";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Track a shipment",
  description:
    "Track any Velocita shipment in real time with milestone history, ETA confidence, and proof-of-delivery.",
  path: "/tracking",
});

export default function TrackingIndex() {
  return (
    <>
      <PageHeader
        eyebrow="Tracking"
        title={
          <>
            Real-time visibility on{" "}
            <span className="gradient-text">every mile</span>
          </>
        }
        description="Enter a tracking number to see milestones, predictive ETA, and proof of delivery. Try VEL-DEMO-1001 for a live example."
      />

      <section className="container py-16">
        <div className="mx-auto max-w-2xl">
          <TrackingForm />
        </div>

        <div className="mx-auto mt-16 grid max-w-4xl gap-6 sm:grid-cols-3">
          {[
            {
              title: "Milestone history",
              body: "Every booking, pickup, port call, customs event, and POD timestamp.",
            },
            {
              title: "Predictive ETA",
              body: "Weather, port congestion, and lane history fused into a confidence band.",
            },
            {
              title: "Webhooks",
              body: "Pipe events directly into Slack, your TMS, or your customer portal.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <h3 className="font-display text-base font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <CTA />
    </>
  );
}
