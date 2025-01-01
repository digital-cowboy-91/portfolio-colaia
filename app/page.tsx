import portraitPic from "@/app/assets/profile-turtle-neck-v3.webp";
import { Icon } from "@iconify-icon/react";
import Image from "next/image";

export default function Home() {
  return (
    <section className="h-screen grid grid-rows-[1fr_max-content] gap-4 p-4">
      <div
        id="hero"
        className="rounded-[1rem] relative flex items-center overflow-hidden"
      >
        <div
          className={`w-full h-1/2 flex gap-8 items-end 2xl:items-center justify-center px-4 relative`}
        >
          <div className={`flex max-xl:flex-col gap-8 items-center text-white`}>
            <div className="text-9xl leading-[0.75] flex flex-col font-black relative">
              <span id="name-1" className="relative">
                COLAIA
                <div
                  className="absolute w-[calc(100%+2*2rem)] h-[calc(100%+2*2rem)] left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 rounded-full border-2 bg-[rgba(209,2,58,0.2)] -z-10"
                  style={{
                    mask: "linear-gradient(-90deg, transparent 30%, rgba(255,255,255,0.5))",
                  }}
                />
              </span>
              <span id="name-2" className="ms-[2.5rem]">
                COLAIA
              </span>
              <span id="name-3" className="ms-[5rem] relative">
                COLAIA
                <div
                  className="absolute w-[calc(100%+2*2rem)] h-[calc(100%+2*2rem)] left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 rounded-full border-2 bg-[rgba(209,2,58,0.2)] -z-10"
                  style={{
                    mask: "linear-gradient(90deg, transparent 30%, rgba(255,255,255,0.5))",
                  }}
                />
              </span>
              <div
                className="absolute -z-10 w-[150%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 aspect-square"
                style={{
                  background: `
                  radial-gradient(
                    50% 50% at 50% 50%,
                    hsl(273deg 71% 38% / 60%),
                    hsl(273deg 71% 38% / 20%),
                    transparent
                  )
                `,
                }}
              />
            </div>
            <div className="text-5xl font-[300] grid grid-cols[auto_auto] gap-x-4 max-xl:text-center">
              <span className="col-span-2">SELF-TAUGHT</span>
              <span>FULLSTACK</span>
              <span>CODER</span>
            </div>
          </div>
          <Image
            src={portraitPic}
            alt=""
            className="h-full w-[auto] object-contain max-2xl:absolute max-2xl:-z-20 max-2xl:-translate-y-1/2 max-2xl:top-1/4"
          />
        </div>
        {/* <div
          id="hero__top-gradient"
          className="absolute inset-0"
          style={{
            background: `
                radial-gradient(
                  120% 105% at 50% 20%,
                  rgba(11,13,18, 0),
                  rgba(24,12,49, .22) 40%,
                  rgba(209,2,58, 1) 70%,
                  rgba(20,0,163, 0)
                )
              `,
          }}
        /> */}
        <div
          id="hero__top-gradient"
          className="absolute inset-y-0 left-1/2 -translate-x-1/2"
        >
          <svg
            height="100%"
            viewBox="0 0 3600 1222"
            version="1.1"
            style={{
              fillRule: "evenodd",
              clipRule: "evenodd",
              strokeLinejoin: "round",
              strokeMiterlimit: 2,
            }}
          >
            <g transform="matrix(4.37894,0,0,2.09141,-12191.2,-80.9845)">
              <rect
                x="2784.05"
                y="38.723"
                width="822.118"
                height="584.162"
                style={{ fill: "url(#_Radial1)" }}
              />
            </g>
            <defs>
              <radialGradient
                id="_Radial1"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="matrix(-760.057,2.59852e-13,-2.51043e-14,-572.276,3195.11,167.862)"
              >
                <stop
                  offset="0"
                  style={{ stopColor: "rgb(11,13,18)", stopOpacity: 0 }}
                />
                <stop
                  offset="0.4"
                  style={{ stopColor: "rgb(24,12,49)", stopOpacity: 0.22 }}
                />
                <stop
                  offset="0.7"
                  style={{ stopColor: "rgb(209,2,58)", stopOpacity: 1 }}
                />
                <stop
                  offset="1"
                  style={{ stopColor: "rgb(20,0,163)", stopOpacity: 0 }}
                />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div>
      <div
        id="tools"
        className="rounded-[1rem] bg-white h-full p-4 flex justify-center items-center gap-8"
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
      </div>
    </section>
  );
}
