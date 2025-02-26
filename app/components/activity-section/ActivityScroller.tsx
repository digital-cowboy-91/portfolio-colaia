"use client";

import GSAPSection from "@/app/components/layout/animate-scroll/GSAPSection";
import { useRegisterBookmark } from "@/app/components/layout/navigation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { PropsWithChildren, useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function ActivityScroller({ children }: PropsWithChildren) {
  const scope = useRef(null);
  const { bookmarkId, setProgress } = useRegisterBookmark({
    id: "activity",
    title: "Activity",
  });

  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: scope.current,
        start: "top bottom",
        end: "bottom bottom",
        fastScrollEnd: 5000,
        onUpdate: (self) => setProgress(self.progress),
      });
    },
    { scope }
  );

  return (
    <GSAPSection bookmarkId={bookmarkId} ref={scope}>
      {children}
    </GSAPSection>
  );
}
