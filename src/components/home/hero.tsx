"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Truck, Plane, Ship } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrackingForm } from "@/components/forms/tracking-form";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 lg:pt-36 pb-16 lg:pb-24">
      {/* Background ornaments */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid opacity-[0.06]" />
        <div className="absolute -top-24 left-1/2 h-[600px] w-[1000px] -translate-x-1/2 rounded-full bg-radial-fade blur-3xl" />
        <div className="absolute right-0 top-1/3 h-[400px] w-[400px] translate-x-1/3 rounded-full bg-brand-500/10 blur-3xl" />
      </div>

      <div className="container">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge variant="soft" className="px-3 py-1.5 text-xs">
                <ShieldCheck className="mr-1.5 h-3.5 w-3.5" />
                ISO 9001 · AEO · C-TPAT certified
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="mt-5 text-balance font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-[4.25rem]"
            >
              Smarter freight for{" "}
              <span className="gradient-text">a faster world</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              We move 4.2 million shipments a year through 92 countries — by road, air,
              ocean, and rail — with predictive routing, bonded warehousing, and
              real-time visibility on every mile.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <Button asChild size="lg" variant="glow">
                <Link href="/pricing">
                  Get a freight quote
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/services">Explore services</Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-10 grid grid-cols-3 max-w-md gap-4"
            >
              {[
                { icon: Truck, label: "Road" },
                { icon: Plane, label: "Air" },
                { icon: Ship, label: "Ocean" },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-2 text-sm text-muted-foreground backdrop-blur"
                >
                  <Icon className="h-4 w-4 text-brand-500" />
                  {label}
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-5"
          >
            <div className="relative">
              <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-brand-500/30 via-brand-700/20 to-transparent blur-2xl" />
              <div className="glass rounded-[1.5rem] p-6 shadow-2xl shadow-brand-700/10 sm:p-8">
                <h2 className="font-display text-xl font-semibold">
                  Track a shipment
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Try{" "}
                  <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
                    VEL-DEMO-1001
                  </code>{" "}
                  to see live milestones.
                </p>
                <div className="mt-5">
                  <TrackingForm compact />
                </div>

                <div className="mt-6 grid grid-cols-3 gap-3 border-t border-border/60 pt-5">
                  {[
                    { v: "99.4%", l: "On-time" },
                    { v: "<2 min", l: "Avg. quote" },
                    { v: "92", l: "Countries" },
                  ].map((s) => (
                    <div key={s.l}>
                      <div className="font-display text-lg font-bold">{s.v}</div>
                      <div className="text-xs text-muted-foreground">{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
