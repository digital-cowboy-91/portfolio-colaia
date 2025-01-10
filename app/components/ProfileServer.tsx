"use server";

import { readFile } from "../utils/persistantJSON";
import ProfileClient from "./ProfileClient";

export default async function ProfileServer() {
  const profile = await readFile("profile");

  if (!profile.length) return;

  return <ProfileClient data={profile} />;
}
