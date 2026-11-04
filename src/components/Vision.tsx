"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useRef } from "react";
import { FadeUp, MaskLine, useParallax } from "./motion/Reveal";
import { SectionIndex } from "./SectionIndex";

const LINES = [
  { text: "The vision of", italic: false, opacity: 1 },
  { text: "Anyang Eye Clinic", italic: false, opacity: 1 },
  { text: "is defined by a warm", italic: true, opacity: 1 },
  { text: "touch and a deep care", italic: false, opacity: 0.5 },
  { text: "for every soul.", italic: true, opacity: 0.3 },
];

export function Vision() {
  const ref = useRef<HTMLElement>(null);
  const y1 = useParallax(ref, 60);
  const y2 = useParallax(ref, 130);

  return (
    <section
      id="about"
      ref={ref}
      className="relative overflow-hidden bg-surface-dark px-gutter pt-u-100 pb-[120px] text-on-dark lg:min-h-u-1100"
    >
      <FadeUp>
        <p className="font-ui text-ui-l font-medium">
          <span className="text-highlight">ANYANG</span>
          <span className="ml-[0.4em]">EYE CLINIC</span>
        </p>
      </FadeUp>

      <div className="flex flex-col gap-16 lg:flex-row lg:justify-between lg:gap-0">
        <div className="lg:w-[58.14%]">
          <h2 className="mt-u-144 font-display text-display-s font-light">
            {LINES.map((l, i) => (
              <MaskLine
                key={l.text}
                delay={i * 0.09}
                className={l.italic ? "italic" : ""}
              >
                <span style={{ opacity: l.opacity }}>{l.text}</span>
              </MaskLine>
            ))}
          </h2>

          <FadeUp delay={0.4} className="mt-u-94">
            <a
              href="#mission"
              className="group inline-flex h-[48px] w-[180px] items-center justify-center rounded-full border border-accent font-ui text-ui-m text-accent transition-colors duration-300 hover:bg-accent hover:text-surface-dark"
            >
              EXPLORE
              <span className="glyph ml-[0.8em] inline-block transition-transform duration-300 group-hover:rotate-45">
                ↗
              </span>
            </a>
          </FadeUp>
        </div>

        {/* s1-img-1 / s1-img-2 composition (720×680 at 1920) */}
        <div className="relative aspect-[720/680] w-full shrink-0 lg:mt-u-104 lg:w-[41.86%]">
          <motion.div
            className="absolute top-0 left-0 h-[73.53%] w-[52.78%] overflow-hidden rounded-tl-[min(180px,9.375vw)] rounded-tr-[min(60px,3.125vw)] rounded-br-[min(220px,11.46vw)] rounded-bl-[min(80px,4.17vw)]"
            style={{ y: y1 }}
          >
            <Image
              src="/images/s1-img-1.png"
              alt="안양안과 상담 라운지"
              fill
              sizes="(min-width: 1024px) 20vw, 50vw"
              className="object-cover"
            />
          </motion.div>
          <motion.div
            className="absolute top-[38.24%] left-[38.89%] h-[61.76%] w-[61.11%] overflow-hidden rounded-tl-[min(60px,3.125vw)] rounded-tr-[min(200px,10.42vw)] rounded-br-[min(80px,4.17vw)] rounded-bl-[min(220px,11.46vw)]"
            style={{ y: y2 }}
          >
            <Image
              src="/images/s1-img-2.png"
              alt="안양안과 진료 공간"
              fill
              sizes="(min-width: 1024px) 23vw, 60vw"
              className="object-cover"
            />
          </motion.div>
        </div>
      </div>

      <SectionIndex index={1} tone="dark" />
    </section>
  );
}
