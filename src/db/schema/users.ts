import { relations } from "drizzle-orm";
import {
  AnyPgColumn,
  pgEnum,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { comments } from "./comments";
import { inviteKeys } from "./invite-keys";
import { votes } from "./votes";

export const roleEnum = pgEnum("role", ["normal", "admin", "root"]);

export const users = pgTable("users", {
  id: uuid("id").primaryKey(),
  qqNumber: varchar("qq_number").notNull().unique(),
  passwordHash: varchar("password_hash").notNull(),
  role: roleEnum("role").notNull().default("normal"),
  invitedBy: uuid("invited_by").references((): AnyPgColumn => users.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const usersRelations = relations(users, ({ many, one }) => ({
  inviteKeys: many(inviteKeys),
  votes: many(votes),
  comments: many(comments),
  invitedBy: one(users, {
    fields: [users.invitedBy],
    references: [users.id],
  }),
}));
