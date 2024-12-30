import { InterestsWithRefs } from "../types/interests";
import { fetcher } from "../utils/fetchWrapper";
import InterestClient from "./InterestsClient";
import SectionWrapper from "./SectionWrapper";

export default async function InterestsServer() {
  const data = await fetcher<InterestsWithRefs[]>("/api/interests");

  if (!data.length) return;

  return (
    <SectionWrapper id="interests">
      <InterestClient data={data} />
    </SectionWrapper>
  );
}
