"use server";

import ProfileClient from "./ProfileClient";
import SectionWrapper from "./SectionWrapper";

export default async function () {
  const res = await fetch("http://localhost:3000/api/interests");
  const data = await res.json();

  if (!data.length) return;

  return (
    <SectionWrapper id="profile">
      <ProfileClient data={data} />
    </SectionWrapper>
  );
}
