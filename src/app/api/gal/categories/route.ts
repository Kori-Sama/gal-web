import { db } from "@/db";
import { categories } from "@/db/schema";
import { Ok, Unauthorized } from "@/lib/response";
import { getSession } from "@/lib/session";

export async function GET(req: Request) {
  const session = await getSession();

  if (!session) {
    return Unauthorized();
  }

  const data = await db.select().from(categories);

  return Ok(data);
}
