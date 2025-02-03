"use client";

import "./ToolsList.style.css";

import { Tool } from "@/app/types/tools";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { useAnimate } from "motion/react";
import { useEffect, useState } from "react";

interface Props {
  items: Tool[];
  renderWithDetails: boolean;
}

export default function ToolsList({ items, renderWithDetails }: Props) {
  console.log(1, { renderWithDetails });
  const [scope, animate] = useAnimate();
  const [layout, setLayout] = useState<"bar" | "grid">("bar");

  useEffect(() => {
    console.log(2, { renderWithDetails });
    const ul = scope.current;

    const play = async (asGrid: boolean) => {
      console.log(3, { asGrid });
      await animate(ul, { opacity: 0 }, { duration: 0.1 });
      console.log(4, { asGrid });
      setLayout(asGrid ? "grid" : "bar");
      animate(ul, { opacity: 1 }, { delay: 0.3 });
    };

    play(renderWithDetails);
  }, [renderWithDetails]);

  return (
    <ul
      ref={scope}
      className={`
        tools-list
        tools-list--${layout}
    `}
    >
      {items.map(({ icon, title }, index) => (
        <li key={icon} className="tools-item">
          <div className="h-full aspect-square">
            <Icon icon={icon} height="100%" width="100%" />
          </div>
          <div className="tool-label">{title}</div>
        </li>
      ))}
    </ul>
  );
}
