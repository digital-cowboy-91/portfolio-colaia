import { readFile } from "../utils/persistantJSON";
import ContainerWrapper from "./ContainerWrapper";
import ToolsClient from "./ToolsClient";

export default async function ToolsServer() {
  const tools = await readFile("tools").then((res) =>
    res.sort(() => 0.5 - Math.random())
  );

  if (!tools.length) return;

  return (
    <ContainerWrapper id="tools" className="bg-white h-full p-4">
      <ToolsClient data={tools} />
    </ContainerWrapper>
  );
}
