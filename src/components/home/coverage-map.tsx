"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/shared/section-heading";

const hubs = [
  { x: 18, y: 38, label: "Long Beach" },
  { x: 28, y: 32, label: "Chicago" },
  { x: 35, y: 35, label: "New York" },
  { x: 49, y: 32, label: "Rotterdam" },
  { x: 53, y: 35, label: "Hamburg" },
  { x: 56, y: 42, label: "Dubai" },
  { x: 70, y: 39, label: "Mumbai" },
  { x: 78, y: 40, label: "Singapore" },
  { x: 82, y: 32, label: "Shanghai" },
  { x: 80, y: 28, label: "Tokyo" },
  { x: 41, y: 50, label: "São Paulo" },
  { x: 56, y: 55, label: "Johannesburg" },
];

export function CoverageMap() {
  return (
    <section className="container py-20 sm:py-28">
      <SectionHeading
        eyebrow="Coverage"
        title={
          <>
            A network on <span className="gradient-text">six continents</span>
          </>
        }
        description="38 distribution hubs, 92 country-of-service pairs, 1,200+ partner carriers — orchestrated by one operations control tower."
      />

      <div className="relative mt-12 overflow-hidden rounded-3xl border border-border coverage-map">
        <div className="aspect-[2/1] w-full bg-dot opacity-80" />
        <svg
          viewBox="0 0 100 60"
          className="absolute inset-0 h-full w-full"
          preserveAspectRatio="none"
          aria-hidden
        >
          {hubs.map((h, i) =>
            hubs.slice(i + 1).map((other, j) => {
              const dist = Math.hypot(h.x - other.x, h.y - other.y);
              if (dist > 50) return null;
              return (
                <line
                  key={`${i}-${j}`}
                  x1={h.x}
                  y1={h.y}
                  x2={other.x}
                  y2={other.y}
                  stroke="hsl(var(--primary))"
                  strokeOpacity="0.15"
                  strokeWidth="0.15"
                  vectorEffect="non-scaling-stroke"
                />
              );
            }),
          )}
        </svg>

        <div className="absolute inset-0">
          {hubs.map((hub, i) => (
            <motion.div
              key={hub.label}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              style={{ left: `${hub.x}%`, top: `${hub.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-500/60 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-brand-500 shadow-md shadow-brand-500/50" />
              </span>
              <span className="absolute left-4 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-background/80 px-2 py-0.5 text-[10px] font-medium text-foreground/80 opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
                {hub.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
