// Semua file Benefits<Gaya>_<NNN>.astro di folder ini terdeteksi otomatis. Variasi yang tampil = yang ditulis di YAML.
import { collectVariants } from "@/lib/variants";

export const benefitsVariants = collectVariants(import.meta.glob<{ default: any }>("./Benefits*_*.astro", { eager: true }));
