// Skema koleksi konten. Menambah konten = menambah folder/file di src/content/<koleksi>/.
import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { sectionTones, sectionWidths } from "./lib/section";

// 1 postingan = 1 folder: src/content/posts/<slug>/index.md + gambar-gambarnya di folder yang sama.
// URL postingan diambil dari nama folder: /posts/<slug>/
// Saat dev, postingan contoh di src/prototype/content/posts/ ikut terbaca (untuk menguji tampilan); saat build tidak.
const postPatterns = ["content/posts/*/index.md", ...(import.meta.env.DEV ? ["prototype/content/posts/*/index.md"] : [])];
const posts = defineCollection({
  loader: glob({
    pattern: postPatterns,
    base: "./src",
    generateId: ({ entry }) => entry.replace(/^(prototype\/)?content\/posts\//, "").replace(/\/index\.md$/, ""),
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
      // true = belum tayang: tampil saat dev untuk dicek, tidak ikut build. Hapus barisnya untuk menerbitkan.
      draft: z.boolean().default(false),
      // Opsional: tampilan khusus untuk artikel ini. Kosong = site.yaml › post.variant.
      variant: z.string().optional(),
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
    post: z.object({
      variant: z.string().default("PostArticle_001"),
      labels: z.object({
        author: z.string(),
        published: z.string(),
        updated: z.string(),
        tags: z.string(),
        toc: z.string(),
        related: z.string(),
      }),
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
      intro: z
        .object({
          variant: z.string().default("IntroMedia_001"),
          // Pembungkus section (ui/Section.astro)
          tone: z.enum(sectionTones).optional(),
          width: z.enum(sectionWidths).optional(),
          pulldown: z.boolean().optional(),
          eyebrow: z.string().optional(),
          title: z.string(),
          // Pisahkan paragraf dengan satu baris kosong
          description: z.string().optional(),
          highlight: z.string().optional(),
          media: z
            .discriminatedUnion("type", [
              z.object({ type: z.literal("youtube"), id: z.string(), title: z.string() }),
              // Path relatif dari file .yaml, contoh: ./intro.jpg
              z.object({ type: z.literal("image"), src: image(), alt: z.string() }),
              // Kotak 16:9 bergaris selama video/gambar final belum ada
              z.object({ type: z.literal("placeholder"), label: z.string().optional() }),
            ])
            .optional(),
        })
        .optional(),
    }),
});

export const collections = { posts, menu, site, pages };
