import type { APIRoute } from "astro";
import { eq } from "drizzle-orm";
import z from "zod";
import { db, Book, BOOK_STATUSES } from "@/db/client";

export const prerender = false;

const StatusUpdateSchema = z.object({
  status: z.enum(BOOK_STATUSES),
});

export const PATCH: APIRoute = async ({ request, params }) => {
  const { id } = params;
  const parsed = StatusUpdateSchema.safeParse(await request.json().catch(() => null));

  if (!id || !parsed.success) {
    return Response.json(
      { data: null, error: "Invalid book data" },
      { status: 400 }
    );
  }

  try {
    const result = await db
      .update(Book)
      .set({ status: parsed.data.status })
      .where(eq(Book.id, id));

    if (result.rowsAffected === 0) {
      return Response.json(
        { data: null, error: "Book not found" },
        { status: 404 }
      );
    }

    return Response.json({ data: { id, status: parsed.data.status }, error: null });
  } catch (error) {
    console.error(error);
    return Response.json(
      { data: null, error: "Failed to update book" },
      { status: 500 }
    );
  }
};

export const DELETE: APIRoute = async ({ params }) => {
  const { id } = params;

  if (!id) {
    return Response.json(
      { data: null, error: "Missing book id" },
      { status: 400 }
    );
  }

  try {
    const result = await db.delete(Book).where(eq(Book.id, id));

    if (result.rowsAffected === 0) {
      return Response.json(
        { data: null, error: "Book not found" },
        { status: 404 }
      );
    }

    return Response.json({ data: { id }, error: null });
  } catch (error) {
    console.error(error);
    return Response.json(
      { data: null, error: "Failed to delete book" },
      { status: 500 }
    );
  }
};
