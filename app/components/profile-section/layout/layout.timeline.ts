import gsap from "gsap";
import { introLayout_tl } from "../intro";

export default function layoutTimeline() {
  const tl = gsap.timeline({
    id: "profile-layout",
    paused: true,
    defaults: { duration: 0.5, ease: "ease.in" },
  });

  const intro_tl = introLayout_tl();

  const row1 = "#hero__row1";
  const row2 = "#hero__row2";
  const image = "#hero__image";

  tl.add("start")
    .set(row1, { y: "-=100px", opacity: 0 })
    .set(row2, { y: "+=100px", opacity: 0 }, "<")
    .set(image, { opacity: 1, x: 0 })
    .to(row1, { y: 0, opacity: 1 })
    .to(row2, { y: 0, opacity: 1 }, "<")
    .add(intro_tl.play())
    .add("leave")
    .to(image, { x: "100vw", ease: "circ.in" })
    .to(row1, { y: "-=100px", opacity: 0 })
    .to(row2, { y: "+=100px", opacity: 0 }, "<")
    .add("end");

  return tl;
}
