import { defineCollection, reference } from "astro:content";
import { glob } from "astro/loaders"; 
import { z } from "astro/zod";

const testimonial = defineCollection({
  loader: glob({ pattern: "**/*.yaml", base: "./src/content/testimonial" }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      role: z.string(),
      content: z.string(),
      date: z.date(),
      image: image(),
      rating: z.number().min(0).max(5),
      isFeatured: z.boolean().default(false),
    }),
});

const keystatic = defineCollection({
  loader: glob({ pattern: "**/*.yaml", base: "./src/content/keystatic" }),
  schema: z.object({
    heading: z.object({
      tag: z.enum(["h1", "h2", "h3", "h4", "h5", "h6"]),
      text: z.string(),
    }),
    testimonials: z.array(reference("testimonial")),
  }),
});

export const collections = {
  testimonial,
  keystatic,
};
