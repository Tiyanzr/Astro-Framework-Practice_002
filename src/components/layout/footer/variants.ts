// Semua file Footer<Gaya>_<NNN>.astro di folder ini terdeteksi otomatis — variasi baru cukup ditambah sebagai file.
import { collectVariants } from "@/lib/variants";

export const footerVariants = collectVariants(import.meta.glob<{ default: any }>("./Footer*_*.astro", { eager: true }));
