import portraitPic from "@/app/assets/profile-turtle-neck.webp";
import Image from "next/image";
import ToolsServer from "./components/tools/ToolsServer";
import "./ProfileContainer.theme.css";

const gradient = `radial-gradient(
    circle at top left,
    rgba(0, 191, 255, 1),
    rgba(32, 167, 239, 0.88),
    rgba(64, 143, 223, 0.75),
    rgba(96, 119, 207, 0.63),
    rgba(128, 95, 190, 0.5),
    rgba(159, 72, 174, 0.38),
    rgba(191, 48, 158, 0.25),
    rgba(223, 24, 142, 0.13),
    rgba(255, 0, 126, 0) 75%
  )`;

export default function ProfileContainer() {
  return (
    <section className="w-full h-screen p-4 flex flex-col gap-4 fixed -z-10">
      <div
        className="flex-grow rounded-single flex
        landscape:ps-[50%] landscape:items-center portrait:px-[10%] portrait:justify-center"
        style={{ background: gradient }}
      >
        <div className="max-w-[960px] flex items-center portrait:h-[60%] portrait:items-end">
          <Image
            className="anim__portrait"
            src={portraitPic}
            alt=""
            quality={100}
            priority
            //   style={{ opacity: 0 }}
          />
        </div>
      </div>
      <ToolsServer
        as="bar"
        className="g-card h-[var(--tools-h)] p-[var(--tools-p)] flex justify-center gap-[var(--tools-gap)]"
      />
    </section>
  );
}
