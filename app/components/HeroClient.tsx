"use client";
import { stagger, useAnimate } from "motion/react";
import { useEffect, useRef, useState } from "react";
import useWindowSize from "../hooks/useWindowSize";
import SectionWrapper from "./SectionWrapper";

type Props = {
  onReady: () => void;
};

export default function HeroClient({ onReady }: Props) {
  // Reactive States
  const [scope, animate] = useAnimate();
  const [scale, setScale] = useState(1);
  const { width } = useWindowSize();

  // Non Reactive States
  const tripleNameRef = useRef<null | HTMLDivElement>(null);
  const subheadingRef = useRef<null | HTMLDivElement>(null);
  const stripeRef = useRef<null | HTMLDivElement>(null);

  const isVertical = useRef(true);
  const isReady = useRef(false);

  useEffect(() => {
    if (!tripleNameRef.current || !subheadingRef.current || !stripeRef.current)
      return;

    const isVerticalNew = scope.current.clientWidth < 768;
    const oneRem = parseFloat(
      window.getComputedStyle(document.documentElement).fontSize
    );

    const innerScopeWidth =
      scope.current.clientWidth - oneRem * (isVerticalNew ? 2 : 4); // simulate horizontal padding
    const col1Width = tripleNameRef.current.scrollWidth;
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
      ["#triple-name", { opacity: [0, 1] }, { delay: 0.3, duration: 1 }],
      ["#name-2", { scale: [1.2, 1] }, { duration: 1, at: "<" }],
      [
        "#name-1",
        { y: "-6rem", opacity: [0, 1] },
        { ease: "backOut", duration: 0.5, at: "-0.5" },
      ],
      [
        "#name-3",
        { y: "6rem", opacity: [0, 1] },
        { ease: "backOut", duration: 0.5, at: "<" },
      ],
      ["#name-1", { x: "-2.5rem" }, { ease: "backOut", duration: 0.75 }],
      [
        "#name-3",
        { x: "2.5rem" },
        { ease: "backOut", duration: 0.75, at: "<" },
      ],
      [
        "#stripe",
        {
          width:
            stripeRef.current.getBoundingClientRect().right! /
            newScale /
            Math.cos(22 * (Math.PI / 180)),
        },
        { duration: 0.5, at: "-0.2" },
      ],
      [
        "#subheading",
        { width: subheadingRef.current.scrollWidth + "px" },
        {
          ease: "easeInOut",
          duration: isVertical.current ? 0 : 0.5,
          at: "<",
        },
      ],
      [
        "#subheading>span",
        { y: [80, 0], opacity: 1 },
        { ease: "backOut", delay: stagger(0.2), duration: 0.75, at: "<" },
      ],
      ["#nav-bar", { opacity: 1 }],
      [
        "#nav-bar",
        { y: ["1rem", "0rem"] },
        { type: "spring", stiffness: 500, damping: 10, velocity: 2, at: "<" },
      ],
    ]).then(() => {
      isReady.current = true;
      onReady();
    });
  }, [width]);

  return (
    <SectionWrapper ref={scope} id="hero" className="mt-0 pt-32">
      <div
        id="hero-wrapper"
        className="flex flex-col md:flex-row justify-center items-center gap-8"
        style={{
          scale,
        }}
      >
        <div
          ref={tripleNameRef}
          id="triple-name"
          className="text-9xl leading-[0.75] font-black flex relative [&>span]:my-24 [&>span]:mx-10 [&>:nth-child(odd)]:absolute opacity-0"
        >
          <span id="name-1">COLAIA</span>
          <span id="name-2">COLAIA</span>
          <span id="name-3">COLAIA</span>
          <div
            ref={stripeRef}
            id="stripe"
            className="absolute -z-10 w-0 h-[172%] bg"
            style={{
              background: "linear-gradient(to right, #b3ffab, #12fff7)",
              transform: "skew(22deg, -22deg)",
              transformOrigin: "bottom right",
              bottom: "-1.125rem",
              right: "-2.625rem",
            }}
          />
        </div>
        <div
          ref={subheadingRef}
          id="subheading"
          className="w-0 py-8 overflow-x-clip grid grid-cols-[max_content,max_content] [&>span]:opacity-0 whitespace-pre text-5xl font-[300]"
        >
          <span className="col-span-2">SELF-TAUGHT</span>
          <span>FULLSTACK </span>
          <span>CODER</span>
        </div>
      </div>
    </SectionWrapper>
  );
}
