"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PropsWithChildren } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);
export default function HomeAnimate({ children }: PropsWithChildren) {
  useGSAP((context) => {
    console.log();
    // INITIAL ANIMATION
    const intro = gsap.getById("intro") ?? gsap.timeline();

    gsap
      .timeline({ id: "initial" })
      .set("body", { overflow: "hidden" })
      .to("#portrait", {
        opacity: 1,
      })
      .add(intro.play().delay(0.5))
      .set("body", { overflow: "" });

    // ON SCROLL - CONFIG
    const map = {
      0.33: "step1",
      0.66: "step2",
      1: "step3",
    };

    const steps = {
      prev: 0,
      next: 0,
    };

    // ON SCROLL - ANIMATION
    const tl = gsap
      .timeline({ paused: true, defaults: { duration: 0.3 } })

      // STEP 1
      .to("#intro", {
        y: 0,
        opacity: 1,
        attr: { "aria-hidden": "false" },
      })
      .add("step1")

      // STEP 2
      .to("#intro", {
        y: -50,
        opacity: 0,
        attr: { "aria-hidden": "true" },
      })
      .to(
        "#about-me",
        {
          y: 50,
          opacity: 0,
          attr: { "aria-hidden": "true" },
        },
        "<"
      )
      .to("#about-me", {
        y: "0",
        rotateX: 0,
        rotateY: 0,
        opacity: 1,
        attr: { "aria-hidden": "false" },
      })
      .add("step2")

      // STEP 3
      .to("#about-me", {
        rotateX: -90,
        rotateY: 90,
        opacity: 0,
        ease: "back.in",
        duration: 0.5,
        attr: { "aria-hidden": "true" },
      })
      .to(
        "#tools-table",
        {
          rotateX: 90,
          rotateY: 90,
          opacity: 0,
          attr: { "aria-hidden": "true" },
        },
        "<"
      )
      .to("#tools-table", {
        rotateX: 0,
        rotateY: 0,
        opacity: 1,
        ease: "back.out",
        duration: 0.5,
        attr: { "aria-hidden": "false" },
      })
      .add("step3");

    // ON SCROLL - TRIGGER
    ScrollTrigger.create({
      onUpdate: (self) => {
        const current = self.progress;
        const prev = steps.prev;
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
