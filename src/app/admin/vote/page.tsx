import ContentCard from "@/components/card/content-card";
import React from "react";
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
