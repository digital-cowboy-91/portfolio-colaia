import { readFile } from "../../../utils/persistantJSON";
import AboutClient from "./AboutClient";

export default async function AboutServer() {
  const profile = await readFile("profile");

  if (!profile.length) return;

  return <AboutClient data={profile} />;
}
