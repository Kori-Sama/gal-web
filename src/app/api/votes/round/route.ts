import { db } from "@/db";
import { openedRounds } from "@/db/schema";
import { Bad, Forbidden, Ok, Unauthorized } from "@/lib/response";
import { getOpenedRound } from "@/lib/services";
import { getSession } from "@/lib/session";
import { isAdmin } from "@/lib/utils";
import { desc, eq } from "drizzle-orm";

/**
 * @summary 查看当前开启的投票
 */
export async function GET(req: Request) {
  const session = await getSession();
  if (!session) {
    return Unauthorized();
  }

  const opened = await getOpenedRound();

  return Ok(opened);
}

/**
 * @summary 开启一轮投票
 */
export async function POST(req: Request) {
  const session = await getSession();
  if (!session) {
    return Unauthorized();
  }

  if (!isAdmin(session.role)) {
    return Forbidden();
  }

  const body = await req.json();
  const roundName = body.roundName as string;

  if (!roundName) {
    return Bad("Invalid request body");
  }

  const openedYear = await getOpenedRound();

  if (openedYear) {
    return Bad("There is already an opened vote");
  }

  try {
    await db.insert(openedRounds).values({ roundName, openBy: session.id });
  } catch (e) {
    console.error(e);
    return Bad("Failed to open vote");
  }

  return Ok(null);
}

/**
 * @summary 关闭一轮投票
 */

export async function DELETE(req: Request) {
  const session = await getSession();
  if (!session) {
    return Unauthorized();
  }

  if (!isAdmin(session.role)) {
    return Forbidden();
  }

  const openedRound = await getOpenedRound();
  if (!openedRound) {
    return Bad("No opened round");
  }

  const roundId = openedRound.id;

  try {
    await db
      .update(openedRounds)
      .set({ hasEnded: true })
      .where(eq(openedRounds.id, roundId));
  } catch {
    return Bad("Failed to close vote");
  }

  return Ok(null);
}
