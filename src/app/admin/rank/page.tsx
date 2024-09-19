import ContentCard from "@/components/card/content-card";
import { getVotes } from "@/lib/services";
import { VoteType } from "@/lib/types";

const VoteRank = async () => {
  return <ContentCard title="投票排行"></ContentCard>;
};

export default VoteRank;
