"use client";

import { useAnimate } from "motion/react";
import { useEffect } from "react";

export default function () {
  const [scope, animate] = useAnimate();

  const play = {
    onMount: async () => {
      ["#name-1", "#name-3"].forEach((id, index) => {
        animate(id, {
          y: index ? "-6rem" : "6rem",
        }).then(() =>
          animate(id, {
            x: index ? "-2.5rem" : "2.5rem",
          })
        );
      });
    },

    onNavigate: async () => {
      ["#name-1", "#name-3"].forEach((id, index) => {
        animate(
          id,
          {
            x: index ? "50%" : "-50%",
            opacity: 0,
          },
          {
            ease: "backOut",
            duration: 0.4,
          }
        );
      });
    },
  };

  useEffect(() => {
    play.onMount();
  }, []);

  return (
    <>
      <div
        ref={scope}
        className="text-9xl leading-[0.75] font-black flex relative [&>span]:my-24 [&>span]:mx-10 [&>:nth-child(odd)]:absolute"
      >
        <span id="name-1">COLAIA</span>
        <span id="name-2">COLAIA</span>
        <span id="name-3">COLAIA</span>
      </div>
      <div className="absolute bg-white">
        <button onClick={play.onNavigate}>onNavigate</button>
      </div>
    </>
  );
}
