// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";

import react from "@astrojs/react";

import sitemap from "@astrojs/sitemap";

// src/prototype/ (halaman /prototype dan konten contoh) hanya aktif saat `astro dev`, tidak ikut build.
import prototype from "./src/prototype/integration.mjs";

// https://astro.build/config
export default defineConfig({
  // Domain resmi: dipakai sitemap, URL kanonik, dan Open Graph (samakan dengan src/content/site.yaml › url)
  site: 'https://www.parametris.com',
  vite: {
  plugins: [tailwindcss()],
},

  integrations: [react(), mdx(), sitemap(), prototype()],
});
