import { db } from "@/db";
import { categories, users, votes, works } from "@/db/schema";
import { Bad, Forbidden, Ok, Unauthorized } from "@/lib/response";
import { getOpenedRound, getVotes } from "@/lib/services";
import { getSession } from "@/lib/session";
import { isAdmin } from "@/lib/utils";
import { desc, eq } from "drizzle-orm";

export async function GET(req: Request) {
  const roundStr = new URL(req.url).searchParams.get("round");

  const roundId = roundStr ? parseInt(roundStr) : undefined;

  const session = await getSession();

  if (!session) {
    return Unauthorized();
  }

  if (!isAdmin(session.role)) {
    return Forbidden();
  }

  const votesData = await getVotes({
    round: roundId,
  });

  if (!votesData) {
    return Bad("No votes data found");
  }

  return Ok(votesData);
}
