// Semua file Cta<Gaya>_<NNN>.astro di folder ini terdeteksi otomatis. Variasi yang tampil = yang ditulis di YAML.
import { collectVariants } from "@/lib/variants";
import type { SectionSettings } from "@/lib/section";

export const ctaVariants = collectVariants(import.meta.glob<{ default: any }>("./Cta*_*.astro", { eager: true }));

/** Pengaturan pembungkus bawaan per variasi. Nilai di YAML halaman (tone, width) selalu menang. */
export const ctaDefaults: Record<string, SectionSettings> = {
  CtaClosing_001: { tone: "alt" },
};
