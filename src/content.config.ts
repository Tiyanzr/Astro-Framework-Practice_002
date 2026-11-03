// Skema koleksi konten. Menambah konten = menambah file .md di src/content/<koleksi>/.
import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const posts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    author: z.string(),
    image: z.object({ url: z.string(), alt: z.string() }).optional(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { posts };
