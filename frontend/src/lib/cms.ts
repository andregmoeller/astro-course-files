import qs from "qs";
import { z } from "zod";
import type { TestimonialData } from "../components/Testimonials";

const BASE_URL = "http://localhost:1337";

const HeadingSchema = z.object({
  text: z.string(),
  tag: z.enum(["h1", "h2", "h3", "h4", "h5", "h6"]),
});

const TestimonialSchema = z.object({
  name: z.string(),
  role: z.string(),
  rating: z.number().int().min(0).max(5),
  content: z.string(),
  date: z.string(),
  isFeatured: z.boolean(),
  image: z.object({ url: z.string() }).nullable(),
});

const TestimonialSectionSchema = z.object({
  __component: z.literal("section.testimonial-section"),
  heading: HeadingSchema.nullable(),
  testimonials: z.array(TestimonialSchema),
});

const BlockSchema = z.discriminatedUnion("__component", [TestimonialSectionSchema]);

const PagesResponseSchema = z.object({
  data: z.array(
    z.object({
      slug: z.string(),
      blocks: z.array(BlockSchema),
    })
  ),
});

const query = qs.stringify(
  {
    populate: {
      blocks: {
        on: {
          "section.testimonial-section": {
            populate: {
              heading: true,
              testimonials: { populate: { image: { fields: ["url"] } } },
            },
          },
        },
      },
    },
  },
  { encodeValuesOnly: true }
);

export async function getTestimonialSection(slug = "home"): Promise<TestimonialData> {
  const res = await fetch(`${BASE_URL}/api/pages?${query}`);
  if (!res.ok) throw new Error(`Strapi responded with ${res.status} ${res.statusText}`);

  const { data } = PagesResponseSchema.parse(await res.json());

  const page = data.find((p) => p.slug === slug);
  if (!page) throw new Error(`No page with the slug "${slug}" was found`);

  const section = page.blocks.find((b) => b.__component === "section.testimonial-section");
  if (!section) throw new Error(`The page "${slug}" does not contain a testimonial block`);
  if (!section.heading) throw new Error(`The testimonial block on "${slug}" has no heading`);

  return {
    heading: section.heading,
    testimonials: section.testimonials.map((t) => {
      if (!t.image) throw new Error(`Testimonial "${t.name}" has no image`);
      return { ...t, image: `${BASE_URL}${t.image.url}`, date: new Date(t.date) };
    }),
  };
}