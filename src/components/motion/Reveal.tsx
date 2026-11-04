"use client";

import {
  animate,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useEffect, useRef, type RefObject } from "react";

export const EASE = [0.22, 1, 0.36, 1] as const;

/** Masked line that slides up into view. */
export function MaskLine({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    // The observer sits on the (unclipped) mask; the inner span inherits the variant.
    <motion.span
      className={`block overflow-hidden pr-[0.12em] pb-[0.14em] -mb-[0.14em] ${className}`}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
    >
      <motion.span
        className="block"
        variants={{ hidden: { y: "110%" }, show: { y: "0%" } }}
        transition={{ duration: 1.1, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </motion.span>
  );
}

/** Fade + rise when entering the viewport. */
export function FadeUp({
  children,
  delay = 0,
  y = 32,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Figma line asset that draws in from the left. */
export function DrawLine({
  src,
  thickness = 1,
  delay = 0,
  className = "",
}: {
  src: string;
  thickness?: number;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      aria-hidden
      className={`origin-left ${className}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 1 }}
      transition={{ duration: 1.2, ease: EASE, delay }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" className="block w-full" style={{ height: thickness }} />
    </motion.div>
  );
}

/** Scroll-linked vertical offset for a target element (px). */
export function useParallax(
  target: RefObject<HTMLElement | null>,
  distance: number,
): MotionValue<number> {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target, offset: ["start end", "end start"] });
  return useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [distance, -distance]);
}

/** Counts up to the numeric part of a label like "200+" or "50K+". */
export function CountUp({ value, className = "" }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.8 });
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? Number(match[1]) : 0;
  const suffix = match ? match[2] : value;

  useEffect(() => {
    if (!inView || !ref.current) return;
    const node = ref.current;
    const controls = animate(0, target, {
      duration: 1.6,
      ease: EASE,
      onUpdate: (v) => {
        node.textContent = `${Math.round(v)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, target, suffix]);

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
