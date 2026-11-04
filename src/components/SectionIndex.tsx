"use client";

import { motion } from "motion/react";
import { EASE } from "./motion/Reveal";

// Figma progress-indicator highlight lines (2px, #E7FD55), one per section.
const HIGHLIGHT: Record<number, { src: string; width: number }> = {
  1: { src: "/lines/line1.svg", width: 50 },
  2: { src: "/lines/line4.svg", width: 100 },
  3: { src: "/lines/line5.svg", width: 150 },
  4: { src: "/lines/line6.svg", width: 200 },
  5: { src: "/lines/line8.svg", width: 250 },
  6: { src: "/lines/line9.svg", width: 300 },
};

export function SectionIndex({ index, tone }: { index: number; tone: "dark" | "light" }) {
  const base = tone === "dark" ? "/lines/line.svg" : "/lines/line3.svg";
  const hl = HIGHLIGHT[index];

  return (
    <div className="absolute bottom-u-50 left-[var(--gutter)] flex items-center gap-[20px]">
      <div className="relative h-[2px] w-[300px] max-w-[50vw]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={base} alt="" aria-hidden className="absolute bottom-0 left-0 block h-px w-full" />
        <motion.div
          aria-hidden
          className="absolute bottom-0 left-0 origin-left"
          style={{ width: `${(hl.width / 300) * 100}%` }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 1 }}
          transition={{ duration: 1.4, ease: EASE, delay: 0.2 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={hl.src} alt="" className="block h-[2px] w-full" />
        </motion.div>
      </div>
      <span
        className={`font-ui text-ui-m ${tone === "dark" ? "text-accent" : "text-foreground"}`}
      >
        {String(index).padStart(2, "0")}
      </span>
    </div>
  );
}
