import AnimateAbout from "./components/animations/AnimateAbout";
import AnimateIntro from "./components/animations/AnimateIntro";
import AnimateToolsTable from "./components/animations/AnimateToolsTable";
import ProfileIntro from "./components/ProfileIntro";
import ProfileServer from "./components/ProfileServer";
import ToolsServer from "./components/tools/ToolsServer";
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
        <AnimateAbout>
          <ProfileServer />
        </AnimateAbout>
        <AnimateToolsTable>
          <ToolsServer
            as="table"
            className="g-card p-single drop-shadow-massive"
          />
        </AnimateToolsTable>
      </ScrollableSection>
      {/* <ScrollableSection>
        <ActivityServer />
      </ScrollableSection> */}
    </main>
  );
}
