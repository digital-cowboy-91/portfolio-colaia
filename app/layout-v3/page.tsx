import LenisWrapper from "./LenisWrapper";
import DataProvider from "./data-provider";
import AboutSection from "./sections/about/AboutSection";
import ActivitySection from "./sections/activity/ActivitySection";
import IntroSection from "./sections/intro/IntroSection";
import ToolboxSection from "./sections/toolbox/ToolboxSection";

export default function page() {
  return (
    <DataProvider>
      <LenisWrapper>
        <IntroSection />
        <AboutSection />
        <ToolboxSection />
        <ActivitySection />
      </LenisWrapper>
    </DataProvider>
  );
}
