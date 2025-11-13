export const prerender = false;

import type { APIRoute } from "astro";

const API_TIMEOUT = 5000;
const EXTERNAL_API_URL = "https://jsonplaceholder.typicode.com/posts";

const JSON_HEADERS = {
  "Content-Type": "application/json",
} as const;

const jsonResponse = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: JSON_HEADERS,
  });

const errorResponse = (message: string, status = 500) =>
  jsonResponse(
    {
      message,
      timestamp: new Date().toISOString(),
    },
    status
  );

const fetchWithTimeout = async (
  url: string,
  timeout: number,
  options: RequestInit = {}
): Promise<Response> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: options.signal 
        ? AbortSignal.any([options.signal, controller.signal])
        : controller.signal,
    });
    return response;
  } finally {
    clearTimeout(timeoutId);
  }
};

export const GET: APIRoute = async () => {
  try {
    const response = await fetchWithTimeout(EXTERNAL_API_URL, API_TIMEOUT);

    if (!response.ok) {
      console.error(
        `External API failed with status: ${response.status} ${response.statusText}`
      );
      return errorResponse(
        "Failed to fetch data from external service",
        response.status >= 500 ? 502 : response.status
      );
    }

    const data = await response.json();
    return jsonResponse(data);

  } catch (error) {
    if (error instanceof Error) {
      if (error.name === "AbortError") {
        console.error("Request timeout after", API_TIMEOUT, "ms");
        return errorResponse("External service timeout", 504);
      }

      console.error("API Error:", error.message, error.stack);
    } else {
      console.error("Unknown error:", error);
    }

    return errorResponse("Internal Server Error");
  }
};
