import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Briefcase } from "lucide-react";
import { careers } from "@/content/site-data";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Careers",
  description:
    "Join the team building the most operator-friendly logistics platform in the world.",
  path: "/careers",
});

const benefits = [
  "Equity for everyone",
  "Health, dental, vision (100% covered)",
  "Remote-first with hubs in 6 cities",
  "Annual learning budget",
  "Two paid sabbaticals",
  "Parental leave (16+ weeks)",
];

export default function CareersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Careers"
        title={
          <>
            Help us move the world{" "}
            <span className="gradient-text">faster</span>
          </>
        }
        description="We're an operator-led team obsessed with making logistics work the way it should — for shippers, carriers, and the planet."
      />

      <section className="container py-16">
        <div className="rounded-3xl border border-border bg-card p-8 sm:p-10">
          <h2 className="font-display text-2xl font-bold">Why Velocita</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {benefits.map((b) => (
              <li
                key={b}
                className="flex items-center gap-3 rounded-xl border border-border/60 bg-background/60 px-4 py-3 text-sm"
              >
                <span className="h-2 w-2 rounded-full bg-brand-500" />
                {b}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container pb-20">
        <h2 className="font-display text-2xl font-bold">Open roles</h2>
        <div className="mt-6 divide-y divide-border rounded-3xl border border-border">
          {careers.map((job) => (
            <Link
              key={job.slug}
              href={`/careers/${job.slug}`}
              className="group flex flex-col gap-3 p-6 transition-colors hover:bg-accent/50 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <h3 className="font-display text-lg font-semibold">
                  {job.title}
                </h3>
                <div className="mt-1 flex flex-wrap gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Briefcase className="h-3.5 w-3.5" />
                    {job.department}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5" />
                    {job.location}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="outline">{job.type}</Badge>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-sm text-muted-foreground">
            Don't see your role? We're always interested in exceptional people.
          </p>
          <Button asChild variant="outline" className="mt-4">
            <Link href="/contact?subject=Careers">Send us a note</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
