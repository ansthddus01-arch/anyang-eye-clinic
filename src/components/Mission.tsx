"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { CountUp, DrawLine, FadeUp, MaskLine } from "./motion/Reveal";
import { SectionIndex } from "./SectionIndex";

const STATS = [
  { value: "39", label: "Countries" },
  { value: "200+", label: "Camps" },
  { value: "50K+", label: "Patients" },
];

export function Mission() {
  const imgRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: imgRef, offset: ["start end", "center center"] });
  const inset = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [8, 0]);
  const clipPath = useTransform(inset, (v) => `inset(${v}% ${v}% ${v}% ${v}% round 20px)`);
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1.2, 1]);

  return (
    <section
      id="mission"
      className="relative bg-surface px-gutter pt-u-100 pb-[120px] text-foreground lg:min-h-u-1100"
    >
      <FadeUp className="flex items-baseline">
        <span className="w-[60px] font-display text-[16px] leading-none font-semibold tracking-[1.6px]">
          — 02
        </span>
        <span className="font-ui text-ui-m text-muted">BEYOND KOREA · GLOBAL MISSION</span>
      </FadeUp>

      <div className="mt-u-64 flex flex-col gap-10 lg:flex-row lg:justify-between lg:gap-0">
        <h2 className="font-display text-display-m font-light">
          <MaskLine>Beyond</MaskLine>
          <MaskLine delay={0.1} className="italic">
            Korea.
          </MaskLine>
        </h2>
        <FadeUp delay={0.2} className="lg:mt-u-40 lg:w-[36.05%]">
          <p className="font-serif-kr text-[20px] leading-[1.5] font-light tracking-[0.4px]">
            한 사람의 시력을 넘어
            <br />
            한 사람의 삶을 바라봅니다.
          </p>
          <p className="mt-[30px] font-kr text-[16px] leading-[1.5] text-muted">
            2002년부터 Vision Care와 함께
            <br />
            세계 39개국에 시력을 선물했습니다.
          </p>
        </FadeUp>
      </div>

      <motion.div
        ref={imgRef}
        className="relative mt-u-50 aspect-[4/3] overflow-hidden md:aspect-[1720/540] rounded-md"
        style={{ clipPath }}
      >
        <motion.div className="absolute inset-0" style={{ scale }}>
          <Image
            src="/images/s2-africa.png"
            alt="해외 의료봉사 현장에서 시력 검사를 하는 모습"
            fill
            sizes="90vw"
            className="object-cover"
          />
        </motion.div>
      </motion.div>

      <DrawLine src="/lines/line2.svg" />

      <div className="mt-[20px] grid grid-cols-3">
        {STATS.map((s, i) => (
          <FadeUp key={s.label} delay={i * 0.1} className="flex flex-wrap items-center gap-y-2">
            <CountUp
              value={s.value}
              className="w-[clamp(80px,calc(100vw*180/1920),180px)] font-display text-headline-xl font-light"
            />
            <span className="font-ui text-ui-m text-muted">{s.label}</span>
          </FadeUp>
        ))}
      </div>

      <SectionIndex index={2} tone="light" />
    </section>
  );
}
