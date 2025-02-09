import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  direction?: "horizontal" | "vertical";
}

export default function SVGLine({
  className,
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
        <line {...coords} strokeWidth="2" stroke="var(--foreground)" />
      </svg>
    </div>
  );
}
