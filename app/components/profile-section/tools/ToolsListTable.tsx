"use client";

import useBoxSize from "@/app/hooks/useBoxSize";
import { Tool } from "@/app/types/tools";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { AnimatePresence, motion } from "motion/react";
import { HTMLAttributes, useEffect, useRef, useState } from "react";
import ProgressBar from "./ProgressBar";

const experience = {
  1: {
    name: "Beginner (Exploring)",
    description: {
      code: "Initial exposure. Learning basic concepts and syntax (if applicable). Can follow tutorials and examples, but struggles with complex tasks.",
      tool: "Can perform basic operations, but needs frequent reference to documentation.",
    },
  },
  2: {
    name: "Novice (Apprentice)",
    description: {
      code: "Can use the technology for simple tasks. Starting to become more independent, but still learning best practices and common patterns.",
      tool: "Can use core features, but may need guidance on more advanced usage.",
    },
  },
  3: {
    name: "Junior (Practitioner)",
    description: {
      code: "Can use the technology for common tasks. Understands core concepts and can contribute to simple projects. Still needs guidance on complex issues or advanced features.",
      tool: "Comfortable with most common use cases and can integrate into basic workflows.",
    },
  },
  4: {
    name: "Mid-Level (Proficient)",
    description: {
      code: "Comfortable using the technology for most tasks. Can solve problems independently and implement features with minimal guidance.",
      tool: "Proficient in most features and can integrate into complex workflows. Can optimize basic usage.",
    },
  },
  5: {
    name: "Senior (Competent)",
    description: {
      code: "Deep understanding of the technology. Can design complex solutions, optimize performance, and troubleshoot difficult problems. Mentors others and contributes to architectural decisions.",
      tool: "Deep understanding of internals and best practices. Can develop custom extensions or integrations.",
    },
  },
  6: {
    name: "Expert (Master)",
    description: {
      code: "Extensive experience, deep understanding of internals, contributes to the technology's development, recognized authority, leads large-scale projects, pushes boundaries.",
      tool: "Recognized expert, contributes to the library/tool's development (e.g., open-source contributions), and may be considered a authority.",
    },
  },
};

interface Props extends HTMLAttributes<HTMLDivElement> {
  items: Tool[];
  onHeightChange?: (height: number) => void;
}

export default function ToolsListTable({
  items,
  onHeightChange,
  ...rest
}: Props) {
  const pages = useRef(splitToPages(items, 12));
  const [activePage, setActivePage] = useState(0);
  const [activeItem, setActiveItem] = useState(pages.current[activePage][0]);

  const box = useBoxSize("height", (box) => {
    onHeightChange?.(box.height);
  });

  useEffect(() => {
    setActiveItem(() => pages.current[activePage][0]);
  }, [activePage]);

  return (
    <div ref={box.set} {...rest}>
      <div className="flex justify-between items-center">
        <button
          className="h-8 aspect-square disabled:opacity-0"
          onClick={() => setActivePage((current) => current - 1)}
          disabled={activePage === 0}
        >
          <Icon icon="codicon:arrow-small-left" width="100%" height="100%" />
        </button>
        <div className="w-full flex place-content-center gap-2">
          {pages.current.map((_val, index) => (
            <div
              key={index}
              className={`h-2 aspect-square rounded-full ${
                activePage === index ? "bg-primary" : "bg-subtle"
              } transition-colors`}
            />
          ))}
        </div>
        <button
          className="h-8 aspect-square disabled:opacity-0"
          onClick={() => setActivePage((current) => current + 1)}
          disabled={activePage + 1 === pages.current.length}
        >
          <Icon icon="codicon:arrow-small-right" width="100%" height="100%" />
        </button>
      </div>
      <AnimatePresence mode="popLayout">
        <motion.ul
          key={activePage}
          className={`
          grid
          grid-cols-2
          sm:grid-cols-3
          md:grid-cols-4
          p-single gap-double mx-auto
        `}
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { delay: 0.3 },
          }}
          exit={{ opacity: 0, transition: { duration: 0 } }}
          layout
        >
          {pages.current[activePage].map((item, index) => {
            const { icon, title } = item;
            return (
              <li key={icon}>
                <button
                  className={`flex gap-single items-center relative ${
                    activeItem.icon === icon ? "text-primary" : ""
                  }`}
                  onClick={() => setActiveItem(item)}
                >
                  <div className={`size-[32px] transition-colors`}>
                    <Icon icon={icon} height="100%" width="100%" />
                  </div>
                  <div className="transition-colors">{title}</div>
                </button>
              </li>
            );
          })}
        </motion.ul>
      </AnimatePresence>
      <ProgressBar
        points={Object.values(experience).map(({ name }) => name)}
        activePoint={activeItem.experience}
        fill={{ active: "var(--primary)", inActive: "var(--subtle)" }}
      />
      <p className="text-center p-single pb-0">
        {experience[activeItem.experience].description[activeItem.type]}
      </p>
    </div>
  );
}

function splitToPages<T>(arr: T[], page: number) {
  const _arr = [...arr];
  const result = [];

  while (_arr.length > 0) {
    result.push(_arr.splice(0, page));
  }

  return result;
}
