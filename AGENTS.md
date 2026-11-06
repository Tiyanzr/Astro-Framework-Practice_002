# AGENTS.md — panduan & serah-terima proyek

> Baca file ini dulu di setiap sesi baru. Isinya: tujuan proyek, cara bekerja dengan pemilik proyek, peta arsitektur,
> resep pekerjaan umum, status terakhir, rencana ke depan, dan jebakan yang sudah diketahui.
> Detail desain & teknis lengkap ada di [DESIGN.md](DESIGN.md) (dokumen hidup + riwayat keputusan di bagian paling bawah).
> Terakhir diperbarui: **2026-11-06**.

---

## 1. Tentang proyek

- **Tujuan:** membangun ulang **parametris.com** (PT Parametrik Solusi Integrasi: software engineering/PTC reseller, IoT, layanan engineering) dengan **Astro 7** + **Tailwind v4**.
- **Fase sekarang:** **arsitektur & fungsionalitas**, bukan tampilan. Belum ada desain resmi dari atasan. Situs berisi teks placeholder (*Title*, *Description*, lorem ipsum) untuk membuktikan modul-modulnya bisa dipakai.
- **Syarat utama dari atasan:** semua **data-driven**. Tidak ada teks hardcode di komponen; **menambah konten = menambah file** (YAML/Markdown).
- **Desain dikerjakan langsung di kode** (bukan Figma), per section, dengan sistem **variasi bernomor** (`HeroImage_001`, `HeroImage_002`, …).
- **Peta situs parametris.com** (referensi struktur): `/` · `/software` (kategori CAD, CAM, CAE, PLM, ALM, AR → produk PTC, link ke ptc.com) · `/iot` (+ manufacturing, healthcare, energy, smart-city) · `/services` (+ training, consulting, engineering) · `/about` · `/contact` · dua bahasa (`?lang=id|en`). Kontak asli: support@parametris.com, +62 21 3044 8230, Alam Sutera · Tangerang; Instagram, LinkedIn, YouTube.
- **Referensi gaya** yang pernah dipakai: fastems.com (hero berkartu, pembungkus section `tone/width/pulldown`, footer), dhl.com (latar artikel putih, sosial media di kanan footer), beckhoff.com, promot-automation.com.

## 2. Cara bekerja dengan pemilik proyek (WAJIB)

- **Bahasa:** balas dalam **Bahasa Indonesia**. Kode & komentar kode juga berbahasa Indonesia (mengikuti yang sudah ada).
- **Commit / push hanya kalau diminta.** Jangan pernah `--force` tanpa izin eksplisit untuk aksi itu.
- **Jangan pernah menulis nama AI/asisten di repo atau GitHub:** tanpa `Co-Authored-By`, tanpa link session, tanpa "Generated with …", penulis commit = konfigurasi git pemilik (Tiyan Razzaq). Ini repo kerja publik yang dilihat atasan. (Riwayat lama pernah ditulis ulang + force-push untuk membuang nama AI dari daftar Contributors.)
- **Kalau diminta "jangan buat kode dulu" / "aku hanya bertanya"** → jawab/diskusikan saja, jangan mengubah file.
- **Setiap keputusan desain/arsitektur dicatat** di DESIGN.md (bagian terkait + satu baris di *Riwayat keputusan*).
- **Istilah:** variasi yang belum disetujui disebut **draft** (bukan "kandidat").
- **Teks placeholder:** judul = `Title`, deskripsi = `Description`, paragraf = lorem ipsum, label menu/tombol = **nama halaman tujuan** (Software, IoT, Layanan, Artikel, Tentang Kami, Kontak), artikel dummy = `Article Title N`.
- **Halaman prototype harus "murni":** tanpa navbar/footer situs; hanya bar combo box (atas) dan tombol kembali (bawah), keduanya putih.
- Sebelum melapor "selesai", verifikasi: buka halamannya (dev) dan jalankan `npm run build`. Laporkan jujur kalau belum dicek secara visual.

## 3. Peta arsitektur (ringkas)

