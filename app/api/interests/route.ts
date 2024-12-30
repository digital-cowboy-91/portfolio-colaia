import { fetcher } from "@/app/utils/fetchWrapper";
import { readFile } from "@/app/utils/persistantJSON";

export async function GET() {
  const tools = await fetcher("/api/tools");
  const toolMap = new Map(tools.map((item) => [item.slug, item]));

  const interests = await readFile("interests").then((data) =>
    data.map((item) => {
      item.usedTools = item.usedTools.map((slug) => toolMap.get(slug));

      return item;
    })
  );

  return Response.json(interests);
}
