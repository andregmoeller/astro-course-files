import { navigate } from "astro:transitions/client";

export default function Form() {
  return (
    <select
      onChange={(e) =>
        navigate(e.target.value, {
          history: "replace",
        })
      }
    >
      <option value="/projects">Projects</option>
      <option value="/blog">Blog</option>
      <option value="/">Home</option>
    </select>
  );
}
