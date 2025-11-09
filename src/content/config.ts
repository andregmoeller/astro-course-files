import { defineCollection, z } from "astro:content";

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

export const collections = { products };
