import { db } from "@/db";
import { Bad, Ok } from "@/lib/response";
import { sql } from "drizzle-orm";

export async function GET(req: Request) {
  const query = new URL(req.url).searchParams.get("query");

  if (!query) {
    return Bad("Query is required");
  }

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

  return Ok(
    results.map((r) => ({
      id: r.id,
      title: r.title,
      linkUrl: r.link_url,
      coverImage: r.cover_image,
    }))
  );
}
