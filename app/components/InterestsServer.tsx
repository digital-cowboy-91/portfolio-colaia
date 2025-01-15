import { InterestsWithRefs } from "../types/interests";
import { readFile } from "../utils/persistantJSON";
import InterestClient from "./InterestsClient";

export type InterestsProcessed = {
  tags: string[];
  data: Record<string, Record<string, InterestsWithRefs[]>>;
};

export default async function InterestsServer() {
  const toolMap = await readFile("tools").then(
    (res) => new Map(res.map((item) => [item.slug, item]))
  );

  const tagSet = new Set<string>();

  const interests = await readFile("interests").then((res) =>
    res.map((item) => {
      const itemWithRefs: InterestsWithRefs = {
        ...item,
        usedTools: item.usedTools.map((slug) => toolMap.get(slug)!),
      };

      item.tags.forEach((tag) => tagSet.add(tag));

      return itemWithRefs;
    })
  );

  return <InterestClient data={interests} tags={[...tagSet]} />;
}
