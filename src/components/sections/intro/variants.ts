// Semua file Intro<Gaya>_<NNN>.astro di folder ini terdeteksi otomatis — variasi baru cukup ditambah sebagai file.
import { collectVariants } from "@/lib/variants";
import type { SectionSettings } from "@/lib/section";

export const introVariants = collectVariants(import.meta.glob<{ default: any }>("./Intro*_*.astro", { eager: true }));

/** Pengaturan pembungkus bawaan per variasi. Nilai di home.yaml (tone, width, pulldown) selalu menang. */
export const introDefaults: Record<string, SectionSettings> = {
  IntroMedia_001: { width: "contained" },
  IntroMedia_002: { width: "full" },
};
