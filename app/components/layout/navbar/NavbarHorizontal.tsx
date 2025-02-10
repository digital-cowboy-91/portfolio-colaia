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

    if (!showNav) setShowNav(true);
    if (showMenu) setShowMenu(false);
  }, [activeBookmark]);

  return (
    <div className="fixed inset-x-0 z-50">
      <NavbarButton show={!showNav} onClick={() => setShowNav(true)} />
      <nav
        className={`
          relative p-double overflow-hidden
          grid grid-rows-[32px_auto]
          text-xl tracking-wider font-semibold
          transition-transform duration-300
          ${showNav ? "translate-y-0" : "-translate-y-[200%]"}
          text-foreground drop-shadow-top
        `}
        style={{
          background: "rgba(0, 0, 0, 0.7)",
          backdropFilter: "blur(5px)",
        }}
      >
        <div className="flex gap-double">
          <AnimatePresence mode="popLayout">
            <motion.button
              key={activeBookmark.id}
              onClick={() => setShowMenu((current) => !current)}
              disabled={!showNav}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
            >
              {bookmarks
                .find(({ id }) => id === activeBookmark.id)
                ?.title.toUpperCase()}
            </motion.button>
          </AnimatePresence>
          <ProgressBar
            className="flex-grow"
            progress={activeBookmark.progress}
          />
          <SocialLinks />
        </div>
        <menu
          ref={scope}
          style={{
            opacity: 0,
            height: 0,
          }}
        >
          <div className="pt-double pb-single flex flex-col items-start gap-single">
            {bookmarks.map(({ id, title }) => (
              <Link
                key={id}
                href={`#${id}`}
                className={`flex gap-single items-center ${
                  activeBookmark.id === id && "text-primary"
                }`}
              >
                {title.toUpperCase()}
              </Link>
            ))}
          </div>
        </menu>
      </nav>
    </div>
  );
}
