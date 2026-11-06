// Props yang sama untuk semua variasi daftar artikel. Posts.astro yang mengisi `posts`.
import type { ImageMetadata } from "astro";
import type { Link, SectionHeading } from "../types";

export interface PostItem {
  title: string;
  description: string;
  href: string;
  pubDate: Date;
  category?: string;
  cover?: ImageMetadata;
  coverAlt?: string;
}

export interface PostsProps extends SectionHeading {
  posts: PostItem[];
  /** Link "lihat semua" opsional di bawah daftar. */
  more?: Link;
}
