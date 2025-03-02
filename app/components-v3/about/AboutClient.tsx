"use client";

import Code from "@/app/components-v3/Code";
import { Profile } from "@/app/types/profile";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { HTMLAttributes } from "react";

type Props = {
  data: Profile[];
};

export default function ProfileClient({ data }: Props) {
  const { snippet } = data[0];

  return (
    <div
      className={`
          bg-[#1e1e1e]
          border border-contour rounded-single
          overflow-hidden 
          drop-shadow-massive
          `}
      aria-label="Mock Visual Studio Code window"
    >
      <div
        className={`
            flex justify-end items-center gap-[16px]
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
            portrait:hidden
            border-s border-contour
            text-nowrap p-single
          `}
        >
          <div className="font-semibold mb-double">PORTFOLIO-COLAIA</div>
          <AboutMeTsx className="ps-single" />
        </div>
        <div className="border-s border-contour">
          <AboutMeTsx className="p-single border-e border-contour w-max" />
          <div className="p-single border-t border-contour">
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
