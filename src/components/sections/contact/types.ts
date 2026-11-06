// Props yang sama untuk semua variasi kontak. Contact.astro yang mengisi `contact` dari site.yaml
// (ditimpa `contact:` di YAML halaman kalau diisi).
import type { Link, SectionHeading } from "../types";

export interface ContactInfo {
  email?: string;
  phone?: string;
  address: string[];
  hours?: string;
  /** Email tambahan berlabel, mis. { label: "Dukungan teknis", email: "support@..." }. */
  emails: { label: string; email: string }[];
  /** Nomor tambahan berlabel, mis. { label: "WhatsApp", number: "+62 ..." }. */
  phones: { label: string; number: string }[];
}

export interface ContactField {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "textarea";
  required: boolean;
}

export interface ContactProps extends SectionHeading {
  contact: ContactInfo;
  /** Tombol aksi, mis. WhatsApp & telepon (ContactDirect_001). */
  actions: Link[];
  /** Label kecil di atas alamat, mis. "Alamat" (ContactDirect_001). */
  addressLabel?: string;
  /** Formulir opsional. Belum terkirim ke mana pun (mockup). */
  form?: { fields: ContactField[]; submit: string };
}

/** Nomor telepon untuk link tel:, mis. "+62 21 3044 8230" → "+622130448230". */
export const telHref = (number: string) => `tel:${number.replace(/[^+\d]/g, "")}`;
