import ActivityScroller from "@/app/components/activity-section/ActivityScroller";
import ActivityServer from "@/app/components/ActivityServer";
import AboutServer, {
  AboutScroller,
} from "@/app/components/profile-section/about";
import Intro, { IntroScroller } from "@/app/components/profile-section/intro";
import ProfileLayout from "@/app/components/profile-section/layout";
import ProfileScroller from "@/app/components/profile-section/ProfileScroller";
import ToolsServer, {
  ToolsScroller,
} from "@/app/components/profile-section/tools";

export default function Home() {
  return (
    <main className="pb-4">
      <ProfileScroller>
        <ProfileLayout />
        <div>
          <IntroScroller>
            <Intro />
          </IntroScroller>
          <AboutScroller>
            <AboutServer />
          </AboutScroller>
          <ToolsScroller>
            <ToolsServer
              as="table"
              className="g-card p-single drop-shadow-massive"
            />
          </ToolsScroller>
        </div>
      </ProfileScroller>
      <ActivityScroller>
        <ActivityServer />
      </ActivityScroller>
    </main>
  );
}
