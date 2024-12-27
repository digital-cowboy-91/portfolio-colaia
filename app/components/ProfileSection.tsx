"use client";

import hljs from "highlight.js";
import "highlight.js/styles/vs2015.min.css";
import { useEffect, useRef } from "react";

export default function () {
  const codeRef = useRef<HTMLElement | null>(null);
  const jsData = `
const profile = {
  username: "colaia",
  full_name: "David Kolaja",
  age: 33,
  address: "**REDUCTED**",
  city: "Warrington",
  nationality: "Czech",
  has_right_to_work: true,
  open_for_work: true,
  bio: \`
A self-taught JavaScript Software Developer with passion for innovation and exploring new technologies.
  \`,
  img: "https://colaia.dev/me-myself-and-i.jpg",
};
  `;

  useEffect(() => {
    if (!codeRef.current) return;

    codeRef.current.innerHTML = hljs.highlight(jsData, {
      language: "javascript",
    }).value;
  }, []);

  return (
    <section>
      <div className="bg-foreground w-[900px] h-[500px] rounded-[3rem] mx-auto">
        <pre>
          <code ref={codeRef} />
        </pre>
      </div>
    </section>
  );
}
