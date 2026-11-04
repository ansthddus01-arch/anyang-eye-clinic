"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { Consent, Field } from "./Field";
import { EASE, FadeUp } from "./motion/Reveal";

const LINKS = [
  { label: "ABOUT", href: "#about" },
  { label: "PHILOSOPHY", href: "#about" },
  { label: "SPECIALTIES", href: "#specialties" },
  { label: "VISION CARE", href: "#mission" },
  { label: "CONTACT", href: "#visit" },
];

const WORDMARK = "ANYANG EYE";

export function Footer() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const buildingY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["22%", "0%"]);
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer
      ref={ref}
      className="relative overflow-hidden bg-gradient-to-b from-[#bfd1e0] via-[#e5e5db] to-[#fbf9f2] text-foreground lg:h-[max(calc(100vw*1000/1920),720px)]"
    >
      <div className="relative z-10 grid gap-12 px-gutter pt-u-100 lg:grid-cols-[calc(100vw*400/1920)_1fr_auto] lg:gap-0">
        {/* Subscribe */}
        <FadeUp className="w-full max-w-[320px]">
          <p className="font-display text-[18px] leading-[1.3] font-light italic">
            Subscribe to join our community
          </p>
          {subscribed ? (
            <p className="mt-[56px] font-kr text-[16px] leading-[1.5] text-muted">
              구독해 주셔서 감사합니다.
            </p>
          ) : (
            <form
              className="mt-[56px] flex flex-col gap-[16px]"
              onSubmit={(e) => {
                e.preventDefault();
                setSubscribed(true);
              }}
            >
              <Field label="FIRST NAME" name="subFirstName" required line="/lines/line10.svg" tone="light" />
              <Field label="LAST NAME" name="subLastName" required line="/lines/line10.svg" tone="light" />
              <Field label="EMAIL" name="subEmail" type="email" required line="/lines/line10.svg" tone="light" />
              <div className="mt-[54px]">
                <Consent tone="light" />
              </div>
              <button
                type="submit"
                className="mt-[10px] w-fit cursor-pointer font-ui text-ui-l font-medium underline-offset-4 hover:underline"
              >
                LET&apos;S BEGIN
              </button>
            </form>
          )}
        </FadeUp>

        {/* Links */}
        <FadeUp delay={0.1}>
          <ul className="flex flex-wrap gap-y-4">
            {LINKS.map((l) => (
              <li key={l.label} className="w-[clamp(120px,calc(100vw*180/1920),180px)]">
                <a href={l.href} className="font-ui text-ui-m transition-opacity hover:opacity-60">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#"
            className="mt-[56px] inline-block font-ui text-[16px] leading-[1.5] text-muted hover:underline"
          >
            Privacy policy
          </a>
        </FadeUp>

        <FadeUp delay={0.2} className="lg:-mr-[calc(var(--gutter)-20px)]">
          <a href="tel:+82310000000" className="font-ui text-ui-m hover:underline">
            +82 31 000 0000
          </a>
        </FadeUp>
      </div>

      {/* footer-building (1494×836 at x563, y284 in a 1920×1000 footer) */}
      <motion.div
        className="pointer-events-none relative mt-12 ml-[10%] aspect-[1494/836] w-[110%] lg:absolute lg:top-[calc(100vw*284/1920)] lg:left-[29.32%] lg:m-0 lg:w-[77.81%]"
        style={{ y: buildingY }}
      >
        <Image
          src="/images/footer-building.png"
          alt="안양안과 건물 외관"
          fill
          sizes="78vw"
          className="object-contain"
        />
      </motion.div>

      <motion.p
        aria-label={WORDMARK}
        className="relative z-20 -mt-[12vw] px-gutter font-display text-display-l font-light whitespace-nowrap opacity-90 lg:absolute lg:top-[calc(100vw*782/1920)] lg:mt-0"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
      >
        {WORDMARK.split("").map((ch, i) => (
          <span key={i} className="inline-block overflow-hidden pb-[0.1em] align-bottom" aria-hidden>
            <motion.span
              className="inline-block whitespace-pre"
              variants={{ hidden: { y: "110%" }, show: { y: "0%" } }}
              transition={{ duration: 1, ease: EASE, delay: i * 0.04 }}
            >
              {ch}
            </motion.span>
          </span>
        ))}
      </motion.p>

      <p className="relative z-20 px-gutter pt-6 pb-[16px] font-ui text-[16px] leading-[1.5] text-muted lg:absolute lg:bottom-0 lg:pt-0">
        © 2026. All Rights Reserved.
      </p>
    </footer>
  );
}
