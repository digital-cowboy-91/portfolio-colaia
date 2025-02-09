import ActivityServer from "./components/ActivityServer";
import HeroClient from "./components/HeroClient";
import { Section, SectionWrapper } from "./components/layout/sections";
import ProfileServer from "./components/ProfileServer";
import { Tools } from "./components/tools";

export default function Home() {
  return (
    <SectionWrapper>
      <Section
        id="hero"
        bookmark={{ title: "Home", icon: "codicon:arrow-up" }}
        className="h-[calc(100vh-var(--tools-h)-var(--spacing-single))] p-single"
      >
        <div className="relative rounded-single overflow-hidden w-full h-full">
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
        </div>
      </Section>
      <Section
        id="profile"
        bookmark={{ title: "Profile" }}
        className="px-single pt-0 pb-[25vh] flex flex-col gap-[5vh]"
      >
        <Tools />
        <ProfileServer />
      </Section>
      <Section id="activity" bookmark={{ title: "Activity" }}>
        <ActivityServer />
      </Section>
    </SectionWrapper>
  );
}
