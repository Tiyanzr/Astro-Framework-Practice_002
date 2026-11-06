// Tipe bersama section yang dibungkus ui/Section. Setiap section punya types.ts sendiri yang memperluas ini.

/** Judul + pengantar opsional di atas isi section (eyebrow, title, description di YAML). */
export interface SectionHeading {
  eyebrow?: string;
  title?: string;
  /** Lanjutan judul di baris baru dengan warna aksen (gaya parametris.com). */
  accent?: string;
  description?: string;
}

/** Gambar dari YAML (path relatif, dioptimasi astro:assets). */
export interface SectionImage {
  src: import("astro").ImageMetadata;
  alt: string;
}

/** Nomor urut dua digit untuk kartu/baris bernomor: 0 → "01". */
export const numbered = (index: number) => String(index + 1).padStart(2, "0");

export interface Link {
  label: string;
  href: string;
}
