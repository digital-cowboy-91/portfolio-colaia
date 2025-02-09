import { readFile } from "@/app/utils/persistantJSON";
import ToolsClient from "./ToolsClient";

export default async function ToolsServer() {
  const data = await readFile("tools").then((res) =>
    res.sort(() => 0.5 - Math.random())
  );

  return <ToolsClient items={data} />;
}
