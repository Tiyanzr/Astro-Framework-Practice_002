// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";

import react from "@astrojs/react";

import sitemap from "@astrojs/sitemap";

// src/prototype/ (halaman /prototype dan konten contoh) hanya aktif saat `astro dev`, tidak ikut build.
import prototype from "./src/prototype/integration.mjs";

// Keystatic (editor artikel di /keystatic): UJI COBA, hanya aktif saat `astro dev` supaya build Netlify tetap statis.
// Konfigurasi field: keystatic.config.ts.
import keystatic from "@keystatic/astro";
function keystaticDevOnly() {
  const integration = keystatic();
  return {
    name: "keystatic-dev-only",
    hooks: {
      /** @param {any} options */
      "astro:config:setup": (options) => {
        if (options.command === "dev") integration.hooks["astro:config:setup"](options);
      },
    },
  };
}

// https://astro.build/config
export default defineConfig({
  // Domain resmi: dipakai sitemap, URL kanonik, dan Open Graph (samakan dengan src/content/site.yaml › url)
  site: 'https://www.parametris.com',
  vite: {
  plugins: [tailwindcss()],
},

  integrations: [react(), mdx(), sitemap(), prototype(), keystaticDevOnly()],
});
