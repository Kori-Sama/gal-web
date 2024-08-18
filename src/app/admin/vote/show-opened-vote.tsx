import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { fetchQqInfo, getOpenedRound } from "@/lib/services";
import VoteOpen from "./vote-open";
import VoteClose from "./vote-close";
import dayjs from "dayjs";

const ShowOpenedVote = async () => {
  const round = await getOpenedRound();
  let openBy = "";

  if (round && round.openUserQq) {
    const qq = await fetchQqInfo(round.openUserQq);
    if (qq) {
      openBy = qq.username;
    }
  }

  return (
    <>
      {round ? (
        <Card className="flex flex-col gap-4 bg-secondary px-4 pt-6">
          <CardTitle>当前开启的投票是: {round.roundName}</CardTitle>
          <CardDescription>
            投票开启时间: {dayjs(round.createdAt).format("YYYY-MM-DD HH:mm:ss")}{" "}
            <br />
            开启人: {openBy}
          </CardDescription>
          <CardContent>
            <VoteClose />
          </CardContent>
        </Card>
      ) : (
        <Card className="flex flex-col gap-4 bg-secondary px-4 pt-6">
          <CardTitle>当前没有开始的投票</CardTitle>
          <CardContent>
            <VoteOpen />
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default ShowOpenedVote;
