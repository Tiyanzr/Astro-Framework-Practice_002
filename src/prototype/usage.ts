// Pemakaian variasi, dihitung otomatis dari YAML (pengganti status pass/draft yang dulu dicatat manual).
// Sumber: halaman (src/content/pages/ › sections), site.yaml (navbar, footer, post), frontmatter artikel.
// Halaman & artikel uji di src/prototype/content/ ikut dicatat, tetapi ditandai `test` dan tidak dihitung sebagai "dipakai".
import { getCollection } from "astro:content";
import { getSite, pageHref } from "@/lib/content";
import { isBasic } from "@/lib/variants";

export type Place = { label: string; href?: string; test: boolean };
/** dipakai = muncul di situs · base = versi Basic yang tidak dipakai · tidak dipakai = desain yang belum/tidak dipakai. */
export type VariantUse = "dipakai" | "base" | "tidak dipakai";

const isTest = (filePath?: string) => !!filePath?.replace(/\\/g, "/").includes("prototype/");

async function collectUsage() {
  const usage = new Map<string, Place[]>();
  const add = (section: string, variant: string, place: Place) => {
    const key = `${section}:${variant}`;
    usage.set(key, [...(usage.get(key) ?? []), place]);
  };
  for (const page of await getCollection("pages")) {
    const href = pageHref(page.id);
    for (const s of page.data.sections) add(s.type, s.variant, { label: href, href, test: isTest(page.filePath) });
  }
  const site = await getSite();
  add("navbar", site.navbar.variant, { label: "semua halaman (site.yaml)", test: false });
  add("footer", site.footer.variant, { label: "semua halaman (site.yaml)", test: false });
  add("post", site.post.variant, { label: "semua artikel (site.yaml)", test: false });
  for (const post of await getCollection("posts")) {
    const href = `/posts/${post.id}/`;
    if (post.data.variant) add("post", post.data.variant, { label: href, href, test: isTest(post.filePath) });
  }
  return usage;
}

/** Peta "<section>:<variasi>" → tempat variasi itu dipakai. */
export const getUsage = () => collectUsage();

/** Tempat sebuah variasi dipakai. */
export const placesOf = (usage: Map<string, Place[]>, section: string, name: string) => usage.get(`${section}:${name}`) ?? [];

/** Label pemakaian satu variasi. */
export function useOf(usage: Map<string, Place[]>, section: string, name: string): VariantUse {
  if (placesOf(usage, section, name).some((p) => !p.test)) return "dipakai";
  return isBasic(name) ? "base" : "tidak dipakai";
}

/** Gaya tanda pemakaian (sama di combo box, label perbandingan, dan tabel /prototype/variants). */
export const useBadge: Record<VariantUse, string> = {
  dipakai: "bg-primary text-primary-foreground",
  base: "border border-border",
  "tidak dipakai": "bg-background-alt text-muted-foreground",
};
