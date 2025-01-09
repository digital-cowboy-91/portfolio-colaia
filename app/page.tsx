import HeroClient from "./components/HeroClient";
import ToolsServer from "./components/ToolsServer";

export default function Home() {
  return (
    <section className="h-screen grid grid-rows-[1fr_max-content] gap-4 p-4">
      <HeroClient />
      <ToolsServer />
    </section>
  );
}
