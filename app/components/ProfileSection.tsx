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
    <section className="-mt-32 p-8">
      <div
        className="bg-foreground rounded-[3rem] max-w-[900px] mx-auto p-8 flex gap-8 items-center max-md:flex-col-reverse"
        style={{
          filter: `drop-shadow(10px 10px 10px rgba(0, 0, 0, 0.5))`,
        }}
      >
        <Code snippet={snippet} />

        <img
          className="rounded-full max-w-[250px] max-h-[250px]"
          src="https://placehold.co/250x250"
        />
      </div>
    </section>
  );
}
