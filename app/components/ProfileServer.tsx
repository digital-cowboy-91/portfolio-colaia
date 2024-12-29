import fs from "node:fs/promises";
import ProfileClient from "./ProfileClient";
import SectionWrapper from "./SectionWrapper";

export default async function () {
  const data = await fs
    .readFile(process.env.LOCAL_STORAGE + "/profile.json", { encoding: "utf8" })
    .then((res) => JSON.parse(res));

  if (!data.length) return;

  return (
    <SectionWrapper id="profile" className="">
      <ProfileClient data={data} />
    </SectionWrapper>
  );
}
