// Semua file Cards<Gaya>_<NNN>.astro di folder ini terdeteksi otomatis. Status (draft/disetujui) diatur di src/content/variants.yaml.
import { collectVariants } from "@/lib/variants";

export const cardsVariants = collectVariants(import.meta.glob<{ default: any }>("./Cards*_*.astro", { eager: true }));
