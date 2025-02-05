import { Tool } from "@/app/types/tools";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { motion } from "motion/react";
import { useRef, useState } from "react";
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

type Props = {
  items: Tool[];
};

export default function ToolsListTable({ items }: Props) {
  const pages = useRef(splitToPages(items, 12));
  const [activePage, setActivePage] = useState(0);
  const [activeItem, setActiveItem] = useState(pages.current[activePage][0]);

  return (
    <motion.div
      className="flex flex-col gap-single"
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 0.3 },
      }}
      exit={{ opacity: 0, transition: { duration: 0 } }}
    >
      <div
        id="tools--pagination"
        className="w-full flex place-content-center gap-2"
      >
        {pages.current.map((_val, index) => (
          <button
            key={index}
            className="h-2 aspect-square bg-black rounded-full"
          />
        ))}
      </div>
      <ul id="tools--items" className="grid grid-cols-3 p-single gap-double">
        {pages.current[activePage].map((item, index) => {
          const { icon, title } = item;

          return (
            <li key={icon}>
              <button
                className="flex gap-single items-center"
                onClick={() => setActiveItem(item)}
              >
                <div className="h-[32px] aspect-square">
                  <Icon icon={icon} height="100%" width="100%" />
                </div>
                <div>{title}</div>
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
      <p id="tools--description" className="">
        {experience[activeItem.experience].description[activeItem.type]}
      </p>
    </motion.div>
  );
}

function splitToPages<T>(arr: T[], page: number) {
  let _arr = [...arr];
  let result = [];

  while (_arr.length > 0) {
    result.push(_arr.splice(0, page));
  }

  return result;
}
