import { ActivityWithRefs } from "../types/activity";
import { readFile } from "../utils/persistantJSON";
import InterestClient from "./ActivityClient";

export type ActivityProcessed = {
  tags: string[];
  data: Record<string, Record<string, ActivityWithRefs[]>>;
};

export default async function ActivityServer() {
  const toolMap = await readFile("tools").then(
    (res) => new Map(res.map((item) => [item.slug, item]))
  );

  const tagSet = new Set<string>();

  const activity = await readFile("activity").then((res) =>
    res.map((item) => {
      const itemWithRefs: ActivityWithRefs = {
        ...item,
        usedTools: item.usedTools.map((slug) => toolMap.get(slug)!),
      };

      item.tags.forEach((tag) => tagSet.add(tag));

      return itemWithRefs;
    })
  );

  return <InterestClient data={activity} tags={[...tagSet]} />;
}
