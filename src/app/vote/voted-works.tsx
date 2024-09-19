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
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

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
    <div className="mb-25 relative flex h-full w-full justify-start">
      <div className="flex h-full w-full flex-col items-center gap-3">
        {categories.map(({ id, name }) => (
          <VotedCard
            key={id}
            categoryId={id}
            categoryName={name}
            works={categoryVotes.get(id) || []}
          />
        ))}
      </div>
      <div className="absolute -bottom-20 right-5">
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
    <Card className="h-[250px] w-[88%] px-2 pt-3 dark:bg-gray-600">
      <CardTitle>{categoryName}</CardTitle>
      <Separator className="my-4 bg-foreground/20" />
      <CardContent className="gap-8 px-4">
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="my-3 flex gap-4">
            {works.map(w => (
              <MiniWorkCard
                key={w.id}
                work={w}
                onCancel={workId => {
                  cancelVote(workId, categoryId);
                }}
              />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
