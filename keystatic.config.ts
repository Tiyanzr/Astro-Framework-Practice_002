// Keystatic: editor artikel di /keystatic (UJI COBA, hanya saat `astro dev`, lihat astro.config.mjs).
// Mode `local`: Keystatic menulis langsung ke file di laptop, tanpa login. Nanti bisa diganti mode `github` (online, login GitHub).
//
// Keystatic hanya EDITOR: hasilnya file biasa yang sama persis dengan pola artikel kita,
//   src/content/posts/<slug>/index.md  (frontmatter + isi Markdown)
//   src/content/posts/<slug>/<gambar>  (cover & gambar isi, di folder yang sama)
// Skema resmi tetap src/content.config.ts › posts. Field di bawah HARUS mengikuti skema itu (nama & tipe).
import { collection, config, fields } from "@keystatic/core";

/** Nama file gambar yang aman untuk URL: huruf kecil, spasi/simbol jadi "-", mis. "Diagram Proses.PNG" → "diagram-proses.png". */
const safeFilename = (name: string) => {
  const dot = name.lastIndexOf(".");
  const base = dot > 0 ? name.slice(0, dot) : name;
  const ext = dot > 0 ? name.slice(dot + 1).toLowerCase() : "png";
  const slug = base.normalize("NFKD").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "gambar";
  return `${slug}.${ext}`;
};

export default config({
  storage: { kind: "local" },
  ui: {
    brand: { name: "Parametrik · Artikel" },
  },
  collections: {
    posts: {
      ...collection({
        label: "Artikel",
        // Nama folder = URL artikel (/posts/<slug>/), dibuat otomatis dari judul.
        slugField: "title",
        path: "src/content/posts/*/",
        entryLayout: "content",
        format: { contentField: "content" },
        columns: ["title", "pubDate", "draft"],
        schema: {
          title: fields.slug({
            name: { label: "Judul", validation: { isRequired: true } },
            slug: { label: "URL artikel", description: "Dibuat otomatis dari judul. Jangan diubah setelah artikel terbit." },
          }),
          description: fields.text({
            label: "Deskripsi",
            description: "1–2 kalimat. Dipakai Google (meta description), share media sosial, dan kartu artikel.",
            multiline: true,
            validation: { isRequired: true },
          }),
          pubDate: fields.date({ label: "Tanggal terbit", defaultValue: { kind: "today" }, validation: { isRequired: true } }),
          updatedDate: fields.date({ label: "Tanggal diperbarui", description: "Opsional." }),
          author: fields.text({ label: "Penulis", defaultValue: "Tim Parametrik", validation: { isRequired: true } }),
          category: fields.text({ label: "Kategori", description: "Opsional. Dipakai untuk artikel terkait." }),
          tags: fields.array(fields.text({ label: "Tag" }), {
            label: "Tag",
            description: "Opsional. Dipakai untuk artikel terkait.",
            itemLabel: (props) => props.value,
          }),
          // Gambar disimpan di folder artikel. Keystatic menulis nilainya sebagai <publicPath><slug>/<file>,
          // jadi publicPath "../" menghasilkan ../<slug>/cover.png = file di folder artikel itu sendiri (relatif dari index.md).
          cover: fields.image({ label: "Cover", publicPath: "../" }),
          coverAlt: fields.text({ label: "Keterangan cover (alt)", description: "Deskripsi singkat gambar cover untuk pembaca layar & SEO." }),
          draft: fields.checkbox({
            label: "Draft",
            description: "Dicentang = belum terbit (tampil saat dev saja, tidak ikut build). Hapus centang untuk menerbitkan.",
            defaultValue: true,
          }),
          // Editor MDX yang disimpan sebagai .md: menulis Markdown biasa (tabel GFM), bukan sintaks Markdoc {% table %}.
          content: fields.mdx({
            label: "Isi artikel",
            extension: "md",
            options: {
              heading: [2, 3, 4],
              // Gambar isi: tanpa `directory`, Keystatic menyimpan ke subfolder <slug>/content/ tetapi menulis rujukan
              // ../<slug>/<file> (tidak cocok). Dengan directory = folder koleksi, file disimpan di <slug>/<file>,
              // yaitu folder artikel itu sendiri, dan rujukannya cocok.
              image: { directory: "src/content/posts", publicPath: "../", transformFilename: safeFilename },
            },
          }),
        },
      }),
    },
  },
});
