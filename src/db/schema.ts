import { relations } from "drizzle-orm";
import {
  pgTable,
  pgEnum,
  serial,
  uuid,
  varchar,
  timestamp,
  boolean,
  integer,
  unique,
  AnyPgColumn,
} from "drizzle-orm/pg-core";

const roleEnum = pgEnum("role", ["normal", "admin", "root"]);

export const users = pgTable("users", {
  id: uuid("id").primaryKey(),
  username: varchar("username").notNull().unique(),
  passwordHash: varchar("password_hash").notNull(),
  role: roleEnum("role").notNull().default("normal"),
  invitedBy: uuid("invited_by").references((): AnyPgColumn => users.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const usersRelations = relations(users, ({ many, one }) => ({
  inviteKeys: many(inviteKeys),
  votes: many(votes),
  invitedBy: one(users, {
    fields: [users.invitedBy],
    references: [users.id],
  }),
}));

export const inviteKeys = pgTable("invite_keys", {
  id: serial("id").primaryKey(),
  key: uuid("key").notNull().unique(), // 邀请码将对应一个用户的id
  generatedBy: uuid("generated_by")
    .notNull()
    .references(() => users.id), // 生成邀请码的用户
  createdAt: timestamp("created_at").defaultNow(),
  expiresAt: timestamp("expires_at"), // 过期时间, 为空表示永不过期
  isGeneratedByRoot: boolean("is_generated_by_root").notNull().default(false), // 如果为真, 则被邀请的用户将拥有 admin 权限
});

export const inviteKeysRelations = relations(inviteKeys, ({ one }) => ({
  user: one(users, {
    fields: [inviteKeys.generatedBy],
    references: [users.id],
  }),
}));

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

// 投票的类别, 比如最佳画面, 最佳剧本等
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull().unique(),
});

export const categoriesRelations = relations(categories, ({ many }) => ({
  votes: many(votes),
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
    year: integer("year").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (t) => ({
    unique: unique().on(t.userId, t.workId, t.categoryId, t.year), // 确保一个用户每年在一个类别中只能投一票
  })
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
}));
