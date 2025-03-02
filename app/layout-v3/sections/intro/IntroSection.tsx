"use client";

import css from "./style.module.scss";

import portraitPic from "@/app/assets/profile-turtle-neck.webp";
import { useRegisterBookmark } from "@/app/components/layout/navigation";
import Intro, { introLayout_tl } from "@/app/components/profile-section/intro";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function IntroSection() {
  const ref = useRef(null);
  const { bookmarkId, setProgress } = useRegisterBookmark({
    id: "intro",
    title: "Intro",
  });

  useGSAP(() => {
    const scope = ref.current;
    const q = gsap.utils.selector(scope);
    const wrapper = q('[data-anim="wrapper"]');

    const introLayout = introLayout_tl().pause();

    const onFirstLoad = () => {
      const tl = gsap.timeline();

      tl.set("body", { overflow: "hidden" })
        .fromTo(wrapper, { y: -50, autoAlpha: 0 }, { y: 0, autoAlpha: 1 })
        .add(introLayout.play())
        .set("body", { overflow: "unset" });
    };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scope,
        start: "top center",
        end: "150% bottom",
        scrub: true,
        onEnter: (self) => self.progress !== 1 && onFirstLoad(),
        onUpdate: (self) => setProgress(self.progress),
        // markers: true,
      },
    });

    tl.to(wrapper, { scale: 0.9, duration: 0.5 }, "+=1.5")
      .to(wrapper, { yPercent: -50, duration: 1 })
      .duration(3);
  });

  return (
    <section id={bookmarkId} ref={ref} className={css.tracker}>
      <div className={css.wrapper} data-anim="wrapper">
        <div className={css.content}>
          <div className={css.intro}>
            <Intro />
          </div>
          <div className={css.portrait}>
            <Image
              className="anim__portrait h-full object-contain"
              src={portraitPic}
              alt=""
              quality={100}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
