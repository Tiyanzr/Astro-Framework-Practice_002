// Import satu postingan hasil export Notion (Markdown & CSV) ke src/content/posts/<slug>/.
//
// Pemakaian:
//   npm run import:notion -- "D:\Downloads\folder-export"
//   npm run import:notion -- "D:\Downloads\folder-export" --slug judul-pendek
//   npm run import:notion -- "D:\Downloads\folder-export" --force   (timpa folder yang sudah ada)
//
// Yang dikerjakan:
// - Metadata Notion (**Deskripsi:**, **Tanggal Publikasi:**, **Penulis:**, ...) → frontmatter.
// - Judul (# ...) → frontmatter `title`, slug dari judul.
// - Gambar diganti nama gambar-1.png, gambar-2.png, ... sesuai urutan muncul; alt diisi judul bagian terdekat.
//   Gambar pertama juga dipakai sebagai `cover` (untuk kartu & preview link).
// - Link yang terbungkus google.com/search?q=... dibuka kembali ke link aslinya.
// - Baris baru di dalam paragraf (Shift+Enter di Notion) dijadikan line break, seperti tampilan di Notion.
// - FAQ "**Tanya: ...?Jawab:**" yang menempel dipisah lagi.

import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const flag = (name) => {
  const i = args.indexOf(name);
  return i === -1 ? undefined : args.splice(i, 2)[1];
};
const force = args.includes("--force") && args.splice(args.indexOf("--force"), 1);
const slugArg = flag("--slug");
const src = args[0];

if (!src || !fs.existsSync(src)) {
  console.error('Pemakaian: npm run import:notion -- "<folder export Notion>" [--slug nama] [--force]');
  process.exit(1);
}

const mdFiles = fs.readdirSync(src).filter((f) => f.toLowerCase().endsWith(".md"));
if (mdFiles.length !== 1) {
  console.error(`Folder harus berisi tepat 1 file .md (ditemukan ${mdFiles.length}).`);
  process.exit(1);
}

const warnings = [];
let md = fs.readFileSync(path.join(src, mdFiles[0]), "utf8").replace(/\r\n/g, "\n");

// --- Judul -----------------------------------------------------------------
const titleMatch = md.match(/^# (.+)\n/m);
if (!titleMatch) {
  console.error("Judul (# ...) tidak ditemukan.");
  process.exit(1);
}
const title = titleMatch[1].trim();
md = md.replace(titleMatch[0], "");

// --- Metadata --------------------------------------------------------------
// Format Notion: **Kunci:**\n\nnilai\n\n — diambil dari bagian atas sampai paragraf biasa pertama.
const metaKeys = {
  deskripsi: "description",
  "tanggal publikasi": "pubDate",
  "tanggal pembaruan": "updatedDate",
  penulis: "author",
  kategori: "category",
  tag: "tags",
};
const meta = {};
const metaRe = /^\s*\*\*([^*:]+):\*\*\s*\n+([^\n]+)\n+/;
let m;
while ((m = md.match(metaRe)) && metaKeys[m[1].trim().toLowerCase()]) {
  meta[metaKeys[m[1].trim().toLowerCase()]] = m[2].replace(/\s*\|\s*$/, "").trim();
  md = md.slice(m[0].length);
}
for (const key of ["description", "pubDate", "author"]) {
  if (!meta[key]) warnings.push(`Metadata "${key}" tidak ditemukan — isi manual di frontmatter.`);
}

const months = ["januari", "februari", "maret", "april", "mei", "juni", "juli", "agustus", "september", "oktober", "november", "desember"];
const parseDate = (text) => {
  const d = text?.toLowerCase().match(/(\d{1,2})\s+([a-z]+)\s+(\d{4})/);
  const month = d && months.indexOf(d[2]);
  if (!d || month < 0) return text && (warnings.push(`Tanggal "${text}" tidak dikenali.`), undefined);
  return `${d[3]}-${String(month + 1).padStart(2, "0")}-${d[1].padStart(2, "0")}`;
};

// --- Link google.com/search?q= ---------------------------------------------
md = md.replace(/\]\(https:\/\/www\.google\.com\/search\?q=([^)\s]+)\)/g, (_, q) => {
  const url = decodeURIComponent(q);
  warnings.push(`Link terbungkus Google diperbaiki → ${url.slice(0, 60)}…`);
  return `](${url})`;
});

