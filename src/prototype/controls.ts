// Pilihan (combo box) di bar atas halaman /prototype. Nilainya disimpan di URL (?v=..., ?tone=..., ?p=...),
// jadi tautan bisa dibagikan dan tombol back browser tetap jalan.
import { getSite } from "@/lib/content";
import { allRefs, kits, resolveVariant } from "@/lib/kits";
import { getUsage, useOf } from "./usage";

export type Option = { value: string; label: string };
export type Control = { name: string; label: string; options: Option[]; value: string };

/** Nilai khusus untuk menampilkan semua pilihan sekaligus (perbandingan berjajar). */
export const ALL = "semua";
export const allOption: Option = { value: ALL, label: "Semua" };

/**
 * Buat satu combo box. Nilai diambil dari ?<name>= di URL; kalau kosong/tidak valid dipakai `fallback`, lalu opsi pertama.
 * `options` boleh berupa teks biasa (value = label).
 */
export function control(url: URL, name: string, label: string, options: (string | Option)[], fallback?: string): Control {
  // Bar atas tidak punya label, jadi opsi "Semua" diberi nama lengkap, mis. "Semua variasi".
  const opts = options
    .map((o) => (typeof o === "string" ? { value: o, label: o } : o))
    .map((o) => (o.value === ALL ? { ...o, label: `Semua ${label.toLowerCase()}` } : o));
  const has = (v?: string | null) => !!v && opts.some((o) => o.value === v);
  const query = url.searchParams.get(name);
  const value = has(query) ? query! : has(fallback) ? fallback! : (opts[0]?.value ?? "");
  return { name, label, options: opts, value };
}

/**
 * Opsi variasi untuk combo box: semua variasi section ini di semua kit, sebagai "kit/Nama", diberi tanda pemakaian
 * (dihitung dari YAML), mis. "parametris/HeroText_001 · dipakai".
 */
export const variantOptions = async (section: string): Promise<Option[]> => {
  const usage = await getUsage();
  return allRefs(section).map((ref) => ({ value: ref, label: `${ref} · ${useOf(usage, ref)}` }));
};

/**
 * "kit/Nama" lengkap untuk isi `variant:` dari YAML (bawaan combo box). `kit` = kit tempat YAML itu berlaku
 * (kit halaman atau kit situs). Kosong kalau namanya tidak dikenali.
 */
export function fullRef(section: string, ref: string | undefined, kit: string) {
  try {
    return resolveVariant(section, ref, kit).ref;
  } catch {
    return undefined;
  }
}

/** Kit situs (site.yaml › kit). */
export const siteKit = async () => (await getSite()).kit;

/**
 * Combo box tema kit (?tema=): warna/font/jarak kit mana yang dipakai pratinjau (dipasang sebagai data-kit).
 * Bawaan = kit situs. Hanya untuk halaman yang tidak memilih variasi (mis. /prototype/ui); di halaman section,
 * setiap variasi otomatis memakai tema kit-nya sendiri.
 */
export const themeControl = async (url: URL) =>
  control(
    url,
    "tema",
    "Tema",
    kits.map((k) => ({ value: k.id, label: `Tema kit ${k.id}${k.hasTheme ? "" : " (tema bawaan)"}` })),
    await siteKit(),
  );

/** Daftar yang ditampilkan: semua opsi kalau "Semua" dipilih, kalau tidak hanya yang dipilih. */
export const selected = (c: Control) => (c.value === ALL ? c.options.filter((o) => o.value !== ALL).map((o) => o.value) : [c.value]);
