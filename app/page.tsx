import AboutSection from "./components-v3/about/AboutSection";
import ActivitySection from "./components-v3/activity/ActivitySection";
import DataProvider from "./components-v3/data-provider";
import IntroSection from "./components-v3/intro/IntroSection";
import LenisWrapper from "./components-v3/LenisWrapper";
import ToolboxSection from "./components-v3/toolbox/ToolboxSection";

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
