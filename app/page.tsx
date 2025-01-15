import ActivityServer from "./components/ActivityServer";
import GradientBackground from "./components/GradientBackground";
import HeroClient from "./components/HeroClient";
import ProfileServer from "./components/ProfileServer";
import { SectionItem, SectionWrapper } from "./components/Sections";

export default function Home() {
  return (
    <SectionWrapper>
      <SectionItem
        id="hero"
        icon="codicon:arrow-up"
        fixedHeight
        className="h-svh"
      >
        <HeroClient />
        <GradientBackground />
      </SectionItem>
      <SectionItem id="profile" className="flex justify-center items-center">
        <ProfileServer />
      </SectionItem>
      <SectionItem id="activity">
        <ActivityServer />
      </SectionItem>
    </SectionWrapper>
  );
}
