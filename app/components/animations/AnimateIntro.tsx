"use client";
import ScrollableSection from "@/app/ScrollableSection";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { PropsWithChildren, useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function AnimateIntro({ children }: PropsWithChildren) {
  const scope = useRef(null);

  useGSAP(
    () => {
      const introTl = gsap.getById("profile-intro") ?? gsap.timeline();

      const tl = gsap.timeline({
        paused: true,
        scrollTrigger: {
          trigger: scope.current,
          start: "top center",
          end: "bottom center",
          fastScrollEnd: 10000,
          toggleActions: "play play reverse reverse",
          onEnter: (self) => {
            if (self.progress < 1) return;
            self.animation?.pause().progress(1);
          },
        },
        defaults: { duration: 0.3 },
      });

      tl.set(".anim__wrapper", {
        top: 0,
        position: "fixed",
      })
        .add(introTl.play())
        .addPause()
        .to(".anim__item", {
          opacity: 0,
          y: 50,
        })
        .to(".anim__wrapper", {
          position: "static",
        });
    },
    { scope }
  );

  return (
    <ScrollableSection ref={scope} theme="sub-profile">
      {children}
    </ScrollableSection>
  );
}
