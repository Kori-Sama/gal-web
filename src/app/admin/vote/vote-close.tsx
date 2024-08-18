"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const VoteClose = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"lg"}>关闭投票</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>关闭投票</DialogTitle>
          <DialogDescription>确定要关闭当前投票吗</DialogDescription>
        </DialogHeader>
        <DialogClose asChild>
          <div className="flex w-full justify-end gap-4">
            <Button
              variant={"destructive"}
              onClick={async () => {
                await fetch("/api/votes/round", {
                  method: "DELETE",
                });
                window.location.reload();
              }}
            >
              确定
            </Button>
            <Button>取消</Button>
          </div>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default VoteClose;
