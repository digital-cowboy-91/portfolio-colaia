import { Interest, InterestsWithRefs } from "@/app/types/interests";
import { Tool } from "@/app/types/tools";
import { fetcher } from "@/app/utils/fetchWrapper";
import { readFile } from "@/app/utils/persistantJSON";

export async function GET() {
  const tools = await fetcher<Tool[]>("/api/tools");
  const toolMap = new Map(tools.map((item) => [item.slug, item]));

  const interests = await readFile<Interest[]>("interests").then((data) =>
    data.map((item) => {
      const itemWithRefs: InterestsWithRefs = {
        ...item,
        usedTools: item.usedTools.map((slug) => toolMap.get(slug)!),
      };

      return itemWithRefs;
    })
  );

  return Response.json(interests);
}
