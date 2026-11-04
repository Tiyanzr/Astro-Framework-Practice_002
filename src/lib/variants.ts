// Pemilih variasi bersama untuk semua section. Setiap folder section punya variants.ts berisi import.meta.glob
// (pola glob harus ditulis langsung di folder itu), lalu hasilnya diolah dengan fungsi di sini.
// Variasi kandidat dari src/prototype/variants/<section>/ ikut digabung hanya saat dev (modul "prototype:variants").
import prototypeVariants from "prototype:variants";

type Modules<T> = Record<string, { default: T }>;

/** Nama semua variasi kandidat yang sedang terbaca (hanya terisi saat dev). Dipakai label di halaman /prototype. */
export const candidateNames = new Set<string>();

const toRecord = <T>(modules: Modules<T>) =>
  Object.entries(modules).map(([path, mod]) => [path.split("/").pop()!.replace(/\.astro$/, ""), mod.default] as const);

/**
 * Hasil import.meta.glob → { NamaVariasi: Komponen }, urut nama. Nama variasi = nama file tanpa .astro.
 * `section` = nama folder di src/prototype/variants/ yang kandidatnya ikut digabung saat dev.
 */
export function collectVariants<T>(modules: Modules<T>, section: string): Record<string, T> {
  const approved = toRecord(modules);
  const candidates = toRecord((prototypeVariants[section] ?? {}) as Modules<T>);
  for (const [name] of candidates) {
    if (approved.some(([n]) => n === name)) {
      throw new Error(`Variasi ${name} ada di produksi dan di src/prototype/variants/${section}/. Hapus salah satunya.`);
    }
    candidateNames.add(name);
  }
  return Object.fromEntries([...approved, ...candidates].sort(([a], [b]) => a.localeCompare(b)));
}

/** Ambil satu variasi. Kalau namanya salah, pesan error menyebut semua pilihan yang ada. */
export function pickVariant<T>(variants: Record<string, T>, name: string, section: string): T {
  const variant = variants[name];
  if (!variant) {
    throw new Error(
      `Variasi ${section} "${name}" tidak ada. Pilihan: ${Object.keys(variants).join(", ")}. ` +
        `Kalau variasi ini masih kandidat di src/prototype/variants/, pindahkan dulu ke folder section produksi.`,
    );
  }
  return variant;
}
