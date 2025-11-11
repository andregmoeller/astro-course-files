import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { baseData } from "@/data/siteData";
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  if (!context.site) {
    throw new Error(
      'The “site” URL is not configured in astro.config.mjs.'
    );
  }
  
  const posts = await getCollection("posts");
  const blog = posts.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  return rss({
    stylesheet: "/rss/styles.xsl",
    title: baseData.title,
    description: baseData.description,
    site: context.site,
    items: blog.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: new URL(`/blog/${post.slug}/`, context.site).href,
    })),
    customData: `<language>en-us</language>`,
  });
};
