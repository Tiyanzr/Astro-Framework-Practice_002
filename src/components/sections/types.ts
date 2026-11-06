// Tipe bersama section yang dibungkus ui/Section. Setiap section punya types.ts sendiri yang memperluas ini.

/** Judul + pengantar opsional di atas isi section (eyebrow, title, description di YAML). */
export interface SectionHeading {
  eyebrow?: string;
  title?: string;
  description?: string;
}

export interface Link {
  label: string;
  href: string;
}
