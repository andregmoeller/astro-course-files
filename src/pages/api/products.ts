import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const GET: APIRoute = async () => {
  try {
    const products = await getCollection("products", ({ data }) => data.in_stock);
    const productData = products.map((product) => product.data);

    return Response.json(productData);
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Products could not be loaded." },
      { status: 500 }
    );
  }
};
