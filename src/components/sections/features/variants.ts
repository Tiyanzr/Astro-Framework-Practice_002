// Semua file Features<Gaya>_<NNN>.astro di folder ini terdeteksi otomatis. Status (draft/disetujui) diatur di src/content/variants.yaml.
import { collectVariants } from "@/lib/variants";

export const featuresVariants = collectVariants(import.meta.glob<{ default: any }>("./Features*_*.astro", { eager: true }));
