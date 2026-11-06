// Props yang sama untuk semua variasi daftar artikel. Posts.astro yang mengisi `posts`.
import type { ImageMetadata } from "astro";
import type { Link, SectionHeading } from "../types";

export interface PostItem {
  title: string;
  /** Kosong untuk artikel manual (`items` di YAML). */
  description?: string;
  href: string;
  /** Kosong untuk artikel manual (`items` di YAML). */
  pubDate?: Date;
  category?: string;
  cover?: ImageMetadata;
  coverAlt?: string;
}

export interface PostsProps extends SectionHeading {
  posts: PostItem[];
  /** Link "lihat semua" opsional di bawah daftar. */
  more?: Link;
  /** Teks link di setiap artikel, mis. "Baca artikel" (PostsGrid_001). */
  linkLabel?: string;
}
