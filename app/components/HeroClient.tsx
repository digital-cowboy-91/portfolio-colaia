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
  const [scaleNames, setScaleNames] = useState(1);
  const [scaleSubheading, setScaleSubheading] = useState(1);
  const { width } = useWindowSize();

  // Non Reactive States
  const wrapperRef = useRef<null | HTMLDivElement>(null);
  const namesRef = useRef<null | HTMLDivElement>(null);
  const subheadingRef = useRef<null | HTMLDivElement>(null);
  const imageRef = useRef<null | HTMLImageElement>(null);

  const isVertical = useRef(true);
  const isReady = useRef(false);

  useEffect(() => {
    if (!namesRef.current || !subheadingRef.current) return;

    const isVerticalNew = scope.current.clientWidth < 768;

    const oneRem = parseFloat(
      window.getComputedStyle(document.documentElement).fontSize
    );

    const innerScopeWidth = scope.current.clientWidth - oneRem * 2; // simulate horizontal padding

    const col1Width = namesRef.current.clientWidth;
    const col2Width = subheadingRef.current.clientWidth;

    const newScaleNames = innerScopeWidth / col1Width;
    const newScaleSubheading = innerScopeWidth / col2Width;

    // const func = (el) => {
    //   const offsetLeft = el.current?.offsetLeft || 0;
    //   const clientWidth = el.current?.clientWidth || 0;

    //   if (offsetLeft > clientWidth) {
    //     return clientWidth / offsetLeft;
    //   }

    //   if (offsetLeft < 0) {
    //     return (clientWidth + offsetLeft) / clientWidth;
    //   }

    //   return 1;
    // };

    const func = (el) => {
      const childWidth = el.current?.clientWidth || 0;
      const parentWidth = el.current?.parentElement.clientWidth || 0;

      return parentWidth < childWidth ? parentWidth / childWidth : 1;
    };

    // Update states
    setScaleNames(func(namesRef));
    setScaleSubheading(func(subheadingRef));

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
    <ContainerWrapper ref={scope} id="hero" className="relative">
      <Image
        ref={imageRef}
        src={portraitPic}
        alt=""
        className={`
            object-contain
            h-[100%] portrait:h-[60%] landscape:max-w-[30%]
            absolute left-1/2 -translate-x-1/2 mx-auto
          `}
      />
      <div
        ref={wrapperRef}
        className={`
          top-[50%] portrait:top-[60%]
          -translate-y-1/2
          relative text-white
          flex justify-center items-center max-md:flex-col
          max-md:flex-col
          gap-8
        `}
      >
        <div
          className="w-full md:w-max h-max overflow-hidden flex justify-center 2xl:justify-end items-center flex-1"
          // style={{ overflow: "unset" }}
        >
          <div
            ref={namesRef}
            id="hero__names"
            className={`
            opacity-0
            text-9xl leading-[0.75] font-black
            flex flex-col justify-center
            relative px-10
            overflow-x-clip
          `}
            style={{
              scale: scaleNames,
              margin: `${
                (namesRef.current?.clientHeight || 1) * scaleNames
              }px 0`,
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
        </div>

        <div
          className="portrait:hidden"
          style={{ width: imageRef.current?.clientWidth || 0 }}
        />

        <div className="w-full md:w-max h-max overflow-hidden flex justify-center 2xl:justify-start items-center flex-1">
          <div
            ref={subheadingRef}
            id="hero__subheading"
            className={`
            justify-self-start
            text-5xl font-[300]
            grid grid-cols[auto_auto] gap-x-4
            max-md:text-center
            [&>span]:opacity-0
          `}
            style={{ scale: scaleSubheading }}
          >
            <span className="col-span-2">SELF-TAUGHT</span>
            <span>FULLSTACK</span>
            <span>CODER</span>
          </div>
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
