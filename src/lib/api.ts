export async function parseResponse<T>(res: Response, fallback: string): Promise<T> {
  const body = await res.json().catch(() => null);
  if (!res.ok || body?.error) {
    throw new Error(body?.error ?? fallback);
  }
  return body.data;
}
