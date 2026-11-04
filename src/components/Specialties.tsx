"use client";

import { motion } from "motion/react";
import { DrawLine, EASE, FadeUp, MaskLine } from "./motion/Reveal";
import { SectionIndex } from "./SectionIndex";

const ITEMS = [
  { en: "Cataract · Presbyopia", ko: "백내장 · 노안" },
  { en: "Glaucoma", ko: "녹내장" },
  { en: "Retina", ko: "망막" },
  { en: "Vision Correction", ko: "시력 교정" },
  { en: "Pediatric", ko: "소아 안과" },
  { en: "General", ko: "일반 진료" },
];

export function Specialties() {
  return (
    <section
      id="specialties"
      className="relative bg-surface-alt px-gutter pt-u-100 pb-[120px] text-foreground lg:min-h-u-1100"
    >
      <FadeUp className="flex items-baseline">
        <span className="w-[60px] font-display text-[16px] leading-none font-semibold tracking-[1.6px]">
          — 05
        </span>
        <span className="font-ui text-ui-m text-muted">SPECIALTIES</span>
      </FadeUp>

      <h2 className="mt-u-64 font-display text-display-m font-light">
        <MaskLine>Six centers,</MaskLine>
        <MaskLine delay={0.1} className="italic">
          one promise.
        </MaskLine>
      </h2>

      <div className="mt-u-80">
        <DrawLine src="/lines/line7.svg" />
        <ul>
          {ITEMS.map((item, i) => (
            <motion.li
              key={item.en}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.8, ease: EASE, delay: i * 0.07 }}
            >
              <a
                href="#visit"
                className="group relative grid h-[72px] grid-cols-[clamp(48px,calc(100vw*140/1920),140px)_1fr_auto] items-center overflow-hidden md:grid-cols-[clamp(48px,calc(100vw*140/1920),140px)_calc(100vw*560/1920)_1fr_auto]"
              >
                <span
                  aria-hidden
                  className="absolute inset-0 origin-bottom scale-y-0 bg-highlight transition-transform duration-500 ease-out-soft group-hover:scale-y-100"
                />
                <span className="relative font-display text-headline-m font-light">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="relative font-display text-headline-m font-light transition-transform duration-500 ease-out-soft group-hover:translate-x-3">
                  {item.en}
                </span>
                <span className="relative hidden font-serif-kr text-[18px] leading-[1.3] font-light text-muted md:block">
                  {item.ko}
                </span>
                <span className="glyph relative w-[60px] pr-[40px] text-right font-display text-headline-m font-light transition-transform duration-500 ease-out-soft group-hover:rotate-45 max-md:pr-0">
                  ↗
                </span>
              </a>
              <DrawLine src="/lines/line2.svg" delay={i * 0.07} />
            </motion.li>
          ))}
        </ul>
      </div>

      <SectionIndex index={5} tone="light" />
    </section>
  );
}
