// Pengaturan pembungkus section (ui/Section.astro). Daftar nilai di sini dipakai bersama oleh skema konten dan komponen.

/** Latar section: default = putih, alt = abu selang-seling, dark = theme-dark, gradient = gradasi lembut dari palet. */
export const sectionTones = ["default", "alt", "dark", "gradient"] as const;

/** Lebar latar: full = selebar layar, contained = panel dibatasi max-w-7xl (seperti kartu). */
export const sectionWidths = ["full", "contained"] as const;

export interface SectionSettings {
  tone?: (typeof sectionTones)[number];
  width?: (typeof sectionWidths)[number];
  /** Tarik section ke atas sehingga menumpuk di bagian bawah section sebelumnya (mulai md). */
  pulldown?: boolean;
}
