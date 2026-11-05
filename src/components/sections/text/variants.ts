// Semua file Text<Gaya>_<NNN>.astro di folder ini terdeteksi otomatis. Status (draft/disetujui) diatur di src/content/variants.yaml.
import { collectVariants } from "@/lib/variants";

export const textVariants = collectVariants(import.meta.glob<{ default: any }>("./Text*_*.astro", { eager: true }));
