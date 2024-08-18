import ContentCard from "@/components/card/content-card";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import React from "react";
import VoteOpen from "./vote-open";
import ShowOpenedVote from "./show-opened-vote";

const AdminVotePage = () => {
  return (
    <ContentCard title="投票管理">
      <div>
        <ShowOpenedVote />
      </div>
    </ContentCard>
  );
};

export default AdminVotePage;
