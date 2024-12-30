"use client";

import Image from "next/image";

import { useAnimate, useInView } from "motion/react";
import { useEffect } from "react";
import { Tool } from "../types/tools";

type Props = {
  data: Tool[];
};

export default function ToolsClient({ data }: Props) {
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope, { once: true });

  useEffect(() => {
    if (!scope.current || !isInView) return;

    animate("#tool-list", {
      opacity: 1,
    });

    animate(
      "#tool-list",
      {
        x: -(scope.current.scrollWidth + 96) / 2,
      },
      {
        duration: data.length * 2 * 2,
        ease: "linear",
        repeatType: "loop",
        repeat: Infinity,
      }
    );
  }, [isInView]);

  return (
    <div
      ref={scope}
      className="h-24 relative overflow-hidden"
      style={{
        mask: "linear-gradient(90deg, transparent, white 20%, white 80%, transparent)",
      }}
    >
      <ul
        id="tool-list"
        className="opacity-0 flex flex-row gap-24 absolute -z-10"
      >
        {[...data, ...data].map(({ src, alt }, index) => (
          <li key={index} className="shrink-0 grow-0 size-24 relative">
            <Image
              src={src}
              alt={alt}
              width={128}
              height={128}
              className="mx-auto w-full h-full object-contain"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
