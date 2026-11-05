// Semua file Contact<Gaya>_<NNN>.astro di folder ini terdeteksi otomatis. Status (draft/disetujui) diatur di src/content/variants.yaml.
import { collectVariants } from "@/lib/variants";

export const contactVariants = collectVariants(import.meta.glob<{ default: any }>("./Contact*_*.astro", { eager: true }));
