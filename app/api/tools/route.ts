import { readFile } from "@/app/utils/persistantJSON";

export async function GET() {
  const data = await readFile("tools").then((data) =>
    data.sort((a, b) => 0.5 - Math.random())
  );

  return Response.json(data);
}
