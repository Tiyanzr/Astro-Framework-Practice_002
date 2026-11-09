// Props yang sama untuk semua variasi footer (isinya dari src/content/site.yaml › footer, plus item menu utama).
import type { getSite, NavLink } from "@/lib/content";

type FooterContent = Awaited<ReturnType<typeof getSite>>["footer"];

export type FooterProps = Omit<FooterContent, "variant" | "explore"> & {
  siteName: string;
  /** Item menu utama (src/content/menu/), dipakai variasi yang punya kolom menu (FooterColumns_001). */
  links: NavLink[];
};
