"use client";
import { stagger, useAnimate } from "motion/react";
import { useEffect, useRef } from "react";

export default function () {
  const [scope, animate] = useAnimate();
  const col2Ref = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (!col2Ref.current) return;

    const onMount = animate([
      [
        "#hero-col1",
        { opacity: [0, 1], scale: [1.2, 1] },
        { delay: 0.3, duration: 1 },
      ],
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
      ["#stripe", { width: "60vw" }, { duration: 0.5, at: "-0.2" }],
      [
        "#hero-col2",
        { width: col2Ref.current.scrollWidth + "px" },
        { ease: "easeInOut", duration: 0.5, at: "<" },
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
    ]);

    return onMount.stop;
  }, [col2Ref]);

  return (
    <section
      ref={scope}
      id="hero"
      className="flex flex-col items-center justify-center h-screen max-h-[800px]"
    >
      <div className="flex justify-center items-center gap-8">
        <div
          id="hero-col1"
          className="text-9xl leading-[0.75] font-black flex relative [&>span]:my-24 [&>span]:mx-10 [&>:nth-child(odd)]:absolute opacity-0"
        >
          <span id="name-1">COLAIA</span>
          <span id="name-2">COLAIA</span>
          <span id="name-3">COLAIA</span>
          <div id="stripe" />
        </div>
        <div ref={col2Ref} id="hero-col2" className="w-0">
          <div
            id="subheading"
            className="grid grid-cols-[max_content,max_content] text-5xl [&>span]:opacity-0 whitespace-pre"
          >
            <span className="col-span-2">SELF-TAUGHT</span>
            <span>FULLSTACK </span>
            <span>CODER</span>
          </div>
        </div>
      </div>
    </section>
  );
}
