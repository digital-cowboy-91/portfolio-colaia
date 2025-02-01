import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import Link from "next/link";
import { PropsWithChildren } from "react";

export default function Navbar({ children }: PropsWithChildren) {
  return (
    <menu
      className={`
                  h-[2rem]
                  fixed right-single bottom-[6rem] z-10
                  flex items-center gap-double px-single
                  uppercase text-xl tracking-wider 
                `}
      style={{
        transform: "translate(0%, 50%) rotate(90deg) translate(0%, 50%)",
        transformOrigin: "right",
      }}
    >
      {children}
      <span className="w-32 border-b border-foreground" />
      {[
        {
          icon: "entypo-social:linkedin-with-circle",
          url: "https://www.linkedin.com/in/dkolaja/",
          text: "@dkolaja",
        },
        {
          icon: "entypo-social:github-with-circle",
          url: "https://github.com/digital-cowboy-91",
          text: "@digital-cowboy-91",
        },
      ].map(({ url, icon }) => (
        <Link key={url} href={url} className="size-[24px] md:size-[32px]">
          <Icon icon={icon} height="100%" width="100%" />
        </Link>
      ))}
      <span className="w-32 border-b border-foreground" />
    </menu>
  );
}
