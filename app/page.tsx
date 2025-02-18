import portraitPic from "@/app/assets/profile-turtle-neck.webp";
import Image from "next/image";
import HeroText from "./components/HeroText";
import ProfileServer from "./components/ProfileServer";
import ToolsServer from "./components/tools/ToolsServer";
import HomeAnimate from "./HomeAnimate";
import { twTransform } from "./utils/tailwindComposer.macro.ts";

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

const tw = twTransform({
  layout: {
    DEFAULT:
      "relative w-full h-full rounded-single flex flex-col items-center gap-double",
    landscape:
      "grid place-items-center grid-cols-[minmax(0,1fr)_repeat(2,minmax(300px,960px))_minmax(0,1fr)] grid-rows-1",
  },
  imageWrapper: {
    DEFAULT: "h-full w-full flex flex-col",
    landscape: "order-2 col-start-3",
    portrait: "h-[60%]",
  },
  image: {
    DEFAULT:
      "h-full w-full max-w-[960px] mx-auto object-contain drop-shadow-massive",
    landscape: "z-10",
  },
  scrollables: {
    DEFAULT: "h-full w-full",
    landscape: "relative order-1 col-start-2",
    portrait: "absolute inset-0",
  },
  scrollableItem: {
    DEFAULT: "absolute inset-0 flex flex-col justify-center",
  },
});

export default function Home() {
  return (
    <HomeAnimate>
      <section className="h-[300vh]">
        <div className="w-full h-screen sticky top-0 bg-black p-single flex flex-col gap-single">
          <div
            className={tw.layout}
            style={{
              backgroundImage: gradient,
            }}
          >
            <div className={tw.imageWrapper}>
              <Image
                id="portrait"
                src={portraitPic}
                alt=""
                quality={100}
                priority
                className={tw.image}
                style={{ opacity: 0 }}
              />
            </div>
            <div
              className={tw.scrollables}
              style={{
                perspective: "1500px",
              }}
            >
              <div id="intro" className={tw.scrollableItem}>
                <HeroText />
              </div>
              <div
                id="about-me"
                className={tw.scrollableItem}
                style={{ opacity: 0 }}
              >
                <ProfileServer />
              </div>
              <div
                id="tools-table"
                className={tw.scrollableItem}
                style={{ opacity: 0 }}
              >
                <ToolsServer
                  as="table"
                  className="bg-white rounded-single text-background p-double drop-shadow-massive"
                />
              </div>
            </div>
          </div>
          <ToolsServer
            as="bar"
            className="h-[var(--tools-h)] p-single gap-[var(--tools-gap)] overflow-hidden bg-white rounded-single flex items-center justify-center text-background"
          />
        </div>
      </section>
    </HomeAnimate>
  );
}
