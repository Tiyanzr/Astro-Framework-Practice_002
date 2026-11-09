// Semua file Post<Gaya>_<NNN>.astro di folder ini terdeteksi otomatis. Variasi yang tampil = yang ditulis di YAML.
import { collectVariants } from "@/lib/variants";

export const postVariants = collectVariants(import.meta.glob<{ default: any }>("./Post*_*.astro", { eager: true }));
