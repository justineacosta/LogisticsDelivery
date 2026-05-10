import { Badge } from "@/components/ui/badge";

interface Props {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
}

export function PageHeader({ eyebrow, title, description }: Props) {
  return (
    <section className="relative overflow-hidden border-b border-border/60 pt-28 pb-16 lg:pt-36 lg:pb-20">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid opacity-[0.05]" />
        <div className="absolute -top-24 left-1/2 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-radial-fade blur-3xl" />
      </div>
      <div className="container max-w-4xl text-center">
        {eyebrow && (
          <Badge variant="soft" className="mb-4 px-3 py-1 text-xs uppercase tracking-wide">
            {eyebrow}
          </Badge>
        )}
        <h1 className="text-balance font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
