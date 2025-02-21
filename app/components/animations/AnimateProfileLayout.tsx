"use client";

import ProfileContainer from "@/app/ProfileContainer";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { cloneElement, useRef } from "react";

gsap.registerPlugin(useGSAP);

export default function AnimateProfileLayout({
  children,
}: {
  children: ReturnType<typeof ProfileContainer>;
}) {
  const scope = useRef(null);

  useGSAP(
    () => {
      const tl = gsap
        .timeline({
          id: "hero",
          paused: true,
          data: { waitTime: 0.75 },
          defaults: { duration: 0.5, ease: "ease.in" },
        })
        .set("#hero__row1", {
          y: "-=100px",
          opacity: 0,
        })
        .set(
          "#hero__row2",
          {
            y: "+=100px",
            opacity: 0,
          },
          "<"
        )
        .set("#hero__image", {
          opacity: 1,
          x: 0,
        })
        .add("init")
        .to("#hero__row1", {
          y: 0,
          opacity: 1,
        })
        .to(
          "#hero__row2",
          {
            y: 0,
            opacity: 1,
          },
          "<"
        )
        .add("enter")
        .addPause()
        .to("#hero__image", {
          x: "100vw",
          ease: "circ.in",
        })
        .to("#hero__row1", {
          y: "-=100px",
          opacity: 0,
        })
        .to(
          "#hero__row2",
          {
            y: "+=100px",
            opacity: 0,
          },
          "<"
        )
        .add("leave");

      tl.eventCallback("onComplete", () => {
        tl.data.waitTime = 0;
      });
    },
    { scope }
  );

  return <>{cloneElement(children, { ref: scope })}</>;
}
