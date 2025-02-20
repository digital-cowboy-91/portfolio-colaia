import { PropsWithChildren, RefObject } from "react";
import "./ScrollableSection.themes.css";

interface Props extends PropsWithChildren {
  ref?: RefObject<HTMLDivElement | null>;
  theme?: string;
}

export default function ScrollableSection({
  ref,
  theme = "default",
  children,
}: Props) {
  return (
    <section ref={ref} className="anim__tracker" data-theme={theme}>
      <div className="anim__wrapper flex flex-col justify-center">
        <div className="anim__item">{children}</div>
      </div>
    </section>
  );
}
