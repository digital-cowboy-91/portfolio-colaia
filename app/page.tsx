import GradientBackground from "./components/GradientBackground";
import HeroClient from "./components/HeroClient";
import InterestsServer from "./components/InterestsServer";
import ProfileServer from "./components/ProfileServer";
import { SectionItem, SectionWrapper } from "./components/Sections";

function Placeholder({ name }: { name: string }) {
  return (
    <div className="w-full h-[500px] bg-[grey] flex justify-center items-center text-3xl flex flex-col">
      <span>{name.toUpperCase()}</span>
      <span>PLACEHOLDER</span>
    </div>
  );
}

export default function Home() {
  return (
    <SectionWrapper>
      <SectionItem id="hero" icon="codicon:arrow-up">
        <HeroClient />
        <GradientBackground />
      </SectionItem>
      <SectionItem
        id="profile"
        sectionClass="h-[200vh]"
        containerClass="sticky top-0"
      >
        <ProfileServer />
      </SectionItem>
      {/* <SectionItem
        id="projects"
        sectionClass="h-[200vh]"
        containerClass="sticky top-0"
      >
        <Placeholder name="projects" />
      </SectionItem> */}
      <SectionItem id="journey">
        <InterestsServer />
      </SectionItem>
    </SectionWrapper>
  );
}
