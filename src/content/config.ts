import { defineCollection, z } from "astro:content";

const posts = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string().max(65, {
        message: "Title cannot be longer than 65 characters",
      }),
      description: z.string().max(165, {
        message: "Description cannot be longer than 165 characters",
      }),
      image: image(),
      pubDate: z.date(),
      isDraft: z.boolean().optional(),
    }),
});

const products = defineCollection({
  type: "data",
  schema: z.object({
    product_id: z.number().int().positive(),
    product_name: z.string().min(1).max(200),
    price: z.number().positive(),
    in_stock: z.boolean(),
    colors: z.array(z.string()).min(1),
    details: z.object({
      brand: z.string().min(1),
      model: z.string().min(1),
      screen_size: z.number().positive().optional(),
      wireless: z.boolean().optional(),
      features: z.array(z.string()).default([]),
    }),
  })
});

export const collections = { 
  posts,
  products,
};
