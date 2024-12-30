import fs from "node:fs/promises";

type Files = "profile" | "tools" | "interests";

export async function readFile(filename: Files) {
  return fs
    .readFile(process.env.SERVER_STORAGE + "/" + filename + ".json", {
      encoding: "utf8",
    })
    .then((res) => JSON.parse(res));
}
