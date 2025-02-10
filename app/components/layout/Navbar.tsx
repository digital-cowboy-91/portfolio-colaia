import { PropsWithChildren } from "react";
import SVGLine from "./SVGLine";
import SocialLinks from "./SocialLinks";
import NavbarHorizontal from "./navbar/NavbarHorizontal";

export default function Navbar({ children }: PropsWithChildren) {
  const vertical = false;

  return vertical ? (
    <div className="flex flex-col m-double gap-single fixed bottom-[calc(var(--tools-h)+var(--spacing-single))] right-0 z-50">
      <menu
        className="flex items-center gap-single uppercase text-xl tracking-wider"
        style={{ writingMode: "sideways-rl" }}
      >
        {children}
      </menu>
      <SVGLine direction="vertical" />
      <SocialLinks />
      <SVGLine direction="vertical" />
    </div>
  ) : (
    <NavbarHorizontal />
  );
}
