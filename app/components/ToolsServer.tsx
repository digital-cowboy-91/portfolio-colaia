import { fetcher } from "../utils/fetchWrapper";
import SectionWrapper from "./SectionWrapper";
import ToolsClient from "./ToolsClient";

export default async function () {
  const data = await fetcher("/api/tools");

  if (!data.length) return;

  return (
    <SectionWrapper id="tools">
      <ToolsClient data={data} />
    </SectionWrapper>
  );
}
