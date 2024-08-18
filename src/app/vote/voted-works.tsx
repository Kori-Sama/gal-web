"use client";

import MiniWorkCard from "@/components/card/mini-work-card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { WorkType } from "@/lib/types";
import { useVotedWork } from "@/store/voted-work";
import { useState } from "react";

interface VotedWorkProps {
  roundId: number;
  roundName: string;
}

const VotedWorks = ({ roundId, roundName }: VotedWorkProps) => {
  const categories = useVotedWork(s => s.categories);
  const categoryVotes = useVotedWork(s => s.categoryVotes);
  const submitVotes = useVotedWork(s => s.submitVotes);

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  return (
    <div className="flex justify-start">
      <div className="flex w-[1000px] flex-col justify-center gap-8 pr-64">
        {categories.map(({ id, name }) => (
          <VotedCard
            key={id}
            categoryId={id}
            categoryName={name}
            works={categoryVotes.get(id) || []}
          />
        ))}
      </div>
      <div className="flex flex-grow flex-col items-center justify-center">
        <AlertDialog open={open}>
          <AlertDialogTrigger asChild>
            <Button
              variant={"destructive"}
              size={"lg"}
              onClick={() => setOpen(true)}
            >
              提交
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                {errorMsg || "确认真的要提交吗?"}
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setOpen(false)}>
                Cancel
              </AlertDialogCancel>
              <form
                onSubmit={async e => {
                  e.preventDefault();
                  const msg = await submitVotes();
                  if (msg) {
                    setErrorMsg(msg);
                    setOpen(true);
                    return;
                  }
                  setOpen(false);
                }}
              >
                <AlertDialogAction
                  className="w-full bg-destructive hover:bg-destructive/60"
                  type="submit"
                >
                  Confirm
                </AlertDialogAction>
              </form>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default VotedWorks;

interface VotedCardProps {
  categoryId: string;
  categoryName: string;
  works: WorkType[];
}

const VotedCard = ({ categoryId, categoryName, works }: VotedCardProps) => {
  const cancelVote = useVotedWork(s => s.cancelVote);

  return (
    <Card className="h-[250px] w-[1000px] bg-slate-200 bg-gradient-to-r px-4 pt-4 dark:bg-gray-600">
      <CardTitle>{categoryName}</CardTitle>
      <Separator className="my-4 bg-foreground/20" />
      <CardContent className="flex justify-start gap-8 pl-16">
        {works.map(w => (
          <MiniWorkCard
            key={w.id}
            work={w}
            onCancel={workId => {
              cancelVote(workId, categoryId);
            }}
          />
        ))}
      </CardContent>
    </Card>
  );
};
