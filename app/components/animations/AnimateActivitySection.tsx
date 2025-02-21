"use client";
import ScrollableSection from "@/app/ScrollableSection";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { PropsWithChildren, useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function AnimateActivitySection({
  children,
}: PropsWithChildren) {
  const scope = useRef(null);

  useGSAP(
    () => {
      // const tl = gsap.timeline({
      //   paused: true,
      //   scrollTrigger: {
      //     trigger: scope.current,
      //     start: "top bottom",
      //     end: "top 25%",
      //     scrub: true,
      //     fastScrollEnd: 10000,
      //     onUpdate: (self) => {
      //       console.log(self.progress);
      //     },
      //     toggleActions: "none play reverse none",
      //   },
      //   defaults: { duration: 0.3 },
      // });
      // gsap.set(scope.current, {
      //   position: "relative",
      //   top: "-100vh",
      // });
    },
    { scope }
  );

  return <ScrollableSection ref={scope}>{children}</ScrollableSection>;
}
