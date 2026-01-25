import { defineCollection, z } from "astro:content";
import Stripe from "stripe";

const stripe = new Stripe(import.meta.env.STRIPE_SECRET_KEY);

const products = defineCollection({
  loader: async () => {
    const { data } = await stripe.products.list({ 
      active: true,
      limit: 100,
      expand: ['data.default_price']
    });

    return data.map((product) => ({
      id: product.id,
      title: product.name,
      description: product.description || "",
      image: product.images[0] || "",
      priceId: typeof product.default_price === 'object' 
        ? product.default_price?.id 
        : product.default_price,
      priceAmount: typeof product.default_price === 'object' 
         ? product.default_price?.unit_amount 
         : 0,
       currency: typeof product.default_price === 'object' 
         ? product.default_price?.currency 
         : "usd",
    }));
  },
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string(),
    priceId: z.string().optional(),
    priceAmount: z.number().optional(),
    currency: z.string().optional(),
  }),
});

export const collections = { products };
