import { Card, CardFooter, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { CategoryType, WorkType } from "@/lib/types";
import { useVotedWork } from "@/store/voted-work";

interface WorkCardProps {
  work: WorkType;
  categories?: CategoryType[];
}

const WorkCard = ({ work, categories }: WorkCardProps) => {
  const { title, coverImage, linkUrl } = work;
  const [open, setOpen] = useState(false);
  const vote = useVotedWork(s => s.vote);
  const categoryVotes = useVotedWork(s => s.categoryVotes);
  const cancelVote = useVotedWork(s => s.cancelVote);

  const selects: string[] = [];

  categoryVotes.forEach((works, category) => {
    works.forEach(w => {
      if (work.id === w.id) {
        selects.push(category);
      }
    });

    if (!categories) {
      setOpen(false);
    }

    // if (selects.length >= categories!.length) {
    //   setOpen(false);
    // }
  });

  return (
    <Card className="flex h-[160px] w-[300px] transform items-center justify-start px-4 transition-transform hover:scale-105">
      <Image
        src={coverImage}
        alt={title}
        width={80}
        height={0}
        className="m-2 mr-8 h-auto rounded-lg"
      />
      <div className="flex h-full w-full flex-col justify-between pb-2">
        <CardTitle className="text-md my-4 line-clamp-2 p-2">
          <Link className="hover:underline" href={linkUrl}>
            {title}
          </Link>
        </CardTitle>
        <CardFooter className="flex items-center justify-start p-0 pb-4">
          {categories && (
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-[120px] justify-between"
                >
                  {"Select"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder="Search" />
                  <CommandList>
                    <CommandEmpty>No category found.</CommandEmpty>
                    <CommandGroup>
                      {categories.map(c => (
                        <CommandItem
                          key={c.id}
                          value={c.id}
                          onSelect={currentValue => {
                            if (selects.find(w => w === c.id)) {
                              cancelVote(work.id, c.id);
                              return;
                            }

                            const isVoteSuccess = vote(work, currentValue);
                            if (!isVoteSuccess) {
                              console.log("Failed to vote");
                            }
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              selects.find(w => w === c.id)
                                ? "opacity-100"
                                : "opacity-0",
                            )}
                          />
                          {c.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          )}
        </CardFooter>
      </div>
    </Card>
  );
};

export default WorkCard;
