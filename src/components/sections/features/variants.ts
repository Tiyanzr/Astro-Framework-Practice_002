// Semua file Features<Gaya>_<NNN>.astro di folder ini terdeteksi otomatis. Variasi yang tampil = yang ditulis di YAML.
import { collectVariants } from "@/lib/variants";

export const featuresVariants = collectVariants(import.meta.glob<{ default: any }>("./Features*_*.astro", { eager: true }));
