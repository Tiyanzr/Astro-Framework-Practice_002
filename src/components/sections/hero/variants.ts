// Semua file Hero<Gaya>_<NNN>.astro di folder ini terdeteksi otomatis — variasi baru cukup ditambah sebagai file.
import { collectVariants } from "@/lib/variants";

export const heroVariants = collectVariants(import.meta.glob<{ default: any }>("./Hero*_*.astro", { eager: true }));
