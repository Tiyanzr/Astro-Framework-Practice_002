// Pembaca konten dari src/content/. Semua kalimat ada di file .yaml/.md di sana; file ini hanya mengambilnya.
import { getCollection, getEntry } from "astro:content";

export type NavLink = { label: string; href: string; description?: string };

/** Info umum situs (src/content/site.yaml). */
export async function getSite() {
  const entry = await getEntry("site", "site");
  if (!entry) throw new Error("src/content/site.yaml tidak ditemukan.");
  return entry.data;
}

/** Isi satu halaman (src/content/pages/<id>.yaml). */
export async function getPage(id: string) {
  const entry = await getEntry("pages", id);
  if (!entry) throw new Error(`src/content/pages/${id}.yaml tidak ditemukan.`);
  return entry.data;
}

/** Item menu utama (src/content/menu/*.yaml), urut sesuai `order`. */
export async function getMainLinks(): Promise<NavLink[]> {
  const items = await getCollection("menu");
  return items
    .sort((a, b) => a.data.order - b.data.order)
    .map(({ data }) => ({ label: data.title, href: data.href, description: data.description }));
}
