"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Consent, Field } from "./Field";
import { EASE, FadeUp, MaskLine } from "./motion/Reveal";
import { SectionIndex } from "./SectionIndex";

export function Visit() {
  const [sent, setSent] = useState(false);

  return (
    <section
      id="visit"
      className="relative bg-surface-dark px-gutter pt-u-100 pb-[120px] text-on-dark lg:min-h-u-1100"
    >
      <FadeUp className="flex flex-wrap items-baseline gap-y-2">
        <span className="w-[140px] font-ui text-ui-l font-medium text-highlight">VISIT</span>
        <span className="font-ui text-ui-m text-accent">— 06 / Book your visit</span>
      </FadeUp>

      <h2 className="mt-u-104 font-display text-display-m font-light">
        <MaskLine>Book your</MaskLine>
        <MaskLine delay={0.1} className="text-highlight italic">
          warm visit.
        </MaskLine>
      </h2>

      <div className="mt-u-100 flex flex-col gap-16 lg:flex-row lg:justify-between lg:gap-0">
        <FadeUp className="w-full lg:w-[640px]">
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="done"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="py-10"
              >
                <p className="font-display text-headline-m font-light italic">Thank you.</p>
                <p className="mt-4 font-kr text-[16px] leading-[1.5] text-accent">
                  예약 문의가 접수되었습니다. 곧 연락드리겠습니다.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                exit={{ opacity: 0, y: -20 }}
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
              >
                <div className="grid grid-cols-1 gap-x-[40px] gap-y-[40px] sm:grid-cols-2">
                  <Field label="FIRST NAME" name="firstName" required line="/lines/line.svg" tone="dark" />
                  <Field label="LAST NAME" name="lastName" required line="/lines/line.svg" tone="dark" />
                  <Field label="PHONE" name="phone" type="tel" required line="/lines/line.svg" tone="dark" />
                  <Field label="MESSAGE" name="message" line="/lines/line.svg" tone="dark" />
                </div>
                <div className="mt-[70px]">
                  <Consent tone="dark" />
                </div>
                <button
                  type="submit"
                  className="group mt-[26px] flex cursor-pointer items-center font-ui text-ui-l font-medium whitespace-pre text-highlight"
                >
                  {"LET'S BEGIN  "}
                  <span className="glyph inline-block transition-transform duration-300 group-hover:translate-x-2">
                    →
                  </span>
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </FadeUp>

        <FadeUp delay={0.15} className="w-full lg:w-[41.86%]">
          <div className="grid aspect-[16/9] place-items-center sm:aspect-[720/280] rounded-md bg-accent-sub">
            <span className="font-ui text-ui-m whitespace-pre">{"[  NAVER MAP  ]"}</span>
          </div>
          <p className="mt-[40px] font-ui text-ui-m text-accent">— LOCATION</p>
          <p className="mt-[14px] font-serif-kr text-[18px] leading-[1.3] font-light">
            경기도 안양시 ○○동 ○○로 00
            <br />
            안양안과 2F
          </p>
        </FadeUp>
      </div>

      <SectionIndex index={6} tone="dark" />
    </section>
  );
}
