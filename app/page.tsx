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
                id="portrait"
                className="anim__portrait"
                src={portraitPic}
                alt=""
                quality={100}
                priority
                style={{ opacity: 0 }}
              />
            </div>
            <div className="profile__scrollables">
              <div
                id="intro"
                className="profile__scrollable-item 
                anim__scrollable-1"
              >
                <HeroText />
              </div>
              <div
                id="about-me"
                className="profile__scrollable-item anim__scrollable-2"
                style={{ opacity: 0 }}
              >
                <ProfileServer />
              </div>
              <div
                id="tools-table"
                className="profile__scrollable-item anim__scrollable-3"
                style={{ opacity: 0 }}
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

// export default function Home() {
//   return (
//     <HomeAnimate>
//       <section id="profile">
//         <div className="layout">
//           <div className="main">
//             <div className="image-wrapper">
//               <Image
//                 id="portrait"
//                 src={portraitPic}
//                 alt=""
//                 quality={100}
//                 priority
//                 style={{ opacity: 0 }}
//               />
//             </div>
//             <div className="scrollables">
//               <div id="intro" className={"scrollable-item"}>
//                 <HeroText />
//               </div>
//               <div
//                 id="about-me"
//                 className="scrollable-item"
//                 style={{ opacity: 0 }}
//               >
//                 <ProfileServer />
//               </div>
//               <div
//                 id="tools-table"
//                 className="scrollable-item"
//                 style={{ opacity: 0 }}
//               >
//                 <ToolsServer
//                   as="table"
//                   className="bg-white rounded-single text-background p-double drop-shadow-massive"
//                 />
//               </div>
//             </div>
//           </div>
//           <ToolsServer as="bar" className="card tools-bar" />
//         </div>
//       </section>
//     </HomeAnimate>
//   );
// }
