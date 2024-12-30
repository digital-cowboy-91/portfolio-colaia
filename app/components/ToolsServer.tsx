import { Tool } from "../types/tools";
import { fetcher } from "../utils/fetchWrapper";
import SectionWrapper from "./SectionWrapper";
import ToolsClient from "./ToolsClient";

export default async function ToolsServer() {
  const data = await fetcher<Tool[]>("/api/tools");

  if (!data.length) return;

  return (
    <SectionWrapper id="tools">
      <ToolsClient data={data} />
    </SectionWrapper>
  );
}
