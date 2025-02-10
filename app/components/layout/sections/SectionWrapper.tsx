"use client";

import React, { useState } from "react";
import NavbarHorizontal, {
  ActiveBookmark,
  Bookmark,
} from "../navbar/NavbarHorizontal";
import NavbarVertical from "../navbar/NavbarVertical";
import { Section } from "./Section";

export default function SectionWrapper({ children }: { children: Section[] }) {
  const [bookmarks] = useState<Bookmark[]>(
    children.map(({ props }) => ({
      id: props.id,
      title: props.bookmark.title,
      icon: props.bookmark.icon,
    }))
  );

  const [activeBookmark, setActiveBookmark] = useState<ActiveBookmark>({
    id: bookmarks[0].id,
    progress: 0,
  });

  return (
    <>
      <NavbarVertical bookmarks={bookmarks} activeBookmark={activeBookmark} />
      <NavbarHorizontal bookmarks={bookmarks} activeBookmark={activeBookmark} />
      {React.Children.map(children, (child) =>
        React.cloneElement(child, {
          scrollProgress: (value: number) =>
            setActiveBookmark(() => ({
              id: child.props.id,
              progress: value,
            })),
        })
      )}
    </>
  );
}
