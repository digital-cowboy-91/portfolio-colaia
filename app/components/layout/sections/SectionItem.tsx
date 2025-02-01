"use client";

import { useScroll } from "motion/react";
import { ReactElement, useEffect, useRef } from "react";
import { SectionLinkProps } from "./SectionLink";

interface Props extends Omit<SectionLinkProps, "scrollProgress"> {
  children: ReactElement[] | ReactElement;
  className?: string;
  wrapperClassName?: string;
  setScrollProgress?: (num: number) => void;
  fixedHeight?: boolean;
  debug?: boolean;
}

export default function SectionItem({
  id,
  children,
  className,
  wrapperClassName,
  setScrollProgress = (num) => num,
  fixedHeight = false,
  debug = false,
}: Props) {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end end"],
  });

  useEffect(() => {
    scrollYProgress.on("change", (current) => {
      setScrollProgress(current);
    });
  }, []);

  return (
    <section
      id={id}
      ref={sectionRef}
      className={`
          ${fixedHeight ? "h-screen" : "min-h-screen"}
          p-single
          pb-[calc(var(--spacing-single)*2+var(--tools-h))]
          ${className}
        `}
    >
      <div
        className={`
            h-full p-single max-lg:pe-[3rem]
            rounded-single
            relative overflow-hidden
            ${wrapperClassName}
            ${debug && "bg-[red]"}
          `}
      >
        {children}
      </div>
    </section>
  );
}

export type SectionItem = ReturnType<typeof SectionItem>;
