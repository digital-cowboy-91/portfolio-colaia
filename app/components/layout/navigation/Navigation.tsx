"use client";

import useWindowSize from "@/app/hooks/useWindowSize";
import { signal, useSignalEffect } from "@preact/signals-react";
import { useEffect, useState } from "react";
import { ActiveBookmark, Bookmark } from ".";
import NavbarHorizontal from "./NavbarHorizontal";
import NavbarVertical from "./NavbarVertical";

export const bookmarkListSignal = signal<Bookmark[]>([]);
export const activeBookmarkSignal = signal<ActiveBookmark>({
  id: null,
  progress: 0,
});

export default function Navigation() {
  const [screenSmall, setScreenSmall] = useState<boolean | null>(null);
  const size = useWindowSize();

  useEffect(() => {
    if (!size.width || !size.height) return;

    setScreenSmall(size.width < 576 || size.height < 576);
  }, [size]);

  const [_, rerender] = useState(0);

  useSignalEffect(() => {
    bookmarkListSignal.value;
    activeBookmarkSignal.value;

    rerender((prev) => prev + 1);
  });

  if (screenSmall === null) return null;

  return screenSmall ? (
    <NavbarHorizontal
      bookmarks={bookmarkListSignal.value}
      activeBookmark={activeBookmarkSignal.value}
    />
  ) : (
    <NavbarVertical
      bookmarks={bookmarkListSignal.value}
      activeBookmark={activeBookmarkSignal.value}
    />
  );
}
