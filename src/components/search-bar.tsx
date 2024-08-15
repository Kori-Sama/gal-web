"use client";

import { db } from "@/db";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { sql } from "drizzle-orm";
import { useState } from "react";
import Image from "next/image";

interface WorkType {
  id: number;
  title: string;
  link_url: string;
  cover_image: string;
}

const SearchBar = () => {
  const search = async (formData: FormData) => {
    "use server";
    const query = formData.get("query") as string;

    if (!query) return;

    const results: {
      id: number;
      title: string;
      link_url: string;
      cover_image: string;
    }[] = await db.execute(
      sql.raw(
        `SELECT * FROM works WHERE upper(works.title) like upper('%${query}%')`
      )
    );

    if (!results) {
      console.log("No results found");
      return;
    }

    return results;
  };

  const [results, setResults] = useState<WorkType[]>([]);

  return (
    <div>
      <form
        action={async (formData) => {
          const res = await search(formData);

          if (res) {
            setResults(res);
          }
        }}
        className="flex items-center justify-center"
      >
        <Input
          type="text"
          placeholder="Search"
          className="w-[300px] h-[40px] px-4"
          name="query"
        />
        <Button className="ml-2" type="submit">
          Search
        </Button>
      </form>
      <div>
        {results.map((result) => (
          <div key={result.id}>
            <h1>{result.title}</h1>
            <a href={result.link_url}>
              <Image src={result.cover_image} alt={result.title} />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
