// Props yang sama untuk semua variasi section gambar (`type: media`).
import type { SectionImage } from "../types";

export interface MediaProps {
  image: SectionImage;
  eyebrow?: string;
  title?: string;
  /** Lanjutan judul di baris baru (MediaBanner_001). */
  accent?: string;
}
