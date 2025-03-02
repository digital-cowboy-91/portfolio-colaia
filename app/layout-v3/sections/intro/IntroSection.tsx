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
  const scope = useRef(null);
  const { bookmarkId, setProgress } = useRegisterBookmark({
    id: "intro",
    title: "Intro",
  });

  useGSAP(
    () => {
      const wrapper = '[data-anim="wrapper"]';

      const onFirstLoad = () => {
        const introLayout = introLayout_tl().pause();
        gsap
          .timeline()
          .delay(0.3)
          .fromTo(wrapper, { y: -50, autoAlpha: 0 }, { y: 0, autoAlpha: 1 })
          .add(introLayout.play());
      };

      gsap.timeline({
        scrollTrigger: {
          trigger: scope.current,
          start: "top 1px",
          end: "bottom top",
          scrub: true,
          onEnter: () => onFirstLoad(),
          onUpdate: (self) => setProgress(self.progress),
        },
      });
    },
    { scope }
  );

  return (
    <section id={bookmarkId} ref={scope} className={css.tracker}>
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
