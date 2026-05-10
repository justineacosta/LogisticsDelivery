"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";

interface Props {
  value: number;
  suffix?: string;
  duration?: number;
}

export function AnimatedCounter({ value, suffix = "", duration = 1.6 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (v) => Math.round(v).toLocaleString());

  useEffect(() => {
    if (!inView) return;
    const controls = animate(motionValue, value, { duration, ease: "easeOut" });
    return controls.stop;
  }, [inView, value, duration, motionValue]);

  return (
    <span ref={ref} className="tabular-nums">
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}
