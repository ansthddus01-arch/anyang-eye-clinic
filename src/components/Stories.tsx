"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { EASE, FadeUp, MaskLine } from "./motion/Reveal";
import { SectionIndex } from "./SectionIndex";

export function Stories() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [100, -100]);
  const innerScale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1.2, 1]);

  return (
    <section
      id="stories"
      ref={ref}
      className="relative overflow-hidden bg-surface-dark px-gutter pt-u-100 pb-[120px] text-on-dark lg:min-h-u-1300"
    >
      <FadeUp className="flex flex-wrap items-baseline gap-y-2">
        <span className="w-[140px] font-ui text-ui-l font-medium text-highlight">STORIES</span>
        <span className="font-ui text-ui-m text-accent">— A life, not just a vision</span>
      </FadeUp>

      <div className="flex flex-col gap-16 lg:flex-row lg:justify-between lg:gap-0">
        <div className="lg:w-[60%]">
          <h2 className="mt-u-124 font-serif-kr text-display-s leading-[1.146] font-light">
            <MaskLine>20년을 흐리게,</MaskLine>
            <MaskLine delay={0.1}>하루 만에 선명하게.</MaskLine>
          </h2>

          <motion.blockquote
            className="mt-u-100 font-display text-quote font-light text-accent italic"
            initial={{ opacity: 0, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.2 }}
          >
            “수술 다음 날, 손녀 얼굴을
            <br />
            처음 또렷하게 본 날이에요.”
          </motion.blockquote>

          <FadeUp delay={0.2} className="mt-u-94">
            <p className="font-ui text-ui-m text-accent">— Mrs. Kim, 75</p>
            <p className="mt-[10px] font-kr text-[16px] leading-[1.5] whitespace-pre">
              {"백내장 수술 환자  ·  2024"}
            </p>
          </FadeUp>

          <FadeUp delay={0.3} className="mt-u-62">
            <a
              href="#visit"
              className="group inline-flex h-[48px] w-[220px] items-center justify-center rounded-full border border-accent font-ui text-ui-m text-accent transition-colors duration-300 hover:bg-accent hover:text-surface-dark"
            >
              READ ALL STORIES
              <span className="glyph ml-[0.8em] inline-block transition-transform duration-300 group-hover:rotate-45">
                ↗
              </span>
            </a>
          </FadeUp>
        </div>

        <motion.div
          className="relative aspect-[580/820] w-full max-w-[580px] shrink-0 lg:mt-u-84 lg:mr-[8.14%] lg:w-[33.72%]"
          style={{ y }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div
            className="absolute inset-0 overflow-hidden rounded-tl-[min(240px,12.5vw)] rounded-tr-[min(80px,4.17vw)] rounded-br-[min(240px,12.5vw)] rounded-bl-[min(80px,4.17vw)]"
            variants={{
              hidden: { clipPath: "inset(100% 0% 0% 0%)" },
              show: { clipPath: "inset(0% 0% 0% 0%)" },
            }}
            transition={{ duration: 1.4, ease: EASE }}
          >
          <motion.div className="absolute inset-0" style={{ scale: innerScale }}>
            <Image
              src="/images/s4-elder.png"
              alt="백내장 수술 후 환하게 웃는 김 여사님"
              fill
              sizes="(min-width: 1024px) 30vw, 100vw"
              className="object-cover"
            />
          </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <SectionIndex index={4} tone="dark" />
    </section>
  );
}
