import { file, glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

export const collections = {
  todos: defineCollection({
    loader: async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/todos");
      const data = await res.json();
      return data.map((todo: any) => ({
        ...todo,
        id: todo.id.toString(),
      }));
    },
    schema: z.object({
      title: z.string(),
      completed: z.boolean(),
    }),
  }),
  posts: defineCollection({
    loader: glob({
      pattern: "src/data/posts/**/*.md",
    }),
    schema: z.object({
      title: z.string(),
      tags: z.array(z.string()),
      pubDate: z.coerce.date(),
      isDraft: z.boolean(),
      canonicalURL: z.string().optional(),
    }),
  }),
  team: defineCollection({
    loader: file("src/data/team.json"),
    schema: z.object({
      name: z.string(),
      role: z.string(),
      email: z.string().email(),
      department: z.enum([
        "Engineering",
        "Software Development",
        "Product Design",
      ]),
    }),
  }),
};
