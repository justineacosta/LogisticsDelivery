"use client";

import { motion } from "framer-motion";
import {
  Radar,
  Workflow,
  ShieldCheck,
  Leaf,
  HeadphonesIcon,
  BarChart3,
} from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";

const features = [
  {
    icon: Radar,
    title: "Predictive ETA",
    description:
      "Vessel weather, port congestion, and customs lead times — fused into a confidence-scored ETA you can plan against.",
  },
  {
    icon: Workflow,
    title: "API & EDI native",
    description:
      "Bookings, tracking webhooks, ASN, and proof-of-delivery via REST, GraphQL, or EDI 856/214/204.",
  },
  {
    icon: ShieldCheck,
    title: "Audit-ready compliance",
    description:
      "AEO, C-TPAT, ISO 9001, SOC 2 Type II. Full chain-of-custody for pharma, defense, and regulated cargo.",
  },
  {
    icon: Leaf,
    title: "GLEC carbon scoring",
    description:
      "Per-shipment CO₂e accounting, SAF-blended air, and biofuel ocean lanes built into rate cards.",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 control tower",
    description:
      "Named pods, not call queues. One ops lead per account, escalation under 8 minutes worldwide.",
  },
  {
    icon: BarChart3,
    title: "Spend & lane analytics",
    description:
      "Granular tendering, lane benchmarks, and exception KPIs in your ERP or our embedded dashboard.",
  },
];

export function Features() {
  return (
    <section className="container py-20 sm:py-28">
      <SectionHeading
        eyebrow="Why Velocita"
        title={
          <>
            Engineered for <span className="gradient-text">enterprise</span>
            <br />
            shaped for shippers
          </>
        }
        description="We built Velocita because the global supply chain still ships in spreadsheets. Our platform replaces them — without ripping out the carriers and contracts that already work."
      />

      <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: (i % 3) * 0.05 }}
            className="group relative bg-card p-8"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100 dark:bg-brand-950/50 dark:text-brand-300 dark:ring-brand-900/50">
              <f.icon className="h-5 w-5" />
            </div>
            <h3 className="mt-5 font-display text-lg font-semibold">
              {f.title}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              {f.description}
            </p>
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-500/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
