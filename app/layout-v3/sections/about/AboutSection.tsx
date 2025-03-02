"use client";

import css from "./style.module.scss";

import { useRegisterBookmark } from "@/app/components/layout/navigation";
import AboutClient from "@/app/components/profile-section/about/AboutClient";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import Contributions from "../../Contributions";
import useDataResolver from "../../data-provider/useDataResolver";

gsap.registerPlugin(useGSAP, ScrollTrigger);

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

      const mm = gsap.matchMedia();

      mm.add("(min-height: 920px) and (min-width: 960px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: scope.current,
            start: "top center",
            end: "bottom 75%",
            scrub: true,
            onUpdate: (self) => setProgress(self.progress),
          },
        });

        tl.fromTo(git, { yPercent: 0 }, { yPercent: 50, duration: 2 })
          .to(code, { y: -25, duration: 2 }, "<")
          .to(git, { left: "-100vw", ease: "circ.in" })
          .to(code, { right: "-100vw", ease: "circ.in" }, "<")
          .duration(3);
      });

      mm.add("(max-height: 919px) and (max-width: 959px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: scope.current,
            start: "top center",
            end: "bottom center",
            scrub: true,
            onUpdate: (self) => setProgress(self.progress),
          },
        });

        tl.fromTo(
          items,
          { yPercent: 50, scale: 0.9 },
          { yPercent: 0, duration: 1 }
        )
          .to(items, { scale: 1, duration: 0.5 })
          .to(items, { scale: 0.9, duration: 0.5 }, "+=1")
          .to(items, { yPercent: -50, duration: 1 })
          .duration(4);
      });
    },
    { scope }
  );

  return (
    <section id={bookmarkId} ref={scope} className={css.tracker}>
      <div className={css.wrapper}>
        <div className={css.items} data-anim="items">
          <div className={css.code} data-anim="code">
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
