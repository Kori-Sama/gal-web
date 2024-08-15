import { db } from "@/db";
import { inviteKeys, users } from "@/db/schema";
import { Created, Forbidden, Unauthorized } from "@/lib/response";
import { getSession } from "@/lib/session";
import { eq } from "drizzle-orm";

/**
 * generate invite key using uuid
 */
export async function POST(req: Request) {
  const session = await getSession();

  if (!session) {
    return Unauthorized();
  }

  // get the user role from database
  const role = await db
    .select({
      role: users.role,
    })
    .from(users)
    .where(eq(users.id, session.id))
    .then((data) => data.at(0)?.role);

  if (role !== "admin" && role !== "root") {
    return Forbidden();
  }

  // generate invite key using uuid
  const key = crypto.randomUUID();

  // insert invite key into database
  await db.insert(inviteKeys).values({
    key,
    generatedBy: session.id,
    isGeneratedByRoot: role === "root",
  });

  return Created({ key });
}
