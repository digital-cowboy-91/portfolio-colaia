"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PropsWithChildren } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);
export default function HomeAnimate({ children }: PropsWithChildren) {
  useGSAP(() => {
    // RETRIEVE ANIMATIONS
    const intro = gsap.getById("intro") ?? gsap.timeline();

    // THIS ANIMATION
    const tl = gsap
      .timeline({ id: "main", defaults: { duration: 0.3 } })

      // FRAME 0
      .set("body", { overflow: "hidden" })
      .to(".anim__portrait", {
        opacity: 1,
      })
      .add(intro.play().delay(0.5))
      .set("body", { overflow: "" })
      .add("frame0")

      // FRAME 1
      .to(".anim__frame-1", {
        y: "+=0",
        opacity: 1,
      })
      .add("frame1")

      // FRAME 2
      .to(".anim__frame-1", {
        y: "-=50",
        opacity: 0,
        display: "none",
      })
      .to(
        ".anim__frame-2",
        {
          display: "flex",
          y: "-=50",
          opacity: 0,
        },
        "<"
      )
      .to(".anim__frame-2", {
        y: "+=50",
        rotateX: 0,
        rotateY: 0,
        opacity: 1,
      })
      .add("frame2")

      // FRAME 3
      .to(".anim__frame-2", {
        display: "none",
        rotateX: -90,
        rotateY: 90,
        opacity: 0,
        ease: "back.in",
        duration: 0.5,
      })
      .to(
        ".anim__frame-3",
        {
          display: "flex",
          rotateX: 90,
          rotateY: 90,
          opacity: 0,
        },
        "<"
      )
      .to(".anim__frame-3", {
        rotateX: 0,
        rotateY: 0,
        opacity: 1,
        ease: "back.out",
        duration: 0.5,
      })
      .add("frame3")

      // FRAME 4
      .to(".section__group", { x: "-=50%" })
      .add("frame4");

    // PLAY FRAME 0
    tl.tweenTo("frame0");

    // ON SCROLL - TRIGGER
    const frameCount = 5;
    const frames = {
      list: Array(frameCount)
        .fill(0)
        .map((_, index) => (index * 1) / (frameCount - 1)),
      prev: 0,
      next: 0,
    };

    ScrollTrigger.create({
      onUpdate: (self) => {
        const current = self.progress;

        const { list, prev } = frames;
        const next = list.findIndex((frame) => current <= frame);

        if (prev === next) return;

        if (next > prev) {
          tl.tweenTo("frame" + next);
        } else {
          tl.tweenFromTo("frame" + prev, "frame" + next);
        }

        frames.prev = frames.next;
        frames.next = next;
      },
    });
  });

  return <>{children}</>;
}
