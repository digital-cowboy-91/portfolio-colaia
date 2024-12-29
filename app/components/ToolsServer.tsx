import fs from "node:fs/promises";
import SectionWrapper from "./SectionWrapper";
import ToolsClient from "./ToolsClient";

export default async function () {
  const data = await fs
    .readFile(process.env.LOCAL_STORAGE + "/tools.json", { encoding: "utf8" })
    .then((res) => JSON.parse(res));

  if (!data.length) return;

  return (
    <SectionWrapper id="tools">
      <ToolsClient data={data} />
    </SectionWrapper>
  );
}
