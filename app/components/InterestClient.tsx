import Image from "next/image";

export default function ({ data }) {
  return (
    <section className="mb-32">
      <div className="max-w-[800px] mx-auto">
        <h1 className="text-5xl text-center mb-20">#TIMELINE OF INTERESTS</h1>
        <ul className="grid grid-cols-[max-content_1fr] gap-x-8 gap-y-16">
          {data.map(({ date, title, description, usedTools }, index) => {
            const jsDate = new Date(date);

            return (
              <li key={index} className="grid grid-cols-subgrid col-span-2">
                <h2 className="text-3xl text-right">
                  {jsDate.getFullYear()}
                  <br />
                  {jsDate
                    .toLocaleDateString("en-GB", { month: "long" })
                    .toUpperCase()}
                </h2>
                <div className="flex flex-col gap-4">
                  <h3 className="font-black">{title}</h3>
                  <p>{description}</p>
                  <ul className="flex flex-row gap-4 justify-start flex-shrink">
                    {usedTools.map(({ title, src, alt }) => (
                      <li key={title}>
                        <Image
                          className="w-auto h-6"
                          width={128}
                          height={128}
                          src={src}
                          alt={alt}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
