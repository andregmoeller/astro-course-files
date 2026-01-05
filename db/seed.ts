import { db, Links } from 'astro:db';

// https://astro.build/db/seed
export default async function seed() {
  await db.insert(Links).values([
    {
      title: "Title",
      url: "google.com",
      isRead: true,
      upvoteNum: 3,
    },
    {
      title: "Coding in Public",
      url: "codinginpublic.dev",
      isRead: false,
      upvoteNum: 10000,
    },
    {
      title: "Blog",
      url: "chrispennington.blog",
      isRead: true,
      upvoteNum: 1000,
    },
  ]);
}
