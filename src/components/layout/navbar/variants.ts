// Semua file Navbar<Gaya>_<NNN>.astro di folder ini terdeteksi otomatis. Variasi yang tampil = yang ditulis di YAML.
import { collectVariants } from "@/lib/variants";

export const navbarVariants = collectVariants(import.meta.glob<{ default: any }>("./Navbar*_*.astro", { eager: true }));
