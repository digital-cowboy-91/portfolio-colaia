import fs from "node:fs/promises";
import InterestClient from "./InterestClient";
import SectionWrapper from "./SectionWrapper";

export default async function () {
  const promises = ["interests.json", "tools.json"].map((filename) =>
    fs
      .readFile(process.env.LOCAL_STORAGE + "/" + filename, {
        encoding: "utf8",
      })
      .then((res) => JSON.parse(res))
  );

  const data = await Promise.all(promises).then(([interests, tools]) => {
    const toolMap = new Map(tools.map((item) => [item.slug, item]));

    return interests.map((item) => {
      item.usedTools = item.usedTools.map((slug) => toolMap.get(slug));

      return item;
    });
  });

  if (!data.length) return;

  return (
    <SectionWrapper id="interests">
      <InterestClient data={data} />
    </SectionWrapper>
  );
}
