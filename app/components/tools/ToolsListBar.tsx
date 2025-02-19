"use client";

import { Tool } from "@/app/types/tools";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { AnimatePresence, motion } from "motion/react";
import { HTMLAttributes, useEffect, useRef, useState } from "react";
import useBoxSize from "../../hooks/useBoxSize";

interface Props extends Omit<HTMLAttributes<HTMLUListElement>, "ref"> {
  items: Tool[];
  onHeightChange?: (height: number) => void;
}

export default function ToolsListBar({
  items,
  onHeightChange,
  ...rest
}: Props) {
  const [itemLimit, setItemLimit] = useState(0);

  const hiddenRef = useRef<Tool[]>([]);
  const visibleRef = useRef<Tool[]>([]);

  const box = useBoxSize("all", ({ width, height }) => {
    const limit = Math.floor(width / height);

    if (height !== box.getPrevious("height")) {
      onHeightChange?.(height);
    }

    if (itemLimit === limit) return;

    hiddenRef.current = items.slice(limit);
    visibleRef.current = items.slice(0, limit);

    setItemLimit(limit);
  });

  useEffect(() => {
    const interval = setInterval(() => {
      let updated = false;

      const shuffle = visibleRef.current.map((item) => {
        if (Math.random() > 0.2) return item;

        updated = true;

        hiddenRef.current.unshift(item);
        return hiddenRef.current.pop()!;
      });

      if (!updated) return;

      visibleRef.current = shuffle;
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <ul ref={box.set} {...rest}>
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
    </ul>
  );
}
