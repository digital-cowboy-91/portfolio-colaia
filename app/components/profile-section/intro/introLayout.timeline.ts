import gsap from "gsap";

export default function introLayoutTimeline() {
  const tl = gsap.timeline({ id: "profile-intro", paused: true });

  tl.to("#hero__names", {
    opacity: 1,
    duration: 1,
  })
    .to(
      "#hero__name-1",
      {
        scale: 1,
        duration: 1,
      },
      "<"
    )
    .to(
      "#hero__name-2",
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "back.out",
      },
      "-=0.5"
    )
    .to(
      "#hero__name-3",
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "back.out",
      },
      "<"
    )
    .to("#hero__name-1", {
      x: "-2.5rem",
      duration: 0.75,
      ease: "back.out",
    })
    .to(
      "#hero__name-3",
      {
        x: "2.5rem",
        duration: 0.75,
        ease: "back.out",
      },
      "<"
    )
    .to(
      "#hero__name-2",
      {
        opacity: 0.5,
        filter: "blur(3px)",
      },
      "<"
    )
    .to(
      "#hero__name-3",
      {
        opacity: 0.25,
        filter: "blur(6px)",
      },
      "<"
    )
    .to("#hero__subheading>span", {
      rotateX: 0,
      opacity: 1,
      ease: "elastic.out(1,0.5)",
      duration: 1,
    });

  return tl;
}
