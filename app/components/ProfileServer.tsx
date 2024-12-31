"use server";

import { readFile } from "../utils/persistantJSON";
import ProfileClient from "./ProfileClient";
import SectionWrapper from "./SectionWrapper";

export default async function ProfileServer() {
  const profile = await readFile("profile");

  if (!profile.length) return;

  return (
    <SectionWrapper id="profile" style={{ perspective: "1200px" }}>
      <ProfileClient data={profile} />
    </SectionWrapper>
  );
}
