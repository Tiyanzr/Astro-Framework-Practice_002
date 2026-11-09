// Semua file Cards<Gaya>_<NNN>.astro di folder ini terdeteksi otomatis. Variasi yang tampil = yang ditulis di YAML.
import { collectVariants } from "@/lib/variants";

export const cardsVariants = collectVariants(import.meta.glob<{ default: any }>("./Cards*_*.astro", { eager: true }));
