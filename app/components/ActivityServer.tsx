import { ActivityWithRefs } from "../types/activity";
import { readFile } from "../utils/persistantJSON";
import ActivityClient from "./ActivityClient";

export type ActivityProcessed = {
  tags: string[];
  data: Record<string, Record<string, ActivityWithRefs[]>>;
};

export default async function ActivityServer() {
  const toolMap = await readFile("tools").then(
    (res) => new Map(res.map((item) => [item.id, item]))
  );

  const tagSet = new Set<string>();

  const activity = await readFile("activity").then((res) =>
    res.map((item) => {
      const itemWithRefs: ActivityWithRefs = {
        ...item,
        usedTools: item.usedTools.map((icon) => toolMap.get(icon)!),
      };

      item.tags.forEach((tag) => tagSet.add(tag));

      return itemWithRefs;
    })
  );

  return <ActivityClient data={activity} tags={[...tagSet]} />;
}
