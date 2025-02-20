import ActivityServer from "./components/ActivityServer";
import HeroText from "./components/HeroText";
import ProfileServer from "./components/ProfileServer";
import ToolsServer from "./components/tools/ToolsServer";
import ProfileContainer from "./ProfileContainer";
import ScrollableSection from "./ScrollableSection";

export default function Home() {
  return (
    <main>
      <ScrollableSection>
        <ProfileContainer />
        <ScrollableSection theme="sub-profile">
          <HeroText />
        </ScrollableSection>
        <ScrollableSection theme="sub-profile">
          <ProfileServer />
        </ScrollableSection>
        <ScrollableSection theme="sub-profile">
          <ToolsServer as="table" className="g-card tools__table" />
        </ScrollableSection>
      </ScrollableSection>
      <ScrollableSection>
        <ActivityServer />
      </ScrollableSection>
    </main>
  );
}
