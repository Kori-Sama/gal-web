import { db } from "@/db";
import { inviteKeys } from "@/db/schema";
import { Created, Forbidden, Ok, Unauthorized } from "@/lib/response";
import { getSession } from "@/lib/session";
import { isAdmin } from "@/lib/utils";
import { desc, eq } from "drizzle-orm";

export async function GET(req: Request) {
  const session = await getSession();

  if (!session) {
    return Unauthorized();
  }

  const role = session.role;

  if (!isAdmin(role)) {
    return Forbidden();
  }

  const keys = await db
    .select({
      id: inviteKeys.id,
      key: inviteKeys.key,
      createdAt: inviteKeys.createdAt,
      expiredAt: inviteKeys.expiresAt,
    })
    .from(inviteKeys)
    .where(eq(inviteKeys.generatedBy, session.id))
    .orderBy(desc(inviteKeys.createdAt));

  return Ok(keys);
}

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
  const data = await db
    .insert(inviteKeys)
    .values({
      key,
      generatedBy: session.id,
      isGeneratedByRoot: role === "root",
    })
    .returning({
      id: inviteKeys.id,
      key: inviteKeys.key,
      createdAt: inviteKeys.createdAt,
      expiredAt: inviteKeys.expiresAt,
    });

  return Created(data.at(0));
}
