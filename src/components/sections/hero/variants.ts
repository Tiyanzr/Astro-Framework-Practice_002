// Semua file Hero<Gaya>_<NNN>.astro di folder ini terdeteksi otomatis. Status (draft/disetujui) diatur di src/content/variants.yaml.
import { collectVariants } from "@/lib/variants";

export const heroVariants = collectVariants(import.meta.glob<{ default: any }>("./Hero*_*.astro", { eager: true }));
