"use client";
import ActivityClient from "@/app/components/ActivityClient";
import { useRegisterBookmark } from "@/app/components/layout/navigation";
import { ActivityWithRefs } from "@/app/types/activity";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import useDataResolver from "../../data-provider/useDataResolver";
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
      gsap.timeline({
        scrollTrigger: {
          trigger: scope.current,
          start: "top bottom",
          end: "bottom bottom",
          onUpdate: (self) => setProgress(self.progress),
          // markers: true,
        },
      });
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
