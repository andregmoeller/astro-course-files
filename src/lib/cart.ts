import { getCollection, type CollectionEntry } from "astro:content";
export type FinalCartItem = {
  product: CollectionEntry<"products">;
  quantity: number;
};
export const getTotalCartItems = async (
  cartItems: CollectionEntry<"products">["id"][]
) => {
  const products = await getCollection("products");

  const uniqueCartItems = Array.from(new Set(cartItems));

  const finalCartItems = uniqueCartItems.map((id) => {
    return {
      product: products.find((p) => p.id === id),
      quantity: cartItems.filter((i) => i === id).length,
    };
  }) as FinalCartItem[];

  return finalCartItems;
};

export const getProductPrice = (product: CollectionEntry<"products">) => {
  return product.data.priceAmount
    ? (product.data.priceAmount / 100).toLocaleString("en-US", {
        style: "currency",
        currency: product.data.currency,
      })
    : "N/A";
};
