import fs from "node:fs/promises";
import { Interest } from "../types/activity";
import { Profile } from "../types/profile";
import { Tool } from "../types/tools";

type Documents = {
  profile: Profile[];
  tools: Tool[];
  activity: Interest[];
};

type DocumentName = keyof Documents;

export async function readFile<T extends DocumentName>(
  filename: T
): Promise<Documents[T]> {
  return fs
    .readFile(process.env.SERVER_STORAGE + "/" + filename + ".json", {
      encoding: "utf8",
    })
    .then((res) => JSON.parse(res));
}
