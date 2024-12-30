import { InterestsWithRefs } from "../types/interests";
import { readFile } from "../utils/persistantJSON";
import InterestClient from "./InterestsClient";
import SectionWrapper from "./SectionWrapper";

export default async function InterestsServer() {
  const toolMap = await readFile("tools").then(
    (res) => new Map(res.map((item) => [item.slug, item]))
  );

  const interests = await readFile("interests").then((res) =>
    res.map((item) => {
      const itemWithRefs: InterestsWithRefs = {
        ...item,
        usedTools: item.usedTools.map((slug) => toolMap.get(slug)!),
      };

      return itemWithRefs;
    })
  );

  if (!interests.length) return;

  return (
    <SectionWrapper id="interests">
      <InterestClient data={interests} />
    </SectionWrapper>
  );
}
