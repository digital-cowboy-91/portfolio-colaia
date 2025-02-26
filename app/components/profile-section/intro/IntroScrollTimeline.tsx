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
      const wrapper = "[data-gsap='wrapper']";
      const item = "[data-gsap='item']";

      const tl = gsap.timeline({
        paused: true,
        scrollTrigger: {
          trigger: scope.current,
          start: "-1% center",
          end: "bottom center",
          // snap: [0.5],
          fastScrollEnd: 5000,
          toggleActions: "play play reverse none",
          onUpdate: (self) => setProgress(self.progress),
          onEnter: (self) => self.progress === 1 && tl.progress(1),
          // markers: true,
        },
        defaults: { duration: 0.3 },
      });

      tl.to(item, { autoAlpha: 1 })
        .addPause()
        .to(item, { autoAlpha: 0, y: 50 })
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
