import Link from "next/link";
import { db } from "@/lib/db";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

const STATUS_VARIANT: Record<
  string,
  "soft" | "success" | "warn" | "destructive" | "outline"
> = {
  BOOKED: "outline",
  PICKED_UP: "soft",
  IN_TRANSIT: "soft",
  CUSTOMS: "warn",
  OUT_FOR_DELIVERY: "soft",
  DELIVERED: "success",
  EXCEPTION: "destructive",
  CANCELLED: "destructive",
};

export default async function AdminShipments() {
  const shipments = await db.shipment.findMany({
    orderBy: { bookedAt: "desc" },
    take: 100,
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold">Shipments</h1>
        <p className="mt-1 text-muted-foreground">
          {shipments.length} most recent.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-left text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Tracking #</th>
              <th className="px-4 py-3">Service</th>
              <th className="px-4 py-3">Lane</th>
              <th className="px-4 py-3">Booked</th>
              <th className="px-4 py-3">ETA</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {shipments.map((s) => (
              <tr key={s.id} className="hover:bg-accent/30">
                <td className="px-4 py-3 font-mono text-xs">
                  <Link
                    href={`/tracking/${s.trackingNumber}`}
                    className="text-brand-600 hover:underline dark:text-brand-300"
                  >
                    {s.trackingNumber}
                  </Link>
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {s.serviceType.replaceAll("_", " ")}
                </td>
                <td className="px-4 py-3">
                  {s.originCity} → {s.destCity}
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {formatDate(s.bookedAt)}
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {s.estimatedArrival ? formatDate(s.estimatedArrival) : "—"}
                </td>
                <td className="px-4 py-3">
                  <Badge variant={STATUS_VARIANT[s.status] ?? "outline"}>
                    {s.status.replaceAll("_", " ")}
                  </Badge>
                </td>
              </tr>
            ))}
            {shipments.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-12 text-center text-muted-foreground"
                >
                  No shipments yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
