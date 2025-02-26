"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { PropsWithChildren, useRef } from "react";
import GSAPSection from "../../layout/animate-scroll/GSAPSection";
import { useRegisterBookmark } from "../../layout/navigation";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function IntroScrollTimeline({ children }: PropsWithChildren) {
  const scope = useRef(null);
  const { bookmarkId, setProgress } = useRegisterBookmark({
    id: "intro",
    title: "Intro",
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

      tl.set(target, { autoAlpha: 0, scale: 1 })
        .to(target, { autoAlpha: 1, duration: 0.5 }, "+=0.5")
        .to(
          target,
          { autoAlpha: 0, scale: 0.8, ease: "back.in", duration: 0.5 },
          "+=3"
        );
    },
    { scope }
  );

  console.log("rerender");

  return (
    <GSAPSection bookmarkId={bookmarkId} ref={scope} theme="profileContent">
      {children}
    </GSAPSection>
  );
}
