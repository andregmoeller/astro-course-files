import type { Book } from "@/db/schema";

export type TBook = typeof Book.$inferSelect;

export type TBookSearchResult = Pick<TBook, "id" | "title" | "author" | "cover">;
