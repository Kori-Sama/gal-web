import { db } from "@/db";
import { openedRounds, users } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export async function fetchQqInfo(qqNumber: string) {
  const data = await fetch(
    `https://api.qjqq.cn/api/qqinfo?qq=${qqNumber}`,
  ).then(res => res.json());

  if (data.code !== 200) {
    return null;
  }

  return {
    username: data.name,
    avatarUrl: data.imgurl,
  };
}

export async function getOpenedRound() {
  const opened = await db
    .select({
      id: openedRounds.id,
      roundName: openedRounds.roundName,
      createdAt: openedRounds.createdAt,
      openUserId: users.id,
      openUserQq: users.qqNumber,
    })
    .from(openedRounds)
    .where(eq(openedRounds.hasEnded, false))
    .leftJoin(users, eq(openedRounds.openBy, users.id))
    .orderBy(desc(openedRounds.roundName));

  return opened.at(0);
}
