"use client";

import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { motion } from "motion/react";
import Link from "next/link";

export type SectionLinkProps = {
  id: string;
  title?: string;
  icon?: string;
  scrollProgress?: number;
};

export default function SectionLink({
  id,
  title,
  icon,
  scrollProgress = 1,
}: SectionLinkProps) {
  const coords = {
    x1: 5,
    x2: 5,
    y1: 0,
    y2: "100%",
    strokeWidth: 3,
  };
  return (
    <Link href={"#" + id} className="flex place-content-center relative">
      {icon ? (
        <Icon icon={icon} width="1.75rem" className="-rotate-90" />
      ) : (
        <>
          {title || id}
          <svg
            height={"100%"}
            width={5}
            className={`
                absolute -left-[5px]
                ${[0, 1].includes(scrollProgress) ? "opacity-0" : "opacity-1"}
                transition-opacity
                duration-500
              `}
          >
            <line {...coords} stroke="var(--contour)" />
            <motion.line
              {...coords}
              initial={{ pathLength: scrollProgress }}
              animate={{ pathLength: scrollProgress }}
              stroke="var(--primary)"
            />
          </svg>
        </>
      )}
    </Link>
  );
}
