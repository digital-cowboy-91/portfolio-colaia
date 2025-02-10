import useWindowSize from "@/app/hooks/useWindowSize";
import { useEffect, useState } from "react";
import { ActiveBookmark, Bookmark } from ".";
import NavbarHorizontal from "./NavbarHorizontal";
import NavbarVertical from "./NavbarVertical";

interface Props {
  bookmarks: Bookmark[];
  activeBookmark: ActiveBookmark;
}
export default function Navbar({ bookmarks, activeBookmark }: Props) {
  const [screenSmall, setScreenSmall] = useState(false);
  const size = useWindowSize();

  useEffect(() => {
    if (!size.width || !size.height) return;

    setScreenSmall(size.width < 576 || size.height < 576);
  }, [size]);

  return screenSmall ? (
    <NavbarHorizontal bookmarks={bookmarks} activeBookmark={activeBookmark} />
  ) : (
    <NavbarVertical bookmarks={bookmarks} activeBookmark={activeBookmark} />
  );
}
