import type { Book } from "@/db/schema";


export type TBook = typeof Book.$inferSelect;
