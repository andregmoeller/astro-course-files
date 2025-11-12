import type { APIRoute } from "astro";
import { getCollection, getEntry } from "astro:content";

export const GET: APIRoute = async ({ params }) => {
  const id = params.id;

  if (!id) {
    throw new Error('ID (slug) is missing.');
  }

  const post = await getEntry("posts", id);

  return new Response(JSON.stringify(post), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export async function getStaticPaths() {
  const posts = await getCollection("posts");

  return posts.map((post) => ({
    params: { id: post.slug },
  }));
};
