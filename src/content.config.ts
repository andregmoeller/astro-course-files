import { file } from "astro/loaders";
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
