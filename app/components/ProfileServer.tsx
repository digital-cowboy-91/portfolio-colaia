"use server";

import { fetcher } from "../utils/fetchWrapper";
import ProfileClient from "./ProfileClient";
import SectionWrapper from "./SectionWrapper";

export default async function () {
  const data = await fetcher("/api/profile");

  if (!data.length) return;

  return (
    <SectionWrapper id="profile">
      <ProfileClient data={data} />
    </SectionWrapper>
  );
}
