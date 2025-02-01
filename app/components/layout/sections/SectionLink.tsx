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
  return (
    <Link href={"#" + id} className="flex place-content-center relative">
      {icon ? (
        <Icon icon={icon} width="1.75rem" className="-rotate-90" />
      ) : (
        <>
          {title || id}
          <svg
            width={"100%"}
            height={5}
            className={`
                absolute inset-x-0 -bottom-[5px]
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
              stroke="var(--contour)"
            />
            <motion.line
              x1={0}
              y1={5}
              x2="100%"
              y2={5}
              initial={{ pathLength: scrollProgress }}
              animate={{ pathLength: scrollProgress }}
              strokeWidth={3}
              stroke="var(--primary)"
            />
          </svg>
        </>
      )}
    </Link>
  );
}
