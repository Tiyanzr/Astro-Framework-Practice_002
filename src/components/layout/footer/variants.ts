// Semua file Footer<Gaya>_<NNN>.astro di folder ini (variasi yang disetujui) terdeteksi otomatis. Kandidat: src/prototype/variants/, hanya saat dev.
import { collectVariants } from "@/lib/variants";

export const footerVariants = collectVariants(import.meta.glob<{ default: any }>("./Footer*_*.astro", { eager: true }), "footer");
