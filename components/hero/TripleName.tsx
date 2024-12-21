"use client";

import {
  AnimationPlaybackControls,
  animate,
  useInView,
  useScroll,
} from "motion/react";
import { useEffect, useRef } from "react";

export default function () {
  const scope = useRef<AnimationPlaybackControls>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useScroll().scrollYProgress.on("change", (progress) => {
    if (!scope.current) return;
    scope.current.time = progress * scope.current.duration;
  });

  const onMount = () =>
    animate([
      ["#name-1", { y: "-6rem" }, { ease: "backOut", at: 0 }],
      ["#name-3", { y: "6rem" }, { ease: "backOut", at: 0 }],
      ["#name-1", { x: "-2.5rem" }, { ease: "backInOut", at: 0.5 }],
      ["#name-3", { x: "2.5rem" }, { ease: "backInOut", at: 0.5 }],
    ]);

  const onScroll = () =>
    animate([
      [
        "#name-1",
        { x: ["-2.5rem", "10rem"], opacity: 0 },
        { ease: "backOut", at: 0.5 },
      ],
      [
        "#name-3",
        { x: ["2.5rem", "-10rem"], opacity: 0 },
        { ease: "backOut", at: 0.5 },
      ],
    ]);

  useEffect(() => {
    onMount().play();

    scope.current = onScroll();

    scope.current.pause();
  }, [inView]);

  return (
    <div
      ref={ref}
      className="text-9xl leading-[0.75] font-black flex relative [&>span]:my-24 [&>span]:mx-10 [&>:nth-child(odd)]:absolute"
    >
      <span id="name-1">COLAIA</span>
      <span id="name-2">COLAIA</span>
      <span id="name-3">COLAIA</span>
    </div>
  );
}
