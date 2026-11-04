// Props yang sama untuk semua variasi artikel. Post.astro yang menyiapkan semuanya; variasi hanya menyusun blok di ./blocks/.
// Variasi boleh mengabaikan prop yang tidak dipakainya (mis. tanpa daftar isi atau tanpa artikel terkait).
import type { MarkdownHeading } from "astro";
import type { CollectionEntry } from "astro:content";

export type PostData = CollectionEntry<"posts">["data"];
export type PostLabels = { author: string; published: string; updated: string; tags: string; toc: string; related: string };

export interface PostProps {
  /** Frontmatter artikel (title, description, pubDate, author, category, tags, cover, ...). */
  data: PostData;
  /** Isi artikel dari Markdown. Tampilkan lewat blok PostBody. */
  Content: any;
  /** Semua judul di isi artikel (## dan ###), untuk daftar isi. */
  headings: MarkdownHeading[];
  /** Artikel lain yang mirip (kategori/tag sama). */
  related: CollectionEntry<"posts">[];
  /** Teks kecil dari site.yaml › post.labels. */
  labels: PostLabels;
}
