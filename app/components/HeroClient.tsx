"use client";

import portraitPic from "@/app/assets/profile-turtle-neck.webp";
import { stagger } from "motion";
import { useAnimate } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import useWindowSize from "../hooks/useWindowSize";

export default function HeroClient() {
  // Reactive States
  const [scope, animate] = useAnimate();
  const [namesScale, setNamesScale] = useState(1);
  const { width } = useWindowSize();

  // Non Reactive States
  const namesWrapperRef = useRef<null | HTMLDivElement>(null);
  const namesRef = useRef<null | HTMLDivElement>(null);
  const subheadingRef = useRef<null | HTMLDivElement>(null);
  const imageRef = useRef<null | HTMLImageElement>(null);
  const isReady = useRef(false);

  // Window width effect
  useEffect(() => {
    if (!namesRef.current || !subheadingRef.current) return;

    // Rescale
    setNamesScale(scaleToParent(namesRef.current));

    // Animate
    if (isReady.current) return;

    animate([
      ["#portrait", { opacity: [0, 1] }, { duration: 1 }],
      ["#hero__names", { opacity: [0, 1] }, { duration: 1, at: "-0.5" }],
      ["#hero__name-1", { scale: [1.2, 1] }, { duration: 1, at: "<" }],
      [
        "#hero__name-2",
        { y: ["-6rem", 0], opacity: [0, 1] },
        { ease: "backOut", duration: 0.5, at: "-0.5" },
      ],
      [
        "#hero__name-3",
        { y: ["-12rem", 0], opacity: [0, 1] },
        { ease: "backOut", duration: 0.5, at: "<" },
      ],
      ["#hero__name-1", { x: "-2.5rem" }, { ease: "backOut", duration: 0.75 }],
      [
        "#hero__name-3",
        { x: "2.5rem" },
        { ease: "backOut", duration: 0.75, at: "<" },
      ],
      ["#hero__name-2", { filter: "blur(3px)", opacity: 0.5 }, { at: "<" }],
      ["#hero__name-3", { filter: "blur(6px)", opacity: 0.25 }, { at: "<" }],
      [
        "#hero__subheading>span",
        { y: ["3rem", 0], opacity: 1 },
        { ease: "backOut", delay: stagger(0.2), duration: 0.75, at: "+.2" },
      ],
    ]).then(() => {
      isReady.current = true;
    });
  }, [width]);

  return (
    <section
      ref={scope}
      className={`
        relative h-full
        grid place-items-center
        grid-cols-[minmax(0,1fr)_minmax(300px,max-content)_minmax(0,1fr)]
          landscape:grid-cols-[minmax(0,1fr)_repeat(2,minmax(300px,960px))_minmax(0,1fr)]
        grid-rows-[50%_max-content_auto]
          landscape:grid-rows-[1fr_max-content_1fr]
        gap-y-single
        gap-x-double
      `}
    >
      <Image
        id="portrait"
        ref={imageRef}
        src={portraitPic}
        alt=""
        quality={100}
        priority
        className={`
            col-start-2
            landscape:col-start-3
            landscape:row-span-3
            h-full w-full object-contain
            portrait:self-end
            portrait:translate-y-[5rem]
            landscape:z-10
            drop-shadow-massive
            opacity-0
          `}
      />
      <div
        ref={namesWrapperRef}
        className={`
          col-row-2
          col-start-2
          w-full
          flex place-content-center
          relative
        `}
      >
        <div
          ref={namesRef}
          id="hero__names"
          className={`
            opacity-0
            text-9xl leading-[0.75] font-black
            flex flex-col justify-center
            px-10
            relative
          `}
          style={{
            scale: namesScale,
            margin: `${calculateMargin(namesRef.current, namesScale)}px 0`,
          }}
        >
          <span id="hero__name-1" className="-translate-x-[2.5rem]">
            COLAIA
          </span>
          <span id="hero__name-2">COLAIA</span>
          <span id="hero__name-3" className="translate-x-[2.5rem]">
            COLAIA
          </span>
        </div>
      </div>
      <div
        ref={subheadingRef}
        id="hero__subheading"
        className={`
            col-start-2
            row-start-3
            self-start
            text-2xl sm:text-4xl font-[300]
            w-full
            flex justify-end gap-x-3 flex-wrap
            [&>span]:opacity-0
            relative
          `}
      >
        <span>THE</span>
        <span>FULLSTACK</span>
        <span>CODER</span>
      </div>
    </section>
  );
}

// Helpers
function scaleToParent(element: HTMLDivElement | null) {
  if (!element) return 1;

  const childWidth = element.clientWidth;
  const parentWidth = element.parentElement?.clientWidth ?? 1;

  return parentWidth / childWidth;
}

function calculateMargin(
  element: HTMLDivElement | null,
  scale: number,
  defaultValue: number = 0
) {
  if (!element) return defaultValue;

  const height = element?.clientHeight;

  return (height * scale - height) / 2;
}
