"use client";

import css from "./style.module.scss";

import { useRegisterBookmark } from "@/app/components/layout/navigation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import useDataResolver from "../../data-provider/useDataResolver";
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
      const bar = '[data-anim="bar"]';
      const table = '[data-anim="table"]';

      const onFirstLoad = () => {
        gsap
          .timeline()
          .set(wrapper, { autoAlpha: 0, y: 100, position: "fixed" })
          .to(wrapper, { autoAlpha: 1, y: 0 })
          .duration(1);
      };

      onFirstLoad();

      const mm = gsap.matchMedia();

      mm.add(
        { isSmall: "(max-width: 720px)", _otherwise: "(min-width: 721px)" },
        (context) => {
          const { isSmall } = context.conditions;

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: scope.current,
              start: "top 75%",
              end: "bottom bottom",
              scrub: true,
              onUpdate: (self) => setProgress(self.progress),
              // markers: true,
            },
          });

          tl.set(wrapper, { autoAlpha: 1 })
            .set(table, { autoAlpha: 0, display: "none" })
            .to(bar, { autoAlpha: 0, display: "none" })
            .to(wrapper, {
              height: 300,
              top: "50%",
              width: isSmall ? "auto" : 720,
            })
            .to(table, { autoAlpha: 1, display: "block" })
            .to(wrapper, { autoAlpha: 0 }, "+=1.5")
            .duration(2);
        }
      );
    },
    { scope }
  );

  return (
    <section id={bookmarkId} ref={scope} className={css.tracker}>
      <div className={css.wrapper} data-anim="wrapper">
        <div className={css.toolbox} data-anim="item">
          <div data-anim="bar">
            <ToolboxBar items={toolsData} />
          </div>
          <div data-anim="table">
            <ToolboxDetail items={toolsData} />
          </div>
        </div>
      </div>
    </section>
  );
}
