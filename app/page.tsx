import portraitPic from "@/app/assets/profile-turtle-neck.webp";
import Image from "next/image";
import HeroText from "./components/HeroText";
import ProfileServer from "./components/ProfileServer";
import ToolsServer from "./components/tools/ToolsServer";
import HomeAnimate from "./HomeAnimate";

const gradient = `
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
)`;

export default function Home() {
  return (
    <HomeAnimate>
      <section className="h-[300vh]">
        <div className="w-full h-screen sticky top-0 bg-black p-single flex flex-col gap-single">
          <div
            className={`
        w-full h-full rounded-single
        grid place-items-center
        grid-cols-[minmax(0,1fr)_minmax(300px,max-content)_minmax(0,1fr)]
          landscape:grid-cols-[minmax(0,.25fr)_1fr_1fr_minmax(0,.25fr)]
        gap-double
      `}
            style={{
              backgroundImage: gradient,
            }}
          >
            <div
              className={`
            col-start-2
            w-full
            h-full
            flex place-content-center
            relative
          `}
              style={{
                perspective: "1500px",
              }}
            >
              <div
                id="intro"
                className="absolute inset-0 flex flex-col justify-center"
              >
                <HeroText />
              </div>
              <div
                id="about-me"
                className="absolute inset-0 flex flex-col justify-center"
                style={{ opacity: 0 }}
              >
                <ProfileServer />
              </div>
              <div
                id="tools-table"
                className="absolute inset-0 flex flex-col justify-center"
                style={{ opacity: 0 }}
              >
                <div className="bg-white rounded-single text-background p-double drop-shadow-massive">
                  <ToolsServer as="table" />
                </div>
              </div>
            </div>
            <Image
              id="portrait"
              src={portraitPic}
              alt=""
              quality={100}
              priority
              className={`
            col-start-2
            landscape:col-start-3
            h-full w-full object-contain
            portrait:self-end
            portrait:translate-y-[5rem]
            landscape:z-10
            drop-shadow-massive
          `}
              style={{ opacity: 0 }}
            />
          </div>
          <div className="h-[var(--tools-h)] bg-white rounded-single flex items-center justify-center">
            <ToolsServer as="bar" />
          </div>
        </div>
      </section>
    </HomeAnimate>
  );
}
