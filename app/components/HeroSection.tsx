"use client";
import { stagger, useAnimate } from "motion/react";
import { useEffect, useRef, useState } from "react";
import useWindowSize from "../hooks/useWindowSize";

export default function ({ onReady }: { onReady: () => void }) {
  // Reactive States
  const [scope, animate] = useAnimate();
  const [scale, setScale] = useState(1);
  const { width } = useWindowSize();

  // Non Reactive States
  const tripleNameRef = useRef<null | HTMLDivElement>(null);
  const subheadingRef = useRef<null | HTMLDivElement>(null);
  const stripeRef = useRef<null | HTMLDivElement>(null);

  const layoutType = useRef<"vertical" | "horizontal">("vertical");
  const isReady = useRef(false);

  useEffect(() => {
    if (!tripleNameRef.current || !subheadingRef.current) return;

    const newLayout =
      scope.current.clientWidth >= 768 ? "horizontal" : "vertical";
    const oneRem = parseFloat(
      window.getComputedStyle(document.documentElement).fontSize
    );

    const innerScopeWidth = scope.current.clientWidth - oneRem * 4; // simulate horizontal padding
    const col1Width = tripleNameRef.current.scrollWidth;
    const col2Width = subheadingRef.current.scrollWidth;

    const computedScale =
      innerScopeWidth /
      (col1Width + (newLayout === "horizontal" ? col2Width + oneRem * 2 : 0));
    const newScale = computedScale < 1 ? computedScale : 1;

    // Update states
    setScale(newScale);
    layoutType.current = newLayout;

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
            stripeRef.current?.getBoundingClientRect().right! /
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
          duration: layoutType.current === "horizontal" ? 0.5 : 0,
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
    <section
      ref={scope}
      id="hero"
      className="flex flex-col items-center justify-center h-screen max-h-[800px]"
    >
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
          <div ref={stripeRef} id="stripe" />
        </div>
        <div
          ref={subheadingRef}
          id="subheading"
          className="w-0 py-8 overflow-x-clip grid grid-cols-[max_content,max_content] [&>span]:opacity-0 whitespace-pre text-5xl"
        >
          <span className="col-span-2">SELF-TAUGHT</span>
          <span>FULLSTACK </span>
          <span>CODER</span>
        </div>
      </div>
    </section>
  );
}
