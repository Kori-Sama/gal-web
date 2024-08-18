import { relations } from "drizzle-orm";
import { pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { votes } from "./votes";

// 从bangumi爬取的galgames
export const works = pgTable("works", {
  id: serial("id").primaryKey(),
  title: varchar("title").notNull(),
  linkUrl: varchar("link_url").notNull(),
  coverImage: varchar("cover_image"),
});

export const worksRelations = relations(works, ({ many }) => ({
  votes: many(votes),
}));
