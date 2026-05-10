import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { TrackingForm } from "@/components/forms/tracking-form";
import { ShipmentTimeline } from "@/components/tracking/shipment-timeline";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { buildMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

type PageProps = { params: Promise<{ number: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { number } = await params;
  return buildMetadata({
    title: `Tracking ${number.toUpperCase()}`,
    description: `Live shipment status and milestone history for ${number}.`,
    path: `/tracking/${number}`,
    noIndex: true,
  });
}

const STATUS_VARIANT: Record<
  string,
  "soft" | "success" | "warn" | "destructive"
> = {
  BOOKED: "soft",
  PICKED_UP: "soft",
  IN_TRANSIT: "soft",
  CUSTOMS: "warn",
  OUT_FOR_DELIVERY: "soft",
  DELIVERED: "success",
  EXCEPTION: "destructive",
  CANCELLED: "destructive",
};

export default async function TrackingDetail({ params }: PageProps) {
  const { number } = await params;
  if (!/^[A-Za-z0-9-]+$/.test(number)) notFound();

  const shipment = await db.shipment.findUnique({
    where: { trackingNumber: number.toUpperCase() },
    include: { events: { orderBy: { occurredAt: "desc" } } },
  });

  if (!shipment) {
    return (
      <>
        <PageHeader
          eyebrow="Tracking"
          title={
            <>
              We couldn't find{" "}
              <span className="gradient-text">{number.toUpperCase()}</span>
            </>
          }
          description="Double-check the tracking number — Velocita IDs look like VEL-XXXX-NNNN. If you just booked, allow up to 5 minutes for the system to publish your shipment."
        />
        <section className="container py-12">
          <div className="mx-auto max-w-2xl">
            <TrackingForm />
          </div>
          <p className="mt-8 text-center text-sm text-muted-foreground">
            Try the demo:{" "}
            <Link
              href="/tracking/VEL-DEMO-1001"
              className="font-medium text-brand-600 hover:underline dark:text-brand-300"
            >
              VEL-DEMO-1001
            </Link>
          </p>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHeader
        eyebrow={`Tracking #${shipment.trackingNumber}`}
        title={
          <>
            {shipment.originCity} →{" "}
            <span className="gradient-text">{shipment.destCity}</span>
          </>
        }
        description={`${shipment.serviceType.replaceAll("_", " ").toLowerCase()} · ${
          shipment.weightKg.toLocaleString()
        } kg · ${shipment.pieces} pieces`}
      />

      <section className="container py-12">
        <div className="grid gap-8 lg:grid-cols-12">
          <aside className="lg:col-span-4 space-y-4">
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Status
                </span>
                <Badge variant={STATUS_VARIANT[shipment.status] ?? "soft"}>
                  {shipment.status.replaceAll("_", " ")}
                </Badge>
              </div>
              <dl className="mt-5 space-y-4 text-sm">
                <Row
                  label="Origin"
                  value={`${shipment.originCity}, ${shipment.originCountry}`}
                />
                <Row
                  label="Destination"
                  value={`${shipment.destCity}, ${shipment.destCountry}`}
                />
                <Row
                  label="Booked"
                  value={formatDate(shipment.bookedAt)}
                />
                {shipment.estimatedArrival && (
                  <Row
                    label="ETA"
                    value={formatDate(shipment.estimatedArrival)}
                  />
                )}
                {shipment.deliveredAt && (
                  <Row
                    label="Delivered"
                    value={formatDate(shipment.deliveredAt)}
                  />
                )}
                {shipment.carrier && (
                  <Row label="Carrier" value={shipment.carrier} />
                )}
              </dl>
            </div>

            <Button asChild variant="outline" className="w-full">
              <Link href="/tracking">Track another</Link>
            </Button>
          </aside>

          <div className="lg:col-span-8">
            <h2 className="font-display text-xl font-semibold">
              Milestone history
            </h2>
            <div className="mt-6">
              <ShipmentTimeline events={shipment.events} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3 border-b border-border/60 pb-3 last:border-0 last:pb-0">
      <dt className="text-xs uppercase tracking-wide text-muted-foreground">
        {label}
      </dt>
      <dd className="text-right font-medium">{value}</dd>
    </div>
  );
}
