import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const BOOK_STATUSES = ["reading", "read", "to_read"] as const;

export const Book = sqliteTable("Book", {
  id: text().primaryKey(),
  title: text().notNull(),
  author: text({ mode: "json" }).$type<string[]>().notNull(),
  cover: text(),
  status: text({ enum: BOOK_STATUSES }).notNull(),
});

export const User = sqliteTable("User", {
  id: text().primaryKey(),
  username: text().notNull().unique(),
  passwordHash: text().notNull(),
  createdAt: integer({ mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});

export const Session = sqliteTable("Session", {
  id: text().primaryKey(),
  userId: text()
    .notNull()
    .references(() => User.id, { onDelete: "cascade" }),
  expiresAt: integer({ mode: "timestamp" }).notNull(),
});
