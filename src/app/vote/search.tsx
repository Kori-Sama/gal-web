"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import WorkCard from "@/components/card/work-card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useVotedWork } from "@/store/voted-work";

interface WorkType {
  id: number;
  title: string;
  linkUrl: string;
  coverImage: string;
}

const SearchArea = () => {
  const [results, setResults] = useState<WorkType[]>([]);
  const [hasQuery, setHasQuery] = useState(false);

  const fetchCategories = useVotedWork(s => s.fetchCategories);
  const categories = useVotedWork(s => s.categories);

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <main className="ml-4 mt-8 flex h-full flex-col items-center">
      <form
        action={async formData => {
          const query = formData.get("query") as string;
          if (!query) {
            setHasQuery(false);
            return;
          }
          setHasQuery(true);

          const res = await fetch(`/api/gal/search?query=${query}`);
          const obj = await res.json();
          if (!res.ok || !obj.message) {
            console.error("Failed to fetch galgame data");
            return;
          }

          setResults(obj.data);
        }}
        className="mb-4 flex items-center justify-center"
      >
        <Input
          type="text"
          placeholder="Search"
          className="max-h-fit w-[200px] px-4"
          name="query"
        />
        <Button className="ml-2" type="submit">
          Search
        </Button>
      </form>
      <ScrollArea className="mb-8 w-[80svw] rounded-md border border-foreground py-4 md:w-[33svw]">
        <div className="flex flex-col items-center justify-center gap-8 py-8">
          {results.length === 0 && hasQuery ? (
            <h1 className="mt-36 text-[30px]">
              No results found. <br />
              Please try searching for something else.
            </h1>
          ) : (
            results.map(result => (
              <WorkCard key={result.id} work={result} categories={categories} />
            ))
          )}
        </div>
      </ScrollArea>
    </main>
  );
};

export default SearchArea;
