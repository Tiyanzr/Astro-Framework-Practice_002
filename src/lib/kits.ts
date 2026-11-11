// Kit desain: setiap folder di kits/ (root proyek) = satu set desain utuh dari satu orang/tim.
//
//   kits/<kit>/kit.ts                  ← nama, pembuat, keterangan, pengaturan bawaan per variasi
//   kits/<kit>/theme.css               ← (opsional) warna/font/jarak kit, berlaku di dalam [data-kit="<kit>"]
//   kits/<kit>/<section>/<Nama>.astro  ← satu file = satu variasi section (hero, cards, navbar, footer, post, ...)
//   kits/<kit>/parts/, <section>/parts/ ← komponen bantu kit itu (bukan variasi)
//
// Semua terdeteksi otomatis: kit baru = folder baru, variasi baru = file baru. Tidak ada daftar manual.
// Props tiap section ("kontrak") ada di src/components/<sections|layout>/<section>/types.ts, sama untuk semua kit.
//
// Cara YAML menunjuk variasi (`variant:`):
//   HeroText_001             → dicari di kit aktif (kit halaman, kalau tidak ada kit situs), lalu di kit `base`
//   parametris/HeroText_001  → dari kit tertentu, apa pun kit aktifnya
//   (kosong)                 → variasi pertama (urut nama) di kit aktif; kalau kit itu belum punya section ini, dari `base`
import type { SectionSettings } from "./section";

export interface KitConfig {
  /** Nama tampilan, mis. "Parametris". */
  name: string;
  author?: string;
  description?: string;
  /** Pengaturan pembungkus bawaan per variasi, mis. { CtaClosing_001: { tone: "alt" } }. Nilai di YAML selalu menang. */
  defaults?: Record<string, SectionSettings>;
}

export interface Kit {
  id: string;
  config: KitConfig;
  /** section → (nama variasi → komponen), urut nama. */
  sections: Record<string, Record<string, any>>;
  /** Kit punya theme.css sendiri. */
  hasTheme: boolean;
}

/** Kit cadangan: versi polos semua section. Selalu ada, jangan dihapus. */
export const BASE_KIT = "base";

const configs = import.meta.glob<{ default: KitConfig }>("/kits/*/kit.ts", { eager: true });
const themes = import.meta.glob("/kits/*/theme.css");
const files = import.meta.glob<{ default: any }>("/kits/*/*/*.astro", { eager: true });
const kitIdOf = (path: string) => path.split("/")[2];

const registry: Record<string, Kit> = {};
const ensure = (id: string) => (registry[id] ??= { id, config: { name: id }, sections: {}, hasTheme: false });
for (const [path, mod] of Object.entries(configs)) ensure(kitIdOf(path)).config = mod.default;
for (const path of Object.keys(themes)) ensure(kitIdOf(path)).hasTheme = true;
for (const [path, mod] of Object.entries(files).sort(([a], [b]) => a.localeCompare(b))) {
  const [, , id, section, file] = path.split("/");
  if (section === "parts") continue;
  (ensure(id).sections[section] ??= {})[file.replace(/\.astro$/, "")] = mod.default;
}

/** Semua kit: base dulu, lalu urut nama. */
export const kits: Kit[] = Object.values(registry).sort((a, b) => Number(a.id !== BASE_KIT) - Number(b.id !== BASE_KIT) || a.id.localeCompare(b.id));
export const kitIds = kits.map((k) => k.id);
export const getKit = (id: string) => registry[id];

/** Variasi bare minimum (tanpa desain) bernama <Nama>Basic_<NNN>. Pengaturan desain (tone, width, pulldown) dari YAML diabaikan. */
export const isBasic = (name: string) => /Basic_\d{3}/.test(name);

/** "parametris/HeroText_001" → { kit: "parametris", name: "HeroText_001" }; tanpa "/" → kit kosong. */
export function splitRef(ref: string) {
  const i = ref.indexOf("/");
  return i < 0 ? { kit: undefined, name: ref } : { kit: ref.slice(0, i), name: ref.slice(i + 1) };
}
export const refOf = (kit: string, name: string) => `${kit}/${name}`;

/** Variasi satu section di satu kit (nama → komponen); kosong kalau kit itu belum punya section ini. */
export const variantsOf = (kit: string, section: string): Record<string, any> => registry[kit]?.sections[section] ?? {};

/** Semua variasi satu section di semua kit, sebagai "kit/Nama" (base dulu). */
export const allRefs = (section: string) => kitIds.flatMap((k) => Object.keys(variantsOf(k, section)).map((n) => refOf(k, n)));

/** Semua nama section yang punya variasi di kit mana pun. */
export const allSections = () => [...new Set(kits.flatMap((k) => Object.keys(k.sections)))].sort();

function assertKit(id: string, where: string) {
  if (!registry[id]) throw new Error(`Kit "${id}" (${where}) tidak ada di kits/. Pilihan: ${kitIds.join(", ")}.`);
}

/**
 * Pilih satu variasi. `ref` = isi `variant:` di YAML (lihat atas), `kit` = kit aktif.
 * Nama yang tidak ada = error yang menyebut semua pilihan.
 */
export function resolveVariant(section: string, ref: string | undefined, kit: string) {
  const split = ref ? splitRef(ref) : undefined;
  if (split?.kit) assertKit(split.kit, `variant "${ref}"`);
  else assertKit(kit, "kit aktif");
  const chain = split?.kit ? [split.kit] : [...new Set([kit, BASE_KIT])];
  for (const k of chain) {
    const variants = variantsOf(k, section);
    const name = split?.name ?? Object.keys(variants)[0];
    if (name && variants[name]) {
      return { Variant: variants[name], kit: k, name, ref: refOf(k, name), defaults: registry[k].config.defaults?.[name] ?? {} };
    }
  }
  const choices = chain.flatMap((k) => Object.keys(variantsOf(k, section)).map((n) => refOf(k, n)));
  throw new Error(`Variasi ${section} "${ref ?? "(bawaan)"}" tidak ada di kit ${chain.join(" / ")}. Pilihan: ${choices.join(", ") || "(belum ada)"}.`);
}
