// Pemilih variasi bersama untuk semua section. Setiap folder section punya variants.ts berisi import.meta.glob
// (pola glob harus ditulis langsung di folder itu), lalu hasilnya diolah dengan fungsi di sini.
//
// Tidak ada status/persetujuan: variasi yang ditulis di YAML itulah yang tampil, sama persis saat dev dan build.
// Desain baru dicoba dan ditinjau di /prototype dulu, baru dipasang di YAML halaman.

type Modules<T> = Record<string, { default: T }>;

/** Hasil import.meta.glob → { NamaVariasi: Komponen }, urut nama. Nama variasi = nama file tanpa .astro. */
export function collectVariants<T>(modules: Modules<T>): Record<string, T> {
  return Object.fromEntries(
    Object.entries(modules)
      .map(([path, mod]) => [path.split("/").pop()!.replace(/\.astro$/, ""), mod.default] as const)
      .sort(([a], [b]) => a.localeCompare(b)),
  );
}

/** Variasi bare minimum (tanpa desain) bernama <Nama>Basic_<NNN>. Pengaturan desain (tone, width, pulldown) diabaikan untuk variasi ini. */
export const isBasic = (name: string) => /Basic_\d{3}$/.test(name);

/**
 * Ambil satu variasi: komponen + namanya.
 * Nama harus ada di folder section; kalau salah ketik, error menyebut semua pilihan yang ada.
 */
export function resolveVariant<T>(variants: Record<string, T>, name: string, section: string) {
  if (!variants[name]) {
    throw new Error(`Variasi ${section} "${name}" tidak ada. Pilihan: ${Object.keys(variants).join(", ")}.`);
  }
  return { Variant: variants[name], name };
}

/** Versi singkat resolveVariant() kalau hanya butuh komponennya. */
export const pickVariant = <T>(variants: Record<string, T>, name: string, section: string): T =>
  resolveVariant(variants, name, section).Variant;
