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
          end: "bottom center",
          fastScrollEnd: 10000,
          toggleActions: "play play reverse reverse",
        },
        defaults: { duration: 0.3 },
      });

      tl.set(".anim__wrapper", {
        top: 0,
        position: "static",
      })
        .set(".anim__item", {
          opacity: 0,
          rotateX: -90,
          rotateY: 90,
        })
        .to(".anim__wrapper", {
          position: "fixed",
        })
        .to(".anim__item", {
          opacity: 1,
          rotateX: 0,
          rotateY: 0,
        })
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
    <ScrollableSection ref={scope} theme="sub-profile" style={{ opacity: 0 }}>
      {children}
    </ScrollableSection>
  );
}
