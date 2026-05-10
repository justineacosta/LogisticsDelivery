import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { Badge } from "@/components/ui/badge";
import { db } from "@/lib/db";
import { formatDate } from "@/lib/utils";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 600;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = await db.blogPost.findUnique({ where: { slug } }).catch(() => null);
  if (!post) return buildMetadata({ title: "Not found", noIndex: true });
  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.coverImage ?? undefined,
  });
}

export async function generateStaticParams() {
  const posts = await db.blogPost
    .findMany({ where: { published: true }, select: { slug: true } })
    .catch(() => []);
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = await db.blogPost
    .findUnique({ where: { slug } })
    .catch(() => null);

  if (!post || !post.published) notFound();

  return (
    <>
      <PageHeader
        eyebrow={post.publishedAt ? formatDate(post.publishedAt) : "Draft"}
        title={post.title}
        description={post.excerpt}
      />

      <article className="container max-w-3xl py-12">
        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <span>{post.authorName}</span>
          <span>·</span>
          {post.tags.map((t) => (
            <Badge key={t} variant="soft" className="text-[10px]">
              {t}
            </Badge>
          ))}
        </div>

        <div className="prose prose-neutral mt-10 max-w-none dark:prose-invert">
          {post.content.split("\n\n").map((para, i) => (
            <p key={i} className="leading-relaxed text-foreground/90">
              {para}
            </p>
          ))}
        </div>

        <div className="mt-16 border-t border-border pt-6 text-sm">
          <Link
            href="/blog"
            className="text-brand-600 hover:underline dark:text-brand-300"
          >
            ← All posts
          </Link>
        </div>
      </article>
    </>
  );
}
