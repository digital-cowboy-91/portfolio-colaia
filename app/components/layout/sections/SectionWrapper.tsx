"use client";

import React, { useState } from "react";
import Navbar from "../Navbar";
import { SectionItem } from "./SectionItem";
import SectionLink from "./SectionLink";

export default function SectionWrapper({
  children,
}: {
  children: SectionItem[];
}) {
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
            title={child.props.title}
            icon={child.props.icon}
            scrollProgress={scrollStates[index]}
          />
        ))}
      </Navbar>
      {React.Children.map(children, (child, index) =>
        React.cloneElement(child, {
          setScrollProgress: (value: number) =>
            setScrollStates((prev) => ({ ...prev, [index]: value })),
        })
      )}
    </>
  );
}
