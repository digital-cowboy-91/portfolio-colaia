"use client";
import portraitPic from "@/app/assets/profile-turtle-neck-v3.webp";
import { stagger, useAnimate } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import useWindowSize from "../hooks/useWindowSize";
import ContainerWrapper from "./ContainerWrapper";

export default function HeroClient() {
  // Reactive States
  const [scope, animate] = useAnimate();
  const [scale, setScale] = useState(1);
  const { width } = useWindowSize();

  // Non Reactive States
  const namesRef = useRef<null | HTMLDivElement>(null);
  const subheadingRef = useRef<null | HTMLDivElement>(null);

  const isVertical = useRef(true);
  const isReady = useRef(false);

  useEffect(() => {
    if (!namesRef.current || !subheadingRef.current) return;

    const isVerticalNew = scope.current.clientWidth < 768;
    const oneRem = parseFloat(
      window.getComputedStyle(document.documentElement).fontSize
    );

    const innerScopeWidth = scope.current.clientWidth - oneRem * 2; // simulate horizontal padding
    const col1Width = namesRef.current.scrollWidth;
    const col2Width = subheadingRef.current.scrollWidth;

    const computedScale =
      innerScopeWidth /
      (col1Width + (isVerticalNew ? 0 : col2Width + oneRem * 2));
    const newScale = computedScale < 1 ? computedScale : 1;

    // Update states
    setScale(newScale);
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
    <ContainerWrapper ref={scope} id="hero" className="flex items-center">
      <div
        className={`
          w-full
          h-3/4
          mb-[20vh]
          relative text-white
          flex
          justify-end xl:justify-center
          items-center xl:items-end 2xl:items-center
          xl:gap-8
          max-xl:flex-col
        `}
      >
        <div
          ref={namesRef}
          id="hero__names"
          className={`
            opacity-0
            h-[24rem]
            text-9xl leading-[0.75] font-black
            flex flex-col justify-center
            relative px-10
          `}
          style={{ scale }}
        >
          <span id="hero__name-1" className="absolute">
            COLAIA
          </span>
          <span id="hero__name-2" className="z-10">
            <span>COLAIA</span>
          </span>
          <span id="hero__name-3" className="absolute">
            COLAIA
          </span>
          <div
            className={`
              absolute -z-10 w-[150%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 aspect-square
            `}
            style={{
              background: `
                  radial-gradient(
                    50% 50% at 50% 50%,
                    hsl(273deg 71% 38% / 60%),
                    hsl(273deg 71% 38% / 20%),
                    transparent
                  )
                `,
            }}
          />
        </div>
        <div
          className={`
            h-full max-w-max flex items-center
            max-2xl:absolute max-2xl:-z-20 max-2xl:bottom-[12rem] max-2xl:h-[calc(100%-12rem)]
          `}
        >
          <Image
            src={portraitPic}
            alt=""
            className={`
            max-h-full w-auto object-contain
          `}
          />
        </div>
        <div
          ref={subheadingRef}
          id="hero__subheading"
          className={`
            xl:h-[24rem]
            text-5xl font-[300]
            grid grid-cols[auto_auto] gap-x-4
            content-start xl:content-center
            max-xl:text-center
            [&>span]:opacity-0
          `}
          style={{ scale }}
        >
          <span className="col-span-2">SELF-TAUGHT</span>
          <span>FULLSTACK</span>
          <span>CODER</span>
        </div>
      </div>
      <div
        id="hero__top-gradient"
        className="absolute inset-y-0 left-1/2 -translate-x-1/2 z-10"
      >
        <svg
          height="100%"
          viewBox="0 0 3600 1222"
          version="1.1"
          style={{
            fillRule: "evenodd",
            clipRule: "evenodd",
            strokeLinejoin: "round",
            strokeMiterlimit: 2,
          }}
        >
          <g transform="matrix(4.37894,0,0,2.09141,-12191.2,-80.9845)">
            <rect
              x="2784.05"
              y="38.723"
              width="822.118"
              height="584.162"
              style={{ fill: "url(#_Radial1)" }}
            />
          </g>
          <defs>
            <radialGradient
              id="_Radial1"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="matrix(-760.057,2.59852e-13,-2.51043e-14,-572.276,3195.11,167.862)"
            >
              <stop
                offset="0"
                style={{ stopColor: "rgb(11,13,18)", stopOpacity: 0 }}
              />
              <stop
                offset="0.4"
                style={{ stopColor: "rgb(24,12,49)", stopOpacity: 0.22 }}
              />
              <stop
                offset="0.7"
                style={{ stopColor: "rgb(209,2,58)", stopOpacity: 1 }}
              />
              <stop
                offset="1"
                style={{ stopColor: "rgb(20,0,163)", stopOpacity: 0 }}
              />
            </radialGradient>
          </defs>
        </svg>
      </div>
    </ContainerWrapper>
  );
}
