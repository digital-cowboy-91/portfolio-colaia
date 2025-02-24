"use client";
import ScrollableSection from "@/app/components/layout/animate-scroll/ScrollableSection";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { PropsWithChildren, useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function IntroScrollTimeline({ children }: PropsWithChildren) {
  const scope = useRef(null);

  useGSAP(
    () => {
      const wrapper = ".anim__wrapper";
      const target = ".anim__item";

      const h = Number(gsap.getProperty(target, "height"));
      gsap.set(scope.current, { height: h * 1 });

      const tl = gsap.timeline({
        paused: true,
        scrollTrigger: {
          trigger: scope.current,
          start: "-1% center",
          end: "bottom center",
          snap: [0.5],
          fastScrollEnd: 5000,
          toggleActions: "play play reverse none",
          // markers: true,
        },
        defaults: { duration: 0.3 },
      });

      tl.set(wrapper, { display: "block" })
        .to(target, { delay: 0 })
        .addPause()
        .to(target, { autoAlpha: 0, y: 50 })
        .to(target, { delay: 0 })
        .set(wrapper, { display: "none" });
    },
    { scope }
  );

  return (
    <ScrollableSection ref={scope} theme="sub-profile">
      {children}
    </ScrollableSection>
  );
}
