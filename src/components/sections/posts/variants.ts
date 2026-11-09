// Semua file Posts<Gaya>_<NNN>.astro di folder ini terdeteksi otomatis. Variasi yang tampil = yang ditulis di YAML.
import { collectVariants } from "@/lib/variants";

export const postsVariants = collectVariants(import.meta.glob<{ default: any }>("./Posts*_*.astro", { eager: true }));
