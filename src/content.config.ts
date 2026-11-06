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

// Menu utama: 1 item = 1 file .yaml di src/content/menu/. Dipakai navbar dan hero bergaya kartu menu.
// Tambah item = tambah file; urutan diatur `order`. Sub-menu: daftar `children` di file item induknya.
const menu = defineCollection({
  loader: glob({ pattern: "*.yaml", base: "./src/content/menu" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    href: z.string(),
    order: z.number().default(0),
    children: z.array(z.object({ title: z.string(), href: z.string() })).default([]),
  }),
});

// Showcase produk: 1 kategori = 1 file .yaml di src/content/products/, berisi daftar produknya.
// Tambah kategori = tambah file; tambah produk = tambah item di `items`. Urutan kategori diatur `order`.
// Saat dev, kategori contoh di src/prototype/content/products/ ikut terbaca dengan id berawalan subfolder
// (mis. referensi/cad). Kategori di subfolder hanya tampil kalau diminta lewat `categories:` (lihat getProductCategories).
const productPatterns = ["content/products/*.yaml", ...(import.meta.env.DEV ? ["prototype/content/products/**/*.yaml"] : [])];
const products = defineCollection({
  loader: glob({
    pattern: productPatterns,
    base: "./src",
    generateId: ({ entry }) => entry.replace(/^(prototype\/)?content\/products\//, "").replace(/\.yaml$/, ""),
  }),
  schema: ({ image }) => z.object({
    title: z.string(),
    summary: z.string().optional(),
    order: z.number().default(0),
    // Gambar kategori (opsional), path relatif dari file .yaml. Dipakai variasi bergambar, mis. CatalogGrid_001.
    image: z.object({ src: image(), alt: z.string() }).optional(),
    items: z
      .array(
        z.object({
          name: z.string(),
          description: z.string().optional(),
          // Link ke halaman produk (boleh ke situs luar)
          href: z.string().optional(),
        }),
      )
      .default([]),
  }),
});

const link = z.object({ label: z.string(), href: z.string() });

// Info kontak: dipakai site.yaml › contact, dan boleh ditimpa per section `contact` (field `contact:` di YAML halaman).
const contactInfo = z.object({
  email: z.string().optional(),
  phone: z.string().optional(),
  address: z.array(z.string()).default([]),
  hours: z.string().optional(),
  // Email tambahan berlabel, mis. { label: Dukungan teknis, email: support@... }
  emails: z.array(z.object({ label: z.string(), email: z.string() })).default([]),
  // Nomor tambahan berlabel, mis. { label: WhatsApp, number: +62 ... } atau { label: Fax, number: ... }
  phones: z.array(z.object({ label: z.string(), number: z.string() })).default([]),
});

// Info umum situs: satu file src/content/site.yaml.
const site = defineCollection({
  loader: glob({ pattern: "site.yaml", base: "./src/content" }),
  schema: z.object({
    name: z.string(),
    description: z.string(),
    url: z.string(),
    lang: z.string().default("id"),
    // Judul tab beranda (halaman lain: "<judul halaman> — <name>"). Kosong = name.
    homeTitle: z.string().optional(),
    // Palet seluruh situs: "situs" = token :root di global.css, "parametris" = palet referensi parametris.com (.theme-parametris)
    theme: z.enum(["situs", "parametris"]).default("situs"),
    cta: link,
    // Kontak perusahaan: dipakai section `contact` (dan bisa dipakai footer).
    contact: contactInfo,
    navbar: z.object({
      variant: z.string().default("NavbarBasic_001"),
    }),
    footer: z.object({
      variant: z.string().default("FooterBasic_001"),
      company: z.string(),
      // Kalimat singkat di bawah nama perusahaan (FooterColumns_001)
      tagline: z.string().optional(),
      address: z.array(z.string()).default([]),
      email: z.string().optional(),
      phone: z.string().optional(),
      // Link lokasi/kantor, mis. { label: Alam Sutera · Tangerang, href: /kontak } (FooterColumns_001)
      location: link.optional(),
      // Judul kolom menu & kolom kontak (FooterColumns_001). Kolom menu berisi item menu utama (src/content/menu/).
      exploreTitle: z.string().optional(),
      contactTitle: z.string().optional(),
      // Isi kolom menu (FooterColumns_001). Kosong = item menu utama (src/content/menu/).
      explore: z.array(link).optional(),
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
      variant: z.string().default("PostBasic_001"),
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

// Isi halaman: 1 halaman = 1 file .yaml di src/content/pages/. Nama file = URL:
// home.yaml → /, produk.yaml → /produk, produk/plc.yaml → /produk/plc.
// Susunan halaman = daftar `sections`, tampil berurutan dari atas ke bawah. Setiap item memilih jenis section lewat `type`.
// Saat dev, halaman contoh di src/prototype/content/pages/ ikut terbaca; saat build tidak.
// Menambah JENIS section baru: tambahkan skemanya di bawah (dengan `type` sendiri), lalu daftarkan
// komponennya di src/components/sections/Sections.astro.
const pagePatterns = ["content/pages/**/*.yaml", ...(import.meta.env.DEV ? ["prototype/content/pages/**/*.yaml"] : [])];
const pages = defineCollection({
  loader: glob({
    pattern: pagePatterns,
    base: "./src",
    // pages/<nama>.yaml atau pages/<nama>/index.yaml (1 halaman = 1 folder berisi index.yaml + gambarnya) → id <nama>
    generateId: ({ entry }) =>
      entry
        .replace(/^(prototype\/)?content\/pages\//, "")
        .replace(/\.yaml$/, "")
        .replace(/\/index$/, ""),
  }),
  schema: ({ image }) => {
    const media = z.discriminatedUnion("type", [
      z.object({ type: z.literal("youtube"), id: z.string(), title: z.string() }),
      // Path relatif dari file .yaml, contoh: ./intro.jpg
      z.object({ type: z.literal("image"), src: image(), alt: z.string() }),
      // Kotak 16:9 bergaris selama video/gambar final belum ada
      z.object({ type: z.literal("placeholder"), label: z.string().optional() }),
    ]);

    const img = z.object({ src: image(), alt: z.string() });

    const hero = z.object({
      type: z.literal("hero"),
      variant: z.string().default("HeroBasic_001"),
      eyebrow: z.string().optional(),
      // Teks kecil di kanan atas (HeroText_*), boleh berupa link, mis. { label: Beranda, href: / }
      aside: z.object({ label: z.string(), href: z.string().optional() }).optional(),
      title: z.string(),
      // Lanjutan judul di baris baru dengan warna aksen (gaya parametris.com: "Dari desain. / Hingga pengembangan produk.")
      accent: z.string().optional(),
      description: z.string().optional(),
      // Tombol, jumlah bebas. Yang pertama = tombol utama, sisanya tombol sekunder.
      actions: z.array(link).default([]),
      // Daftar link (HeroImage_002). Kosongkan untuk memakai item menu utama (src/content/menu/).
      links: z.array(link.extend({ description: z.string().optional() })).optional(),
      // xl = judul terbesar (beranda), default = lebih kecil untuk halaman lain
      size: z.enum(["xl", "default"]).optional(),
      // Path relatif dari file .yaml, contoh: ./hero.jpg
      image: z.object({ src: image(), alt: z.string() }).optional(),
    });

    // Pembungkus section (ui/Section.astro), dipakai section yang dibungkus: intro, cards, catalog, posts, text, cta, contact.
    const wrapper = {
      tone: z.enum(sectionTones).optional(),
      width: z.enum(sectionWidths).optional(),
    };
    // Judul + pengantar opsional di atas isi section.
    const heading = {
      eyebrow: z.string().optional(),
      title: z.string().optional(),
      // Lanjutan judul di baris baru dengan warna aksen (lihat hero › accent)
      accent: z.string().optional(),
      description: z.string().optional(),
    };

    // Kartu: dari halaman anak (`from: iot` → semua file di pages/iot/, urut `order`) atau daftar manual `items`.
    const cards = z.object({
      type: z.literal("cards"),
      variant: z.string().default("CardsBasic_001"),
      ...wrapper,
      ...heading,
      from: z.string().optional(),
      items: z
        .array(z.object({ title: z.string(), description: z.string().optional(), href: z.string().optional(), image: img.optional() }))
        .default([]),
      // Teks link di setiap kartu, mis. "Jelajahi" (variasi bergambar). Kosong = tanpa teks link.
      linkLabel: z.string().optional(),
      // Link "lihat semua" di kanan atas judul (variasi bergaya referensi)
      more: link.optional(),
    });

    // Showcase produk dari koleksi `products`. `categories` = id file yang ditampilkan (kosong = semua);
    // `limit` = jumlah produk per kategori (kosong = semua).
    const catalog = z.object({
      type: z.literal("catalog"),
      variant: z.string().default("CatalogBasic_001"),
      ...wrapper,
      ...heading,
      categories: z.array(z.string()).optional(),
      limit: z.number().optional(),
      more: link.optional(),
    });

    // Daftar artikel (terbaru di atas). `limit` kosong = semua, `category` = saring per kategori.
    const posts = z.object({
      type: z.literal("posts"),
      variant: z.string().default("PostsBasic_001"),
      ...wrapper,
      ...heading,
      limit: z.number().optional(),
      category: z.string().optional(),
      more: link.optional(),
      // Teks link di setiap artikel, mis. "Baca artikel" (PostsGrid_001)
      linkLabel: z.string().optional(),
      // Opsional: daftar artikel manual (mis. artikel di situs lain). Kalau diisi, koleksi posts tidak dipakai.
      items: z.array(z.object({ title: z.string(), category: z.string().optional(), href: z.string() })).optional(),
    });

    // Teks bebas. `body` = paragraf, pisahkan dengan satu baris kosong.
    const text = z.object({
      type: z.literal("text"),
      variant: z.string().default("TextBasic_001"),
      ...wrapper,
      ...heading,
      body: z.string().optional(),
    });

    // Ajakan bertindak, biasanya di akhir halaman.
    const cta = z.object({
      type: z.literal("cta"),
      variant: z.string().default("CtaBasic_001"),
      ...wrapper,
      ...heading,
      actions: z.array(link).default([]),
    });

    // Info kontak (dari site.yaml › contact) + formulir. Label formulir ditulis di sini.
    const contact = z.object({
      type: z.literal("contact"),
      variant: z.string().default("ContactBasic_001"),
      ...wrapper,
      ...heading,
      // Opsional: menimpa site.yaml › contact untuk section ini saja (field yang diisi saja yang menimpa).
      contact: contactInfo.partial().optional(),
      // Tombol aksi, mis. WhatsApp & telepon (ContactDirect_001)
      actions: z.array(link).default([]),
      // Label kecil di atas alamat, mis. "Alamat" (ContactDirect_001)
      addressLabel: z.string().optional(),
      form: z
        .object({
          fields: z.array(
            z.object({
              name: z.string(),
              label: z.string(),
              type: z.enum(["text", "email", "tel", "textarea"]).default("text"),
              required: z.boolean().default(false),
            }),
          ),
          submit: z.string(),
        })
        .optional(),
    });

    // Gambar sebagai section sendiri: banner foto penuh dengan judul (MediaBanner_001) atau gambar lebar (MediaFigure_001).
    const mediaSection = z.object({
      type: z.literal("media"),
      variant: z.string().default("MediaBasic_001"),
      image: img,
      eyebrow: z.string().optional(),
      title: z.string().optional(),
      accent: z.string().optional(),
    });

    // Daftar kapabilitas/fitur bernomor: judul + penjelasan per baris.
    const features = z.object({
      type: z.literal("features"),
      variant: z.string().default("FeaturesBasic_001"),
      ...wrapper,
      ...heading,
      items: z.array(z.object({ title: z.string(), description: z.string().optional() })).default([]),
    });

    // Manfaat / bidang penerapan: ikon + judul + penjelasan, atau sekadar daftar tag. `entries` = rincian istilah-penjelasan.
    // `note` = paragraf penutup di bawah daftar. Ikon = nama file di src/assets/icons/ tanpa .svg (mis. gauge).
    const benefits = z.object({
      type: z.literal("benefits"),
      variant: z.string().default("BenefitsBasic_001"),
      ...wrapper,
      ...heading,
      items: z
        .array(
          z.object({
            icon: z.string().optional(),
            title: z.string(),
            description: z.string().optional(),
            entries: z.array(z.object({ term: z.string(), detail: z.string() })).default([]),
          }),
        )
        .default([]),
      note: z.string().optional(),
    });

    const intro = z.object({
      type: z.literal("intro"),
      variant: z.string().default("IntroBasic_001"),
      // Pembungkus section (ui/Section.astro)
      tone: z.enum(sectionTones).optional(),
      width: z.enum(sectionWidths).optional(),
      pulldown: z.boolean().optional(),
      eyebrow: z.string().optional(),
      title: z.string(),
      // Pisahkan paragraf dengan satu baris kosong
      description: z.string().optional(),
      highlight: z.string().optional(),
      media: media.optional(),
    });

    return z.object({
      // Judul tab browser & SEO. Kosong = nama situs (site.yaml). Juga dipakai sebagai judul kartu (section `cards` › from).
      title: z.string().optional(),
      description: z.string().optional(),
      // Ringkasan + urutan saat halaman ini tampil sebagai kartu di halaman induknya.
      summary: z.string().optional(),
      order: z.number().default(0),
      // Halaman induk untuk URL datar (mis. /manufacturing di bawah /iot): halaman ini jadi kartu di `cards › from: iot`.
      // Tidak perlu diisi kalau foldernya sudah di dalam folder induk (pages/iot/<nama>/).
      parent: z.string().optional(),
      // Gambar halaman saat tampil sebagai kartu bergambar di halaman induk (section `cards` › from)
      image: img.optional(),
      sections: z
        .array(z.discriminatedUnion("type", [hero, intro, cards, catalog, posts, text, cta, contact, mediaSection, features, benefits]))
        .default([]),
    });
  },
});

// Status variasi: satu file src/content/variants.yaml berisi variasi yang sudah disetujui per section.
// Variasi yang tidak tercantum = draft (lihat src/lib/variants.ts).
const variants = defineCollection({
  loader: glob({ pattern: "variants.yaml", base: "./src/content" }),
  schema: z.object({
    approved: z.record(z.string(), z.array(z.string())).default({}),
  }),
});

export const collections = { posts, menu, products, site, pages, variants };
