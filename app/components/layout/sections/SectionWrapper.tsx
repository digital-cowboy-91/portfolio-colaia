"use client";

import React, { useState } from "react";
import Navbar from "../Navbar";
import { Section } from "./Section";
import SectionLink from "./SectionLink";

export default function SectionWrapper({ children }: { children: Section[] }) {
  const [scrollStates, setScrollStates] = useState<Record<number, number>>(
    children.reduce((acc, _child, index) => {
      acc[index] = 0;
      return acc;
    }, {} as Record<number, number>)
  );

  return (
    <>
      <Navbar>
        {React.Children.map(children, (child, index) => (
          <SectionLink
            key={child.props.id}
            id={child.props.id}
            title={child.props.bookmark.title}
            icon={child.props.bookmark.icon}
            scrollProgress={scrollStates[index]}
          />
        ))}
      </Navbar>
      {React.Children.map(children, (child, index) =>
        React.cloneElement(child, {
          scrollProgress: (value: number) =>
            setScrollStates((prev) => ({ ...prev, [index]: value })),
        })
      )}
    </>
  );
}
