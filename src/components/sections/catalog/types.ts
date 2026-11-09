// Props yang sama untuk semua variasi showcase produk. Catalog.astro yang mengisi `categories` dari koleksi products.
import type { Link, SectionHeading, SectionImage } from "../types";

export interface CatalogProduct {
  name: string;
  description?: string;
  href?: string;
}

export interface CatalogCategory {
  id: string;
  title: string;
  summary?: string;
  /** Gambar kategori (products/<kategori>.yaml › image), dipakai variasi bergambar. */
  image?: SectionImage;
  items: CatalogProduct[];
}

export interface CatalogProps extends SectionHeading {
  categories: CatalogCategory[];
  /** Link "lihat semua" opsional di bawah daftar. */
  more?: Link;
}
