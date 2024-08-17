import { db } from "@/db";
import { inviteKeys } from "@/db/schema";
import { Created, Forbidden, Unauthorized } from "@/lib/response";
import { getSession } from "@/lib/session";
import { isAdmin } from "@/lib/utils";

/**
 * generate invite key using uuid
 */
export async function POST(req: Request) {
  const session = await getSession();

  if (!session) {
    return Unauthorized();
  }

  // get the user role from database
  const role = session.role;

  if (!isAdmin(role)) {
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
