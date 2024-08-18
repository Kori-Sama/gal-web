import { relations } from "drizzle-orm";
import { pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { votes } from "./votes";

// 投票的类别, 比如最佳画面, 最佳剧本等
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull().unique(),
});

export const categoriesRelations = relations(categories, ({ many }) => ({
  votes: many(votes),
}));
