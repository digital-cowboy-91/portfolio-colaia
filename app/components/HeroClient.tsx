"use client";
import portraitPic from "@/app/assets/profile-turtle-neck-v3.webp";
import { stagger } from "motion";
import { useAnimate } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import useWindowSize from "../hooks/useWindowSize";
import ContainerWrapper from "./ContainerWrapper";

export default function HeroClient() {
  // Reactive States
  const [scope, animate] = useAnimate();
  const [scaleNames, setScaleNames] = useState(1);
  const { width } = useWindowSize();

  // Non Reactive States
  const nameWrapperRef = useRef<null | HTMLDivElement>(null);
  const namesRef = useRef<null | HTMLDivElement>(null);
  const subheadingRef = useRef<null | HTMLDivElement>(null);
  const imageRef = useRef<null | HTMLImageElement>(null);

  const isVertical = useRef(true);
  const isReady = useRef(false);

  useEffect(() => {
    if (!namesRef.current || !subheadingRef.current) return;

    const isVerticalNew = scope.current.clientWidth < 768;

    const func = (el) => {
      const childWidth = el.current?.clientWidth || 0;
      const parentWidth = el.current?.parentElement.clientWidth || 0;

      return parentWidth / childWidth;
    };

    // Update states
    setScaleNames(func(namesRef));

    isVertical.current = isVerticalNew;

    // Animate
    if (isReady.current) return;

    animate([
      ["#hero__names", { opacity: [0, 1] }, { delay: 0.3, duration: 1 }],
      ["#hero__name-2", { scale: [1.2, 1] }, { duration: 1, at: "<" }],
      [
        "#hero__name-1",
        { y: "-6rem", opacity: [0, 1] },
        { ease: "backOut", duration: 0.5, at: "-0.5" },
      ],
      [
        "#hero__name-3",
        { y: "6rem", opacity: [0, 1] },
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
        grid-cols-[minmax(2rem,1fr)_minmax(300px,576px)_minmax(2rem,1fr)]
          lg:grid-cols-[minmax(0,1fr)_repeat(2,minmax(480px,960px))_minmax(0,1fr)]
        grid-rows-[50%_max-content_auto]
          lg:grid-rows-[1fr_minmax(100px,max-content)_1fr]
        gap-4
        text-white
      `}
    >
      <Image
        ref={imageRef}
        src={portraitPic}
        alt=""
        className={`
          col-start-2
          lg:col-start-3
          lg:row-span-3
          object-contain
          h-max
          w-full
          max-lg:self-end
          `}
      />
      <div
        ref={nameWrapperRef}
        className={`
          col-row-2
          col-start-2
          w-full h-full
          flex place-content-center
          relative
        `}
      >
        <div
          ref={namesRef}
          id="hero__names"
          className={`
            text-9xl leading-[0.75] font-black
            flex flex-col justify-center
            relative px-10
            overflow-x-clip
          `}
          style={{
            scale: scaleNames,
            margin: `${(namesRef.current?.clientHeight || 1) * scaleNames}px 0`,
          }}
        >
          <span id="hero__name-1" className="absolute">
            COLAIA
          </span>
          <span id="hero__name-2" className="z-10">
            COLAIA
          </span>
          <span id="hero__name-3" className="absolute">
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
          `}
      >
        <span>THE</span>
        <span>FULLSTACK</span>
        <span>CODER</span>
      </div>
    </ContainerWrapper>
  );
}
