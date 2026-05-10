import { PageHeader } from "@/components/shared/page-header";
import { CTA } from "@/components/home/cta";
import { Quote, Star } from "lucide-react";
import { testimonials } from "@/content/site-data";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Customer testimonials",
  description:
    "Stories from supply chain teams who depend on Velocita's network for daily operations.",
  path: "/testimonials",
});

export default function TestimonialsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Customers"
        title={
          <>
            What our partners <span className="gradient-text">actually say</span>
          </>
        }
        description="Verified quotes from operators who've been on the Velocita network for at least 12 months."
      />

      <section className="container py-16">
        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.map((t) => (
            <figure
              key={t.author}
              className="relative rounded-3xl border border-border bg-card p-8"
            >
              <Quote
                className="absolute right-6 top-6 h-8 w-8 text-brand-500/20"
                aria-hidden
              />
              <div className="flex gap-0.5 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-4 text-pretty font-display text-lg font-medium leading-snug">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-sm font-bold text-white">
                  {t.author
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <div className="text-sm font-medium">{t.author}</div>
                  <div className="text-xs text-muted-foreground">{t.title}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <CTA />
    </>
  );
}
