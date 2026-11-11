// Kit awal: desain pertama sebelum referensi parametris.com (palet hijau + midnight + lime di global.css, referensi
// fastems.com & dhl.com). Tidak dipakai situs sekarang; disimpan untuk perbandingan dan halaman uji prototype.
import type { KitConfig } from "@/lib/kits";

export default {
  name: "Awal",
  author: "Tim Parametrik",
  description: "Desain awal: foto penuh, kartu menu, intro dengan media, panel menu geser.",
  defaults: {
    IntroMedia_001: { width: "contained" },
    IntroMedia_002: { width: "full" },
  },
} satisfies KitConfig;
