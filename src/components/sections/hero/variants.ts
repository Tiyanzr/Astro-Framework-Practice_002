// Semua file Hero<Gaya>_<NNN>.astro di folder ini terdeteksi otomatis. Variasi yang tampil = yang ditulis di YAML.
import { collectVariants } from "@/lib/variants";

export const heroVariants = collectVariants(import.meta.glob<{ default: any }>("./Hero*_*.astro", { eager: true }));
