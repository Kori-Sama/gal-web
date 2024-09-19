import React from "react";
import { Card, CardTitle } from "../ui/card";
import { WorkType } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

interface MiniWorkCardProps {
  work: WorkType;
  onCancel: (workId: number) => void;
}

const MiniWorkCard = ({ work, onCancel }: MiniWorkCardProps) => {
  const { title, coverImage, linkUrl } = work;
  return (
    <Card className="relative flex h-[150px] w-[240px] flex-row gap-4 p-4">
      <Image
        src={coverImage}
        alt={title}
        width={80}
        height={80}
        className="rounded-md"
      />
      <CardTitle className="text-md line-clamp-4">
        <Link href={linkUrl} className="hover:underline">
          {title}
        </Link>
      </CardTitle>
      <Button
        className="absolute -right-2 -top-2 size-6 overflow-visible rounded-full"
        variant={"destructive"}
        size={"icon"}
        onClick={() => onCancel(work.id)}
      >
        X
      </Button>
    </Card>
  );
};

export default MiniWorkCard;
