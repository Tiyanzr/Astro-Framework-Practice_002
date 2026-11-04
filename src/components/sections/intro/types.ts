// Props yang sama untuk semua variasi intro, supaya isi di src/content/pages/*.yaml tetap jalan saat variasi diganti.
// Variasi boleh mengabaikan prop yang tidak dipakainya.
import type { ImageMetadata } from "astro";
import type { SectionSettings } from "@/lib/section";

/** Media di samping teks: video YouTube (facade ringan) atau gambar. */
export type IntroMedia = { type: "youtube"; id: string; title: string } | { type: "image"; src: ImageMetadata; alt: string };

export interface IntroContent {
  eyebrow?: string;
  title: string;
  /** Paragraf pengantar. Pisahkan paragraf dengan satu baris kosong. */
  description?: string;
  /** Satu kalimat penutup berukuran besar. */
  highlight?: string;
  media?: IntroMedia;
}

/** Isi + pengaturan pembungkus (tone, width, pulldown) yang ditangani Intro.astro lewat ui/Section. */
export type IntroProps = IntroContent & SectionSettings;
