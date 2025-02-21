"use client";
import ScrollableSection from "@/app/ScrollableSection";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { PropsWithChildren, useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function AnimateProfileSection({ children }: PropsWithChildren) {
  const scope = useRef(null);

  useGSAP(
    () => {
      let firstRender = true;
      const heroTl = gsap.getById("hero") ?? gsap.timeline();

      ScrollTrigger.create({
        trigger: scope.current,
        start: "top bottom",
        end: "bottom bottom",
        fastScrollEnd: 10000,

        onEnter: (self) => {
          if (self.progress === 1) return;
          firstRender = false;
          heroTl.play();
        },
        onLeave: (self) => {
          if (self.progress === 1 && firstRender) {
            firstRender = false;
            return;
          }

          heroTl.play();
        },
        onEnterBack: () => heroTl.restart(),
      });
    },
    { scope }
  );

  return <ScrollableSection ref={scope}>{children}</ScrollableSection>;
}