```
src/
├── content/                     ← SEMUA isi & kalimat (data-driven)
│   ├── site.yaml                ← nama situs, cta navbar, contact, navbar.variant, footer, post (variant + label)
│   ├── variants.yaml            ← STATUS variasi: daftar yang disetujui per section (lainnya = draft)
│   ├── pages/**/*.yaml          ← 1 file = 1 halaman, nama file = URL; isi = daftar `sections`
│   ├── menu/*.yaml              ← 1 item menu = 1 file (title, description, href, order, children[])
│   ├── products/*.yaml          ← 1 kategori produk = 1 file (title, summary, order, items[])
│   └── posts/<slug>/index.md    ← 1 artikel = 1 folder (index.md + gambar), frontmatter: title, description, pubDate, author, category, tags, cover, draft, variant
├── content.config.ts            ← skema semua koleksi (zod)
├── lib/content.ts               ← pembaca data: getSite, getPage, getSection, getMainLinks, getChildPages, getProductCategories, getPosts, getRelatedPosts, pageHref
├── lib/variants.ts              ← collectVariants, isBasic, variantStatus, resolveVariant, pickVariant (status + pengganti Basic saat build)
├── lib/section.ts               ← nilai tone/width untuk ui/Section
├── layouts/BaseLayout.astro     ← <head>, Navbar, <main>, Footer (prop `bare` = tanpa navbar/footer)
├── pages/[...slug].astro        ← SEMUA halaman dari content/pages (home.yaml → /)
├── pages/posts/[id].astro       ← halaman artikel
├── components/
│   ├── layout/navbar/, layout/footer/       ← section global (variasi via site.yaml)
│   ├── sections/<section>/                  ← hero, intro, cards, catalog, posts, text, cta, contact, post
│   │   ├── <Nama>.astro                     ← pintu masuk: ambil data, pilih variasi
│   │   ├── variants.ts                      ← deteksi otomatis file <Nama>*_*.astro
│   │   ├── types.ts                         ← props bersama semua variasi
│   │   └── <Nama><Gaya>_<NNN>.astro         ← 1 file = 1 variasi (Basic_001 = teks saja)
│   ├── sections/Sections.astro              ← peta `type` → pintu masuk section (daftarkan section baru di sini)
│   ├── sections/WrappedVariant.astro        ← bersama: pilih variasi + bungkus ui/Section
│   ├── sections/BasicHeading.astro, types.ts
│   └── ui/                                  ← Button, Logo, Section (pembungkus tone/width/pulldown), SocialIcon, YouTube, MediaPlaceholder
├── styles/global.css            ← SEMUA token desain (warna, font, skala huruf, jarak, tone section, .prose)
└── prototype/                   ← HANYA saat `astro dev`, tidak pernah ikut build
    ├── pages/                   ← /prototype/... (index, variants, navbar, hero, intro, footer, post, colors, fonts, coba/, tutorial/)
    ├── content/pages, posts     ← halaman & artikel uji (dev saja), mis. /contoh-halaman, contoh-semua-elemen, artikel kelistrikan asli
    ├── sections/                ← komponen coba-coba bebas
    ├── PrototypeLayout.astro, controls.ts, VariantLabel.astro, route.astro
    └── integration.mjs          ← mendaftarkan rute /prototype/[...path] hanya saat dev (prerender: false)
scripts/import-notion.mjs        ← impor export Notion → src/content/posts/<slug>/ (draft: true)
netlify.toml                     ← build Netlify (npm run build → dist, Node 22)
```

**Konsep kunci:**

1. **Halaman = YAML.** `src/content/pages/<url>.yaml` berisi `sections: [{ type, variant, ...isi }]`, dirender berurutan. Section boleh dipakai berkali-kali, urutan bebas.
2. **Section = fungsi, variasi = tampilan.** Semua variasi satu section menerima props yang sama (`types.ts`), jadi ganti `variant:` tidak merusak isi.
3. **Status variasi** (`src/content/variants.yaml`): `basic` (selalu boleh) · `approved` (tercantum) · `draft` (lainnya). Saat **dev** semua bisa dipakai; saat **build** draft otomatis diganti `<Nama>Basic_001` + peringatan di log. Variasi Basic mengabaikan `tone/width/pulldown`.
4. **Gaya:** class Tailwind langsung di file variasi, nilai dari token (`text-h2`, `bg-primary`, `container-page`, `section-y`). `<style>` di file variasi hanya untuk hal khusus. `global.css` hanya untuk token baru yang berlaku situs-wide.
5. **Prototype** (`/prototype`, dev saja): preview per section dengan combo box (`?v=`, `?tone=`, `?p=`, `?font=`, opsi "Semua"), dan **`/prototype/variants`** = tabel semua variasi + status + dipakai di mana.

## 4. Resep pekerjaan umum

