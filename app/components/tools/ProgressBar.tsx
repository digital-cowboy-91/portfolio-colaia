"use client";

import { stagger } from "motion";
import { useAnimate } from "motion/react";
import { useEffect, useRef } from "react";

interface Props {
  points: string[];
  activePoint: number;
  fill: {
    active: string;
    inActive: string;
  };
}

export default function ProgressBar({ points, activePoint, fill }: Props) {
  const [scope, animate] = useAnimate();
  const progressLineRef = useRef(null);
  const activePointPrev = useRef(activePoint);

  useEffect(() => {
    const progressLine = progressLineRef.current;

    if (!progressLine) return;

    const isOdd = Boolean(points.length % 2);
    const newLen = isOdd
      ? activePoint / points.length
      : (activePoint - 1) / (points.length - 1);

    const timeMin = 0.2;
    const timePrev = timeMin * activePointPrev.current;
    const timeNext = timeMin * activePoint;

    animate([
      [progressLine, { pathLength: 0 }, { duration: timePrev }],
      [
        `.point:nth-child(-n+${activePointPrev.current})`,
        { fill: fill.inActive, scale: [1, 1.5, 1] },
        {
          at: "<",
          delay: stagger(timeMin, { from: "last" }),
          duration: timePrev,
        },
      ],
      [progressLine, { pathLength: newLen }, { duration: timeNext }],
      [
        `.point:nth-child(-n+${activePoint})`,
        { fill: fill.active, scale: [1, 1.5, 1] },
        { at: "<", delay: stagger(timeMin), duration: timeNext },
      ],
    ]);

    activePointPrev.current = activePoint;
  }, [activePoint]);

  return (
    <div ref={scope} className="flex justify-between relative">
      {points.map((val) => (
        <svg
          key={val}
          viewBox="0 0 100 100"
          className={`h-[8px] z-10 point`}
          style={{ fill: fill.inActive }}
        >
          <circle cx="50" cy="50" r="50" />
        </svg>
      ))}
      <svg width="100%" height="100%" className="absolute">
        <line
          x1="0"
          y1="50%"
          x2="100%"
          y2="50%"
          stroke={fill.inActive}
          strokeWidth={2}
        />
      </svg>
      <svg width="100%" height="100%" className="absolute">
        <line
          ref={progressLineRef}
          x1="0"
          y1="50%"
          x2="100%"
          y2="50%"
          stroke={fill.active}
          strokeWidth={2}
        />
      </svg>
    </div>
  );
}
