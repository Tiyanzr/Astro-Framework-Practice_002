// Semua file Hero<Gaya>_<NNN>.astro di folder ini (variasi yang disetujui) terdeteksi otomatis. Kandidat: src/prototype/variants/, hanya saat dev.
import { collectVariants } from "@/lib/variants";

export const heroVariants = collectVariants(import.meta.glob<{ default: any }>("./Hero*_*.astro", { eager: true }), "hero");
