"use client";

import { useAnimate, useInView } from "motion/react";
import Image from "next/image";
import { useEffect } from "react";
import { InterestsWithRefs } from "../types/interests";

type Props = {
  data: InterestsWithRefs;
};

export default function InterestItem({ data }: Props) {
  const { date, title, description, usedTools } = data;
  const jsDate = new Date(date);

  const [scope, animate] = useAnimate();
  const isInView = useInView(scope, { amount: 0.5, once: true });

  useEffect(() => {
    if (!isInView) return;

    animate([
      [
        scope.current,
        {
          opacity: [0, 1],
        },
        { duration: 0.75 },
      ],
      [
        "h2",
        {
          x: [-32, 0],
        },
        {
          at: "<",
          duration: 0.75,
        },
      ],
    ]);
  }, [isInView]);

  return (
    <li ref={scope} className="opacity-0 grid grid-cols-subgrid col-span-2">
      <h2 className="flex flex-col text-right">
        <span>{jsDate.getFullYear()}</span>
        <span className="max-md:hidden">
          {jsDate.toLocaleDateString("en-GB", { month: "long" }).toUpperCase()}
        </span>
        <span className="md:hidden">
          {jsDate.toLocaleDateString("en-GB", { month: "short" }).toUpperCase()}
        </span>
      </h2>
      <div className="flex flex-col gap-4 origin-top">
        <h3>{title}</h3>
        <p>{description}</p>
        <ul className="flex flex-row gap-4 justify-start flex-shrink">
          {usedTools.map(({ slug, src, alt }) => (
            <li key={slug}>
              <Image
                className="w-auto h-6"
                width={128}
                height={128}
                src={src}
                alt={alt}
              />
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}
