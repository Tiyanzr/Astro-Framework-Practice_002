// Semua file Media<Gaya>_<NNN>.astro di folder ini terdeteksi otomatis. Status (draft/disetujui) diatur di src/content/variants.yaml.
import { collectVariants } from "@/lib/variants";

export const mediaVariants = collectVariants(import.meta.glob<{ default: any }>("./Media*_*.astro", { eager: true }));
