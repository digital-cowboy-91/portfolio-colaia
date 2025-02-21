"use client";
import ScrollableSection from "@/app/ScrollableSection";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { PropsWithChildren, useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function AnimateToolsTable({ children }: PropsWithChildren) {
  const scope = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        paused: true,
        scrollTrigger: {
          trigger: scope.current,
          start: "top center",
          end: "bottom bottom",
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
        position: "static",
      })
        .set(".anim__item", {
          rotateX: -90,
          rotateY: 90,
        })
        .to(".anim__wrapper", {
          position: "fixed",
          delay: 0.2,
        })
        .to(".anim__item", {
          opacity: 1,
          rotateX: 0,
          rotateY: 0,
          ease: "back.out",
          duration: 0.5,
        })
        .addPause()
        .to(".anim__item", {
          x: "-100vw",
          ease: "circ.in",
          duration: 0.5,
        });
    },
    { scope }
  );

  return (
    <ScrollableSection ref={scope} theme="sub-profile" style={{ opacity: 0 }}>
      {children}
    </ScrollableSection>
  );
}
