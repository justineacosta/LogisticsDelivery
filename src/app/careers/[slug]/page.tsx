import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { careers } from "@/content/site-data";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return careers.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const job = careers.find((c) => c.slug === slug);
  if (!job) return buildMetadata({ title: "Role not found", noIndex: true });
  return buildMetadata({
    title: `${job.title} · ${job.location}`,
    description: `Join Velocita as ${job.title} (${job.department}, ${job.location}).`,
    path: `/careers/${slug}`,
  });
}

export default async function JobPage({ params }: Props) {
  const { slug } = await params;
  const job = careers.find((c) => c.slug === slug);
  if (!job) notFound();

  return (
    <>
      <PageHeader
        eyebrow={job.department}
        title={job.title}
        description={`${job.type} · ${job.location}`}
      />

      <article className="container max-w-3xl space-y-6 py-12 leading-relaxed">
        <div className="flex flex-wrap gap-2">
          <Badge variant="soft">{job.department}</Badge>
          <Badge variant="outline">{job.location}</Badge>
          <Badge variant="outline">{job.type}</Badge>
        </div>

        <p className="text-foreground/90">
          You'll join a small, senior team building the systems that move
          millions of shipments a year. We hire for judgment, ownership, and the
          ability to ship — not for credentials.
        </p>

        <h2 className="font-display text-xl font-semibold">What you'll do</h2>
        <ul className="ml-5 list-disc space-y-1.5 text-foreground/90">
          <li>Own a domain end-to-end with a small, focused team.</li>
          <li>Ship to production weekly, ideally daily.</li>
          <li>Work directly with operations, not through a layer of PMs.</li>
          <li>Define what good looks like, then raise the bar.</li>
        </ul>

        <h2 className="font-display text-xl font-semibold">What we look for</h2>
        <ul className="ml-5 list-disc space-y-1.5 text-foreground/90">
          <li>5+ years of relevant experience, or a portfolio that proves it.</li>
          <li>A bias toward action and a low ego about being wrong.</li>
          <li>Excellent written communication.</li>
        </ul>

        <div className="pt-4">
          <Button asChild size="lg" variant="glow">
            <Link href={`/contact?subject=Application: ${encodeURIComponent(job.title)}`}>
              Apply now
            </Link>
          </Button>
        </div>

        <p className="pt-6">
          <Link
            href="/careers"
            className="text-brand-600 hover:underline dark:text-brand-300"
          >
            ← All open roles
          </Link>
        </p>
      </article>
    </>
  );
}
