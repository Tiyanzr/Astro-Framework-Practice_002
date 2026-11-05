// Props yang sama untuk semua variasi ajakan bertindak.
import type { Link, SectionHeading } from "../types";

export interface CtaProps extends SectionHeading {
  /** Tombol, jumlah bebas. Yang pertama = aksi utama. */
  actions: Link[];
}
