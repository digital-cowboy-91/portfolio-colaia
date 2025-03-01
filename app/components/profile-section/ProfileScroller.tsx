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
          toggleActions: "play play reverse reverse",
          onEnter: (self) => self.progress === 1 && tl.progress(1),
          markers: true,
        },
      });

      const layout_tl = profileLayout_tl();

      // const subsections = "#profile__subsections";

      tl.delay(0.3)
        .add(layout_tl.tweenFromTo("start", "leave"))
        .addPause()
        // .to(subsections, { x: "-100vw" })
        .add(layout_tl.tweenFromTo("leave", "end"));
    },
    { scope }
  );

  return (
    <ScrollerWrapper ref={scope} bookmarkId="profile">
      {children}
    </ScrollerWrapper>
  );
}
