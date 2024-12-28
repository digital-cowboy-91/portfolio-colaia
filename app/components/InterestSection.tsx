import javaScriptLogo from "@/app/assets/logos/javascript.svg";
import nodeJSLogo from "@/app/assets/logos/nodejs.svg";
import reactLogo from "@/app/assets/logos/react.svg";
import Image from "next/image";

const data = [
  {
    date: new Date("2022/11"),
    title: "Modern JavaScript",
    description:
      "Some meaningful text about this course, plus mention they gave you very useful online certificate for patiently watching all their videos.",
    usedTools: [
      {
        src: javaScriptLogo,
        title: "JavaScript",
        alt: "JavaScript Logo",
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
    ],
  },
  {
    date: new Date("2022/09"),
    title: "The Complete Node.js Developer Course",
    description:
      "Some meaningful text about this course, plus mention they gave you very useful online certificate for patiently watching all their videos.",
    usedTools: [
      {
        src: javaScriptLogo,
        title: "JavaScript",
        alt: "JavaScript Logo",
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
    ],
  },
];

export default function () {
  return (
    <section className="mb-32">
      <div className="max-w-[800px] mx-auto">
        <h1 className="text-5xl text-center mb-20">#TIMELINE OF INTERESTS</h1>
        <ul className="grid grid-cols-[max-content_1fr] gap-x-8 gap-y-16">
          {data.map(({ date, title, description, usedTools }, index) => (
            <li key={index} className="grid grid-cols-subgrid col-span-2">
              <h2 className="text-3xl text-right">
                {date.getFullYear()}
                <br />
                {date
                  .toLocaleDateString("en-GB", { month: "long" })
                  .toUpperCase()}
              </h2>
              <div className="flex flex-col gap-4">
                <h3 className="font-black">{title}</h3>
                <p>{description}</p>
                <ul className="flex flex-row gap-4 justify-start flex-shrink">
                  {usedTools.map(({ title, src, alt }) => (
                    <li key={title}>
                      <Image className="w-auto h-6" src={src} alt={alt} />
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
