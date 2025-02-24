"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { HTMLAttributes, useRef } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  progress: number;
  direction?: "horizontal" | "vertical";
}

export default function ProgressBar({
  className,
  progress = 0,
  direction = "horizontal",
  ...rest
}: Props) {
  const scope = useRef<null | SVGLineElement>(null);
  const coords =
    direction === "horizontal"
      ? {
          x1: "0%",
          x2: "100%",
          y1: "50%",
          y2: "50%",
        }
      : {
          x1: "50%",
          x2: "50%",
          y1: "0%",
          y2: "100%",
        };

  useGSAP(
    () => {
      if (!scope.current) return;

      gsap.to(scope.current, {
        strokeDasharray: `${progress}px 1px`,
        strokeDashoffset: "0px",
        // duration: 0.2,
        ease: "linear",
      });
    },
    { dependencies: [progress], scope }
  );

  return (
    <div className={`relative ${className}`} {...rest}>
      <svg width="100%" height="100%" className="absolute">
        <line {...coords} strokeWidth="2" stroke="var(--contour)" />
        <line
          ref={scope}
          {...coords}
          pathLength="1"
          strokeWidth="2"
          stroke="var(--primary)"
        />
      </svg>
    </div>
  );
}
