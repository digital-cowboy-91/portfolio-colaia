"use client";

import { Tool } from "@/app/types/tools";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import { useRef, useState } from "react";
import ToolsListBar from "./ToolsListBar";
import ToolsListTable from "./ToolsListTable";

type Props = {
  items: Tool[];
};

export default function ToolsClient({ items }: Props) {
  const trackerRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const { scrollYProgress } = useScroll({
    target: trackerRef,
    offset: ["start end", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (current) =>
    setIsInView(current === 1 ? true : false)
  );

  return (
    <div className="bg-[blue] p-4 h-[500px] max-h-screen flex justify-center items-start relative">
      <div ref={trackerRef} className="absolute inset-x-0 h-[50vh] -z-10" />
      <motion.div
        className={`bg-foreground text-background p-4 ${
          isInView ? "w-[720px]" : "w-full h-[var(--tools-h)]"
        } overflow-hidden`}
        style={{ borderRadius: "16px" }}
        layout
        transition={{ layout: { ease: "easeInOut" } }}
      >
        <AnimatePresence mode="popLayout">
          {isInView ? (
            <ToolsListTable key="table" items={items} />
          ) : (
            <ToolsListBar key="bar" items={items} />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
