import AboutServer, {
  AboutScrollTimeline,
} from "./components/profile-section/about";
import Intro, { IntroScrollTimeline } from "./components/profile-section/intro";
import ProfileLayout from "./components/profile-section/layout";
import ProfileTimeline from "./components/profile-section/ProfileTimeline";
import ToolsServer, {
  ToolsScrollTimeline,
} from "./components/profile-section/tools";

export default function Home() {
  return (
    <main className="pb-4">
      <ProfileTimeline>
        <ProfileLayout />
        <div>
          <IntroScrollTimeline>
            <Intro />
          </IntroScrollTimeline>
          <AboutScrollTimeline>
            <AboutServer />
          </AboutScrollTimeline>
          <ToolsScrollTimeline>
            <ToolsServer
              as="table"
              className="g-card p-single drop-shadow-massive"
            />
          </ToolsScrollTimeline>
        </div>
      </ProfileTimeline>

      {/* <AnimateActivitySection>
        <ActivityServer />
      </AnimateActivitySection> */}
    </main>
  );
}
