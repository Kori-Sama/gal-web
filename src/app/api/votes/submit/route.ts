import { db } from "@/db";
import { votes } from "@/db/schema";
import { Bad, Ok, ServerError, Unauthorized } from "@/lib/response";
import { getSession } from "@/lib/session";
import { and, eq } from "drizzle-orm";
import { z } from "zod";

export async function POST(req: Request) {
  const session = await getSession();

  if (!session) {
    return Unauthorized();
  }
  const userId = session.id;

  const body = await req.json();
  const reqSchema = z.object({
    roundId: z.number(),
    votes: z.array(
      z.object({
        categoryId: z.number(),
        works: z.array(z.number()),
      }),
    ),
  });

  const parsedData = reqSchema.safeParse(body);
  if (!parsedData.success) {
    return Bad("Invalid request body");
  }

  const { roundId, votes: votesData } = parsedData.data;
  // check repeated category
  const categorySet = new Set<number>();
  for (const vote of votesData) {
    if (categorySet.has(vote.categoryId)) {
      return Bad("Repeated category");
    }
    categorySet.add(vote.categoryId);
  }

  // check repeated work in one category
  for (const vote of votesData) {
    const workSet = new Set<number>();
    for (const workId of vote.works) {
      if (workSet.has(workId)) {
        return Bad("Repeated work in one category");
      }
      workSet.add(workId);
    }
  }

  // Check if the user has already voted
  const res = await db
    .select({
      userId: votes.userId,
      year: votes.roundId,
    })
    .from(votes)
    .where(and(eq(votes.userId, userId), eq(votes.roundId, roundId)));

  if (res.length > 0) {
    return Bad("You have already voted");
  }

  // Insert votes

  try {
    for (const vote of votesData) {
      for (const workId of vote.works) {
        await db.insert(votes).values({
          userId,
          roundId: roundId,
          categoryId: vote.categoryId,
          workId,
        });
      }
    }
  } catch (e) {
    console.error(e);
    return ServerError("Failed to insert votes");
  }

  return Ok(null);
}
