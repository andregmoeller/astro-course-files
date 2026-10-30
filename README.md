# Astro Course Files

My work-through of [Build Modern Websites with Astro](https://chris-pennington-s-school.teachable.com/p/build-modern-websites-with-astro) by Chris Pennington (Coding in Public). The official course files are at [coding-in-public/astro-course-files](https://github.com/coding-in-public/astro-course-files).

This repository is archived. It was completed in October 2026 and will not be updated.

## How it is organised

Each part of the course lives on its own branch (`part-NN-topic`). The branches are independent of each other; `main` only holds the Astro starter template the parts were created from.

I added code lesson by lesson instead of starting from the course files, so the commit history of a branch is the path through that part. Each branch has a tag (`vNN.0-topic`) marking its final state.

## Parts

| Branch | Topic |
| --- | --- |
| `part-01-astro-basics` | Pages, layouts, Tailwind |
| `part-02-blog-card-scaffold` | Component scaffolding |
| `part-03-react-counter` | React islands |
| `part-04-project-pricing-page` | Project: pricing page |
| `part-05-markdown-mdx` | Markdown and MDX content |
| `part-06-content-collections` | Content collections and schemas |
| `part-07-rendering-routing` | Static vs. on-demand rendering, dynamic routes, redirects |
| `part-08-project-final-portfolio` | Project: portfolio site with blog and pagination |
| `part-09-image-optimization` | `<Image>`, `<Picture>`, `getImage` |
| `part-10-dynamic-endpoints` | API routes, RSS feed |
| `part-11-astro-db` | Astro DB (now removed from Astro) |
| `part-12-middleware` | Middleware, 404 logging |
| `part-13-auth` | Session-based authentication, built on top of part 18 |
| `part-14-view-transitions` | View transitions, programmatic navigation |
| `part-15-internationalization` | i18n routing, language detection |
| `part-16` | _not worked through / TODO_ |
| `part-17-cms-solutions` | Strapi 5 backend with a typed Astro frontend |
| `part-18-basic-crud-app` | Project: "Bookends" reading tracker with Drizzle ORM and libSQL |
| `part-19-basic-e-commerce-app` | Project: shop with Stripe checkout |

## Where this differs from the course

The course was recorded against Astro 4. The later parts here run on Astro 7, which required some substitutions:

- **Astro DB** was removed in Astro 7. Part 18 uses Drizzle ORM with a local libSQL database instead; part 11 is left as recorded.
- **Lucia** is deprecated. Part 13 implements sessions directly, following the approach documented by the Lucia project: hashed session tokens in the database, Argon2id password hashing, cookie-based middleware. The Firebase lessons of that module were skipped because the course uses the client SDK on the server.
- **Strapi** in part 17 is version 5; the course uses version 4. The frontend validates the API response with Zod rather than importing generated backend types.
- API endpoints validate input with Zod and use HTTP status codes; the course code returns `200` with the error in the body.

The deviations are documented in the commit messages of the respective branches.
