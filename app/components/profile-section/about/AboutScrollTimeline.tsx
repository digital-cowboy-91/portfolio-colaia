"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { PropsWithChildren, useRef } from "react";
import GSAPSection from "../../layout/animate-scroll/GSAPSection";
import { useRegisterBookmark } from "../../layout/navigation";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function AboutScrollTimeline({ children }: PropsWithChildren) {
  const scope = useRef(null);
  const { bookmarkId, setProgress } = useRegisterBookmark({
    id: "about",
    title: "About",
  });

  useGSAP(
    () => {
      const item = "[data-gsap='item']";

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

      tl.delay(0.5)
        .set(item, { autoAlpha: 0, y: 50, rotateX: 0 })
        .to(item, { autoAlpha: 1, y: 0, ease: "expo.out", duration: 0.5 })
        .to(
          item,
          {
            autoAlpha: 0,
            rotateX: 90,
            duration: 0.5,
            ease: "back.in",
          },
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
