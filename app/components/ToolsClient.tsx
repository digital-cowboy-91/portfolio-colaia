"use client";

import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import useWindowSize from "../hooks/useWindowSize";
import { Tool } from "../types/tools";

type Props = {
  data: Tool[];
};

export default function ToolsClient({ data }: Props) {
  const [_render, setRender] = useState(0);
  const { width } = useWindowSize();

  const listRef = useRef<null | HTMLDivElement>(null);

  const hiddenRef = useRef<Tool[]>([]);
  const visibleRef = useRef<Tool[]>([]);

  useEffect(() => {
    if (!listRef.current) return;

    const oneRem = parseFloat(
      getComputedStyle(document.documentElement).fontSize
    );

    const limit = Math.floor(listRef.current.clientWidth / (oneRem * 4));

    visibleRef.current = data.slice(0, limit);
    hiddenRef.current = data.slice(limit);

    setRender(1);
  }, [listRef, width]);

  useEffect(() => {
    const interval = setInterval(() => {
      let updated = false;

      visibleRef.current = visibleRef.current.map((item) => {
        if (Math.random() > 0.2) return item;

        updated = true;

        hiddenRef.current.unshift(item);
        return hiddenRef.current.pop()!;
      });

      if (!updated) return;

      setRender((prev) => prev + 1);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={listRef}
      className={`
        h-16
        bg-foreground
        rounded-single
      `}
    >
      {visibleRef.current.length > 0 && (
        <motion.ul
          className={`
            flex justify-center items-center
            mx-auto
            text-background
          `}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {visibleRef.current.map(({ icon }, index) => (
            <AnimatePresence key={index} initial={false} mode="wait">
              <motion.li
                key={icon}
                className="size-16 p-single"
                exit={{ scale: 0 }}
                animate={{ scale: [0, 1] }}
                transition={{ duration: 0.5 }}
              >
                <Icon icon={icon} height="100%" />
              </motion.li>
            </AnimatePresence>
          ))}
        </motion.ul>
      )}
    </div>
  );
}
