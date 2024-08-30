import { db } from "@/db";
import { categories, openedRounds, users, votes, works } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { VoteType } from "./types";

export async function fetchQqInfo(qqNumber: string) {
  const data = await fetch(`https://api.qoc.cc/api/mqq?qq=${qqNumber}`).then(
    res => res.json(),
  );

  if (data.code === 500) {
    console.error("API Server Error: ", data);
    return null;
  }

  if (data.code !== 1) {
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

export async function getVotes({
  round,
  isFullInfo,
}: {
  round?: number;
  isFullInfo?: boolean;
}) {
  if (!round) {
    const openedRound = await getOpenedRound();

    if (!openedRound) {
      return null;
    }

    round = openedRound.id;
  }

  const votesData = (await db
    .select({
      id: votes.id,
      user: {
        id: users.id,
        qqNumber: users.qqNumber,
        role: users.role,
      },
      category: {
        id: categories.id,
        name: categories.name,
      },
      work: {
        id: works.id,
        title: works.title,
        linkUrl: works.linkUrl,
        coverImage: works.coverImage,
      },
      createdAt: votes.createdAt,
    })
    .from(votes)
    .where(eq(votes.roundId, round))
    .leftJoin(users, eq(votes.userId, users.id))
    .leftJoin(categories, eq(votes.categoryId, categories.id))
    .leftJoin(works, eq(votes.workId, works.id))
    .orderBy(desc(votes.createdAt))) as VoteType[];

  if (!isFullInfo) {
    return votesData;
  }

  // 并发得请求所有QQ信息
  const fetchPromises = votesData.map(async vote => {
    if (!vote.user) return;

    const qqInfo = await fetchQqInfo(vote.user.qqNumber);
    if (qqInfo) {
      vote.user.username = qqInfo.username;
      vote.user.avatarUrl = qqInfo.avatarUrl;
    }
  });

  // 等待所有请求完成
  await Promise.all(fetchPromises);

  return votesData;
}
