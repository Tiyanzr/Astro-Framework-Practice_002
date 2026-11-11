// Kit base: versi polos (tanpa desain) semua section. Cadangan otomatis untuk section yang belum dibuat kit lain,
// dan titik awal membuat kit baru (salin folder ini). Jangan dihapus.
import type { KitConfig } from "@/lib/kits";

export default {
  name: "Base",
  description: "Versi polos tanpa desain. Hanya memastikan semua isi YAML tampil dan berfungsi.",
  defaults: {
    IntroBasic_001: { width: "full" },
  },
} satisfies KitConfig;
