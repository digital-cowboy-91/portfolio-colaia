"use client";

import Code from "./Code";

export default function () {
  const snippet = `
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

  return (
    <section>
      <div
        className="bg-foreground w-[900px] h-[500px] rounded-[3rem] mx-auto p-8 flex gap-8 items-center"
        style={{
          filter: `drop-shadow(10px 10px 10px rgba(0, 0, 0, 0.5))`,
        }}
      >
        <Code snippet={snippet} />
        <div className="rounded-full overflow-hidden">
          <img src="https://placehold.co/500x500" />
        </div>
      </div>
    </section>
  );
}
