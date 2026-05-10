import { Hero } from "@/components/home/hero";
import { Partners } from "@/components/home/partners";
import { Features } from "@/components/home/features";
import { ServicesGrid } from "@/components/home/services-grid";
import { Stats } from "@/components/home/stats";
import { CoverageMap } from "@/components/home/coverage-map";
import { Testimonials } from "@/components/home/testimonials";
import { CTA } from "@/components/home/cta";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Smarter freight for a faster world",
  description:
    "Velocita moves 4.2M shipments a year through 92 countries — by road, air, ocean, and rail — with predictive routing, bonded warehousing, and real-time visibility.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <Partners />
      <Features />
      <ServicesGrid />
      <Stats />
      <CoverageMap />
      <Testimonials />
      <CTA />
    </>
  );
}
