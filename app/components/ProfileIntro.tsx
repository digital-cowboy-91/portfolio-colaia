"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import useWindowSize from "../hooks/useWindowSize";

gsap.registerPlugin(useGSAP);

export default function ProfileIntro() {
  const scope = useRef(null);
  const namesRef = useRef<null | HTMLDivElement>(null);
  const [namesScale, setNamesScale] = useState(1);
  const { width } = useWindowSize();

  //   Rescale
  useEffect(() => {
    if (!namesRef.current) return;

    setNamesScale(scaleToParent(namesRef.current));
  }, [width]);

  //   Animate
  useGSAP(
    () => {
      gsap
        .timeline({ id: "profile-intro", paused: true })
        // ANIMATION
        .to("#hero__names", {
          opacity: 1,
          duration: 1,
        })
        .to(
          "#hero__name-1",
          {
            scale: 1,
            duration: 1,
          },
          "<"
        )
        .to(
          "#hero__name-2",
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "back.out",
          },
          "-=0.5"
        )
        .to(
          "#hero__name-3",
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "back.out",
          },
          "<"
        )
        .to("#hero__name-1", {
          x: "-2.5rem",
          duration: 0.75,
          ease: "back.out",
        })
        .to(
          "#hero__name-3",
          {
            x: "2.5rem",
            duration: 0.75,
            ease: "back.out",
          },
          "<"
        )
        .to(
          "#hero__name-2",
          {
            opacity: 0.5,
            filter: "blur(3px)",
          },
          "<"
        )
        .to(
          "#hero__name-3",
          {
            opacity: 0.25,
            filter: "blur(6px)",
          },
          "<"
        )
        .to("#hero__subheading>span", {
          rotateX: 0,
          opacity: 1,
          ease: "elastic.out(1,0.5)",
          duration: 1,
        });
    },
    { scope }
  );

  return (
    <div ref={scope} className="w-full flex flex-col gap-single">
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
