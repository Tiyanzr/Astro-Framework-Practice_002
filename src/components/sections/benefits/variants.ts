// Semua file Benefits<Gaya>_<NNN>.astro di folder ini terdeteksi otomatis. Status (draft/disetujui) diatur di src/content/variants.yaml.
import { collectVariants } from "@/lib/variants";

export const benefitsVariants = collectVariants(import.meta.glob<{ default: any }>("./Benefits*_*.astro", { eager: true }));
