// Semua file Contact<Gaya>_<NNN>.astro di folder ini terdeteksi otomatis. Variasi yang tampil = yang ditulis di YAML.
import { collectVariants } from "@/lib/variants";

export const contactVariants = collectVariants(import.meta.glob<{ default: any }>("./Contact*_*.astro", { eager: true }));
