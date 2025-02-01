import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import Link from "next/link";
import "./Navbar.style.css";

import { PropsWithChildren } from "react";

export default function Navbar({ children }: PropsWithChildren) {
  return (
    <div data-component="navbar">
      <menu>
        {children}
        <div data-component="separator" />
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
          <Link key={url} href={url} data-component="social-link">
            <Icon icon={icon} height="100%" width="100%" />
          </Link>
        ))}
        <div data-component="separator" />
      </menu>
    </div>
  );
}
