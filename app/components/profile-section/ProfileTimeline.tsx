"use client";

import ScrollableSection from "@/app/components/layout/animate-scroll/ScrollableSection";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { PropsWithChildren, useRef } from "react";
import { profileLayout_tl } from "./layout";

gsap.registerPlugin(useGSAP);

export default function ProfileTimeline({ children }: PropsWithChildren) {
  const scope = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          start: "top bottom",
          end: "bottom bottom",
          fastScrollEnd: 5000,
          onEnter: () => tl.tweenFromTo("start", "leave"),
          onLeave: () => tl.tweenFromTo("leave", "end"),
          onEnterBack: () => tl.tweenFromTo("end", "leave"),
        },
      });

      const layout_tl = profileLayout_tl();

      console.log(layout_tl);

      // const subsections = "#profile__subsections";

      tl.add("start")
        .delay(0.3)
        .add(layout_tl.tweenFromTo("start", "leave"))
        .add("leave")
        // .to(subsections, { x: "-100vw" })
        .add(layout_tl.tweenFromTo("leave", "end"))
        .add("end");
    },
    { scope }
  );

  return <ScrollableSection ref={scope}>{children}</ScrollableSection>;
}
