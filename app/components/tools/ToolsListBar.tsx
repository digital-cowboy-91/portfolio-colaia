import useWindowSize from "@/app/hooks/useWindowSize";
import { Tool } from "@/app/types/tools";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

type Props = {
  items: Tool[];
};

export default function ToolsListBar({ items }: Props) {
  const [_render, setRender] = useState(0);
  const { width } = useWindowSize();

  const ulRef = useRef<null | HTMLUListElement>(null);

  const hiddenRef = useRef<Tool[]>([]);
  const visibleRef = useRef<Tool[]>([]);

  useEffect(() => {
    if (!ulRef.current) return;

    const ul = ulRef.current;

    const limit = Math.floor(ul.clientWidth / ul.clientHeight / 2);

    visibleRef.current = items.slice(0, limit);
    hiddenRef.current = items.slice(limit);

    setRender(1);
  }, [width]);

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
    <motion.ul
      ref={ulRef}
      className={`
        h-full
        flex justify-center items-center
        gap-[var(--tools-gap)]
        overflow-hidden
        `}
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 0.3 },
      }}
      exit={{ opacity: 0, transition: { duration: 0 } }}
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
  );
}
