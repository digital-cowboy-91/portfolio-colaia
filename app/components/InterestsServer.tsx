import { fetcher } from "../utils/fetchWrapper";
import InterestClient from "./InterestsClient";
import SectionWrapper from "./SectionWrapper";

export default async function () {
  const data = await fetcher("/api/interests");

  if (!data.length) return;

  return (
    <SectionWrapper id="interests">
      <InterestClient data={data} />
    </SectionWrapper>
  );
}
