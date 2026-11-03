// Skema koleksi konten. Menambah konten = menambah folder/file di src/content/<koleksi>/.
import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

// 1 postingan = 1 folder: src/content/posts/<slug>/index.md + gambar-gambarnya di folder yang sama.
// URL postingan diambil dari nama folder: /posts/<slug>/
const posts = defineCollection({
  loader: glob({
    pattern: "*/index.md",
    base: "./src/content/posts",
    generateId: ({ entry }) => entry.replace(/\/index\.md$/, ""),
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      author: z.string(),
      category: z.string().optional(),
      tags: z.array(z.string()).default([]),
      // Path relatif ke gambar di folder postingan, contoh: ./gambar-1.png
      cover: image().optional(),
      coverAlt: z.string().optional(),
    }),
});

// Menu utama: 1 item = 1 file .yaml di src/content/menu/. Dipakai panel menu navbar dan hero bergaya kartu menu.
// Tambah item = tambah file; urutan diatur `order`.
const menu = defineCollection({
  loader: glob({ pattern: "*.yaml", base: "./src/content/menu" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    href: z.string(),
    order: z.number().default(0),
  }),
});

const link = z.object({ label: z.string(), href: z.string() });

// Info umum situs: satu file src/content/site.yaml.
const site = defineCollection({
  loader: glob({ pattern: "site.yaml", base: "./src/content" }),
  schema: z.object({
    name: z.string(),
    description: z.string(),
    url: z.string(),
    lang: z.string().default("id"),
    cta: link,
    footer: z.object({
      variant: z.string().default("FooterSimple_001"),
      company: z.string(),
      address: z.array(z.string()).default([]),
      email: z.string().optional(),
      socialsTitle: z.string().optional(),
      socials: z
        .array(
          z.object({
            platform: z.enum(["facebook", "instagram", "linkedin", "youtube", "x", "tiktok", "whatsapp"]),
            href: z.string(),
          }),
        )
        .default([]),
    }),
  }),
});

// Isi halaman: 1 halaman = 1 file .yaml di src/content/pages/ (home.yaml = halaman utama).
const pages = defineCollection({
  loader: glob({ pattern: "*.yaml", base: "./src/content/pages" }),
  schema: ({ image }) =>
    z.object({
      hero: z.object({
        variant: z.string().default("HeroImage_001"),
        eyebrow: z.string().optional(),
        title: z.string(),
        description: z.string().optional(),
        primaryAction: link.optional(),
        secondaryAction: link.optional(),
        // Path relatif dari file .yaml, contoh: ./hero.jpg
        image: z.object({ src: image(), alt: z.string() }).optional(),
      }),
    }),
});

export const collections = { posts, menu, site, pages };
