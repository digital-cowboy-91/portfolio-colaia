import GradientBackground from "./components/GradientBackground";
import HeroClient from "./components/HeroClient";
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
      <SectionItem id="profile" className="h-[200vh]">
        <ProfileServer />
      </SectionItem>
      <SectionItem id="projects" className="h-[200vh]">
        <Placeholder name="projects" />
      </SectionItem>
      <SectionItem id="journey" className="h-[200vh]">
        <Placeholder name="journey" />
      </SectionItem>
    </SectionWrapper>
  );
}
