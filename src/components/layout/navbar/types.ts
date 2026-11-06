// Props yang sama untuk semua variasi navbar. Navbar.astro yang mengisinya dari src/content/site.yaml (nama, cta)
// dan src/content/menu/*.yaml (links).
import type { NavLink } from "@/lib/content";

export interface NavbarProps {
  siteName: string;
  /** Tombol aksi utama (site.yaml › cta). */
  cta: { label: string; href: string };
  /** Item menu utama, urut sesuai `order`. */
  links: NavLink[];
}
