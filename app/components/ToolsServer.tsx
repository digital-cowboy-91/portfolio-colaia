import { readFile } from "../utils/persistantJSON";
import SectionWrapper from "./SectionWrapper";
import ToolsClient from "./ToolsClient";

export default async function ToolsServer() {
  const tools = await readFile("tools").then((res) =>
    res.sort(() => 0.5 - Math.random())
  );

  if (!tools.length) return;

  return (
    <SectionWrapper id="tools">
      <ToolsClient data={tools} />
    </SectionWrapper>
  );
}
