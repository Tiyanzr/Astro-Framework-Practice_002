// Pemilih variasi bersama untuk semua section. Setiap folder section punya variants.ts berisi import.meta.glob
// (pola glob harus ditulis langsung di folder itu), lalu hasilnya diolah dengan fungsi di sini.
//
// Status variasi (lihat src/content/variants.yaml):
// - basic    : <Nama>Basic_<NNN>, versi teks saja. Selalu boleh dipakai.
// - approved : tercantum di variants.yaml › approved › <section>. Boleh dipakai di build.
// - draft    : selain itu. Bisa dipakai & dilihat saat dev; saat build diganti versi Basic.
import { getEntry } from "astro:content";

type Modules<T> = Record<string, { default: T }>;

export type VariantStatus = "basic" | "approved" | "draft";

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

/** Daftar variasi yang sudah disetujui per section (src/content/variants.yaml). */
export async function getApprovedVariants(): Promise<Record<string, string[]>> {
  const entry = await getEntry("variants", "variants");
  return entry?.data.approved ?? {};
}

/** Status satu variasi di sebuah section. */
export async function variantStatus(section: string, name: string): Promise<VariantStatus> {
  if (isBasic(name)) return "basic";
  const approved = await getApprovedVariants();
  return approved[section]?.includes(name) ? "approved" : "draft";
}

const warned = new Set<string>();

/**
 * Ambil satu variasi. Hasil: komponen + nama variasi yang benar-benar dipakai.
 * - Nama harus ada di folder section. Kalau salah, error menyebut semua pilihan.
 * - Saat build: variasi berstatus draft diganti `fallback` (versi Basic) dan dicatat sebagai peringatan di log build.
 */
export async function resolveVariant<T>(variants: Record<string, T>, name: string, section: string, fallback: string) {
  if (!variants[name]) {
    throw new Error(`Variasi ${section} "${name}" tidak ada. Pilihan: ${Object.keys(variants).join(", ")}.`);
  }
  if (!import.meta.env.DEV && (await variantStatus(section, name)) === "draft") {
    const key = `${section}:${name}`;
    if (!warned.has(key)) {
      warned.add(key);
      console.warn(
        `[${section}] variasi "${name}" masih draft (belum ada di src/content/variants.yaml › approved) → build memakai ${fallback}.`,
      );
    }
    return { Variant: variants[fallback], name: fallback, isFallback: true };
  }
  return { Variant: variants[name], name, isFallback: false };
}

/** Versi singkat resolveVariant() kalau hanya butuh komponennya. */
export async function pickVariant<T>(variants: Record<string, T>, name: string, section: string, fallback: string): Promise<T> {
  return (await resolveVariant(variants, name, section, fallback)).Variant;
}
