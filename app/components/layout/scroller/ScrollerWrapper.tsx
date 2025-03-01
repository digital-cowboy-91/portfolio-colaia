import { HTMLAttributes, RefObject } from "react";
import cssDefault from "./default.module.css";
import cssProfileContent from "./profileContent.module.css";

interface Props extends HTMLAttributes<HTMLDivElement> {
  bookmarkId?: string;
  ref?: RefObject<HTMLDivElement | null>;
  theme?: "default" | "profileContent";
}

export default function ScrollerWrapper({
  bookmarkId,
  ref,
  children,
  theme = "default",
  ...rest
}: Props) {
  let style;

  if (theme === "profileContent") {
    style = cssProfileContent;
  } else {
    style = cssDefault;
  }
  return (
    <section
      id={bookmarkId}
      ref={ref}
      className={style.tracker}
      data-gsap="tracker"
    >
      <div className={style.wrapper} data-gsap="wrapper">
        <div className={style.item} data-gsap="item" {...rest}>
          {children}
        </div>
      </div>
    </section>
  );
}
