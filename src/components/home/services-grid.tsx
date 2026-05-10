"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/content/services";
import { SectionHeading } from "@/components/shared/section-heading";

export function ServicesGrid() {
  return (
    <section id="services" className="container py-20 sm:py-28">
      <SectionHeading
        eyebrow="Services"
        title={
          <>
            One partner. <span className="gradient-text">Every mode.</span>
          </>
        }
        description="Engineered services across road, air, ocean, rail, warehousing, last-mile, and customs — orchestrated through a single API and a single ops team."
      />

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <motion.div
            key={s.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4, delay: i * 0.04 }}
          >
            <Link
              href={`/services#${s.slug}`}
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-brand-500/50 hover:shadow-xl hover:shadow-brand-500/5"
            >
              <div
                className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-brand-500/10 opacity-0 blur-2xl transition-opacity group-hover:opacity-100"
                aria-hidden
              />
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-50 to-brand-100 text-brand-600 dark:from-brand-950/50 dark:to-brand-900/50 dark:text-brand-300">
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold">
                {s.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {s.description}
              </p>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {s.highlights.map((h) => (
                  <span
                    key={h}
                    className="rounded-full border border-border bg-background px-2.5 py-1 text-xs text-muted-foreground"
                  >
                    {h}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex items-center gap-1 text-sm font-medium text-brand-600 dark:text-brand-300">
                Learn more
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
