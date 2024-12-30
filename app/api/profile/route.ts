import { readFile } from "@/app/utils/persistantJSON";

export async function GET() {
  const data = await readFile("profile");

  return Response.json(data);
}
