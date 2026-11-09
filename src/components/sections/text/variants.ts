// Semua file Text<Gaya>_<NNN>.astro di folder ini terdeteksi otomatis. Variasi yang tampil = yang ditulis di YAML.
import { collectVariants } from "@/lib/variants";

export const textVariants = collectVariants(import.meta.glob<{ default: any }>("./Text*_*.astro", { eager: true }));
