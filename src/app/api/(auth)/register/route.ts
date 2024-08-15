import { db } from "@/db";
import { inviteKeys, users } from "@/db/schema";
import { hashPassword } from "@/lib/hash";
import { Bad, Created, ServerError } from "@/lib/response";
import { setSession } from "@/lib/session";
import { eq } from "drizzle-orm";
import { z } from "zod";

export async function POST(req: Request) {
  const { username, password, inviteCode } = await req.json();

  if (!username || !password || !inviteCode) {
    return Bad("Missing required fields");
  }

  // Validate the invite code
  try {
    z.string().uuid().parse(inviteCode);
  } catch {
    return Bad("Invalid invite code");
  }

  // Check if the invite code is valid
  const inviteKeyData = (
    await db
      .select({
        id: inviteKeys.id,
        key: inviteKeys.key,
        generatedBy: inviteKeys.generatedBy,
        isGeneratedByRoot: inviteKeys.isGeneratedByRoot,
      })
      .from(inviteKeys)
      .where(eq(inviteKeys.key, inviteCode))
  ).at(0);

  if (!inviteKeyData) {
    return Bad("Invite code doesn't exist");
  }

  const hashedPassword = await hashPassword(password);

  // Create the user
  const responseInfo = (
    await db
      .insert(users)
      .values({
        id: inviteKeyData.key,
        username,
        passwordHash: hashedPassword,
        role: inviteKeyData.isGeneratedByRoot ? "admin" : "normal",
        invitedBy: inviteKeyData.generatedBy,
      })
      .returning({
        id: users.id,
        username: users.username,
        role: users.role,
        invitedBy: users.invitedBy,
      })
  ).at(0);

  if (!responseInfo) {
    return ServerError("Failed to create user");
  }

  await setSession({
    id: responseInfo.id,
    username: responseInfo.username,
  });

  return Created(responseInfo);
}
