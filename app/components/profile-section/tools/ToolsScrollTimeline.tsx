"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { PropsWithChildren, useRef } from "react";
import GSAPSection from "../../layout/animate-scroll/GSAPSection";
import { useRegisterBookmark } from "../../layout/navigation";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function ToolsScrollTimeline({ children }: PropsWithChildren) {
  const scope = useRef(null);
  const { bookmarkId, setProgress } = useRegisterBookmark({
    id: "toolbox",
    title: "Toolbox",
  });

  useGSAP(
    () => {
      const target = "[data-gsap='item']";

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scope.current,
          start: "top center",
          end: "bottom center",
          scrub: 1,
          fastScrollEnd: 5000,
          // markers: true,
          onUpdate: (self) => setProgress(self.progress),
        },
      });

      tl.delay(2)
        .set(target, { autoAlpha: 0, rotateX: -90 })
        .to(target, {
          autoAlpha: 1,
          rotateX: 0,
          ease: "back.out",
          duration: 0.5,
        })
        .to(
          target,
          { left: "-100vw", ease: "circ.in", display: "none", duration: 0.5 },
          "+=3"
        );
    },
    { scope }
  );

  console.log("rerender");

  return (
    <GSAPSection
      bookmarkId={bookmarkId}
      ref={scope}
      theme="profileContent"
      style={{ opacity: 0 }}
    >
      {children}
    </GSAPSection>
  );
}
