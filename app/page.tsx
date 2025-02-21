import AnimateAbout from "./components/animations/AnimateAbout";
import AnimateIntro from "./components/animations/AnimateIntro";
import AnimateProfileLayout from "./components/animations/AnimateProfileLayout";
import AnimateProfileSection from "./components/animations/AnimateProfileSection";
import AnimateToolsTable from "./components/animations/AnimateToolsTable";
import ProfileIntro from "./components/ProfileIntro";
import ProfileServer from "./components/ProfileServer";
import ToolsServer from "./components/tools/ToolsServer";
import ProfileContainer from "./ProfileContainer";

export default function Home() {
  return (
    <main className="pb-[25vh]">
      <AnimateProfileSection>
        <AnimateProfileLayout>
          <ProfileContainer />
        </AnimateProfileLayout>
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
      </AnimateProfileSection>
      {/* <AnimateActivitySection>
        <ActivityServer />
      </AnimateActivitySection> */}
    </main>
  );
}
