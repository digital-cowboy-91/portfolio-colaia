"use client";
import ScrollableSection from "@/app/ScrollableSection";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { PropsWithChildren, useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function AnimateIntro({ children }: PropsWithChildren) {
  const scope = useRef(null);

  // const { contextSafe } = useGSAP();

  useGSAP(
    () => {
      // const setGlobalOverflow = contextSafe((overflow: "hidden" | "unset") =>
      //   gsap.set("html", { overflow })
      // );
      const introTl = gsap.getById("profile-intro") ?? gsap.timeline();

      const wrapper = ".anim__wrapper";
      const target = ".anim__item";

      const h = Number(gsap.getProperty(target, "height"));
      gsap.set(scope.current, { height: h * 1.5 });

      const tl = gsap.timeline({
        paused: true,
        scrollTrigger: {
          trigger: scope.current,
          start: "-1% center",
          end: "bottom center",
          snap: [0.5],
          fastScrollEnd: 5000,
          toggleActions: "play play reverse none",
          onEnter: (self) => {
            if (self.progress < 1) return;
            self.animation?.pause().progress(1);
          },
          markers: true,
        },
        defaults: { duration: 0.3 },
      });

      tl.set(wrapper, { display: "block" })
        .add(introTl.play())
        .addPause()
        .to(target, { autoAlpha: 0, y: 50 })
        .to(target, { delay: 0 })
        .set(wrapper, { display: "none" });
    },
    { scope }
  );

  return (
    <ScrollableSection ref={scope} theme="sub-profile">
      {children}
    </ScrollableSection>
  );
}