| Mau… | Caranya |
|---|---|
| Menambah halaman | Buat `src/content/pages/<nama>.yaml` (atau `<induk>/<nama>.yaml` untuk halaman anak). Isi `title`, `summary`, `order` (untuk kartu di induk), lalu `sections`. Tidak perlu file `.astro`. |
| Menambah kartu otomatis | Halaman induk pakai section `type: cards` + `from: <induk>`; setiap file di `pages/<induk>/` otomatis jadi kartu. |
| Menambah produk / kategori | Edit `items` di `src/content/products/<kategori>.yaml` / tambah file kategori baru. |
| Menambah item menu / sub-menu | Tambah file di `src/content/menu/` / isi `children` di file item induk. |
| Menambah artikel | `npm run import:notion -- "<folder export Notion>" [--slug x] [--force]` → cek di dev → hapus baris `draft: true`. |
| Membuat variasi baru | Salin variasi terdekat di folder section → beri nama `<Nama><Gaya>_<NNN>.astro` (gaya baru mulai `_001`). Otomatis draft, muncul di `/prototype/<section>` dan `/prototype/variants`. |
| Menyetujui variasi | Tambahkan namanya di `src/content/variants.yaml` › `approved` › `<section>`. |
| Membuat **jenis** section baru | 1) folder `src/components/sections/<nama>/` berisi `<Nama>.astro` (pakai `WrappedVariant`), `variants.ts`, `types.ts`, `<Nama>Basic_001.astro` — salin pola `cta/` (paling sederhana) atau `cards/` (yang mengambil data); 2) skema `type: z.literal("<nama>")` di `content.config.ts` › pages › sections (+ masukkan ke `discriminatedUnion`); 3) daftarkan di `Sections.astro`; 4) tambahkan `<nama>: []` di `variants.yaml`; 5) opsional halaman `src/prototype/pages/<nama>.astro`; 6) catat di DESIGN.md. |
| Mencoba ide bebas | `src/prototype/pages/coba/<nama>.astro` (+ komponen di `src/prototype/sections/`). |
| Menambah token warna/jarak/font | `src/styles/global.css` + catat di DESIGN.md. |

## 5. Status terakhir (2026-11-06)

**Branch & deploy**

