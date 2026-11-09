// Props yang sama untuk semua variasi manfaat / bidang penerapan (`type: benefits`).
import type { SectionHeading } from "../types";

export interface BenefitItem {
  /** Nama ikon di src/assets/icons/ tanpa .svg (mis. gauge). Variasi tanpa ikon mengabaikannya. */
  icon?: string;
  title: string;
  description?: string;
  /** Rincian istilah–penjelasan, mis. "Off-site — Dilaksanakan di fasilitas Parametrik." (BenefitsColumns_001). */
  entries: { term: string; detail: string }[];
}

export interface BenefitsProps extends SectionHeading {
  items: BenefitItem[];
  /** Paragraf penutup di bawah daftar. */
  note?: string;
}
