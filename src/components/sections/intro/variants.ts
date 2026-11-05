// Semua file Intro<Gaya>_<NNN>.astro di folder ini (variasi yang disetujui) terdeteksi otomatis. Kandidat: src/prototype/variants/, hanya saat dev.
import { collectVariants } from "@/lib/variants";
import type { SectionSettings } from "@/lib/section";

export const introVariants = collectVariants(import.meta.glob<{ default: any }>("./Intro*_*.astro", { eager: true }), "intro");

/** Pengaturan pembungkus bawaan per variasi. Nilai di home.yaml (tone, width, pulldown) selalu menang. */
export const introDefaults: Record<string, SectionSettings> = {
  IntroBasic_001: { width: "full" },
  IntroMedia_001: { width: "contained" },
  IntroMedia_002: { width: "full" },
};
