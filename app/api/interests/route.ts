import fs from "node:fs/promises";

export async function GET(req: Request) {
  const data = await fs
    .readFile(process.env.LOCAL_STORAGE + "/profile.json", { encoding: "utf8" })
    .then((res) => JSON.parse(res));

  return Response.json(data);
}
