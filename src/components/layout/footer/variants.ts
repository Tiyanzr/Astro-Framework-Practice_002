// Semua file Footer<Gaya>_<NNN>.astro di folder ini terdeteksi otomatis. Status (draft/disetujui) diatur di src/content/variants.yaml.
import { collectVariants } from "@/lib/variants";

export const footerVariants = collectVariants(import.meta.glob<{ default: any }>("./Footer*_*.astro", { eager: true }));
