"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const VoteOpen = () => {
  const [roundName, setRoundName] = useState("");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"lg"}>开启投票</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>开启投票</DialogTitle>
          <DialogDescription>填写该轮的投票信息</DialogDescription>
        </DialogHeader>
        <form
          className="flex flex-col items-center justify-center gap-4"
          onSubmit={async e => {
            e.preventDefault();

            const res = await fetch("/api/votes/round", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ roundName }),
            });

            const obj = await res.json();

            if (!res.ok) {
              console.error("Failed to open vote", obj.message);
              return;
            }

            // fresh the page
            window.location.reload();
          }}
        >
          <div className="flex w-full">
            <Label className="flex h-full w-1/3 items-center justify-center text-lg">
              投票标题
            </Label>
            <Input
              type="text"
              name="name"
              value={roundName}
              onChange={e => setRoundName(e.target.value)}
            />
          </div>
          <div className="flex w-full justify-end gap-4">
            <Button variant={"destructive"} type="submit">
              提交
            </Button>
            <Button>取消</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default VoteOpen;
