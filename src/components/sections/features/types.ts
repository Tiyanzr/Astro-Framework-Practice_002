// Props yang sama untuk semua variasi daftar kapabilitas/fitur (`type: features`).
import type { SectionHeading } from "../types";

export interface FeatureItem {
  title: string;
  description?: string;
}

export interface FeaturesProps extends SectionHeading {
  items: FeatureItem[];
}
