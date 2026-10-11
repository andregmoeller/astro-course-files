import { db, Book } from "@/db/client";
import type { OpenLibraryDocsItem } from "@/types/OpenLibrary";
import { LibsqlError } from "@libsql/client";
import type { APIRoute } from "astro";
import { DrizzleQueryError } from "drizzle-orm";
import z from "zod";

export const prerender = false;

const NewBookSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  author: z.array(z.string()),
  cover: z.url().nullable(),
});

const isPrimaryKeyConflict = (error: unknown) =>
  error instanceof DrizzleQueryError &&
  error.cause instanceof LibsqlError &&
  error.cause.extendedCode === "SQLITE_CONSTRAINT_PRIMARYKEY";

export const GET: APIRoute = async ({ request }) => {
  // get query params
  const query = new URL(request.url).searchParams.get("search");

  // return early if no params
  if (!query) {
    return Response.json({ data: [], error: null });
  }

  // query the API endpoint
  try {
    const res = await fetch(
      `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=6`
    );

    if (!res.ok) {
      throw new Error("Failed to fetch books");
    }

    // get back books data
    const data = await res.json();
    // query the response for the data we want
    const books = data.docs.map((book: OpenLibraryDocsItem) => ({
      title: book.title,
      author: book.author_name ?? [],
      cover: book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : null,
      id: book.key.replaceAll("/works/", ""),
    }));

    // return
    return Response.json({ data: books, error: null });
  } catch (error) {
    console.error(error);
    return Response.json(
      { data: null, error: "Book search is currently unavailable" },
      { status: 502 }
    );
  }
};

export const POST: APIRoute = async ({ request }) => {
  const parsed = NewBookSchema.safeParse(await request.json().catch(() => null));

  if (!parsed.success) {
    return Response.json(
      { data: null, error: "Invalid book data" },
      { status: 400 }
    );
  }

  try {
    await db.insert(Book).values({ ...parsed.data, status: "to_read" });
    return Response.json(
      { data: { id: parsed.data.id }, error: null },
      { status: 201 }
    );
  } catch (error) {
    if (isPrimaryKeyConflict(error)) {
      return Response.json(
        { data: null, error: "This book is already in your library" },
        { status: 409 }
      );
    }
    console.error(error);
    return Response.json(
      { data: null, error: "Failed to add book" },
      { status: 500 }
    );
  }
};
