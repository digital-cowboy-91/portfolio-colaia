"use client";

import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { motion, useScroll } from "motion/react";
import Link from "next/link";
import React, { ReactElement, useRef, useState } from "react";

type SectionLinkProps = {
  id: string;
  title?: string;
  icon?: string;
  scrollProgress?: number;
};

function SectionLink({
  id,
  title,
  icon,
  scrollProgress = 1,
}: SectionLinkProps) {
  return (
    <Link href={"#" + id} className="flex place-content-center relative">
      {icon ? (
        <Icon icon={icon} width="1.75rem" className="rotate-90" />
      ) : (
        <>
          {title || id}
          <svg
            width={"100%"}
            height={5}
            className={`
              absolute inset-x-0 -bottom-[10px]
              ${[0, 1].includes(scrollProgress) ? "opacity-0" : "opacity-1"}
              transition-opacity
              duration-500
            `}
          >
            <line
              x1={0}
              y1={5}
              x2="100%"
              y2={5}
              strokeWidth={3}
              stroke="rgba(255,255,255,0.3)"
            />
            <motion.line
              x1="100%"
              y1={5}
              x2={0}
              y2={5}
              initial={{ pathLength: scrollProgress }}
              animate={{ pathLength: scrollProgress }}
              strokeWidth={3}
              stroke="rgba(255,255,255,1)"
            />
          </svg>
        </>
      )}
    </Link>
  );
}

interface SectionItemProps extends Omit<SectionLinkProps, "scrollProgress"> {
  children: ReactElement[] | ReactElement;
  sectionClass?: string;
  containerClass?: string;
  setScrollProgress?: (num: number) => void;
}

export function SectionItem({
  id,
  children,
  sectionClass,
  containerClass,
  setScrollProgress = (num) => num,
}: SectionItemProps) {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end end"],
  });

  scrollYProgress.on("change", (current) => {
    setScrollProgress(current);
  });

  return (
    <section id={id} ref={sectionRef} className={`p-4 ${sectionClass}`}>
      <div
        className={`
          min-h-[calc(100vh-7rem)] p-4 mb-[7rem]
          rounded-[1rem]
          relative overflow-hidden
          flex justify-center items-center
          ${containerClass}
        `}
      >
        {children}
      </div>
    </section>
  );
}

type SectionItem = ReturnType<typeof SectionItem>;

export function SectionWrapper({ children }: { children: SectionItem[] }) {
  const [scrollStates, setScrollStates] = useState(
    children.reduce((acc, _child, index) => {
      acc[index] = 0;
      return acc;
    }, {} as Record<number, number>)
  );

  return (
    <>
      <menu
        className={`
                fixed left-[1rem] bottom-[6rem] z-10
                flex flex-row-reverse items-center gap-8 p-4
                uppercase text-xl tracking-wider 
              `}
        style={{
          transform:
            // "translate(0%, 50%) rotate(90deg) translate(-100%, -50%)", // text top to bottom (remove flex-row-reverse from parent)
            "translate(0%, 50%) rotate(-90deg) translate(0%, 50%)", // text bottom to top (add flex-row-reverse to parent)
          transformOrigin: "left",
        }}
      >
        {React.Children.map(children, (child, index) => (
          <SectionLink
            key={child.props.id}
            id={child.props.id}
            title={child.props.title}
            icon={child.props.icon}
            scrollProgress={scrollStates[index]}
          />
        ))}
        <span className="w-32 border-b border-foreground" />
      </menu>
      {React.Children.map(children, (child, index) =>
        React.cloneElement(child, {
          setScrollProgress: (value: number) =>
            setScrollStates((prev) => ({ ...prev, [index]: value })),
        })
      )}
    </>
  );
}
