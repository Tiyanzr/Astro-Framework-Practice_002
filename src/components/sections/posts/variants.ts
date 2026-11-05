// Semua file Posts<Gaya>_<NNN>.astro di folder ini terdeteksi otomatis. Status (draft/disetujui) diatur di src/content/variants.yaml.
import { collectVariants } from "@/lib/variants";

export const postsVariants = collectVariants(import.meta.glob<{ default: any }>("./Posts*_*.astro", { eager: true }));
