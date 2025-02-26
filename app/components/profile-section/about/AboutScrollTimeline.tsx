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
      const wrapper = "[data-gsap='wrapper']";
      const item = "[data-gsap='item']";

      const tl = gsap.timeline({
        paused: true,
        scrollTrigger: {
          trigger: scope.current,
          start: "top center",
          end: "bottom center",
          // snap: [0.5],
          fastScrollEnd: 5000,
          toggleActions: "play play reverse reverse",
          onEnter: (self) => self.progress === 1 && tl.progress(1),
          onUpdate: (self) => setProgress(self.progress),
          // markers: true,
        },
        defaults: { duration: 0.3 },
      });

      tl.set(item, {
        autoAlpha: 0,
        y: 50,
        rotateX: 0,
        rotateY: 0,
        delay: 0.3,
      })
        .to(item, { autoAlpha: 1, y: 0 })
        .addPause()
        .to(item, { autoAlpha: 0, rotateX: 90, rotateY: 90 })
        .to(item, { delay: 0 });
    },
    { scope }
  );

  return (
    <GSAPSection bookmarkId={bookmarkId} ref={scope} theme="profileContent">
      {children}
    </GSAPSection>
  );
}
