// Semua file Post<Gaya>_<NNN>.astro di folder ini (variasi yang disetujui) terdeteksi otomatis. Kandidat: src/prototype/variants/, hanya saat dev.
import { collectVariants } from "@/lib/variants";

export const postVariants = collectVariants(import.meta.glob<{ default: any }>("./Post*_*.astro", { eager: true }), "post");
