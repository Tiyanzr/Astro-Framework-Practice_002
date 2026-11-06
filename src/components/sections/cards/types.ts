// Props yang sama untuk semua variasi kartu. Cards.astro yang mengisi `items` (dari halaman anak atau daftar manual).
import type { SectionHeading } from "../types";

export interface CardItem {
  title: string;
  description?: string;
  href?: string;
}

export interface CardsProps extends SectionHeading {
  items: CardItem[];
}
