import HeroClient from "./components/HeroClient";
import InterestsServer from "./components/InterestsServer";
import ProfileServer from "./components/ProfileServer";
import ToolsServer from "./components/ToolsServer";

export default function Home() {
  return (
    <>
      <HeroClient />
      <ProfileServer />
      <ToolsServer />
      <InterestsServer />
    </>
  );
}
