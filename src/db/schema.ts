import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const Book = sqliteTable("Book", {
  id: text().primaryKey(),
  title: text().notNull(),
  author: text({ mode: "json" }).$type<string[]>().notNull(),
  cover: text(),
  status: text({ enum: ["reading", "read", "to_read"] }).notNull(),
});
