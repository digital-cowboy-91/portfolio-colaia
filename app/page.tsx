"use client";
import { AnimationPlaybackControls, animate, useScroll } from "motion/react";
import { useEffect, useRef } from "react";

export default function Home() {
  const scope = useRef<AnimationPlaybackControls>(null);
  const ref = useRef(null);

  useScroll().scrollYProgress.on("change", (progress) => {
    if (!scope.current) return;
    scope.current.time = progress * scope.current.duration;
  });

  const onMount = () =>
    animate([
      ["#name-1", { y: "-6rem" }, { ease: "backOut" }],
      ["#name-3", { y: "6rem" }, { ease: "backOut", at: "<" }],
      ["#name-1", { x: "-2.5rem" }, { ease: "backInOut" }],
      ["#name-3", { x: "2.5rem" }, { ease: "backInOut", at: "<" }],
      ["#nav-bar", { opacity: 1 }],
      [
        "#nav-bar",
        { y: ["1rem", "0rem"] },
        { type: "spring", stiffness: 500, damping: 10, velocity: 2, at: "<" },
      ],
    ]);

  const onScroll = () =>
    animate([
      [
        "#nav-bar",
        { y: "-1rem", scaleY: 0.7 },
        {
          duration: 0.5,
          scale: {
            delay: 0.2,
          },
        },
      ],
      [
        "#nav-bar, #subheading",
        { y: "-4rem", scaleY: 1 },
        {
          type: "spring",
          stiffness: 500,
          damping: 10,
          velocity: 2,
        },
      ],
      ["#subheading", { opacity: 0 }, { duration: 0.2, at: "<" }],
      ["#name-1", { x: "-10rem", opacity: 0 }, { ease: "backOut", at: "<" }],
      ["#name-3", { x: "10rem", opacity: 0 }, { ease: "backOut", at: "<" }],
    ]);

  useEffect(() => {
    onMount().then(() => {
      scope.current = onScroll();
      scope.current.pause();
    });

    return () => {
      onMount().cancel();
      scope.current?.cancel();
    };
  }, []);

  return (
    <section ref={ref} className="h-[500vh]">
      <span>Section 1</span>
      <div className="h-screen flex items-center justify-center">
        <div className="flex gap-8 fixed">
          <div className="text-9xl leading-[0.75] font-black flex relative [&>span]:my-24 [&>span]:mx-10 [&>:nth-child(odd)]:absolute">
            <span id="name-1">COLAIA</span>
            <span id="name-2">COLAIA</span>
            <span id="name-3">COLAIA</span>
          </div>
          <div className="grid grid-rows-[1fr_min-content_1fr] gap-5 items-baseline">
            <span aria-hidden></span>
            <span
              id="subheading"
              className="text-5xl"
              aria-label="your future developer"
            >
              your_future_developer
            </span>
            <menu id="nav-bar" className="opacity-0 mx-auto">
              <nav className="text-xl font-semibold tracking-wider flex gap-8 px-8 py-2 bg-gradient-to-r from-[#B3FFAB] to-[#12FFF7] skew-x-[22deg] [&>span]:skew-x-[-22deg] outline outline-2 outline-offset-2">
                <span>experience</span>
                <span aria-label="about me">about_me</span>
                <span>contact</span>
              </nav>
            </menu>
          </div>
        </div>
      </div>
    </section>
  );
}
