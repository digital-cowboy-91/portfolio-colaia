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
      <section className="profile">
        <div className="profile__layout">
          <div className="profile__main">
            <div className="profile__image-wrapper">
              <Image
                className="anim__portrait"
                src={portraitPic}
                alt=""
                quality={100}
                priority
                style={{ opacity: 0 }}
              />
            </div>
            <div className="profile__frames">
              <div
                className="profile__frame-item anim__frame-1"
                style={{ display: "flex" }}
              >
                <HeroText />
              </div>
              <div
                className="profile__frame-item anim__frame-2"
                style={{ display: "none", opacity: 0 }}
              >
                <ProfileServer />
              </div>
              <div
                className="profile__frame-item anim__frame-3"
                style={{ display: "none", opacity: 0 }}
              >
                <ToolsServer
                  as="table"
                  className="g-card profile__tools-table drop-shadow-massive"
                />
              </div>
            </div>
          </div>
          <ToolsServer as="bar" className="g-card profile__tools-bar" />
        </div>
      </section>
    </HomeAnimate>
  );
}
