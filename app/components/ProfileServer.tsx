"use server";

import { Profile } from "../types/profile";
import { fetcher } from "../utils/fetchWrapper";
import ProfileClient from "./ProfileClient";
import SectionWrapper from "./SectionWrapper";

export default async function ProfileServer() {
  const data = await fetcher<Profile[]>("/api/profile");

  if (!data.length) return;

  return (
    <SectionWrapper id="profile">
      <ProfileClient data={data} />
    </SectionWrapper>
  );
}
