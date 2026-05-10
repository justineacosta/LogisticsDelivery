"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "@/content/site-data";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";

export function Testimonials() {
  const [i, setI] = useState(0);
  const t = testimonials[i]!;

  const next = () => setI((p) => (p + 1) % testimonials.length);
  const prev = () =>
    setI((p) => (p - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="container py-20 sm:py-28">
      <SectionHeading
        eyebrow="Customers"
        title={
          <>
            Operators who depend on{" "}
            <span className="gradient-text">consistency</span>
          </>
        }
      />
      <div className="mx-auto mt-12 max-w-4xl">
        <div className="relative rounded-3xl border border-border bg-card p-8 sm:p-12">
          <Quote
            className="absolute right-8 top-8 h-12 w-12 text-brand-500/20"
            aria-hidden
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-pretty font-display text-2xl font-medium leading-snug tracking-tight sm:text-3xl">
                “{t.quote}”
              </p>
              <div className="mt-8 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 font-display text-white">
                  {t.author
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <div className="font-medium">{t.author}</div>
                  <div className="text-sm text-muted-foreground">{t.title}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-10 flex items-center justify-between">
            <div className="flex gap-1.5">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  aria-label={`Go to testimonial ${idx + 1}`}
                  onClick={() => setI(idx)}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === i ? "w-6 bg-brand-500" : "w-1.5 bg-border"
                  }`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={prev}
                aria-label="Previous"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={next}
                aria-label="Next"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
