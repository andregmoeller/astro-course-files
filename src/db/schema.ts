import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const BOOK_STATUSES = ["reading", "read", "to_read"] as const;

export const Book = sqliteTable("Book", {
  id: text().primaryKey(),
  title: text().notNull(),
  author: text({ mode: "json" }).$type<string[]>().notNull(),
  cover: text(),
  status: text({ enum: BOOK_STATUSES }).notNull(),
});
