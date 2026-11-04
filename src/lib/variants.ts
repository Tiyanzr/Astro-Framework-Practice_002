// Pemilih variasi bersama untuk semua section. Setiap folder section punya variants.ts berisi import.meta.glob
// (pola glob harus ditulis langsung di folder itu), lalu hasilnya diolah dengan fungsi di sini.

type Modules<T> = Record<string, { default: T }>;

/** Hasil import.meta.glob → { NamaVariasi: Komponen }, urut nama. Nama variasi = nama file tanpa .astro. */
export function collectVariants<T>(modules: Modules<T>): Record<string, T> {
  return Object.fromEntries(
    Object.entries(modules)
      .map(([path, mod]) => [path.split("/").pop()!.replace(/\.astro$/, ""), mod.default] as const)
      .sort(([a], [b]) => a.localeCompare(b)),
  );
}

/** Ambil satu variasi. Kalau namanya salah, pesan error menyebut semua pilihan yang ada. */
export function pickVariant<T>(variants: Record<string, T>, name: string, section: string): T {
  const variant = variants[name];
  if (!variant) {
    throw new Error(`Variasi ${section} "${name}" tidak ada. Pilihan: ${Object.keys(variants).join(", ")}`);
  }
  return variant;
}
