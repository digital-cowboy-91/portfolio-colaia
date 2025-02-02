"use client";

import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import { useRef, useState } from "react";

export default function Container() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const toolsRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const resizeHeight = useMotionValue("auto");
  const [resizeHeightComplete, setResizeHeightComplete] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    resizeHeight.set(current * 100 + "%");

    if (current === 1) {
      setResizeHeightComplete(true);
    } else if (resizeHeightComplete) {
      setResizeHeightComplete(false);
    }
  });

  return (
    <div ref={containerRef} className={`h-[500px] bg-[blue]`}>
      <motion.div
        ref={wrapperRef}
        className="flex items-center justify-center"
        style={{ height: resizeHeight }}
      >
        <motion.div
          ref={toolsRef}
          className="h-[100px] w-full bg-[white] text-[black]"
          animate={{
            width: resizeHeightComplete ? "500px" : "100%",
            height: resizeHeightComplete ? "100%" : "100px",
          }}
        >
          SECTION 2.1
        </motion.div>
      </motion.div>
    </div>
  );
}
