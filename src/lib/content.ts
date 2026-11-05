// Pembaca konten dari src/content/. Semua kalimat ada di file .yaml/.md di sana; file ini hanya mengambilnya.
import { getCollection, getEntry, type CollectionEntry } from "astro:content";

export type NavLink = { label: string; href: string; description?: string };

/** Info umum situs (src/content/site.yaml). */
export async function getSite() {
  const entry = await getEntry("site", "site");
  if (!entry) throw new Error("src/content/site.yaml tidak ditemukan.");
  return entry.data;
}

export type PageData = CollectionEntry<"pages">["data"];
/** Satu item di daftar `sections` sebuah halaman. */
export type PageSection = PageData["sections"][number];
export type SectionType = PageSection["type"];

/** Isi satu halaman (src/content/pages/<id>.yaml). */
export async function getPage(id: string) {
  const entry = await getEntry("pages", id);
  if (!entry) throw new Error(`src/content/pages/${id}.yaml tidak ditemukan.`);
  return entry.data;
}

/** Section pertama berjenis `type` di sebuah halaman (dipakai halaman /prototype sebagai isi contoh). */
export async function getSection<T extends SectionType>(pageId: string, type: T) {
  const page = await getPage(pageId);
  const section = page.sections.find((s): s is Extract<PageSection, { type: T }> => s.type === type);
  if (!section) throw new Error(`src/content/pages/${pageId}.yaml belum punya section \`type: ${type}\`.`);
  return section;
}

/** Item menu utama (src/content/menu/*.yaml), urut sesuai `order`. */
export async function getMainLinks(): Promise<NavLink[]> {
  const items = await getCollection("menu");
  return items
    .sort((a, b) => a.data.order - b.data.order)
    .map(({ data }) => ({ label: data.title, href: data.href, description: data.description }));
}

/** Semua postingan yang boleh tampil. Saat build, postingan `draft: true` disaring. Terbaru di atas. */
export async function getPosts() {
  const posts = await getCollection("posts", ({ data }) => import.meta.env.DEV || !data.draft);
  return posts.sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());
}

/**
 * Artikel terkait: skor = kategori sama (+2) + jumlah tag yang sama (+1 per tag). Artikel itu sendiri tidak ikut.
 * Kalau skornya seri, yang terbaru di atas; kalau tidak ada yang mirip, tetap diisi artikel terbaru.
 */
export async function getRelatedPosts(post: CollectionEntry<"posts">, limit = 3) {
  const others = (await getPosts()).filter((p) => p.id !== post.id);
  const score = (p: CollectionEntry<"posts">) =>
    (post.data.category && p.data.category === post.data.category ? 2 : 0) +
    p.data.tags.filter((tag) => post.data.tags.includes(tag)).length;
  return others
    .map((p) => ({ p, s: score(p) }))
    .sort((a, b) => b.s - a.s || b.p.data.pubDate.getTime() - a.p.data.pubDate.getTime())
    .slice(0, limit)
    .map(({ p }) => p);
}
