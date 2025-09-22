import { defineCollection, z } from "astro:content";

const imagePosts = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.date(),
      image: z.object({
        src: image(),
        alt: z.string().min(1, { message: "The alt text must not be empty." }),
      }),
    }),
});

export const collections = { imagePosts };
