// Props yang sama untuk semua variasi hero, supaya isi di src/content/pages/*.yaml tetap jalan saat variasi diganti.
// Variasi boleh mengabaikan prop yang tidak dipakainya.
import type { ImageMetadata } from "astro";
import type { NavLink } from "@/lib/content";

export interface HeroAction {
  label: string;
  href: string;
}

export interface HeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  primaryAction?: HeroAction;
  secondaryAction?: HeroAction;
  image?: { src: ImageMetadata; alt: string };
  /** Halaman utama memakai ukuran judul terbesar; halaman lain cukup `display` dan hero lebih pendek. */
  size?: "xl" | "default";
  /** Daftar link (HeroImage_002). Kosongkan untuk memakai item menu utama dari src/content/menu/. */
  links?: NavLink[];
}