| Branch | Fungsi |
|---|---|
| `prototype-01` | **branch kerja sehari-hari** |
| `demo` | dideploy otomatis ke Netlify: https://parametris-astro-practice-001.netlify.app (`git push origin prototype-01:demo`) |
| `master` | versi resmi; diperbarui lewat Pull Request (sudah ada PR #1–#3) |
| `referensi` | kode asli Jasa Listrik Bandung (read-only) |

Remote: `origin` = github.com/Tiyanzr/Astro-Framework-Practice_002, `upstream` = github.com/hariachmad/jasa-listrik-bandung. (README masih menyebut `master` sebagai branch harian; kenyataannya `prototype-01`.)

**Sudah jadi**

- Arsitektur halaman dari YAML (`[...slug].astro` + `Sections.astro`), 11 halaman mockup + 4 artikel (build = 15 halaman): `/`, `/software`, `/iot` (+ `/iot/manufaktur`, `/iot/energi`), `/layanan` (+ `/layanan/pelatihan`, `/layanan/konsultasi`), `/tentang`, `/kontak`, `/artikel`, 4 artikel dummy `/posts/article-title-1..4/`.
- 8 jenis section: `hero`, `intro`, `cards`, `catalog`, `posts`, `text`, `cta`, `contact` + navbar, footer, halaman artikel (`post`). Semua punya versi Basic.
- Variasi berdesain: `NavbarPanel_001`, `HeroImage_001`, `HeroImage_002`, `IntroMedia_001`, `IntroMedia_002`, `FooterSimple_001`, `PostArticle_001`, `PostArticle_002`.
- **Disetujui** (variants.yaml): `NavbarPanel_001`, `HeroImage_002`, `IntroMedia_002`, `FooterSimple_001`, `PostArticle_001`. Sisanya draft. ⚠️ Perubahan persetujuan ini **sudah di-stage tapi belum di-commit/push** per 2026-11-06, jadi Netlify masih menampilkan versi teks (Basic) sampai di-commit & di-push ke `demo`.
- Menu bertingkat (`children`): panel `NavbarPanel_001` sengaja **hanya menampilkan judul utama** (tanpa sub-menu); `NavbarBasic_001` menampilkan sub-menu.
- Section `posts` (Basic) hanya menampilkan **judul + tanggal** (tanpa deskripsi, atas permintaan).
- Token desain (palet 5 warna + putih + hitam, tone section default/alt/dark/green/olive/gradient, font h1 Roboto Condensed + Archivo, jarak universal `--page-max/--page-gutter/--section-y`), prototype lengkap, import Notion, draft artikel.

**Belum / sengaja ditunda**

- Desain resmi & konten asli (menunggu atasan).
- Formulir kontak belum terkirim (tampilan saja).
- `site` di `astro.config.mjs` masih `https://jasalistrikbandung.com` (seharusnya parametris.com) → sitemap/canonical salah domain.
- Daftar artikel tanpa pagination & filter kategori.
- Belum dua bahasa, belum halaman per produk, belum redirect URL lama, SEO lanjutan (Open Graph) belum.
- Font: kandidat (Schibsted Grotesk, Hanken Grotesk, Instrument Sans) masih terpasang untuk `/prototype/fonts`; setelah final, `npm uninstall` + hapus `@import` di global.css.

## 6. Rencana ke depan (urutan saran)

1. **Commit + push** persetujuan variasi (`variants.yaml`) → `prototype-01` → `demo`; cek Netlify.
2. **Perbaiki `site`** di `astro.config.mjs` → `https://www.parametris.com` (samakan dengan `site.yaml › url`).
3. **Formulir kontak berfungsi:** Netlify Forms (`data-netlify="true"`, `name` form, honeypot) di variasi contact; label tetap dari YAML.
4. **Daftar artikel:** pagination (`/artikel/2`, dst.) + filter/halaman kategori; section `posts` tetap dipakai beranda.
5. **Script `npm run new:section <nama>`** untuk membuat kerangka jenis section baru (folder + 4 file + baris di Sections.astro/variants.yaml/skema), supaya tidak ada langkah terlewat.
6. **SEO dasar:** Open Graph/Twitter meta, canonical, `description` per halaman; redirect URL lama parametris.com (`/manufacturing` → `/iot/manufaktur`, dst.) lewat `public/_redirects` Netlify.
7. **Dua bahasa (id/en):** putuskan dulu dengan pemilik. Opsi: i18n Astro (`/en/...`) + konten per bahasa (`pages/id`, `pages/en`). Paling mahal kalau ditunda lama.
8. **Halaman per produk** (opsional): koleksi produk per file + rute `/software/<produk>` kalau dibutuhkan; sekarang produk = item di kategori dengan link keluar.
9. **Kerapian prototype:** gabungkan `src/prototype/sections/` + `pages/coba/` menjadi satu konsep "coba" (pernah dikeluhkan membingungkan).
10. **Kualitas:** pasang `@astrojs/check` + `typescript` (`astro check`), pertimbangkan pemuatan variasi yang tidak meng-compile draft saat build.
11. Setelah desain resmi ada: buat variasi desain per section, setujui di `variants.yaml`, ganti placeholder dengan konten asli, pilih font final.

## 7. Jebakan yang sudah diketahui

- **Cache konten basi saat dev:** perubahan YAML (mis. `tone`, field baru) kadang tidak muncul. Solusi: `astro dev stop` → hapus `node_modules/.astro/data-store.json` dan `.astro/data-store.json` → `astro dev --background`. Kemungkinan dipicu perbedaan huruf drive `d:` vs `D:` di Windows.
- **Memori Windows penuh** saat `astro build` bersamaan dengan dev server → hentikan dev server dulu sebelum build.
- **Shell (Git Bash) di Windows:** heredoc panjang berisi kutip/backslash sering gagal ("unexpected EOF"). Lebih aman menulis script ke file sementara lalu menjalankannya, atau memakai tool tulis-file. Hapus file dengan path literal (bukan variabel/glob).
- **YAML:** kunci tanpa nilai (`title:`) = `null` → gagal skema `optional()`. Hapus barisnya atau jadikan komentar.
- **Rute `/prototype` dirender per permintaan** (`prerender: false`) supaya `?query` terbaca; `getStaticPaths` tidak dipakai di sana.
- **Navbar berdesain `fixed`** menaruh spacer `h-16` sendiri; `BaseLayout` tidak memberi `pt-16`. Di `/prototype/navbar`, navbar ditaruh di bingkai ber-`transform` supaya `fixed` tidak menimpa bar prototype.
- **Variasi draft tetap di-compile saat build** (hanya tidak dipakai): file draft yang error membuat build gagal.
- **Konten uji prototype** (`src/prototype/content/`) ikut muncul di daftar artikel saat dev, tidak saat build.
- **Tailwind v4:** `@theme inline` tidak bisa ditimpa per elemen → font memakai variabel `--display-family`/`--heading-family` di `:root`. Override `.prose` sengaja di luar `@layer`.
- Komentar CSS jangan memuat urutan `*/` (pernah merusak aturan).

---

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

Perintah lain: `npm run build` (hasil di `dist/`), `npm run preview`, `npm run import:notion -- "<folder>"`.
Halaman penting saat dev: `http://localhost:4321/` (situs), `/prototype` (daftar alat), `/prototype/variants` (status semua variasi).

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
