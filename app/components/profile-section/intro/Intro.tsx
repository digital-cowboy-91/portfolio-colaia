"use client";

import { useLayoutEffect, useRef, useState } from "react";
import useWindowSize from "../../../hooks/useWindowSize";

export default function Intro() {
  const namesRef = useRef<null | HTMLDivElement>(null);
  const [namesScale, setNamesScale] = useState(1);
  const { width } = useWindowSize();

  useLayoutEffect(() => {
    if (!namesRef.current) return;

    setNamesScale(scaleToParent(namesRef.current));
  }, [width]);

  return (
    <div className="w-full flex flex-col gap-single">
      <div className="w-full flex justify-center relative">
        <div
          ref={namesRef}
          id="hero__names"
          className="text-9xl leading-[0.75] font-black flex flex-col justify-center px-10 relative"
          style={{
            scale: namesScale,
            margin: `${calculateMargin(namesRef.current, namesScale)}px 0`,
            opacity: 0,
          }}
        >
          <span
            id="hero__name-1"
            className="-translate-x-[2.5rem]"
            style={{ scale: 1.2, transform: "translate(0px, 0px)" }}
          >
            COLAIA
          </span>
          <span
            id="hero__name-2"
            style={{ opacity: 0, transform: "translate(0px, -6rem)" }}
          >
            COLAIA
          </span>
          <span
            id="hero__name-3"
            className="translate-x-[2.5rem]"
            style={{ opacity: 0, transform: "translate(0px, -12rem)" }}
          >
            COLAIA
          </span>
        </div>
      </div>
      <div
        id="hero__subheading"
        className="w-max self-end text-2xl sm:text-4xl"
        style={{
          perspective: "200px",
        }}
      >
        <span
          className="block"
          style={{
            transformOrigin: "top",
            transform: "rotateX(-90deg)",
            opacity: 0,
          }}
        >
          THE FULLSTACK CODER
        </span>
      </div>
    </div>
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
