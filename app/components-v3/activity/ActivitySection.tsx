"use client";

import { useRegisterBookmark } from "@/app/components-v3/navigation";
import { ActivityWithRefs } from "@/app/types/activity";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import useDataResolver from "../data-provider/useDataResolver";
import ActivityClient from "./ActivityClient";
import css from "./style.module.scss";

gsap.registerPlugin(useGSAP);

export default function ActivitySection() {
  const scope = useRef(null);
  const { bookmarkId, setProgress } = useRegisterBookmark({
    id: "activity",
    title: "Activity",
  });
  const activityData = useDataResolver("activity");
  const toolsData = useDataResolver("tools");

  const toolMap = new Map(toolsData.map((item) => [item.id, item]));
  const tagSet = new Set<string>();

  const activityWithRefs = activityData.map((item) => {
    const itemWithRefs: ActivityWithRefs = {
      ...item,
      usedTools: item.usedTools.map((icon) => toolMap.get(icon)!),
    };

    item.tags.forEach((tag) => tagSet.add(tag));

    return itemWithRefs;
  });

  useGSAP(
    () => {
      // Responsive trigger
      const mm = gsap.matchMedia();
      mm.add(
        {
          isDesktop: "(min-height: 920px) and (min-width: 960px)",
          otherwise: "(min-width: 1px)",
        },
        ({ conditions }) => {
          const { isDesktop } = conditions!;

          gsap.timeline({
            scrollTrigger: {
              trigger: scope.current,
              start: isDesktop ? "top bottom" : "top center",
              end: isDesktop ? "bottom bottom" : "bottom center",
              onUpdate: (self) => setProgress(self.progress),
            },
          });
        }
      );
    },
    { scope }
  );

  return (
    <section id={bookmarkId} ref={scope} className={css.tracker}>
      <div className={css.wrapper}>
        <ActivityClient data={activityWithRefs} tags={[...tagSet]} />
      </div>
    </section>
  );
}
