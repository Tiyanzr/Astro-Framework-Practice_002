// Format tanggal bersama untuk blok artikel, mis. "20 Oktober 2026".
export const formatDate = (date: Date) => date.toLocaleDateString("id-ID", { dateStyle: "long" });

/** Tanggal diperbarui hanya ditampilkan kalau berbeda dari tanggal terbit. */
export const updatedDate = (pubDate: Date, updated?: Date) =>
  updated && updated.getTime() !== pubDate.getTime() ? updated : undefined;