// --- FAQ yang menempel -----------------------------------------------------
md = md.replace(/\*\*(Tanya:[^*]*?\?)\s*Jawab:\*\*/g, "**$1**\n**Jawab:**");

// --- Gambar ----------------------------------------------------------------
const slugify = (s) =>
  s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
const slug = slugArg ? slugify(slugArg) : slugify(title);
const dest = path.join("src", "content", "posts", slug);

if (fs.existsSync(dest) && !force) {
  console.error(`Folder ${dest} sudah ada. Pakai --force untuk menimpa, atau --slug untuk nama lain.`);
  process.exit(1);
}
fs.rmSync(dest, { recursive: true, force: true });
fs.mkdirSync(dest, { recursive: true });

const images = [];
let lastHeading = title;
md = md
  .split("\n")
  .map((line) => {
    const h = line.match(/^#{2,6}\s+(.+)/);
    if (h) lastHeading = h[1].replace(/^\d+\.\s*/, "").trim();
    return line.replace(/!\[[^\]]*\]\(([^)]+)\)/g, (whole, ref) => {
      const file = decodeURIComponent(ref);
      if (/^https?:/.test(file)) return whole;
      if (!fs.existsSync(path.join(src, file))) {
        warnings.push(`Gambar "${file}" tidak ada di folder export.`);
        return whole;
      }
      const name = `gambar-${images.length + 1}${path.extname(file).toLowerCase()}`;
      fs.copyFileSync(path.join(src, file), path.join(dest, name));
      images.push({ name, alt: lastHeading });
      return `![${lastHeading}](./${name})`;
    });
  })
  .join("\n");

// --- Line break di dalam paragraf --------------------------------------------
// Notion menulis Shift+Enter sebagai satu baris baru; di Markdown itu jadi spasi. Tambahkan "\" agar tetap pindah baris.
// Callout Notion: baris lanjutan tanpa ">" dimasukkan lagi ke dalam kutipan.
const lines = md.split("\n");
for (let i = 1; i < lines.length; i++) {
  if (lines[i - 1].startsWith(">") && lines[i - 1].trim() !== ">" && lines[i].trim() && !lines[i].startsWith(">")) lines[i] = `> ${lines[i]}`;
}
const isBlock = (l) => /^\s*([#|]|[-*+]\s|\d+\.\s|!\[|```)/.test(l);
const isQuote = (l) => l.startsWith(">");
const hasText = (l) => l?.replace(/^>\s*/, "").trim();
md = lines
  .map((l, i) => {
    const next = lines[i + 1];
    const sameKind = isQuote(l) === isQuote(next ?? "");
    return hasText(l) && hasText(next) && sameKind && !isBlock(l) && !isBlock(next) && !l.endsWith("\\") ? `${l}\\` : l;
  })
  .join("\n")
  .replace(/^>\s*$/gm, "") // baris ">" kosong penutup callout Notion → baris kosong
  .replace(/\n{3,}/g, "\n\n")
  .trim();

// --- Tulis index.md ------------------------------------------------------------
const yaml = (v) => JSON.stringify(v);
const front = [
  "---",
  `title: ${yaml(title)}`,
  `description: ${yaml(meta.description ?? "")}`,
  `pubDate: ${parseDate(meta.pubDate) ?? ""}`,
  parseDate(meta.updatedDate) && `updatedDate: ${parseDate(meta.updatedDate)}`,
  `author: ${yaml(meta.author ?? "")}`,
  meta.category && `category: ${yaml(meta.category)}`,
  `tags: ${yaml((meta.tags ?? "").split(",").map((t) => t.trim()).filter(Boolean))}`,
  images[0] && `cover: ./${images[0].name}`,
  images[0] && `coverAlt: ${yaml(images[0].alt)}`,
  "# Belum tayang: hapus baris di bawah ini setelah dicek di `astro dev`.",
  "draft: true",
  "---",
]
  .filter(Boolean)
  .join("\n");

fs.writeFileSync(path.join(dest, "index.md"), `${front}\n\n${md}\n`);

console.log(`✓ ${title}`);
console.log(`  → ${dest}${path.sep}index.md (${images.length} gambar)`);
console.log(`  URL: /posts/${slug}/ (draft: hanya tampil di astro dev sampai baris draft dihapus)`);
for (const w of warnings) console.log(`  ! ${w}`);
