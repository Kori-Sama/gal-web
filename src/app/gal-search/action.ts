"use server";

import { db } from "@/db";
import { sql } from "drizzle-orm";

export const search = async (formData: FormData) => {
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
