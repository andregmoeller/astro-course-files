import { defineCollection, z } from "astro:content";

const products = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string(),
    default_price: z.string(), 
  }),
});

const prices = defineCollection({
  type: 'data',
  schema: z.object({
    product: z.string(),
    unit_amount: z.number(),
    currency: z.string(),
  })
});

export const collections = { products, prices };
