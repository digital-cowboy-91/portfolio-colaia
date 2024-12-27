"use client";

import { useState } from "react";
import HeroSection from "./components/HeroSection";
import ProfileSection from "./components/ProfileSection";

export default function Home() {
  const [renderContent, setRenderContent] = useState(false);

  return (
    <>
      <HeroSection onReady={() => setRenderContent(true)} />
      {renderContent && <ProfileSection />}
    </>
  );
}
