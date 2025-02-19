import portraitPic from "@/app/assets/profile-turtle-neck.webp";
import Image from "next/image";
import HeroText from "./components/HeroText";
import ProfileServer from "./components/ProfileServer";
import ToolsServer from "./components/tools/ToolsServer";
import HomeAnimate from "./HomeAnimate";
import "./profile.v2.css";

export default function Home() {
  return (
    <HomeAnimate>
      <main>
        <div className="layout">
          <div className="section__group">
            <section className="anim__frame-0">
              <div className="portrait">
                <Image
                  className="anim__portrait"
                  src={portraitPic}
                  alt=""
                  quality={100}
                  priority
                  style={{ opacity: 0 }}
                />
              </div>
              <div className="frame__group">
                <div
                  className="frame__item anim__frame-1"
                  style={{ display: "flex" }}
                >
                  <HeroText />
                </div>
                <div
                  className="frame__item anim__frame-2"
                  style={{ display: "none", opacity: 0 }}
                >
                  <ProfileServer />
                </div>
                <div
                  className="frame__item anim__frame-3"
                  style={{ display: "none", opacity: 0 }}
                >
                  <ToolsServer as="table" className="g-card tools__table" />
                </div>
              </div>
            </section>
            <section className="anim__frame-4">ACTIVITY</section>
          </div>
          <ToolsServer as="bar" className="g-card tools__bar" />
        </div>
      </main>
    </HomeAnimate>
  );
}
