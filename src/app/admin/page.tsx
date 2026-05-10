import { db } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, MessageSquare, Package, Mail } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminOverview() {
  const [quotes, messages, shipments, subs] = await Promise.all([
    db.quoteRequest.count(),
    db.contactMessage.count(),
    db.shipment.count(),
    db.newsletterSubscriber.count(),
  ]);

  const cards = [
    { label: "Quote requests", value: quotes, icon: FileText },
    { label: "Contact messages", value: messages, icon: MessageSquare },
    { label: "Shipments", value: shipments, icon: Package },
    { label: "Newsletter subscribers", value: subs, icon: Mail },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold">Operations overview</h1>
        <p className="mt-1 text-muted-foreground">
          Live counts across the marketing pipeline.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <Card key={c.label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {c.label}
              </CardTitle>
              <c.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="font-display text-3xl font-bold tabular-nums">
                {c.value.toLocaleString()}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
