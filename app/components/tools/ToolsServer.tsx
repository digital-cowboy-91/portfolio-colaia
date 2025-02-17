import { readFile } from "@/app/utils/persistantJSON";
import ToolsListBar from "./ToolsListBar";
import ToolsListTable from "./ToolsListTable";

interface Props {
  as: "table" | "bar";
}

export default async function ToolsServer({ as }: Props) {
  const data = await readFile("tools").then((res) =>
    res.sort(() => 0.5 - Math.random())
  );

  if (!data.length) return;

  if (as === "table") return <ToolsListTable items={data} />;
  if (as === "bar") return <ToolsListBar items={data} />;

  return;
}
