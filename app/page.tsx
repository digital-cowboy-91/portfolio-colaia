"use client";

import { useState } from "react";
import HeroSection from "./components/HeroSection";
import InterestSection from "./components/InterestSection";
import ProfileSection from "./components/ProfileSection";
import ToolsSection from "./components/ToolsSection";

export default function Home() {
  const [renderContent, setRenderContent] = useState(false);

  return (
    <>
      <HeroSection onReady={() => setRenderContent(true)} />
      {renderContent && (
        <>
          <ProfileSection />
          <ToolsSection />
          <InterestSection />
        </>
      )}
    </>
  );
}
