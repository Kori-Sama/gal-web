import ContentCard from "@/components/card/content-card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { getVotes } from "@/lib/services";
import { UserInfo, VoteType } from "@/lib/types";
import dayjs from "dayjs";
import Image from "next/image";

const VoteLog = async () => {
  const votes =
    (await getVotes({
      isFullInfo: true,
    })) ?? [];

  const userVotes = Object.entries(groupByUser(votes));

  return (
    <ContentCard title="投票记录">
      <div className="flex flex-col gap-4">
        {votes?.length === 0 ? (
          <div>暂无投票记录</div>
        ) : (
          <Accordion type="multiple">
            {userVotes.map(([userId, votesInfo]) => (
              <AccordionItem
                value={userId}
                key={userId}
                className="w-full rounded-lg bg-secondary px-6"
              >
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex w-full items-center justify-start gap-8">
                    <Avatar>
                      <Image
                        src={votesInfo.user.avatarUrl!}
                        alt={votesInfo.user.username!}
                        width={40}
                        height={40}
                      />
                    </Avatar>
                    <p>{votesInfo.user.username}</p>
                    <p>{votesInfo.date}</p>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <Separator className="mb-4" />
                  <div className="flex flex-col gap-4">
                    {Array.from(
                      votesGroupByCategory(votesInfo.votes).entries(),
                    ).map(([category, votes]) => (
                      <div key={category} className="rounded-lg bg-muted p-2">
                        <h1 className="text-lg">{category}</h1>
                        <div className="flex flex-col gap-2">
                          {votes.map(vote => (
                            <h1 key={vote.id}>{vote.work.title}</h1>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </div>
    </ContentCard>
  );
};

export default VoteLog;

const groupByUser = (votes: VoteType[]) => {
  const grouped = votes.reduce(
    (acc, vote) => {
      const userId = vote.user.id;

      if (!acc[userId]) {
        acc[userId] = {
          user: vote.user,
          date: dayjs(vote.createdAt).format("YYYY/MM/DD HH:mm:ss"),
          votes: [],
        };
      }

      acc[userId].votes.push(vote);

      return acc;
    },
    {} as Record<
      string,
      {
        user: UserInfo;
        date: string;
        votes: VoteType[];
      }
    >,
  );

  return grouped;
};

function votesGroupByCategory(votes: VoteType[]) {
  const grouped = new Map<string, VoteType[]>();

  votes.forEach(vote => {
    const category = vote.category.name;
    const votes = grouped.get(category) || [];
    votes.push(vote);
    grouped.set(category, votes);
  });

  return grouped;
}
