import { HTMLAttributes, RefObject } from "react";
import "./ScrollableSection.themes.css";

interface Props extends HTMLAttributes<HTMLDivElement> {
  bookmarkId?: string;
  ref?: RefObject<HTMLDivElement | null>;
  theme?: string;
}

export default function ScrollableSection({
  bookmarkId,
  ref,
  theme = "default",
  children,
  className,
  ...rest
}: Props) {
  return (
    <section
      id={bookmarkId}
      ref={ref}
      className="anim__tracker"
      data-theme={theme}
    >
      <div className="anim__wrapper">
        <div
          className={`anim__item ${className ? className : ""}`.trim()}
          {...rest}
        >
          {children}
        </div>
      </div>
    </section>
  );
}
