"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { EASE } from "./motion/Reveal";

const LINKS = [
  { label: "About", href: "#about" },
  { label: "Vision Care", href: "#mission" },
  { label: "Stories", href: "#stories" },
  { label: "Specialties", href: "#specialties" },
  { label: "Visit", href: "#visit" },
];

export function Nav() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  // Hide on scroll down, reveal on scroll up.
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 240);
    if (y > prev && y > 240) setOpen(false);
  });

  return (
    <motion.header
      className="pointer-events-none fixed inset-x-0 top-[28px] z-50 flex justify-center px-4"
      initial={{ y: -120, opacity: 0 }}
      animate={{ y: hidden ? -120 : 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: EASE }}
    >
      <div className="pointer-events-auto relative w-[440px] max-w-full">
        <nav className="flex h-[56px] items-center rounded-full bg-surface-dark pr-[20px] pl-[28px] text-accent">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="site-menu"
            className="flex cursor-pointer items-center gap-[12px]"
          >
            <span className="relative block h-[7px] w-[16px]" aria-hidden>
              <motion.span
                className="absolute left-0 top-0 h-px w-full bg-accent"
                animate={open ? { y: 3, rotate: 45 } : { y: 0, rotate: 0 }}
              />
              <motion.span
                className="absolute bottom-0 left-0 h-px w-full bg-accent"
                animate={open ? { y: -3, rotate: -45 } : { y: 0, rotate: 0 }}
              />
            </span>
            <span className="w-[80px] text-left font-ui text-ui-m">{open ? "CLOSE" : "MENU"}</span>
          </button>

          <span className="ml-[24px] h-[24px] w-px shrink-0 bg-accent-sub" aria-hidden />

          <a
            href="#top"
            aria-label="안양안과 홈"
            className="mx-auto grid size-[32px] place-items-center font-display text-[16px] leading-none font-semibold tracking-[1.6px]"
          >
            AE
          </a>

          <span className="h-[24px] w-px shrink-0 bg-accent-sub" aria-hidden />

          <a href="#visit" className="group ml-[30px] flex items-center">
            <span className="w-[80px] font-ui text-ui-m max-[400px]:w-auto">INQUIRE</span>
            <span className="glyph w-[30px] font-ui text-ui-l font-medium transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              id="site-menu"
              className="absolute inset-x-0 top-[64px] overflow-hidden rounded-[28px] bg-surface-dark"
              initial={{ opacity: 0, y: -12, clipPath: "inset(0 0 100% 0 round 28px)" }}
              animate={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0 round 28px)" }}
              exit={{ opacity: 0, y: -12, clipPath: "inset(0 0 100% 0 round 28px)" }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <ul className="px-[28px] py-[20px]">
                {LINKS.map((l, i) => (
                  <motion.li
                    key={l.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.05, duration: 0.4, ease: EASE }}
                  >
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between border-b border-accent-sub/60 py-[14px] font-display text-[28px] font-light text-on-dark transition-colors last:border-0 hover:text-highlight"
                    >
                      {l.label}
                      <span className="glyph text-[18px] text-accent">↗</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
