import Image from "next/image";

import digitalOceanLogo from "@/app/assets/logos/digitalocean.svg";
import directusLogo from "@/app/assets/logos/directus.png";
import dockerLogo from "@/app/assets/logos/docker.svg";
import gitHubLogo from "@/app/assets/logos/github.svg";
import javaScriptLogo from "@/app/assets/logos/javascript.svg";
import jenkinsLogo from "@/app/assets/logos/jenkins.svg";
import jestLogo from "@/app/assets/logos/jest.svg";
import nextJSLogo from "@/app/assets/logos/next-js.svg";
import nodeJSLogo from "@/app/assets/logos/nodejs.svg";
import reactLogo from "@/app/assets/logos/react.svg";
import tailwindCSSLogo from "@/app/assets/logos/tailwindcss.svg";
import typeScriptLogo from "@/app/assets/logos/typescript.svg";
import vueLogo from "@/app/assets/logos/vue.svg";

const images = [
  {
    src: digitalOceanLogo,
    title: "DigitalOcean",
    alt: "DigitalOcean logo",
  },
  {
    src: directusLogo,
    title: "Directus",
    alt: "Directus Logo",
  },
  {
    src: dockerLogo,
    title: "Docker",
    alt: "Docker Logo",
  },
  {
    src: gitHubLogo,
    title: "GitHub",
    alt: "GitHub Logo",
  },
  {
    src: javaScriptLogo,
    title: "JavaScript",
    alt: "JavaScript Logo",
  },
  {
    src: jenkinsLogo,
    title: "Jenkins",
    alt: "Jenkins Logo",
  },
  {
    src: jestLogo,
    title: "Jest",
    alt: "Jest Logo",
  },
  {
    src: nextJSLogo,
    title: "Next.JS",
    alt: "Next.JS Logo",
  },
  {
    src: nodeJSLogo,
    title: "Node JS",
    alt: "Node JS Logo",
  },
  {
    src: reactLogo,
    title: "React",
    alt: "React Logo",
  },
  {
    src: tailwindCSSLogo,
    title: "Tailwind CSS",
    alt: "Tailwind CSS Logo",
  },
  {
    src: typeScriptLogo,
    title: "TypeScript",
    alt: "TypeScript Logo",
  },
  {
    src: vueLogo,
    title: "Vue",
    alt: "Vue Logo",
  },
];

export default function () {
  return (
    <section id="tools">
      <ul className="flex flex-row gap-32">
        {images.map(({ src, title, alt }) => (
          <li key={title} className="shrink-0 grow-0 size-32 flex items-center">
            <Image src={src} alt={alt} className="max-w-32 max-h-32" />
          </li>
        ))}
      </ul>
    </section>
  );
}
