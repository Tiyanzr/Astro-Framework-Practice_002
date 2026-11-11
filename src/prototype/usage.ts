// Pemakaian variasi, dihitung otomatis dari YAML (pengganti status pass/draft yang dulu dicatat manual).
// Sumber: halaman (src/content/pages/ › sections, di kit halaman/situs), site.yaml (navbar, footer, post), frontmatter artikel.
// Setiap `variant:` diterjemahkan ke "kit/Nama" lengkap lewat src/lib/kits.ts, persis seperti saat halaman dirender.
// Halaman & artikel uji di src/prototype/content/ ikut dicatat, tetapi ditandai `test` dan tidak dihitung sebagai "dipakai".
import { getCollection } from "astro:content";
import { getSite, pageHref } from "@/lib/content";
import { isBasic, resolveVariant, splitRef } from "@/lib/kits";

export type Place = { label: string; href?: string; test: boolean };
/** dipakai = muncul di situs · base = versi Basic yang tidak dipakai · tidak dipakai = desain yang belum/tidak dipakai. */
export type VariantUse = "dipakai" | "base" | "tidak dipakai";

const isTest = (filePath?: string) => !!filePath?.replace(/\\/g, "/").includes("prototype/");

async function collectUsage() {
  const usage = new Map<string, Place[]>();
  const add = (section: string, ref: string | undefined, kit: string, place: Place) => {
    let key: string;
    try {
      key = resolveVariant(section, ref, kit).ref;
    } catch {
      return; // nama salah ketik: halaman itu sendiri akan error dan menyebut pilihannya
    }
    usage.set(key, [...(usage.get(key) ?? []), place]);
  };
  const site = await getSite();
  for (const page of await getCollection("pages")) {
    const href = pageHref(page.id);
    const kit = page.data.kit ?? site.kit;
    for (const s of page.data.sections) add(s.type, s.variant, kit, { label: href, href, test: isTest(page.filePath) });
  }
  add("navbar", site.navbar.variant, site.kit, { label: "semua halaman (site.yaml)", test: false });
  add("footer", site.footer.variant, site.kit, { label: "semua halaman (site.yaml)", test: false });
  add("post", site.post.variant, site.kit, { label: "semua artikel (site.yaml)", test: false });
  for (const post of await getCollection("posts")) {
    const href = `/posts/${post.id}/`;
    if (post.data.variant) add("post", post.data.variant, site.kit, { label: href, href, test: isTest(post.filePath) });
  }
  return usage;
}

/** Peta "kit/Nama" → tempat variasi itu dipakai. */
export const getUsage = () => collectUsage();

/** Tempat sebuah variasi ("kit/Nama") dipakai. */
export const placesOf = (usage: Map<string, Place[]>, ref: string) => usage.get(ref) ?? [];

/** Label pemakaian satu variasi ("kit/Nama"). */
export function useOf(usage: Map<string, Place[]>, ref: string): VariantUse {
  if (placesOf(usage, ref).some((p) => !p.test)) return "dipakai";
  return isBasic(splitRef(ref).name) ? "base" : "tidak dipakai";
}

/** Gaya tanda pemakaian (sama di combo box, label perbandingan, dan tabel /prototype/variants). */
export const useBadge: Record<VariantUse, string> = {
  dipakai: "bg-primary text-primary-foreground",
  base: "border border-border",
  "tidak dipakai": "bg-background-alt text-muted-foreground",
};
