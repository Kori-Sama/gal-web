import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  serial,
  timestamp,
  unique,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { categories } from "./categories";
import { users } from "./users";
import { works } from "./works";

export const openedRounds = pgTable("opened_round", {
  id: serial("id").primaryKey(),
  roundName: varchar("round_name").notNull(), // 可以投票的年份
  hasEnded: boolean("has_ended").notNull().default(false), // 是否已经结束投票
  openBy: uuid("open_by")
    .notNull()
    .references(() => users.id), // 由谁开启的投票
  updateAt: timestamp("update_at").defaultNow(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const openedRoundsRelations = relations(openedRounds, ({ one }) => ({
  openBy: one(users, {
    fields: [openedRounds.openBy],
    references: [users.id],
  }),
}));

export const votes = pgTable(
  "votes",
  {
    id: serial("id").primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id),
    workId: integer("work_id")
      .notNull()
      .references(() => works.id),
    categoryId: integer("category_id")
      .notNull()
      .references(() => categories.id),
    roundId: integer("round_id")
      .notNull()
      .references(() => openedRounds.id),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  t => ({
    unique: unique().on(t.userId, t.workId, t.categoryId, t.roundId), // 确保一个用户每轮在一个类别中只能投一票
  }),
);

export const votesRelations = relations(votes, ({ one }) => ({
  user: one(users, {
    fields: [votes.userId],
    references: [users.id],
  }),
  work: one(works, {
    fields: [votes.workId],
    references: [works.id],
  }),
  category: one(categories, {
    fields: [votes.categoryId],
    references: [categories.id],
  }),
  voteRound: one(openedRounds, {
    fields: [votes.roundId],
    references: [openedRounds.roundName],
  }),
}));
