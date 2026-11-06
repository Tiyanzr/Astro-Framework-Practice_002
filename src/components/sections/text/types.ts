// Props yang sama untuk semua variasi teks bebas. Text.astro yang memecah `body` menjadi paragraf.
import type { SectionHeading } from "../types";

export interface TextProps extends SectionHeading {
  paragraphs: string[];
}
