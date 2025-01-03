"use client";

import { PropsWithChildren, useState } from "react";
import HeroClient from "./HeroClient";

export default function RootPageOrchestration({ children }: PropsWithChildren) {
  const [isReady, setIsReady] = useState(false);

  return (
    <>
      <HeroClient onReady={() => setIsReady(true)} />
      {isReady && children}
    </>
  );
}
