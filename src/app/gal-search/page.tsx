"use client";

import { useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { search } from "./action";
import WorkCard from "@/components/card/work-card";
import { Separator } from "@/components/ui/separator";

interface WorkType {
  id: number;
  title: string;
  linkUrl: string;
  coverImage: string;
}

const GalSearchPage = () => {
  const [results, setResults] = useState<WorkType[]>([]);
  const [hasQuery, setHasQuery] = useState(false);

  return (
    <div>
      <form
        action={async (formData) => {
          const res = await search(formData);
          if (!res) return;

          setResults(
            res.map((r) => ({
              id: r.id,
              title: r.title,
              linkUrl: r.link_url,
              coverImage: r.cover_image,
            }))
          );
          setHasQuery(true);
        }}
        className="flex items-center justify-center mt-24 mb-4"
      >
        <Input
          type="text"
          placeholder="Search"
          className="w-[400px] max-h-fit px-4"
          name="query"
        />
        <Button className="ml-2" type="submit" size={"lg"}>
          Search
        </Button>
      </form>
      <Separator className="h-1 my-8" />
      <div className="flex flex-col gap-6 items-center justify-center">
        {results.length === 0 && hasQuery ? (
          <h1 className="text-[30px] mt-36">
            No results found. <br />
            Please try searching for something else.
          </h1>
        ) : (
          results.map((result) => (
            <WorkCard
              key={result.id}
              title={result.title}
              linkUrl={result.linkUrl}
              coverImage={result.coverImage}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default GalSearchPage;
