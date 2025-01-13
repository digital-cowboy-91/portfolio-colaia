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

  const wrapperRef = useRef<null | HTMLDivElement>(null);
  const ulRef = useRef<null | HTMLUListElement>(null);

  const hiddenRef = useRef<Tool[]>([]);
  const visibleRef = useRef<Tool[]>([]);

  useEffect(() => {
    if (!wrapperRef.current || !ulRef.current) return;

    const limit = Math.floor(
      wrapperRef.current.clientWidth / ulRef.current.clientHeight
    );

    visibleRef.current = data.slice(0, limit);
    hiddenRef.current = data.slice(limit);

    setRender(1);
  }, [wrapperRef, width]);

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
      ref={wrapperRef}
      className={`
        bg-foreground
        rounded-single
      `}
    >
      <motion.ul
        ref={ulRef}
        className={`
          flex justify-center items-center
          h-[48px] p-[12px] gap-[24px]
          md:h-[64px] md:p-[16px] md:gap-[32px]
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
              className="h-full aspect-square"
              exit={{ scale: 0 }}
              animate={{ scale: [0, 1] }}
              transition={{ duration: 0.5 }}
            >
              <Icon icon={icon} height="100%" width="100%" />
            </motion.li>
          </AnimatePresence>
        ))}
      </motion.ul>
    </div>
  );
}
