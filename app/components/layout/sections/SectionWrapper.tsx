"use client";

import React, { useState } from "react";
import NavbarHorizontal, {
  ActiveBookmark,
  Bookmark,
} from "../navbar/NavbarHorizontal";
import NavbarVertical from "../navbar/NavbarVertical";
import { Section } from "./Section";

export default function SectionWrapper({ children }: { children: Section[] }) {
  // const [scrollStates, setScrollStates] = useState<Record<number, number>>(
  //   children.reduce((acc, _child, index) => {
  //     acc[index] = 0;
  //     return acc;
  //   }, {} as Record<number, number>)
  // );

  const [bookmarks, setBookmarks] = useState<Bookmark[]>(
    children.map(({ props }, index) => ({
      id: props.id,
      title: props.bookmark.title,
      icon: props.bookmark.icon,
    }))
  );

  const [activeBookmark, setActiveBookmark] = useState<ActiveBookmark>({
    id: bookmarks[0].id,
    progress: 0,
    isScrollingDown: true,
  });

  return (
    <>
      {/* <Navbar>
        {React.Children.map(children, (child, index) => (
          <SectionLink
            key={child.props.id}
            id={child.props.id}
            title={child.props.bookmark.title}
            icon={child.props.bookmark.icon}
            scrollProgress={scrollStates[index]}
          />
        ))}
      </Navbar> */}
      <NavbarVertical bookmarks={bookmarks} activeBookmark={activeBookmark} />
      <NavbarHorizontal bookmarks={bookmarks} activeBookmark={activeBookmark} />
      {React.Children.map(children, (child, index) =>
        React.cloneElement(child, {
          scrollProgress: (value: number) =>
            setActiveBookmark((prev) => ({
              id: child.props.id,
              progress: value,
              isScrollingDown: value >= prev.progress,
            })),
          // setScrollStates((prev) => ({ ...prev, [index]: value })),
        })
      )}
    </>
  );
}
