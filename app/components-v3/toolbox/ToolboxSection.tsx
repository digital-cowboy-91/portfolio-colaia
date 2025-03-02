"use client";

import css from "./style.module.scss";

import { useRegisterBookmark } from "@/app/components/layout/navigation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import useDataResolver from "../data-provider/useDataResolver";
import ToolboxBar from "./ToolboxBar";
import ToolboxDetail from "./ToolboxDetail";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function ToolboxSection() {
  const scope = useRef(null);
  const toolsData = useDataResolver("tools");
  const { bookmarkId, setProgress } = useRegisterBookmark({
    id: "toolbox",
    title: "Toolbox",
  });

  useGSAP(
    () => {
      const wrapper = '[data-anim="wrapper"]';
      const items = '[data-anim="items"]';
      const bar = '[data-anim="bar"]';
      const detail = '[data-anim="detail"]';

      // Default states
      gsap.set(wrapper, { autoAlpha: 0, y: 100, position: "fixed" });
      gsap.set(items, { height: gsap.getProperty(bar, "height", "px") });
      gsap.set(detail, { autoAlpha: 0 });

      // Initial load
      const firstLoad = gsap
        .timeline()
        .to(wrapper, { autoAlpha: 1, y: 0, delay: 0.3, duration: 1 })
        .pause();

      firstLoad.play();

      // Timeline trigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scope.current,
          start: "top bottom",
          end: "bottom bottom",
          scrub: true,
          onUpdate: (self) => {
            setProgress(self.progress);

            if (self.progress > 0.1 && firstLoad.isActive()) {
              firstLoad.progress(1);
            }
          },
          onLeave: () => {
            gsap.set(wrapper, { autoAlpha: 0 });
          },
        },
      });

      tl.set(wrapper, { autoAlpha: 1 })
        .to(bar, { autoAlpha: 0, display: "none" })
        .set(detail, { display: "block" })
        .to(wrapper, {
          top: "50%",
          duration: 1,
        })
        .to(
          items,
          {
            width: gsap.getProperty(detail, "width", "px"),
            height: gsap.getProperty(detail, "height", "px"),
            duration: 1,
            onStart: () => {
              console.log(gsap.getProperty(detail, "width", "px"));
            },
          },
          "<"
        )
        .set(items, { height: "auto" })
        .set(wrapper, { position: "sticky" })
        .to(detail, { autoAlpha: 1 })
        .to(wrapper, { autoAlpha: 0 }, "+=1.5")
        .duration(4);
    },
    { scope }
  );

  console.log(toolsData);

  return (
    <section id={bookmarkId} ref={scope} className={css.tracker}>
      <div className={css.wrapper} data-anim="wrapper">
        <div className={css.items} data-anim="items">
          <div className={css.bar} data-anim="bar">
            <ToolboxBar items={toolsData} />
          </div>
          <div className={css.detail} data-anim="detail">
            <ToolboxDetail items={toolsData} />
          </div>
        </div>
      </div>
    </section>
  );
}
