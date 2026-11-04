"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { FadeUp } from "./motion/Reveal";
import { SectionIndex } from "./SectionIndex";

export function FromAbove() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const textX = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["12%", "-12%"]);
  const imgScale = useTransform(scrollYProgress, [0, 0.45], reduce ? [1, 1] : [0.82, 1]);
  const innerScale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1.25, 1]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-surface-alt pt-u-150 pb-[120px] text-foreground lg:min-h-u-1100"
    >
      <motion.p
        aria-hidden
        className="text-center font-display text-display-l font-light whitespace-nowrap opacity-15"
        style={{ x: textX }}
      >
        FROM ABOVE
      </motion.p>

      <motion.div
        className="relative mx-auto aspect-[1440/650] w-[calc(100%-2*var(--gutter))] overflow-hidden rounded-md lg:w-[75%]"
        style={{ scale: imgScale }}
      >
        <motion.div className="absolute inset-0" style={{ scale: innerScale }}>
          <Image
            src="/images/s3-aerial.png"
            alt="위에서 내려다본 안양안과 수술실"
            fill
            sizes="(min-width: 1024px) 75vw, 100vw"
            className="object-cover"
          />
        </motion.div>
      </motion.div>

      <FadeUp className="mx-auto mt-[20px] flex w-[calc(100%-2*var(--gutter))] flex-col gap-3 md:flex-row md:gap-0 lg:w-[75%]">
        <span className="font-ui text-ui-m md:w-[300px] md:shrink-0">— A VIEW FROM ABOVE</span>
        <span className="font-serif-kr text-[16px] leading-[1.5] font-light text-muted">
          수술실의 모든 순간을 섬세하게. 환자 중심의 공간 설계.
        </span>
      </FadeUp>

      <SectionIndex index={3} tone="light" />
    </section>
  );
}
