"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { PropsWithChildren, useRef } from "react";
import { useRegisterBookmark } from "../../layout/navigation";
import ScrollerWrapper from "../../layout/scroller/ScrollerWrapper";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function IntroScroller({ children }: PropsWithChildren) {
  const scope = useRef(null);
  const { bookmarkId, setProgress } = useRegisterBookmark({
    id: "intro",
    title: "Intro",
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

      tl.to(item, { autoAlpha: 1 })
        .addPause()
        .to(item, { autoAlpha: 0, y: 50 });
    },
    { scope }
  );

  return (
    <ScrollerWrapper bookmarkId={bookmarkId} ref={scope} theme="profileContent">
      {children}
    </ScrollerWrapper>
  );
}
