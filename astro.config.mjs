// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  i18n: {
    defaultLocale: "en",
    locales: ["es", "en"],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  /* 
    ARCHITECTURE NOTE / UX DEBT:
    The fallback below prevents 404 errors for untranslated content (good for SEO).
    However, it causes a UX issue: If a user selects 'Spanish' via the LanguagePicker 
    on a post that only exists in English, they are silently kept on the English version.
    TODO: Implement a UI banner on the blog post to inform the user: 
    "This post is not yet translated to Spanish. Showing English version."
  */
    fallback: {
      es: "en",
    },
  },
  adapter: node({
    mode: 'standalone',
  }),
});
