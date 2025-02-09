import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import {
  motion,
  stagger,
  useAnimate,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import SocialLinks from "../SocialLinks";
import SVGLine from "../SVGLine";

export default function NavbarHorizontal() {
  const [scope, animate] = useAnimate();
  const menuRef = useRef<HTMLDivElement>(null);
  const [showNav, setShowNav] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const timer = useRef({
    instance: null as NodeJS.Timeout | null,
    set: function () {
      this.instance = setTimeout(() => {
        setShowNav(false);
        setShowMenu(false);
      }, 2000);
    },
    clear: function () {
      let instance = this.instance;

      if (instance) {
        clearTimeout(instance);
        instance = null;
      }
    },
    reset: function () {
      this.clear();
      this.set();
    },
  });
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (current) => {
    timer.current.reset();

    !showNav && setShowNav(true);
  });

  useEffect(() => {
    const menuIn = () =>
      animate([
        [
          "menu",
          {
            opacity: [0, 1],
            height: menuRef.current?.clientHeight || 50,
          },
          {
            height: { ease: "backOut" },
          },
        ],
        [
          "menu > div > button",
          { opacity: [0, 1], x: [50, 0] },
          { delay: stagger(0.1, { ease: "easeOut" }), duration: 0.2 },
        ],
      ]);

    const menuOut = () =>
      animate([
        [
          "menu > div > button",
          { opacity: 0, x: 50 },
          {
            delay: stagger(0.1, { from: "last", ease: "easeIn" }),
            duration: 0.2,
          },
        ],
        ["menu", { opacity: 0, height: 0 }, { height: { ease: "backIn" } }],
      ]);

    if (showMenu) {
      timer.current.clear();
      menuIn();
    } else {
      timer.current.set();
      menuOut();
    }

    return () => timer.current.clear();
  }, [showMenu]);

  console.log("rerender");

  return (
    <>
      <motion.button
        onClick={() => setShowNav(true)}
        className="absolute size-[24px] md:size-[32px] m-double"
        disabled={showNav}
        initial={false}
        animate={{
          opacity: showNav ? 0 : 1,
        }}
      >
        <Icon icon={"material-symbols:menu"} height="100%" width="100%" />
      </motion.button>
      <motion.div
        ref={scope}
        className="flex m-double gap-single relative uppercase text-xl tracking-wider"
        initial={false}
        animate={{
          y: showNav ? 0 : -scope.current?.getBoundingClientRect().bottom || 0,
        }}
      >
        <button onClick={() => setShowMenu((current) => !current)}>
          Profile
        </button>
        <menu className="w-full -bottom-single translate-y-full absolute overflow-hidden bg-foreground text-background rounded-single shadow-lg">
          <div
            ref={menuRef}
            className="flex flex-col items-start gap-single p-single"
          >
            <button>Home</button>
            <button>Projects</button>
            <button>Articles</button>
          </div>
        </menu>
        <SVGLine className="flex-grow" />
        <SocialLinks />
      </motion.div>
    </>
  );
}
