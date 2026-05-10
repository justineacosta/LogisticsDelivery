import { db } from "@/lib/db";
import { Badge } from "@/components/ui/badge";
import { formatDateTime } from "@/lib/utils";

export const dynamic = "force-dynamic";

const STATUS_VARIANT: Record<
  string,
  "soft" | "success" | "warn" | "destructive" | "outline"
> = {
  NEW: "soft",
  REVIEWING: "warn",
  QUOTED: "success",
  ACCEPTED: "success",
  REJECTED: "destructive",
  EXPIRED: "outline",
};

export default async function AdminQuotes() {
  const quotes = await db.quoteRequest.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold">Quote requests</h1>
        <p className="mt-1 text-muted-foreground">
          {quotes.length} most recent submissions.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-left text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Created</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Lane</th>
              <th className="px-4 py-3">Service</th>
              <th className="px-4 py-3">Weight</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {quotes.map((q) => (
              <tr key={q.id} className="hover:bg-accent/30">
                <td className="px-4 py-3 text-muted-foreground">
                  {formatDateTime(q.createdAt)}
                </td>
                <td className="px-4 py-3">
                  <div className="font-medium">{q.fullName}</div>
                  <div className="text-xs text-muted-foreground">{q.email}</div>
                </td>
                <td className="px-4 py-3">
                  {q.originCity}, {q.originCountry} → {q.destCity}, {q.destCountry}
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {q.serviceType.replaceAll("_", " ")}
                </td>
                <td className="px-4 py-3 tabular-nums">
                  {q.weightKg.toLocaleString()} kg
                </td>
                <td className="px-4 py-3">
                  <Badge variant={STATUS_VARIANT[q.status] ?? "outline"}>
                    {q.status}
                  </Badge>
                </td>
              </tr>
            ))}
            {quotes.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-12 text-center text-muted-foreground"
                >
                  No quote requests yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
