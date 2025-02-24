"use server";

import { readFile } from "@/app/utils/persistantJSON";
import { HTMLAttributes } from "react";
import ToolsListBar from "./ToolsListBar";
import ToolsListTable from "./ToolsListTable";

type DivAttrs = HTMLAttributes<HTMLDivElement>;
interface DivProps extends DivAttrs {
  as: "table";
}

type UlAttrs = HTMLAttributes<HTMLUListElement>;
interface UlProps extends UlAttrs {
  as: "bar";
}

export default async function ToolsServer({ as, ...rest }: DivProps | UlProps) {
  const data = await readFile("tools").then((res) =>
    res.sort(() => 0.5 - Math.random())
  );

  if (!data.length) return;

  if (as === "table")
    return <ToolsListTable items={data} {...(rest as DivAttrs)} />;
  if (as === "bar") return <ToolsListBar items={data} {...(rest as UlAttrs)} />;

  return;
}
