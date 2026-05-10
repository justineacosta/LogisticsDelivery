import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { Badge } from "@/components/ui/badge";
import { db } from "@/lib/db";
import { formatDate } from "@/lib/utils";
import { buildMetadata } from "@/lib/seo";
import { ArrowRight } from "lucide-react";

export const revalidate = 600;

export const metadata = buildMetadata({
  title: "Blog & insights",
  description:
    "Trade lane reports, capacity briefings, and supply chain notes from the Velocita team.",
  path: "/blog",
});

export default async function BlogIndex() {
  const posts = await db.blogPost
    .findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
      take: 24,
    })
    .catch(() => []);

  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title={
          <>
            Logistics, <span className="gradient-text">written by people who ship</span>
          </>
        }
        description="Trade lane updates, capacity reports, and notes from the operations floor."
      />

      <section className="container py-16">
        {posts.length === 0 ? (
          <div className="mx-auto max-w-md rounded-3xl border border-border bg-card p-10 text-center">
            <h2 className="font-display text-xl font-semibold">
              First post coming soon
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Run <code className="rounded bg-muted px-1.5 py-0.5">pnpm db:seed</code>{" "}
              to populate sample content.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-500/5"
              >
                <div className="flex flex-wrap gap-1.5">
                  {post.tags.slice(0, 3).map((t) => (
                    <Badge key={t} variant="soft" className="text-[10px]">
                      {t}
                    </Badge>
                  ))}
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold leading-snug">
                  {post.title}
                </h3>
                <p className="mt-2 line-clamp-3 text-sm text-muted-foreground leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="mt-auto pt-6 flex items-center justify-between text-xs text-muted-foreground">
                  <span>
                    {post.authorName} ·{" "}
                    {post.publishedAt
                      ? formatDate(post.publishedAt)
                      : formatDate(post.createdAt)}
                  </span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
