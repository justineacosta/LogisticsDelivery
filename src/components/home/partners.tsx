import { partners } from "@/content/site-data";
import { cn } from "@/lib/utils";

export function Partners() {
  const doubled = [...partners, ...partners];
  return (
    <section
      aria-label="Trusted by"
      className="border-y border-border/60 bg-muted/30 py-10"
    >
      <div className="container">
        <p className="text-center text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Trusted by global supply chain teams
        </p>
        <div className="relative mt-6 overflow-hidden mask-fade-edges">
          <div className="flex w-max animate-marquee items-center gap-12 whitespace-nowrap">
            {doubled.map((p, i) => (
              <span
                key={`${p}-${i}`}
                className={cn(
                  "font-display text-2xl font-bold tracking-tight text-muted-foreground/60 hover:text-foreground transition-colors",
                )}
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
