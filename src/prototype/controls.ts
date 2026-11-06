// Pilihan (combo box) di bar atas halaman /prototype. Nilainya disimpan di URL (?v=..., ?tone=..., ?p=...),
// jadi tautan bisa dibagikan dan tombol back browser tetap jalan.
import { getSite } from "@/lib/content";
import { variantStatus, type VariantStatus } from "@/lib/variants";

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

/** Tanda status di belakang nama variasi (status dari src/content/variants.yaml). */
// Label pendek: base = versi Basic, pass = disetujui (tercantum di variants.yaml), draft = belum disetujui.
export const statusLabel: Record<VariantStatus, string> = { basic: "base", approved: "pass", draft: "draft" };

/** Opsi nama variasi untuk combo box, diberi tanda status, mis. "HeroImage_002 · draft". */
export const variantOptions = async (names: string[], section: string): Promise<Option[]> =>
  Promise.all(names.map(async (n) => ({ value: n, label: `${n} · ${statusLabel[await variantStatus(section, n)]}` })));

/**
 * Combo box palet (?palet=): "situs" = token situs (global.css :root), "referensi" = palet + font + jarak parametris.com
 * (class .theme-parametris di global.css). Hanya mengganti warna/font/jarak di pratinjau, bukan isi atau variasi.
 */
export const paletteControl = (url: URL, fallback: "situs" | "referensi" = "situs") =>
  control(
    url,
    "palet",
    "Palet",
    [
      { value: "situs", label: "Palet situs" },
      { value: "referensi", label: "Palet referensi (parametris.com)" },
    ],
    fallback,
  );

/** Palet bawaan prototype = palet yang dipakai situs (site.yaml › theme). */
export const sitePalette = async (): Promise<"situs" | "referensi"> =>
  (await getSite()).theme === "parametris" ? "referensi" : "situs";

/** Class pembungkus untuk palet yang dipilih. */
export const paletteClass = (c: Control) => (c.value === "referensi" ? "theme-parametris" : undefined);

/** Daftar yang ditampilkan: semua opsi kalau "Semua" dipilih, kalau tidak hanya yang dipilih. */
export const selected = (c: Control) => (c.value === ALL ? c.options.filter((o) => o.value !== ALL).map((o) => o.value) : [c.value]);
