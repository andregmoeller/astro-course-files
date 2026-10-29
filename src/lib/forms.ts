import { parseResponse } from "./api";

export function submitAsJson(
  form: HTMLFormElement,
  fallback: string,
  onSuccess: () => void
) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    try {
      const res = await fetch(form.action, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });

      await parseResponse(res, fallback);
      onSuccess();
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : "Unknown error");
    }
  });
}
