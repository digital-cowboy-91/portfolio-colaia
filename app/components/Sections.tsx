"use client";

import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { motion, useScroll } from "motion/react";
import Link from "next/link";
import React, { HTMLAttributes, useRef, useState } from "react";

interface Props extends HTMLAttributes<HTMLElement> {
  id: string;
  title?: string;
  icon?: string;
  scrollProgress?: (num: number) => void;
}

type SectionItem = ReturnType<typeof SectionItem>;

export function SectionItem({
  children,
  className,
  scrollProgress = (num) => num,
  ...props
}: Props) {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "start start"],
  });

  scrollYProgress.on("change", (current) => {
    // console.log(current);
    scrollProgress(current);
  });

  return (
    <section ref={sectionRef} className={`p-4 ${className}`} {...props}>
      <div
        className={`
          h-[calc(100vh-7rem)] p-4 mb-[7rem]
          rounded-[1rem]
          relative overflow-hidden
          flex justify-center items-center
        `}
      >
        {children}
      </div>
    </section>
  );
}

type SectionLinkProps = {
  id: string;
  title?: string;
  icon?: string;
  scrollProgress?: number;
};

function SectionLink({ id, title, icon, scrollProgress }: SectionLinkProps) {
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
              x2="100%"
              y1={5}
              x1={0}
              y2={5}
              strokeWidth={3}
              stroke="rgba(255,255,255,0.3)"
            />
            <motion.line
              x2="100%"
              y1={5}
              x1={0}
              y2={5}
              initial={{ pathLength: 1 - scrollProgress }}
              animate={{ pathLength: 1 - scrollProgress }}
              strokeWidth={3}
              stroke="rgba(255,255,255,1)"
            />
          </svg>
        </>
      )}
    </Link>
  );
}

export function SectionWrapper({ children }: { children: SectionItem[] }) {
  const [scrollStates, setScrollStates] = useState(
    children.reduce((acc, _child, index) => {
      acc[index] = 0;
      return acc;
    }, {})
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
            // "translate(0%, 50%) rotate(90deg) translate(-100%, -50%)", // text top to bottom
            "translate(0%, 50%) rotate(-90deg) translate(0%, 50%)", // text bottom to top
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
          scrollProgress: (value: number) =>
            setScrollStates((prev) => ({ ...prev, [index]: value })),
        })
      )}
    </>
  );
}
