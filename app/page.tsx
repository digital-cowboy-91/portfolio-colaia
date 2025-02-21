import AnimateIntro from "./components/animations/AnimateIntro";
import ProfileIntro from "./components/ProfileIntro";
import ProfileContainer from "./ProfileContainer";
import ScrollableSection from "./ScrollableSection";

export default function Home() {
  return (
    <main>
      <ScrollableSection>
        <ProfileContainer />
        <AnimateIntro>
          <ProfileIntro />
        </AnimateIntro>
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
