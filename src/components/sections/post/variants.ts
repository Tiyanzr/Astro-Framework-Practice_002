// Semua file Post<Gaya>_<NNN>.astro di folder ini terdeteksi otomatis. Status (draft/disetujui) diatur di src/content/variants.yaml.
import { collectVariants } from "@/lib/variants";

export const postVariants = collectVariants(import.meta.glob<{ default: any }>("./Post*_*.astro", { eager: true }));
