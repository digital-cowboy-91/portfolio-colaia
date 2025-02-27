"use client";

import useBoxSize from "@/app/hooks/useBoxSize";
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
  const [height, setHeight] = useState<number | "auto">("auto");

  const box = useBoxSize();

  useMotionValueEvent(scrollYProgress, "change", (current) =>
    setIsInView(current === 1 ? true : false)
  );

  return (
    <div ref={box.set} className="flex justify-center items-start relative">
      <div
        ref={trackerRef}
        className="absolute inset-x-0 -z-10"
        style={{
          height: "calc(var(--tools-h) + var(--spacing-single) * 2)",
        }}
      />
      <motion.div
        className={`bg-foreground text-background rounded-single overflow-hidden`}
        initial={false}
        animate={{
          height,
          width: isInView ? 900 : box.get("width"),
        }}
        transition={{ ease: "backInOut" }}
      >
        <AnimatePresence initial={false}>
          <motion.div
            key={+isInView}
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { delay: 0.3 },
            }}
            exit={{ opacity: 0, transition: { duration: 0 } }}
          >
            {isInView ? (
              <ToolsListTable
                // key="table"
                items={items}
                onHeightChange={(height) => setHeight(height)}
                className="p-single max-w-[900px]"
              />
            ) : (
              <ToolsListBar
                // key="bar"
                className={`
                  h-[var(--tools-h)] w-full
                  p-[var(--tools-p)]
                  flex justify-center items-center
                  gap-[var(--tools-gap)]
                  overflow-hidden
                  `}
                items={items}
                onHeightChange={(height) => setHeight(height)}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
