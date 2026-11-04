// Semua file Intro<Gaya>_<NNN>.astro di folder ini terdeteksi otomatis — variasi baru cukup ditambah sebagai file.
import { collectVariants } from "@/lib/variants";

export const introVariants = collectVariants(import.meta.glob<{ default: any }>("./Intro*_*.astro", { eager: true }));
