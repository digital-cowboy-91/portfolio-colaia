"use client";

import Image from "next/image";

import { useAnimate } from "motion/react";
import { useEffect } from "react";

type Props = {
  data: any[];
};

export default function ({ data }: Props) {
  const tools = data.sort((a, b) => 0.5 - Math.random());

  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (!scope.current) return;

    animate(
      "#tool-list",
      {
        x: -(scope.current.scrollWidth + 96) / 2,
      },
      {
        duration: tools.length * 2 * 2,
        ease: "linear",
        repeatType: "loop",
        repeat: Infinity,
      }
    );
  }, []);

  return (
    <div
      ref={scope}
      className="h-24 relative overflow-hidden"
      style={{
        mask: "linear-gradient(90deg, transparent, white 20%, white 80%, transparent)",
      }}
    >
      <ul id="tool-list" className="flex flex-row gap-24 absolute -z-10">
        {[...tools, ...tools].map(({ src, title, alt }, index) => (
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
