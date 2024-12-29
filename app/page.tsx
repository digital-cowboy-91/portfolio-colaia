import dynamic from "next/dynamic";
import HeroClient from "./components/HeroClient";

const InterestsServer = dynamic(() => import("./components/InterestsServer"));
const ProfileServer = dynamic(() => import("./components/ProfileServer"));
const ToolsServer = dynamic(() => import("./components/ToolsServer"));

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
