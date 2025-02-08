"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { Tool } from "../types/tools";
import ToolsListBar from "./tools/ToolsListBar";

const data = [
  {
    title: "DigitalOcean",
    icon: "simple-icons:digitalocean",
    experience: 3,
    type: "tool",
  },
  {
    title: "Directus",
    icon: "simple-icons:directus",
    experience: 3,
    type: "tool",
  },
  {
    title: "Docker",
    icon: "simple-icons:docker",
    experience: 2,
    type: "tool",
  },
  {
    title: "GitHub",
    icon: "simple-icons:github",
    experience: 3,
    type: "tool",
  },
  {
    title: "JavaScript",
    icon: "simple-icons:javascript",
    experience: 3,
    type: "code",
  },
  {
    title: "Jenkins",
    icon: "simple-icons:jenkins",
    experience: 2,
    type: "tool",
  },
  {
    title: "Jest",
    icon: "simple-icons:jest",
    experience: 2,
    type: "tool",
  },
  {
    title: "Next.JS",
    icon: "simple-icons:nextdotjs",
    experience: 3,
    type: "tool",
  },
  {
    title: "Node.JS",
    icon: "simple-icons:nodedotjs",
    experience: 2,
    type: "tool",
  },
  {
    title: "React",
    icon: "simple-icons:react",
    experience: 3,
    type: "tool",
  },
  {
    title: "Tailwind CSS",
    icon: "simple-icons:tailwindcss",
    experience: 3,
    type: "code",
  },
  {
    title: "TypeScript",
    icon: "simple-icons:typescript",
    experience: 2,
    type: "code",
  },
  {
    title: "Vue",
    icon: "simple-icons:vuedotjs",
    experience: 2,
    type: "tool",
  },
  {
    title: "Express",
    icon: "simple-icons:express",
    experience: 2,
    type: "tool",
  },
  {
    title: "MongoDB",
    icon: "simple-icons:mongodb",
    experience: 2,
    type: "tool",
  },
  {
    title: "Supabase",
    icon: "simple-icons:supabase",
    experience: 3,
    type: "tool",
  },
  {
    title: "PHP",
    icon: "simple-icons:php",
    experience: 2,
    type: "code",
  },
  {
    title: "PostgreSQL",
    icon: "simple-icons:postgresql",
    experience: 2,
    type: "code",
  },
];
export default function page() {
  const [toggle, setToggle] = useState(false);
  //   const container = useRef<HTMLDivElement>(null);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);

  return (
    <>
      <button onClick={() => setToggle(!toggle)}>toggle</button>
      <div
        ref={setContainer}
        className="bg-[blue] h-[500px] max-h-screen flex justify-center items-start relative"
      >
        {/* <div ref={trackerRef} className="absolute inset-x-0 h-[50vh] -z-10" /> */}
        {container && (
          <motion.div
            className={`bg-foreground text-background p-4 rounded-single overflow-hidden`}
            initial={false}
            animate={{
              width: toggle ? 720 : container?.clientWidth,
            }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            {!toggle && <ToolsListBar key="bar" items={data as Tool[]} />}
          </motion.div>
        )}
      </div>
    </>
  );
}
