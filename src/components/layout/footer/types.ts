// Props yang sama untuk semua variasi footer (isinya dari src/content/site.yaml › footer).
import type { getSite } from "@/lib/content";

type FooterContent = Awaited<ReturnType<typeof getSite>>["footer"];

export type FooterProps = Omit<FooterContent, "variant"> & {
  siteName: string;
};
