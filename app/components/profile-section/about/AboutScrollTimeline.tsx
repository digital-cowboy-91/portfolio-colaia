"use client";
import ScrollableSection from "@/app/components/layout/animate-scroll/ScrollableSection";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { PropsWithChildren, useRef } from "react";
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
      const wrapper = ".anim__wrapper";
      const target = ".anim__item";

      const h = Number(gsap.getProperty(target, "height"));
      gsap.set(scope.current, { height: h * 1 });

      const tl = gsap.timeline({
        paused: true,
        scrollTrigger: {
          trigger: scope.current,
          start: "top center",
          end: "bottom center",
          snap: [0.5],
          fastScrollEnd: 5000,
          toggleActions: "play play reverse reverse",
          onUpdate: (self) => setProgress(self.progress),
          // markers: true,
        },
        defaults: { duration: 0.3 },
      });

      tl.set(wrapper, { display: "block" })
        .set(target, {
          autoAlpha: 0,
          y: 50,
          rotateX: 0,
          rotateY: 0,
          delay: 0.3,
        })
        .to(target, { autoAlpha: 1, y: 0 })
        .addPause()
        .to(target, { autoAlpha: 0, rotateX: 90, rotateY: 90 })
        .to(target, { delay: 0 })
        .set(wrapper, { display: "none" });
    },
    { scope }
  );

  return (
    <ScrollableSection
      bookmarkId={bookmarkId}
      ref={scope}
      theme="sub-profile"
      style={{ opacity: 0 }}
    >
      {children}
    </ScrollableSection>
  );
}
