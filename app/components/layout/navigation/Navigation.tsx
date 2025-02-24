"use client";

import useWindowSize from "@/app/hooks/useWindowSize";
import { useContext, useEffect, useState } from "react";
import { BookmarkContext } from ".";
import NavbarHorizontal from "./NavbarHorizontal";
import NavbarVertical from "./NavbarVertical";

export default function Navigation() {
  const { list, active } = useContext(BookmarkContext);
  const [screenSmall, setScreenSmall] = useState<boolean | null>(null);
  const size = useWindowSize();

  useEffect(() => {
    if (!size.width || !size.height) return;

    setScreenSmall(size.width < 576 || size.height < 576);
  }, [size]);

  if (screenSmall === null) return null;

  return screenSmall ? (
    <NavbarHorizontal bookmarks={list} activeBookmark={active} />
  ) : (
    <NavbarVertical bookmarks={list} activeBookmark={active} />
  );
}
