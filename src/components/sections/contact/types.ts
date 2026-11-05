// Props yang sama untuk semua variasi kontak. Contact.astro yang mengisi `contact` dari site.yaml.
import type { SectionHeading } from "../types";

export interface ContactInfo {
  email?: string;
  phone?: string;
  address: string[];
  hours?: string;
}

export interface ContactField {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "textarea";
  required: boolean;
}

export interface ContactProps extends SectionHeading {
  contact: ContactInfo;
  /** Formulir opsional. Belum terkirim ke mana pun (mockup). */
  form?: { fields: ContactField[]; submit: string };
}
