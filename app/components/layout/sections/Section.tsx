"use client";

import { useMotionValueEvent, useScroll } from "motion/react";
import { HTMLAttributes, useRef } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  scrollProgress?: (val: number) => void;
  bookmark: {
    title: string;
    icon?: string;
  };
}

export default function Section({ scrollProgress, children, ...rest }: Props) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (!scrollProgress) return;

    const prevPct = roundFloat(scrollYProgress.getPrevious() ?? 0);
    const nextPct = roundFloat(current);

    if (prevPct === nextPct) return;

    scrollProgress(nextPct);
  });

  return (
    <section ref={ref} {...rest}>
      {children}
    </section>
  );
}

export type Section = ReturnType<typeof Section>;

function roundFloat(value: number, decimal: number = 100) {
  return Math.round(value * decimal) / decimal;
}
