"use client";

import css from "./style.module.scss";

import { useRegisterBookmark } from "@/app/components-v3/navigation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SlowMo } from "gsap/EasePack";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import useDataResolver from "../data-provider/useDataResolver";
import AboutClient from "./AboutClient";
import Contributions from "./Contributions";

gsap.registerPlugin(useGSAP, ScrollTrigger, SlowMo);

export default function AboutSection() {
  const scope = useRef(null);
  const profileData = useDataResolver("profile");
  const { bookmarkId, setProgress } = useRegisterBookmark({
    id: "about",
    title: "About",
  });

  useGSAP(
    () => {
      const items = '[data-anim="items"]';
      const code = '[data-anim="code"]';
      const git = '[data-anim="git"]';

      // Default state
      gsap.set(items, { autoAlpha: 1 });

      // Responsive animations
      const mm = gsap.matchMedia();

      mm.add("(min-height: 920px) and (min-width: 960px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: scope.current,
            start: "top 1px",
            end: "bottom bottom",
            scrub: true,
            onUpdate: (self) => setProgress(self.progress),
          },
        });

        tl.fromTo(
          git,
          { x: "100vw" },
          { x: "-100vw", ease: "slow(0.7, 0.7, false)" }
        ).fromTo(
          code,
          { x: "-100vw" },
          { x: "100vw", ease: "slow(0.7, 0.7, false)" },
          "<"
        );
      });

      mm.add("(max-height: 919px) and (max-width: 959px)", () => {
        gsap.timeline({
          scrollTrigger: {
            trigger: scope.current,
            start: "top center",
            end: "bottom center",
            onUpdate: (self) => setProgress(self.progress),
          },
        });
      });
    },
    { scope }
  );

  return (
    <section id={bookmarkId} ref={scope} className={css.tracker}>
      <div className={css.wrapper}>
        <div className={css.items} data-anim="items">
          <div data-anim="code">
            <AboutClient data={profileData} />
          </div>
          <div className={css.git} data-anim="git">
            <Contributions />
          </div>
        </div>
      </div>
    </section>
  );
}
