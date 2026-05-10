import { cn, formatDateTime } from "@/lib/utils";
import {
  PackageCheck,
  Truck,
  Ship,
  AlertTriangle,
  Check,
  Box,
  FileCheck,
  Bike,
} from "lucide-react";

type Event = {
  status: string;
  location: string;
  description: string;
  occurredAt: Date | string;
};

const STATUS_ICON: Record<string, React.ComponentType<{ className?: string }>> = {
  BOOKED: Box,
  PICKED_UP: Truck,
  IN_TRANSIT: Ship,
  CUSTOMS: FileCheck,
  OUT_FOR_DELIVERY: Bike,
  DELIVERED: PackageCheck,
  EXCEPTION: AlertTriangle,
  CANCELLED: AlertTriangle,
};

const STATUS_LABEL: Record<string, string> = {
  BOOKED: "Booking confirmed",
  PICKED_UP: "Picked up",
  IN_TRANSIT: "In transit",
  CUSTOMS: "Customs clearance",
  OUT_FOR_DELIVERY: "Out for delivery",
  DELIVERED: "Delivered",
  EXCEPTION: "Exception",
  CANCELLED: "Cancelled",
};

export function ShipmentTimeline({ events }: { events: Event[] }) {
  if (events.length === 0) {
    return <p className="text-sm text-muted-foreground">No events yet.</p>;
  }

  return (
    <ol className="space-y-6 border-l-2 border-border pl-8">
      {events.map((e, i) => {
        const Icon = STATUS_ICON[e.status] ?? Check;
        const latest = i === 0;
        return (
          <li key={i} className="relative">
            <span
              className={cn(
                "absolute -left-[37px] top-1 flex h-8 w-8 items-center justify-center rounded-full border-2 bg-background",
                latest
                  ? "border-brand-500 text-brand-600 dark:text-brand-300"
                  : "border-border text-muted-foreground",
              )}
            >
              <Icon className="h-4 w-4" />
            </span>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <span
                className={cn(
                  "font-display text-base font-semibold",
                  latest ? "text-foreground" : "text-foreground/80",
                )}
              >
                {STATUS_LABEL[e.status] ?? e.status}
              </span>
              <time
                dateTime={new Date(e.occurredAt).toISOString()}
                className="text-xs text-muted-foreground"
              >
                {formatDateTime(e.occurredAt)}
              </time>
            </div>
            <p className="text-sm text-muted-foreground">{e.location}</p>
            <p className="mt-1 text-sm">{e.description}</p>
          </li>
        );
      })}
    </ol>
  );
}
