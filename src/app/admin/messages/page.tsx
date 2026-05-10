import { db } from "@/lib/db";
import { formatDateTime } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminMessages() {
  const messages = await db.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold">Inbound messages</h1>
        <p className="mt-1 text-muted-foreground">
          {messages.length} most recent submissions.
        </p>
      </div>

      <div className="space-y-3">
        {messages.map((m) => (
          <article
            key={m.id}
            className="rounded-2xl border border-border bg-card p-5"
          >
            <header className="flex flex-wrap items-baseline justify-between gap-2">
              <div>
                <span className="font-medium">{m.name}</span>
                <span className="ml-2 text-sm text-muted-foreground">
                  &lt;{m.email}&gt;
                </span>
                {m.company && (
                  <span className="ml-2 text-sm text-muted-foreground">
                    · {m.company}
                  </span>
                )}
              </div>
              <time className="text-xs text-muted-foreground">
                {formatDateTime(m.createdAt)}
              </time>
            </header>
            {m.subject && (
              <p className="mt-2 text-sm font-medium">{m.subject}</p>
            )}
            <p className="mt-2 text-sm leading-relaxed text-foreground/90">
              {m.message}
            </p>
          </article>
        ))}
        {messages.length === 0 && (
          <div className="rounded-2xl border border-border bg-card p-10 text-center text-muted-foreground">
            No messages yet.
          </div>
        )}
      </div>
    </div>
  );
}
