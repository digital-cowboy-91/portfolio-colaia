"use client";

import { Tool } from "@/app/types/tools";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import { useRef, useState } from "react";
import ToolsList from "./ToolsList";

interface Props {
  items: Tool[];
}

export default function ToolsClient({ items }: Props) {
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
      console.log(true);
    } else if (resizeHeightComplete) {
      setResizeHeightComplete(false);
      console.log(false);
    }
  });

  console.log(resizeHeightComplete);

  return (
    <div
      ref={containerRef}
      className={`
        h-[500px] max-h-screen
      `}
    >
      <motion.div
        ref={wrapperRef}
        className="flex items-center justify-center"
        style={{ height: resizeHeight }}
      >
        {/* <motion.div
          ref={toolsRef}
          className="h-[100px] w-full bg-[white] text-[black]"
          animate={{
            width: resizeHeightComplete ? "500px" : "100%",
            height: resizeHeightComplete ? "100%" : "100px",
          }}
        >
          SECTION 2.1
        </motion.div> */}
        <div
          ref={toolsRef}
          className={`
            w-full text-background
            bg-foreground
            rounded-single
            ${
              resizeHeightComplete
                ? "h-full w-[720px] max-w-screen"
                : "h-[var(--tools-h)] w-full"
            }
            transition-all duration-500
          `}
        >
          <ToolsList items={items} renderWithDetails={resizeHeightComplete} />
        </div>
      </motion.div>
    </div>
  );
}
