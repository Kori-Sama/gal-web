import { relations } from "drizzle-orm";
import { boolean, pgTable, serial, timestamp, uuid } from "drizzle-orm/pg-core";
import { users } from "./users";

export const inviteKeys = pgTable("invite_keys", {
  id: serial("id").primaryKey(),
  key: uuid("key").notNull().unique(), // 邀请码将对应一个用户的id
  generatedBy: uuid("generated_by")
    .notNull()
    .references(() => users.id), // 生成邀请码的用户
  createdAt: timestamp("created_at").notNull().defaultNow(),
  expiresAt: timestamp("expires_at"), // 过期时间, 为空表示永不过期
  isGeneratedByRoot: boolean("is_generated_by_root").notNull().default(false), // 如果为真, 则被邀请的用户将拥有 admin 权限
});

export const inviteKeysRelations = relations(inviteKeys, ({ one }) => ({
  user: one(users, {
    fields: [inviteKeys.generatedBy],
    references: [users.id],
  }),
}));
