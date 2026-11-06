// Semua file Catalog<Gaya>_<NNN>.astro di folder ini terdeteksi otomatis. Status (draft/disetujui) diatur di src/content/variants.yaml.
import { collectVariants } from "@/lib/variants";

export const catalogVariants = collectVariants(import.meta.glob<{ default: any }>("./Catalog*_*.astro", { eager: true }));
