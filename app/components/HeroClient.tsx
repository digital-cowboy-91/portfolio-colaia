"use client";

import portraitPic from "@/app/assets/profile-turtle-neck.webp";
import { stagger } from "motion";
import { useAnimate } from "motion/react";
import Image from "next/image";
import { RefObject, useEffect, useRef, useState } from "react";
import useWindowSize from "../hooks/useWindowSize";
import ContainerWrapper from "./ContainerWrapper";

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

    console.log(namesWrapperRef.current?.getBoundingClientRect());

    // Rescale
    setNamesScale(scaleToParent(namesRef));

    // Animate
    if (isReady.current) return;

    animate([
      ["#portrait", { opacity: [0, 1] }, { duration: 1 }],
      ["#hero__names", { opacity: [0, 1] }, { duration: 1, at: "-0.5" }],
      ["#hero__name-2", { scale: [1.2, 1] }, { duration: 1, at: "<" }],
      [
        "#hero__name-1",
        { y: ["6rem", 0], opacity: [0, 1] },
        { ease: "backOut", duration: 0.5, at: "-0.5" },
      ],
      [
        "#hero__name-3",
        { y: ["-6rem", 0], opacity: [0, 1] },
        { ease: "backOut", duration: 0.5, at: "<" },
      ],
      ["#hero__name-1", { x: "-2.5rem" }, { ease: "backOut", duration: 0.75 }],
      [
        "#hero__name-3",
        { x: "2.5rem" },
        { ease: "backOut", duration: 0.75, at: "<" },
      ],
      [
        "#hero__subheading>span",
        { y: [80, 0], opacity: 1 },
        { ease: "backOut", delay: stagger(0.2), duration: 0.75, at: "-0.2" },
      ],
    ]).then(() => {
      isReady.current = true;
    });
  }, [width]);

  return (
    <ContainerWrapper
      ref={scope}
      id="hero"
      className={`
        relative
        grid place-items-center
        grid-cols-[minmax(0,1fr)_minmax(300px,max-content)_minmax(0,1fr)]
          landscape:grid-cols-[minmax(0,1fr)_repeat(2,minmax(480px,960px))_minmax(0,1fr)]
        grid-rows-[50%_max-content_auto]
          landscape:grid-rows-[1fr_max-content_1fr]
        gap-y-4
        gap-x-8
        text-white
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
          opacity-0
          col-start-2
          landscape:col-start-3
          landscape:row-span-3
          object-contain
          h-full
          w-full
          portrait:self-end
          portrait:translate-y-[5rem]
          landscape:z-10
          `}
        style={{
          filter: "drop-shadow(20px 20px 30px rgba(0, 0, 0, 0.5))",
        }}
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
            margin: `${calculateMargin(namesRef, namesScale)}px 0`,
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
            text-4xl font-[300]
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
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 -z-10"
      >
        <rect
          width="100%"
          height="100%"
          x="0"
          y="0"
          style={{ fill: "url(#_Radial1)" }}
        />
        <defs>
          <radialGradient id="_Radial1" cx="0" cy="0" r="1">
            <stop
              offset="0"
              style={{ stopColor: "rgb(0,191,255)", stopOpacity: 1 }}
            />
            <stop
              offset="1"
              style={{ stopColor: "rgb(255,0,126)", stopOpacity: 0 }}
            />
          </radialGradient>
        </defs>
      </svg>
    </ContainerWrapper>
  );
}

// Helpers
function scaleToParent(element: RefObject<any>) {
  const childWidth = element.current?.clientWidth || 0;
  const parentWidth = element.current?.parentElement.clientWidth || 0;

  return parentWidth / childWidth;
}

function calculateMargin(
  element: RefObject<any>,
  scale: number,
  defaultValue: number = 0
) {
  const height = element?.current?.clientHeight;

  if (!height) return defaultValue;

  return (height * scale - height) / 2;
}
