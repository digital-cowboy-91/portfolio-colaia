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
          bg-[#1e1e1e]
          border border-contour rounded-[1rem]
          overflow-hidden 
          max-w-[900px] mx-auto text-sm
          drop-shadow-massive
          `}
      aria-label="Mock Visual Studio Code window"
    >
      <div
        className={`
            flex justify-end items-center gap-2
            border-b border-contour
            p-[16px]
          `}
      >
        {[1, 2, 3].map((val) => (
          <div
            key={val}
            className="size-[16px] rounded-full border border-contour"
          />
        ))}
      </div>
      <div className="flex">
        <div className="w-[32px] shrink-0 md:w-[64px]" />
        <div
          className={`
            max-md:hidden
            border-s border-contour
            text-nowrap p-4
          `}
        >
          <div className="font-semibold mb-2">PORTFOLIO-COLAIA</div>
          <AboutMeTsx className="ps-2" />
        </div>
        <div className="border-s border-contour">
          <AboutMeTsx className="p-4 border-e border-contour w-max" />
          <div className="p-4 border-t border-contour">
            <Code snippet={snippet} />
          </div>
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
