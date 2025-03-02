"use client";

import ProgressBar from "@/app/components-v3/toolbox/ProgressBar";
import { Tool } from "@/app/types/tools";
import { useGSAP } from "@gsap/react";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import gsap from "gsap";
import { HTMLAttributes, useEffect, useRef, useState } from "react";
import css from "./detail.module.scss";

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

gsap.registerPlugin(useGSAP);

export default function ToolboxDetail({
  items,
  onHeightChange,
  ...rest
}: Props) {
  const scope = useRef(null);
  const pages = useRef(splitToPages(items, 12));
  const [activePage, setActivePage] = useState(0);
  const [activeItem, setActiveItem] = useState(pages.current[activePage][0]);

  useEffect(() => {
    setActiveItem(() => pages.current[activePage][0]);
  }, [activePage]);

  useGSAP(() => {}, { dependencies: [activePage, activeItem], scope });

  return (
    <div className={css.wrapper}>
      <div className={css.controls}>
        <button
          onClick={() => setActivePage((current) => current - 1)}
          disabled={activePage === 0}
        >
          <Icon icon="codicon:arrow-small-left" width="100%" height="100%" />
        </button>
        <ul className={css.indicators}>
          {pages.current.map((_val, index) => (
            <li key={index} data-is-active={activePage === index} />
          ))}
        </ul>
        <button
          onClick={() => setActivePage((current) => current + 1)}
          disabled={activePage + 1 === pages.current.length}
        >
          <Icon icon="codicon:arrow-small-right" width="100%" height="100%" />
        </button>
      </div>
      <ul key={activePage} className={css.tools}>
        {pages.current[activePage].map((item, index) => {
          const { icon, title } = item;

          return (
            <li key={icon}>
              <button
                onClick={() => setActiveItem(item)}
                data-is-active={activeItem.icon === icon}
              >
                <div>
                  <Icon icon={icon} height="100%" width="100%" />
                </div>
                <span>{title}</span>
              </button>
            </li>
          );
        })}
      </ul>
      <ProgressBar
        points={Object.values(experience).map(({ name }) => name)}
        activePoint={activeItem.experience}
        fill={{ active: "var(--primary)", inActive: "var(--subtle)" }}
      />
      <p className={css.description}>
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
