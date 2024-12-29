import InterestsServer from "./components/InterestsServer";
import ProfileServer from "./components/ProfileServer";
import RootPageOrchestration from "./components/RootPageOrchestration";
import ToolsServer from "./components/ToolsServer";

export default function Home() {
  return (
    <RootPageOrchestration>
      <ProfileServer />
      <ToolsServer />
      <InterestsServer />
    </RootPageOrchestration>
  );
}
