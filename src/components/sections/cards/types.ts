// Props yang sama untuk semua variasi kartu. Cards.astro yang mengisi `items` (dari halaman anak atau daftar manual).
import type { Link, SectionHeading, SectionImage } from "../types";

export interface CardItem {
  title: string;
  description?: string;
  href?: string;
  /** Gambar kartu: `image` item manual, atau `image` halaman anak (variasi bergambar). */
  image?: SectionImage;
}

export interface CardsProps extends SectionHeading {
  items: CardItem[];
  /** Teks link di setiap kartu, mis. "Jelajahi" (variasi bergambar). */
  linkLabel?: string;
  /** Link "lihat semua" di kanan atas judul (variasi bergaya referensi). */
  more?: Link;
}
