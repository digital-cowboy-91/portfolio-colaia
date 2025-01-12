"use client";

import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { useAnimate, useInView } from "motion/react";
import { useEffect } from "react";
import { InterestsWithRefs } from "../types/interests";

type Props = {
  data: InterestsWithRefs;
};

export default function InterestItem({ data }: Props) {
  const { date, title, description, usedTools } = data;
  const jsDate = new Date(date);

  const [scope, animate] = useAnimate();
  const isInView = useInView(scope, {
    margin: "0px 0px -96px 0px",
    amount: 1,
    once: true,
  });

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
    <div ref={scope} className="flex flex-col gap-4 origin-top">
      <h3 className="relative">
        {title}
        <div className="size-[8px] bg-contour rounded-full border-background border-2 absolute top-1/2 -translate-y-1/2 -left-4 -translate-x-1/2" />
      </h3>
      <p>{description}</p>
      <ul className="flex flex-row gap-4 justify-start flex-shrink">
        {usedTools.map(({ slug, icon }) => (
          <li key={slug}>
            <Icon className="w-auto h-6" icon={icon} />
          </li>
        ))}
      </ul>
    </div>
  );
}
