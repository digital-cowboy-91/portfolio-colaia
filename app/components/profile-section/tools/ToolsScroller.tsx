"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { PropsWithChildren, useRef } from "react";
import { useRegisterBookmark } from "../../layout/navigation";
import ScrollerWrapper from "../../layout/scroller/ScrollerWrapper";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function ToolsScroller({ children }: PropsWithChildren) {
  const scope = useRef(null);
  const { bookmarkId, setProgress } = useRegisterBookmark({
    id: "toolbox",
    title: "Toolbox",
  });

  useGSAP(
    () => {
      const item = "[data-gsap='item']";

      const tl = gsap.timeline({
        paused: true,
        scrollTrigger: {
          trigger: scope.current,
          start: "top center",
          end: "bottom bottom",
          // snap: [0.5],
          fastScrollEnd: 5000,
          toggleActions: "play play reverse reverse",
          onEnter: (self) => self.progress === 1 && tl.progress(1),
          onUpdate: (self) => setProgress(self.progress),
          // markers: true,
        },
        defaults: { duration: 0.3 },
      });

      tl.set(item, { autoAlpha: 0, rotateX: -90, rotateY: 90 })
        .to(item, { autoAlpha: 1, rotateX: 0, rotateY: 0, delay: 0.3 })
        .addPause()
        .to(item, { x: "-100vw", ease: "circ.in", duration: 0.75 });
    },
    { scope }
  );

  return (
    <ScrollerWrapper bookmarkId={bookmarkId} ref={scope} theme="profileContent">
      {children}
    </ScrollerWrapper>
  );
}
