"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PropsWithChildren } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);
export default function HomeAnimate({ children }: PropsWithChildren) {
  useGSAP(() => {
    // INITIAL ANIMATION
    const intro = gsap.getById("intro") ?? gsap.timeline();

    gsap
      .timeline({ id: "initial" })
      .set("body", { overflow: "hidden" })
      .to(".anim__portrait", {
        opacity: 1,
      })
      .add(intro.play().delay(0.5))
      .set("body", { overflow: "" });

    // ON SCROLL - ANIMATION
    const tl = gsap
      .timeline({ paused: true, defaults: { duration: 0.3 } })

      // STEP 1
      .to(".anim__frame-1", {
        y: "+=0",
        opacity: 1,
      })
      .add("step1")

      // STEP 2
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
      .add("step2")

      // STEP 3
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
      .add("step3");

    // ON SCROLL - TRIGGER
    type StepKeys = 0 | 0.33 | 0.66 | 1;

    const steps = {
      map: {
        0: "step0",
        0.33: "step1",
        0.66: "step2",
        1: "step3",
      },
      prev: 0 as StepKeys,
      next: 0 as StepKeys,
    };

    ScrollTrigger.create({
      onUpdate: (self) => {
        const current = self.progress;

        const { map, prev } = steps;
        const next = current <= 0.33 ? 0.33 : current <= 0.66 ? 0.66 : 1;

        if (prev === next) return;

        if (next > prev) {
          tl.tweenTo(map[next]);
        } else {
          tl.tweenFromTo(map[prev], map[next]);
        }

        steps.prev = steps.next;
        steps.next = next;
      },
    });
  });

  return <>{children}</>;
}
