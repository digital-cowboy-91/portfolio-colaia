"use client";

import css from "./style.module.scss";

import AboutClient from "@/app/components/profile-section/about/AboutClient";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import useDataResolver from "../data-provider/useDataResolver";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function component() {
  const scope = useRef(null);
  const profileData = useDataResolver("profile");

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
    <section ref={scope} className={css.tracker}>
      <div className={css.wrapper}>
        <div className={css.items} data-anim="items">
          <div className={css.code} data-anim="code">
            <AboutClient data={profileData} />
          </div>
          <div className={css.git} data-anim="git" />
        </div>
      </div>
    </section>
  );
}
