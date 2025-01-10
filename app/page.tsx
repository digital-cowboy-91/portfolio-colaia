import HeroClient from "./components/HeroClient";
import ProfileServer from "./components/ProfileServer";
import SectionWrapper from "./components/SectionWrapper";
import ToolsServer from "./components/ToolsServer";

export default function Home() {
  return (
    <>
      <SectionWrapper className="grid grid-rows-[1fr_max-content] gap-4">
        <HeroClient />
        <ToolsServer />
      </SectionWrapper>
      <SectionWrapper>
        <ProfileServer />
      </SectionWrapper>
    </>
  );
}
