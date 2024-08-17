"use client";

import WorkCard from "@/components/card/work-card";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { WorkType } from "@/lib/types";
import { useVotedWork } from "@/store/voted-work";

const VotedWorks = () => {
  const categories = useVotedWork(s => s.categories);
  const categoryVotes = useVotedWork(s => s.categoryVotes);

  return (
    <div className="flex flex-col justify-center gap-12 pr-64">
      {categories.map(({ id, name }) => (
        <VotedCard
          key={id}
          category={name}
          works={categoryVotes.get(id) || []}
        />
      ))}
    </div>
  );
};

export default VotedWorks;

interface VotedCardProps {
  category: string;
  works: WorkType[];
}

const VotedCard = ({ category, works }: VotedCardProps) => {
  return (
    <Card className="px-4 py-8">
      <CardTitle>{category}</CardTitle>
      <Separator className="my-4" />
      <CardContent>
        {works.map(w => (
          <WorkCard work={w} key={w.id} />
        ))}
      </CardContent>
    </Card>
  );
};
