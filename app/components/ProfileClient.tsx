"use client";

import crop from "@/app/assets/profile-photo.jpg";
import {
  useAnimate,
  useInView,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { Profile } from "../types/profile";
import Code from "./Code";

type Props = {
  data: Profile[];
};

export default function ProfileClient({ data }: Props) {
  const { snippet } = data[0];

  const [scope, animate] = useAnimate();
  const isReady = useRef(false);
  const isInView = useInView(scope, { once: true });
  const { scrollYProgress } = useScroll({
    target: scope,
    offset: ["end center", "start center"],
  });

  useMotionValueEvent(scrollYProgress, "change", (position) => {
    if (!isReady.current) return;

    animate("#profile-card", {
      rotateY: 10 + -20 * position,
      rotateX: -10 + 20 * position,
    });
  });

  useEffect(() => {
    if (!isInView) return;

    const position = scrollYProgress.get();

    animate(
      "#profile-card",
      {
        opacity: 1,
        rotateY: 10 + -20 * position,
        rotateX: [90, -5 + 10 * position],
      },
      {
        duration: 0.5,
        ease: "backOut",
      }
    ).then(() => (isReady.current = true));
  }, [isInView]);

  return (
    <div ref={scope} style={{ perspective: "1200px" }}>
      <div
        id="profile-card"
        className="opacity-0 bg-foreground rounded-[3rem] max-w-[800px] mx-auto p-8 flex gap-8 items-center max-md:flex-col-reverse"
        style={{
          filter: `drop-shadow(10px 10px 10px rgba(0, 0, 0, 0.5))`,
        }}
      >
        <Code snippet={snippet} />
        <Image
          className="rounded-full max-w-[250px] max-h-[250px]"
          src={crop}
          alt="Portrait photo of young man looking straight to the camera"
        />
      </div>
    </div>
  );
}
