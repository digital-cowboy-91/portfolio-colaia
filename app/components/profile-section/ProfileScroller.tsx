"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { PropsWithChildren, useRef } from "react";
import ScrollerWrapper from "../layout/scroller/ScrollerWrapper";
import { profileLayout_tl } from "./layout";

gsap.registerPlugin(useGSAP);

export default function ProfileTimeline({ children }: PropsWithChildren) {
  const scope = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scope.current,
          start: "top bottom",
          end: "bottom bottom",
          fastScrollEnd: 5000,
          onEnter: () => tl.tweenFromTo("start", "leave"),
          onLeave: () => tl.tweenFromTo("leave", "end"),
          onEnterBack: () => tl.tweenFromTo("end", "leave"),
          onUpdate: (self) => console.log(self.progress),
          markers: true,
        },
      });

      const layout_tl = profileLayout_tl();

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

  return (
    <ScrollerWrapper ref={scope} bookmarkId="profile">
      {children}
    </ScrollerWrapper>
  );
}
