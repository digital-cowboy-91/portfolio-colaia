import AnimIntro from "./components/animations/AnimIntro";
import ProfileIntro from "./components/ProfileIntro";
import ProfileContainer from "./ProfileContainer";
import ScrollableSection from "./ScrollableSection";

export default function Home() {
  return (
    <main>
      <ScrollableSection>
        <ProfileContainer />
        <AnimIntro>
          <ProfileIntro />
        </AnimIntro>
        {/* <ScrollableSection theme="sub-profile">
          <ProfileServer />
        </ScrollableSection>
        <ScrollableSection theme="sub-profile">
          <ToolsServer as="table" className="g-card tools__table" />
        </ScrollableSection> */}
      </ScrollableSection>
      {/* <ScrollableSection>
        <ActivityServer />
      </ScrollableSection> */}
    </main>
  );
}
