"use client";

import gsap from "gsap";
import ReactLenis, { LenisRef } from "lenis/react";
import { PropsWithChildren, useEffect, useRef } from "react";

export default function LenisWrapper({ children }: PropsWithChildren) {
  const ref = useRef<LenisRef>(null);

  useEffect(() => {
    function update(time: number) {
      ref.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);

    return () => gsap.ticker.remove(update);
  }, []);

  return (
    <ReactLenis
      root
      options={{ autoRaf: false, lerp: 0.1, duration: 2 }}
      ref={ref}
    >
      {children}
    </ReactLenis>
  );
}
