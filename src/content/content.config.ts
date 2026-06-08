import { defineCollection, reference, z } from "astro:content";

const testimonial = defineCollection({
  type: "data",
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
  type: "data",
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
