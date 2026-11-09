// Semua file Media<Gaya>_<NNN>.astro di folder ini terdeteksi otomatis. Variasi yang tampil = yang ditulis di YAML.
import { collectVariants } from "@/lib/variants";

export const mediaVariants = collectVariants(import.meta.glob<{ default: any }>("./Media*_*.astro", { eager: true }));
