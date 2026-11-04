"use client";

import { motion } from "motion/react";
import { useId, useState } from "react";
import { EASE } from "./motion/Reveal";

/** Underlined form field built on the Figma line asset, with an animated focus line. */
export function Field({
  label,
  name,
  type = "text",
  required = false,
  line,
  tone,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  line: string;
  tone: "dark" | "light";
}) {
  const id = useId();
  const [focused, setFocused] = useState(false);

  return (
    <div>
      <label
        htmlFor={id}
        className={`block font-ui text-ui-s ${tone === "dark" ? "text-accent" : "text-muted"}`}
      >
        {label}
        {required && " *"}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`mt-[6px] block h-[30px] w-full bg-transparent font-display text-[18px] leading-[1.3] font-light outline-none ${
          tone === "dark" ? "text-on-dark" : "text-foreground"
        }`}
      />
      <div className="relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={line} alt="" aria-hidden className="block h-px w-full" />
        <motion.span
          aria-hidden
          className={`absolute bottom-0 left-0 h-[2px] w-full origin-left ${
            tone === "dark" ? "bg-highlight" : "bg-foreground"
          }`}
          initial={false}
          animate={{ scaleX: focused ? 1 : 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        />
      </div>
    </div>
  );
}

export function Consent({ tone }: { tone: "dark" | "light" }) {
  const [checked, setChecked] = useState(false);
  return (
    <label
      className={`flex cursor-pointer items-center font-ui text-[16px] leading-[1.5] select-none ${
        tone === "dark" ? "text-on-dark" : "text-muted"
      }`}
    >
      <input
        type="checkbox"
        required
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
        className="sr-only"
      />
      <span className="glyph w-[1.6em]" aria-hidden>
        {checked ? "☑" : "☐"}
      </span>
      I consent to privacy policy
    </label>
  );
}
