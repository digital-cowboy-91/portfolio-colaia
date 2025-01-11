"use server";

import ProfileClient from "../components/ProfileClient";
import { readFile } from "../utils/persistantJSON";

export default async function Profile() {
  const profile = await readFile("profile");

  if (!profile.length) return;

  return (
    <section className="h-full flex items-center">
      <ProfileClient data={profile} />
    </section>
  );
}
