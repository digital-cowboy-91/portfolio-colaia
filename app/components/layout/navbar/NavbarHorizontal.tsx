import { AnimatePresence, motion, stagger, useAnimate } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ActiveBookmark, Bookmark } from ".";
import ProgressBar from "../ProgressBar";
import MenuItem from "./MenuItem";
import NavbarButton from "./NavbarButton";
import SocialLinks from "./SocialLinks";

interface Props {
  bookmarks: Bookmark[];
  activeBookmark: ActiveBookmark;
}

export default function NavbarHorizontal({ bookmarks, activeBookmark }: Props) {
  const effect = useRef({
    store: {} as Record<number, number>,
    skip: function (id: number, count: number = 2) {
      let store = this.store;

      if (store[id] > count) return false;

      store[id] ? store[id]++ : (store[id] = 1);
      return true;
    },
  });

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
    if (effect.current.skip(0)) return;

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
    if (effect.current.skip(1)) return;

    timer.current.reset();

    if (!showNav) setShowNav(true);
    if (showMenu) setShowMenu(false);
  }, [activeBookmark]);

  // console.dir(effect.current);

  return (
    <div className="fixed inset-x-0 z-50">
      <NavbarButton
        show={!showNav}
        onClick={() => {
          setShowNav(true);
          setShowMenu(true);
        }}
      />
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
            {bookmarks.map((bookmark) => (
              <MenuItem
                key={bookmark.id}
                bookmark={bookmark}
                isActive={bookmark.id === activeBookmark.id}
              />
            ))}
          </div>
        </menu>
      </nav>
    </div>
  );
}
