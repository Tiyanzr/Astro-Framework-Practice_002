// Semua file Navbar<Gaya>_<NNN>.astro di folder ini terdeteksi otomatis. Status (draft/disetujui) diatur di src/content/variants.yaml.
import { collectVariants } from "@/lib/variants";

export const navbarVariants = collectVariants(import.meta.glob<{ default: any }>("./Navbar*_*.astro", { eager: true }));
