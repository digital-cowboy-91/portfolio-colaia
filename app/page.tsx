import { Icon } from "@iconify-icon/react";
import ContainerWrapper from "./components/ContainerWrapper";
import HeroClient from "./components/HeroClient";

export default function Home() {
  return (
    <section className="h-screen grid grid-rows-[1fr_max-content] gap-4 p-4">
      <HeroClient />
      <ContainerWrapper
        id="tools"
        className="bg-white h-full p-4 flex justify-center items-center gap-8"
      >
        {[
          "simple-icons:github",
          "simple-icons:directus",
          "simple-icons:react",
          "simple-icons:vuedotjs",
          "simple-icons:nodedotjs",
          "simple-icons:javascript",
          "simple-icons:typescript",
        ].map((iconName) => (
          <Icon key={iconName} icon={iconName} height={"2rem"} />
        ))}
      </ContainerWrapper>
    </section>
  );
}
