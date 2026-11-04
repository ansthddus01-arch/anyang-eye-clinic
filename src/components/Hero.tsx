"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { EASE } from "./motion/Reveal";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "25%"]);
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1, 1.12]);
  const shade = useTransform(scrollYProgress, [0, 1], [0, 0.35]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative h-[clamp(560px,calc(100vw*900/1920),900px)] overflow-hidden bg-surface-dark"
    >
      <motion.div className="absolute inset-0" style={{ y, scale }}>
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.15, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.8, ease: EASE }}
        >
          <Image
            src="/images/hero.png"
            alt="따뜻한 조명이 비추는 안양안과 로비"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      </motion.div>
      <motion.div className="pointer-events-none absolute inset-0 bg-surface-dark" style={{ opacity: shade }} />

      {/* sotd-badge */}
      <motion.a
        href="#about"
        className="absolute top-[35.56%] right-0 flex h-[180px] w-[50px] items-center justify-center bg-highlight"
        initial={{ x: 50 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.8, ease: EASE, delay: 1 }}
      >
        <span className="font-ui text-ui-s whitespace-nowrap text-foreground [writing-mode:vertical-rl]">
          W. Site of the Day
        </span>
      </motion.a>
    </section>
  );
}
