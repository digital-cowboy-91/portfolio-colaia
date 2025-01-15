import ActivityServer from "./components/ActivityServer";
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
        <div
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage: `
              radial-gradient(
                circle at top left,
                rgba(0,191,255,1),
                rgba(32,167,239,0.88),
                rgba(64,143,223,0.75),
                rgba(96,119,207,0.63),
                rgba(128,95,190,0.5),
                rgba(159,72,174,0.38),
                rgba(191,48,158,0.25),
                rgba(223,24,142,0.13),
                rgba(255,0,126,0) 75%
              )
            `,
          }}
        />
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
