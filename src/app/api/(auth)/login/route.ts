import { db } from "@/db";
import { users } from "@/db/schema";
import { verifyPassword } from "@/lib/hash";
import { Bad, Ok } from "@/lib/response";
import { setSession } from "@/lib/session";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  const { username, password } = await req.json();

  if (!username || !password) {
    return Bad("Missing required fields");
  }

  const userQuery = (
    await db
      .select({
        id: users.id,
        username: users.username,
        passwordHash: users.passwordHash,
        role: users.role,
      })
      .from(users)
      .where(eq(users.username, username))
  ).at(0);

  if (!userQuery) {
    return Bad("User doesn't exist");
  }

  const isMatch = await verifyPassword(password, userQuery.passwordHash);

  if (!isMatch) {
    return Bad("Invalid password");
  }

  await setSession({
    id: userQuery.id,
    username: userQuery.username,
    role: userQuery.role,
  });

  return Ok({
    id: userQuery.id,
    username: userQuery.username,
    role: userQuery.role,
  });
}
