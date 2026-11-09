// Semua file Catalog<Gaya>_<NNN>.astro di folder ini terdeteksi otomatis. Variasi yang tampil = yang ditulis di YAML.
import { collectVariants } from "@/lib/variants";

export const catalogVariants = collectVariants(import.meta.glob<{ default: any }>("./Catalog*_*.astro", { eager: true }));
