import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import Link from "next/link";
import GradientBackground from "./components/GradientBackground";
import HeroClient from "./components/HeroClient";
import ProfileServer from "./components/ProfileServer";

export default function Home() {
  return (
    <>
      <menu
        className={`
                fixed bottom-[7rem] z-10
                flex flex-row-reverse items-center gap-8 p-4
                uppercase text-xl tracking-wider 
              `}
        style={{
          transform:
            // "translate(0%, 50%) rotate(90deg) translate(-100%, -50%)", // text top to bottom
            "translate(0%, 50%) rotate(-90deg) translate(0%, 50%)", // text bottom to top
          transformOrigin: "left",
        }}
      >
        <Link href="#herp" className="flex place-content-center">
          <Icon icon="codicon:arrow-up" width="1.75rem" className="rotate-90" />
        </Link>
        <Link href="#profile">Profile</Link>
        <Link href="#projects">Projects</Link>
        <Link href="#journey">Journey</Link>
        <span className="w-32 border-b border-foreground" />
      </menu>
      <section id="hero" className="h-[150vh]">
        <div
          className={`
          h-[calc(100vh-7rem)] p-4
          rounded-[1rem]
          relative overflow-hidden
        `}
        >
          <HeroClient />
          <GradientBackground />
        </div>
      </section>
      <section id="profile" className="h-[150vh]">
        <div
          className={`
          h-[calc(100vh-7rem)] p-4
          rounded-[1rem]
          relative overflow-hidden
          flex justify-center items-center
        `}
        >
          <ProfileServer />
        </div>
      </section>
    </>
  );
}
