import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { CTA } from "@/components/home/cta";
import { Stats } from "@/components/home/stats";
import { Button } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About",
  description:
    "Velocita was founded by ex-operators who shipped containers, not slides. We build the logistics platform we wish we'd had.",
  path: "/about",
});

const milestones = [
  { year: "2014", text: "Founded in Long Beach with a single drayage lane." },
  { year: "2016", text: "Opened EMEA headquarters in Rotterdam." },
  { year: "2018", text: "Reached 1M shipments per year, launched Velocita API v1." },
  { year: "2020", text: "Expanded to 22 bonded distribution hubs across 4 regions." },
  { year: "2022", text: "Launched GLEC-aligned carbon tracking and SAF program." },
  { year: "2024", text: "92 countries served, 4.2M+ annual shipments, 99.4% OTD." },
];

const leaders = [
  {
    name: "Adaeze Okonkwo",
    title: "CEO & co-founder",
    bio: "20 years in cross-border ocean and customs. Previously COO at Maersk's APAC division.",
  },
  {
    name: "Theo Marchetti",
    title: "CTO & co-founder",
    bio: "Built routing systems at Flexport. Open-source maintainer of two TMS libraries.",
  },
  {
    name: "Renata Vidal",
    title: "VP, Global Operations",
    bio: "Ran 24/7 control towers for two of the world's top three 3PLs.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Velocita"
        title={
          <>
            Built by operators, for{" "}
            <span className="gradient-text">people who move things</span>
          </>
        }
        description="We started Velocita because the global supply chain still ran on spreadsheets, sticky notes, and 3 a.m. WhatsApp messages. We built the platform we wished we had — one network, one API, one ops team."
      />

      <Stats />

      <section className="container py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-3xl font-bold">
            A timeline of the network
          </h2>
          <ol className="mt-10 space-y-6 border-l-2 border-border pl-8">
            {milestones.map((m) => (
              <li key={m.year} className="relative">
                <span className="absolute -left-[37px] top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-brand-500 bg-background">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                </span>
                <div className="font-display text-sm font-semibold text-brand-600 dark:text-brand-300">
                  {m.year}
                </div>
                <p className="mt-1 text-base text-foreground">{m.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="container py-20">
        <h2 className="text-center font-display text-3xl font-bold">Leadership</h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">
          Operators who have moved cargo through hurricanes, port strikes, and
          three quarters of black-swan demand spikes.
        </p>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {leaders.map((l) => (
            <div
              key={l.name}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 font-display text-lg font-bold text-white">
                {l.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold">{l.name}</h3>
              <p className="text-sm text-brand-600 dark:text-brand-300">
                {l.title}
              </p>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                {l.bio}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/careers">See open roles</Link>
          </Button>
        </div>
      </section>

      <CTA />
    </>
  );
}
