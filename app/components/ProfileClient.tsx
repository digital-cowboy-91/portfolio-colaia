"use client";

import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { useAnimate } from "motion/react";
import { HTMLAttributes } from "react";
import { Profile } from "../types/profile";
import Code from "./Code";

type Props = {
  data: Profile[];
};

export default function ProfileClient({ data }: Props) {
  const { snippet } = data[0];

  const [scope, animate] = useAnimate();

  return (
    <div
      ref={scope}
      className={`
          bg-contour
          border border-contour rounded-[1rem]
          grid gap-px
          grid-cols-[50px_minmax(max-content,200px)_auto]
          grid-rows-[repeat(2,auto)]
          [&>div]:bg-[#1e1e1e] overflow-hidden 
          max-w-[900px] mx-auto text-sm
        `}
      aria-label="Mock Visual Studio Code window"
    >
      <div
        className={`
            col-span-3
            flex justify-end items-center gap-2
            p-4
          `}
      >
        {[1, 2, 3].map((val) => (
          <div
            key={val}
            className="size-4 rounded-full border border-contour"
          />
        ))}
      </div>
      <div />
      <div className="p-4">
        <div className="font-semibold mb-2">PORTFOLIO-COLAIA</div>
        <AboutMeTsx className="ps-2" />
      </div>
      <div>
        <div>
          <AboutMeTsx className="p-4 border-e border-contour w-max" />
        </div>
        <div className="p-4 border-t border-contour">
          <Code snippet={snippet} />
        </div>
      </div>
    </div>
  );
}

function AboutMeTsx({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`
        flex items-center gap-2
        ${className}
      `}
      {...props}
    >
      <Icon icon="simple-icons:react" />
      <span>AboutMe.tsx</span>
    </div>
  );
}
