import { Tool } from "@/app/types/tools";
import { readFile } from "@/app/utils/persistantJSON";

export async function GET() {
  const data = await readFile<Tool[]>("tools").then((data) =>
    data.sort(() => 0.5 - Math.random())
  );

  return Response.json(data);
}
