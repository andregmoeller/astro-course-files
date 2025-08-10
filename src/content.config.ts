import { file } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const whyWorkWithMe = defineCollection({
  loader: file("src/content/why-work-with-me.json"),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    icon: z.string(),
  }),
});

export const collections = { whyWorkWithMe };
