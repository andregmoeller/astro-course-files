import { Book, db } from "./client";

async function seed() {
  await db.insert(Book).values([
    {
      id: "1",
      title: "whatever",
      author: ["joe"],
      cover: "https://covers.openlibrary.org/b/id/10110415-M.jpg",
      status: "reading",
    },
  ]).onConflictDoNothing();
}

await seed();
