import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { CTA } from "@/components/home/cta";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { services } from "@/content/services";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Services",
  description:
    "Road, air, ocean, rail, warehousing, last-mile, and customs — all orchestrated through one ops team and one API.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title={
          <>
            Every mode. <span className="gradient-text">One partner.</span>
          </>
        }
        description="Velocita is built around a control tower that moves freight across road, air, ocean, rail, warehousing, last-mile, and customs — without forcing you to manage seven vendors."
      />

      <section className="container space-y-20 py-20">
        {services.map((s, i) => (
          <article
            key={s.slug}
            id={s.slug}
            className="grid gap-10 scroll-mt-24 lg:grid-cols-12 lg:items-center"
          >
            <div
              className={`lg:col-span-7 ${i % 2 === 1 ? "lg:order-2" : ""}`}
            >
              <Badge variant="soft" className="mb-3">
                {s.short}
              </Badge>
              <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
                {s.title}
              </h2>
              <p className="mt-4 text-pretty text-muted-foreground leading-relaxed">
                {s.description}
              </p>
              <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-2">
                {s.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 text-sm"
                  >
                    <span className="h-2 w-2 rounded-full bg-brand-500" />
                    {h}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex gap-3">
                <Button asChild variant="glow">
                  <Link href={`/pricing?service=${s.slug}`}>Get a quote</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/contact">Talk to us</Link>
                </Button>
              </div>
            </div>
            <div
              className={`lg:col-span-5 ${i % 2 === 1 ? "lg:order-1" : ""}`}
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-brand-500/10 via-card to-card p-8">
                <div className="bg-grid absolute inset-0 opacity-[0.06]" />
                <div className="relative flex h-full flex-col items-center justify-center text-brand-600 dark:text-brand-300">
                  <s.icon className="h-32 w-32" strokeWidth={1.2} />
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>

      <CTA />
    </>
  );
}
