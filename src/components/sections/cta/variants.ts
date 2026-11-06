// Semua file Cta<Gaya>_<NNN>.astro di folder ini terdeteksi otomatis. Status (draft/disetujui) diatur di src/content/variants.yaml.
import { collectVariants } from "@/lib/variants";

export const ctaVariants = collectVariants(import.meta.glob<{ default: any }>("./Cta*_*.astro", { eager: true }));
