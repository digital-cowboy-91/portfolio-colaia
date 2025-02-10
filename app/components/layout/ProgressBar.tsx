import { motion } from "motion/react";
import { HTMLAttributes } from "react";

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
  return (
    <div className={`relative ${className}`} {...rest}>
      <svg width="100%" height="100%" className="absolute">
        <line {...coords} strokeWidth="2" stroke="var(--contour)" />
        <motion.line
          {...coords}
          initial={{ pathLength: progress }}
          animate={{ pathLength: progress }}
          strokeWidth="2"
          stroke="var(--foreground)"
        />
      </svg>
    </div>
  );
}
