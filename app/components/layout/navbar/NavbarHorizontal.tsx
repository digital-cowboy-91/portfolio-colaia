import { AnimatePresence, motion, stagger, useAnimate } from "motion/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ProgressBar from "../ProgressBar";
import SocialLinks from "../SocialLinks";
import NavbarButton from "./NavbarButton";

export type Bookmark = {
  id: string;
  title: string;
  icon?: string;
};

export type ActiveBookmark = {
  id: string;
  progress: number;
  isScrollingDown: boolean;
};

interface Props {
  bookmarks: Bookmark[];
  activeBookmark: ActiveBookmark;
}

export default function NavbarHorizontal({ bookmarks, activeBookmark }: Props) {
  const [scope, animate] = useAnimate();
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

  useEffect(() => {
    if (showMenu) {
      timer.current.clear();

      animate([
        [
          scope.current,
          {
            opacity: [0, 1],
            height: scope.current?.firstElementChild?.clientHeight || 50,
          },
          {
            height: { ease: "backOut" },
          },
        ],
        [
          "a",
          { opacity: [0, 1], x: [50, 0] },
          { delay: stagger(0.1, { ease: "easeOut" }), duration: 0.2 },
        ],
      ]);
    } else {
      timer.current.set();

      animate([
        [
          "a",
          { opacity: 0, x: 50 },
          {
            delay: stagger(0.1, { from: "last", ease: "easeIn" }),
            duration: 0.2,
          },
        ],
        [
          scope.current,
          { opacity: 0, height: 0 },
          { height: { ease: "backIn" } },
        ],
      ]);
    }

    return () => timer.current.clear();
  }, [showMenu]);

  useEffect(() => {
    timer.current.reset();

    !showNav && setShowNav(true);
    showMenu && setShowMenu(false);
  }, [activeBookmark]);

  const animations = {
    activeButton: {
      init: { opacity: 1, y: activeBookmark.isScrollingDown ? -50 : 50 },
      anim: { opacity: 1, y: 0 },
      exit: (direction: boolean) => ({ opacity: 1, y: direction ? 50 : -50 }),
    },
  };

  return (
    <div className="fixed inset-x-0 z-50">
      <NavbarButton show={!showNav} onClick={() => setShowNav(true)} />
      <div
        className={`
          relative p-double
          flex gap-single
          text-xl tracking-wider
          transition-transform duration-300
          ${showNav ? "translate-y-0" : "-translate-y-[200%]"}
        `}
        style={{
          backgroundImage: "linear-gradient(rgba(0,0,0,1), rgba(0,0,0,0))",
        }}
      >
        <AnimatePresence
          mode="popLayout"
          custom={activeBookmark.isScrollingDown}
        >
          <motion.button
            key={activeBookmark.id}
            onClick={() => setShowMenu((current) => !current)}
            disabled={!showNav}
            variants={animations.activeButton}
            initial="init"
            animate="anim"
            exit="exit"
          >
            {bookmarks
              .find(({ id }) => id === activeBookmark.id)
              ?.title.toUpperCase()}
          </motion.button>
        </AnimatePresence>
        <menu
          ref={scope}
          className="inset-x-double -bottom-0 translate-y-full absolute overflow-hidden bg-foreground text-background rounded-single shadow-lg"
          style={{
            opacity: 0,
            height: 0,
          }}
        >
          <div className="flex flex-col items-start gap-single p-double">
            {bookmarks.map(({ id, title }) => (
              <Link key={id} href={`#${id}`}>
                {title.toUpperCase()}
              </Link>
            ))}
          </div>
        </menu>
        <ProgressBar className="flex-grow" progress={activeBookmark.progress} />
        <SocialLinks />
      </div>
    </div>
  );
}
