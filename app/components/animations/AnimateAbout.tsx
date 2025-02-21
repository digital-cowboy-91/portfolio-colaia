"use client";
import ScrollableSection from "@/app/ScrollableSection";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { PropsWithChildren, useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function AnimateAbout({ children }: PropsWithChildren) {
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
          onEnter: (self) => {
            if (self.progress < 1) return;
            self.animation?.pause().progress(1);
          },
        },
        defaults: { duration: 0.3 },
      });

      tl.set(".anim__wrapper", {
        top: 0,
        position: "static",
      })
        .set(".anim__item", {
          y: 50,
        })
        .to(".anim__wrapper", {
          position: "fixed",
        })
        .to(".anim__item", {
          opacity: 1,
          y: 0,
        })
        .addPause()
        .to(".anim__item", {
          rotateX: 90,
          rotateY: 90,
          opacity: 0,
          ease: "back.in",
          duration: 0.5,
        })
        .to(".anim__wrapper", {
          position: "static",
          delay: 0.2,
        });

      // const fixInView = (isInView: boolean = false) => {
      //   gsap.set(".anim__wrapper", {
      //     top: 0,
      //     position: isInView ? "fixed" : "static",
      //   });
      // };

      // const tl = gsap
      //   .timeline({ paused: true, defaults: { duration: 0.3 } })
      //   .set(".anim__item", {
      //     y: 50,
      //   })
      //   .addLabel("init")
      //   .to(".anim__item", {
      //     opacity: 1,
      //     y: 0,
      //   })
      //   .addLabel("enter")
      //   .to(".anim__item", {
      //     rotateX: 90,
      //     rotateY: 90,
      //     opacity: 0,
      //     ease: "back.in",
      //     duration: 0.5,
      //   })
      //   .addLabel("leave");

      // ScrollTrigger.create({
      //   trigger: scope.current,
      //   start: "top center",
      //   end: "bottom center",
      //   fastScrollEnd: 10000,
      //   onEnter: (self) => {
      //     if (self.progress === 1) return;

      //     tl.tweenTo("enter", { onStart: fixInView, onStartParams: [true] });
      //   },
      //   onLeave: (self) => {
      //     tl.tweenTo("leave", { onComplete: fixInView });
      //   },
      //   onEnterBack: () => {
      //     tl.tweenFromTo("leave", "enter", {
      //       onStart: fixInView,
      //       onStartParams: [true],
      //       delay: 0.5,
      //     });
      //   },
      //   onLeaveBack: () => {
      //     tl.tweenFromTo("enter", "init", { onComplete: fixInView });
      //   },
      // });
    },
    { scope }
  );

  return (
    <ScrollableSection ref={scope} theme="sub-profile" style={{ opacity: 0 }}>
      {children}
    </ScrollableSection>
  );
}
