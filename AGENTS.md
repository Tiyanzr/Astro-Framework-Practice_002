# AGENTS.md — panduan & serah-terima proyek

> Baca file ini dulu di setiap sesi baru. Isinya: tujuan proyek, cara bekerja dengan pemilik proyek, peta arsitektur,
> resep pekerjaan umum, status terakhir, rencana ke depan, dan jebakan yang sudah diketahui.
> Detail desain & teknis lengkap (palet, tipografi, katalog semua variasi, skema, SEO): [DESIGN.md](DESIGN.md), dengan riwayat keputusan di bagian paling bawah.
> Template YAML siap tempel untuk setiap bagian halaman (mandatory & modul): [MODULES.md](MODULES.md).
> Terakhir diperbarui: **2026-11-09**.

---

## 1. Tentang proyek

- **Tujuan:** membangun ulang **parametris.com** (PT Parametrik Solusi Integrasi: reseller software PTC, solusi IoT, layanan engineering) dengan **Astro 7** + **Tailwind v4**.
- **Fase sekarang (2026-11-06):** **arsitektur stabil.** Situs sudah mengikuti parametris.com: isi asli (versi Indonesia), URL sama, palet referensi, semua modul memakai variasi bergaya parametris.com. Pekerjaan berikutnya umumnya perubahan kecil (isi, variasi, detail tampilan) di atas arsitektur yang ada.
- **Sumber acuan:** arsip export situs asli dari klien, `reference/Parametris_Complete_Source_v8/` (`app.js` = susunan halaman, `data.js` = teks ID/EN, `products.js` = katalog PTC, `style.css` = gaya). parametris.com sendiri dicek hanya kalau arsip kurang.
- **Syarat utama dari atasan:** semua **data-driven**. Tidak ada teks hardcode di komponen; **menambah konten = menambah file** (YAML/Markdown).
- **Desain dikerjakan langsung di kode** (bukan Figma), per section, dengan sistem **variasi bernomor** (`HeroText_001`, `HeroText_002`, …). Semua yang baru dicoba di **prototype** dulu, ditinjau pemilik, baru dipakai situs/Netlify setelah disetujui.
- **Peta situs** (sama dengan parametris.com): `/` · `/software` (kategori CAD, CAM, CAE, PLM, ALM, AR → produk PTC, link ke ptc.com) · `/iot` (+ `/manufacturing`, `/healthcare`, `/energy`, `/smart-city`) · `/services` (+ `/training`, `/consulting`, `/engineering`) · `/about` · `/contact`. parametris.com punya dua bahasa (`?lang=id|en`, default EN); situs ini baru versi Indonesia.
- **Kontak asli:** sales@parametris.com, support@parametris.com, +62 21 3044 8230, WhatsApp +62 821 1629 1814, Synergy Building Suite 1508, Alam Sutera · Tangerang; Instagram, LinkedIn, YouTube (semua di `site.yaml`).
- **Referensi gaya sebelumnya** (desain lama yang tidak dipakai, palet situs): fastems.com (hero berkartu, pembungkus section `tone/width/pulldown`), dhl.com (latar putih, sosial media di kanan footer), beckhoff.com, promot-automation.com.

## 2. Cara bekerja dengan pemilik proyek (WAJIB)

- **Bahasa:** balas dalam **Bahasa Indonesia**. Kode & komentar kode juga berbahasa Indonesia (mengikuti yang sudah ada).
- **Commit / push hanya kalau diminta.** Jangan pernah `--force` tanpa izin eksplisit untuk aksi itu.
- **Jangan pernah menulis nama AI/asisten di repo atau GitHub:** tanpa `Co-Authored-By`, tanpa link session, tanpa "Generated with …", penulis commit = konfigurasi git pemilik (Tiyan Razzaq). Ini repo kerja publik yang dilihat atasan. (Riwayat lama pernah ditulis ulang + force-push untuk membuang nama AI dari daftar Contributors.)
- **Kalau diminta "jangan buat kode dulu" / "aku hanya bertanya"** → jawab/diskusikan saja, jangan mengubah file.
- **Alur kerja:** buat variasi baru di folder section → pemilik meninjau di `/prototype/...` → kalau disetujui, tulis namanya di `variant:` YAML halaman → commit/push `prototype-01` → `demo` (Netlify). **Tidak ada status/daftar persetujuan**: yang ditulis di YAML = yang tampil, sama saat dev dan build.
- **Setiap keputusan desain/arsitektur dicatat** di DESIGN.md (bagian terkait + satu baris di *Riwayat keputusan*). Field/variasi/section baru juga dicatat di **MODULES.md**.
- **Istilah:** label pemakaian variasi di prototype = **dipakai** (ditulis di YAML situs), **base** (versi Basic), **tidak dipakai**. Sistem status lama (pass/draft, `variants.yaml`) sudah dihapus 2026-11-09; jangan dibuat lagi.
- **Isi:** pakai teks asli parametris.com (`data.js`). Kalau belum ada isi asli, placeholder: judul `Title`, deskripsi `Description`, paragraf lorem ipsum, label tombol/menu = nama halaman tujuan.
- **Halaman prototype harus "murni":** tanpa navbar/footer situs; hanya bar combo box (atas) dan tombol kembali (bawah), keduanya putih.
- Sebelum melapor "selesai", verifikasi: buka halamannya (dev) dan jalankan `npm run build`. Laporkan jujur kalau belum dicek secara visual.

## 3. Peta arsitektur (ringkas)

```
reference/Parametris_Complete_Source_v8/  ← arsip export klien (read-only, di luar src/)
public/                          ← favicon, logo (+ mask), robots.txt, .htaccess
src/
├── content/                     ← SEMUA isi & kalimat (data-driven)
│   ├── site.yaml                ← nama, url, lang, homeTitle, theme (palet), cta navbar, contact, navbar.variant, footer, post
│   ├── pages/<url>/index.yaml   ← 1 halaman = 1 folder (index.yaml + gambarnya), nama folder = URL (home/ = /); isi = `sections`
│   ├── menu/*.yaml              ← 1 item menu = 1 file (title, href, order, children[]; href "" = judul dropdown)
│   ├── products/<id>.yaml + .jpg ← 1 kategori produk = 1 file + gambarnya (title, summary, order, image, items[])
│   └── posts/<slug>/index.md    ← 1 artikel = 1 folder (index.md + gambar). Sekarang kosong
├── content.config.ts            ← skema semua koleksi (zod)
├── lib/content.ts               ← getSite, getPage, getSection, getMainLinks, pageHref, getChildPages, getProductCategories, getPosts, getRelatedPosts
├── lib/variants.ts              ← collectVariants, isBasic, resolveVariant, pickVariant
├── lib/section.ts               ← nilai tone/width untuk ui/Section
├── layouts/BaseLayout.astro     ← <head> (title, canonical, Open Graph), class tema, Navbar, <main>, Footer (prop `bare`)
├── pages/[...slug].astro        ← SEMUA halaman dari content/pages
├── pages/posts/[id].astro       ← halaman artikel
├── components/
│   ├── layout/navbar/, layout/footer/       ← mandatory (variasi via site.yaml)
│   ├── sections/<section>/                  ← hero, intro, media, cards, catalog, features, benefits, posts, text, cta, contact, post
│   │   ├── <Nama>.astro                     ← pintu masuk: ambil data, pilih variasi
│   │   ├── variants.ts                      ← deteksi otomatis file <Nama>*_*.astro (+ bawaan tone per variasi)
│   │   ├── types.ts                         ← props bersama semua variasi
│   │   └── <Nama><Gaya>_<NNN>.astro         ← 1 file = 1 variasi (Basic_001 = teks saja)
│   ├── sections/Sections.astro              ← peta `type` → pintu masuk (daftarkan section baru di sini)
│   ├── sections/WrappedVariant.astro        ← pilih variasi + bungkus ui/Section
│   ├── sections/BasicHeading, SplitHeading, types.ts
│   └── ui/                                  ← Button, TextLink, Icon, Logo, Section, SocialIcon, YouTube, MediaPlaceholder
├── assets/icons/*.svg           ← ikon Lucide untuk ui/Icon (field `icon` di benefits)
├── styles/global.css            ← SEMUA token (palet situs :root + .theme-parametris, font, skala, text-ref-*, jarak, tone, .prose)
└── prototype/                   ← HANYA saat `astro dev`, tidak pernah ikut build
    ├── pages/                   ← /prototype/... (index, variants, colors, fonts, ui, navbar, footer, post, + 1 file per section)
    ├── content/pages, posts     ← halaman & artikel uji (dev saja): /contoh-halaman, contoh-semua-elemen, article-title-1..4
    ├── SectionPreview.astro     ← preview generik satu section (halaman modul = 1 baris)
    ├── usage.ts                 ← label dipakai / base / tidak dipakai, dihitung dari YAML
    ├── PrototypeLayout.astro, controls.ts, VariantLabel.astro, route.astro
    └── integration.mjs          ← mendaftarkan rute /prototype/[...path] hanya saat dev (prerender: false)
scripts/import-notion.mjs        ← impor export Notion → src/content/posts/<slug>/ (draft: true)
astro.config.mjs                 ← site: https://www.parametris.com, sitemap, integrasi prototype
netlify.toml                     ← build Netlify (npm run build → dist, Node 22)
```

**Konsep kunci:**

1. **Halaman = folder YAML.** `src/content/pages/<url>/index.yaml` (+ gambar di folder yang sama) berisi `sections: [{ type, variant, ...isi }]`, dirender berurutan. Section boleh dipakai berkali-kali, urutan bebas. Halaman anak memakai URL datar + `parent: <induk>`.
2. **Section = fungsi, variasi = tampilan.** Semua variasi satu section menerima props yang sama (`types.ts`), jadi ganti `variant:` tidak merusak isi (ke dua arah: field yang tidak dipakai variasi diabaikan, field yang kosong bagiannya hilang).
3. **Yang ditulis di YAML = yang tampil**, sama saat dev dan build (tidak ada status/persetujuan; peninjauan terjadi di prototype sebelum variasi ditulis di YAML). Setiap section punya `<Nama>Basic_001` (teks saja) sebagai bawaan kalau `variant:` kosong; variasi Basic mengabaikan `tone/width/pulldown`.
4. **Palet** dipilih sekali di `site.yaml › theme` (`parametris` aktif, `situs` cadangan). Variasi hanya memakai token semantik (`text-primary`, `bg-background-alt`), jadi benar di kedua palet.
5. **Gaya:** class Tailwind langsung di file variasi, nilai dari token (`text-ref-h2`, `bg-primary`, `container-page`, `section-y`). `<style>` di file variasi hanya untuk hal khusus. `global.css` hanya untuk token situs-wide.
6. **Prototype** (`/prototype`, dev saja): daftar dikelompokkan **per folder kode**: **global.css** (colors, fonts) · **ui** (semua komponen `ui/`) · **layout** (navbar, footer) · **sections** (11 section + post) · **Tinjauan** (variants). Jadi nama grup langsung menunjukkan folder yang diubah. Preview dengan combo box (`?v=` variasi, `?c=` contoh isi, `?palet=`, opsi "Semua variasi"); **`/prototype/variants`** = tabel semua variasi + dipakai / base / tidak dipakai + dipakai di mana.

## 4. Resep pekerjaan umum

| Mau… | Caranya |
|---|---|
| Menambah halaman | Buat folder `src/content/pages/<url>/` berisi `index.yaml` (+ gambarnya). Salin kerangka & modul dari [MODULES.md](MODULES.md). Tidak perlu file `.astro`. |
| Menambah halaman anak (jadi kartu di induk) | Di `index.yaml` anak isi `parent: <induk>`, `title`, `summary`, `order`, `image`. Induk memakai section `type: cards` + `from: <induk>`. |
| Mengubah teks | Edit YAML halaman / `site.yaml` / `menu/` / `products/`. Teks asli EN ada di arsip `data.js`. |
| Menambah produk / kategori | Edit `items` di `src/content/products/<kategori>.yaml`, atau tambah file kategori baru + `<kategori>.jpg` di folder yang sama. |
| Menambah item menu / sub-menu | Tambah file di `src/content/menu/` / isi `children` di file item induk (`href: ""` = hanya judul dropdown). |
| Mengubah menu footer | `site.yaml › footer.explore`. |
| Menambah artikel | `npm run import:notion -- "<folder export Notion>" [--slug x] [--force]` → cek di dev → hapus baris `draft: true`. |
| Menambah ikon | Taruh SVG (Lucide, `stroke="currentColor"`) di `src/assets/icons/<nama>.svg`, pakai `icon: <nama>`. Langsung muncul di `/prototype/ui`. |
| Menambah/mengubah komponen `ui/` | Edit di `src/components/ui/`; cek semua pilihan props-nya di `/prototype/ui` (palet & latar gelap). Komponen baru: tambahkan juga contohnya di `src/prototype/pages/ui.astro`. |
| Membuat variasi baru | Salin variasi terdekat di folder section → beri nama `<Nama><Gaya>_<NNN>.astro` (gaya baru mulai `_001`). Langsung muncul di `/prototype/<section>` dan `/prototype/variants` (sebagai "tidak dipakai"). |
| Memakai variasi di situs | Setelah ditinjau di prototype, tulis namanya di `variant:` YAML halaman (navbar/footer/artikel: `site.yaml`). |
| Membuang variasi | Hapus filenya (cek dulu di `/prototype/variants` bahwa labelnya "tidak dipakai"). Versi Basic jangan dihapus. |
| Ganti palet seluruh situs | `site.yaml › theme: parametris \| situs`. |
| Membuat **jenis** section baru | 1) folder `src/components/sections/<nama>/` berisi `<Nama>.astro` (pakai `WrappedVariant`), `variants.ts`, `types.ts`, `<Nama>Basic_001.astro` (salin pola `cta/` atau `cards/`); 2) skema `type: z.literal("<nama>")` di `content.config.ts` + masukkan ke `discriminatedUnion`; 3) daftarkan di `Sections.astro`; 4) `src/prototype/pages/<nama>.astro` (`<SectionPreview section="<nama>" />`) + daftarkan di `variantsBySection` (`SectionPreview.astro`), grup `sections` (`prototype/pages/index.astro`), dan `sectionOrder` (`prototype/pages/variants.astro`); 5) catat di DESIGN.md + MODULES.md. |
| Menambah token warna/jarak/font | `src/styles/global.css` (palet situs di `:root`, palet referensi di `.theme-parametris`) + catat di DESIGN.md. |
| Deploy ke Netlify | `git push origin prototype-01` lalu `git push origin prototype-01:demo` (hanya kalau diminta). |

## 5. Status terakhir (2026-11-09)

**Branch & deploy**

| Branch | Fungsi |
|---|---|
| `prototype-01` | **branch kerja sehari-hari** |
| `demo` | dideploy otomatis ke Netlify: https://parametris-astro-practice-001.netlify.app (`git push origin prototype-01:demo`) |
| `master` | versi resmi; diperbarui lewat Pull Request dari `prototype-01` |
| `referensi` | kode asli Jasa Listrik Bandung (read-only), asal pola "1 file = 1 section" |

Remote: hanya `origin` = github.com/Tiyanzr/Astro-Framework-Practice_002. (README masih menyebut `master` sebagai branch harian; kenyataannya `prototype-01`.)

**Sudah jadi**

- **Situs = parametris.com versi Indonesia:** 13 halaman dengan URL sama (build = 13 halaman). Isi asli, 6 kategori produk PTC (32 produk), navbar/footer/kontak asli, palet `theme: parametris`.
- **SEO:** domain `https://www.parametris.com` (astro.config, sitemap, robots.txt, .htaccess), canonical, Open Graph dasar, judul tab seperti parametris.com.
- **11 jenis section** (`hero`, `intro`, `media`, `cards`, `catalog`, `features`, `benefits`, `posts`, `text`, `cta`, `contact`) + navbar, footer, halaman artikel. Semua punya Basic.
- **Variasi:** 17 dipakai (semua gaya parametris.com + `PostArticle_001`), 7 tidak dipakai (desain lama palet situs: `NavbarPanel_001`, `HeroImage_001/_002`, `IntroMedia_001/_002`, `FooterSimple_001`, `PostArticle_002`), 14 base. Sistem status pass/draft dihapus 2026-11-09. Daftar lengkap: DESIGN.md › *Katalog section & variasi*.
- **Prototype** lengkap (global.css / ui / layout / sections / Tinjauan), MODULES.md, import Notion, draft artikel.
- **Belum di-commit:** migrasi parametris.com + dokumentasi ini masih perubahan lokal di `prototype-01` (sampai pemilik meminta commit/push).

**Belum / sengaja ditunda**

- Versi bahasa Inggris (teks EN sudah ada di arsip `data.js`; parametris.com default EN).
- Artikel: koleksi `posts` kosong. Dua artikel di beranda menaut ke `www.parametris.com/...` dan akan 404 kalau situs ini menggantikan parametris.com sebelum artikelnya dipindahkan.
- Formulir kontak (tidak dipakai `ContactDirect_001`; Basic masih mockup).
- Daftar artikel tanpa pagination & filter kategori; belum halaman per produk.
- `og:image` / Twitter card; redirect dari URL demo lama (`/iot/manufaktur`, `/layanan`, `/tentang`, `/kontak`, `/artikel`).
- Font kandidat (Schibsted Grotesk, Hanken Grotesk, Instrument Sans) masih terpasang untuk `/prototype/fonts`; palet aktif memakai Arial.
- Logo versi SVG (minta ke klien).

## 6. Rencana ke depan (urutan saran)

1. **Tinjau situs hasil migrasi** bersama pemilik (dev & Netlify), lalu commit + push → `prototype-01` → `demo`, dan PR ke `master`.
2. **Pindahkan artikel asli** parametris.com (minimal 2 yang ditaut beranda) ke `src/content/posts/`, lalu ganti `posts › items` di beranda dengan daftar otomatis.
3. **Dua bahasa (id/en):** putuskan dengan pemilik. Opsi: i18n Astro (`/en/...`) + konten per bahasa. Paling mahal kalau ditunda lama.
4. **SEO lanjutan:** `og:image` per halaman, Twitter card, `public/_redirects` Netlify untuk URL demo lama.
5. **Kualitas:** `@astrojs/check` + `typescript` (`astro check`); skema `strict()` supaya field salah ketik memberi error.
6. **Script `npm run new:section <nama>`** untuk kerangka jenis section baru (agar langkah resep tidak terlewat).
7. **Daftar artikel:** pagination + filter kategori.
8. **Formulir kontak** (opsional, kalau diminta): Netlify Forms di variasi contact.
9. **Halaman per produk** (opsional): rute `/software/<produk>`; sekarang produk = link ke ptc.com.
10. **Bersih-bersih setelah final:** hapus font kandidat dan variasi "tidak dipakai" yang tidak akan dipakai lagi.

## 7. Jebakan yang sudah diketahui

- **Cache konten basi saat dev:** perubahan YAML / folder baru kadang tidak muncul (404 atau isi lama). Solusi: `astro dev stop` → hapus `node_modules/.astro/data-store.json` dan `.astro/data-store.json` → `astro dev --background`. Kemungkinan dipicu perbedaan huruf drive `d:` vs `D:` di Windows.
- **Dev server mengunci file:** `git mv` / hapus folder bisa gagal "Permission denied" → hentikan dev server dulu.
- **Memori Windows penuh** saat `astro build` bersamaan dengan dev server → hentikan dev server dulu sebelum build.
- **Shell (Git Bash) di Windows:** heredoc panjang berisi kutip/backslash sering gagal ("unexpected EOF"). Tulis script ke file sementara lalu jalankan, atau pakai tool tulis-file. Hapus file dengan path literal.
- **Field YAML salah ketik diam-diam diabaikan** (zod membuang kunci tak dikenal), mis. `action:` → tombol tidak muncul tanpa pesan. Cocokkan dengan MODULES.md.
- **YAML:** kunci tanpa nilai (`title:`) = `null` → gagal skema `optional()`. Hapus barisnya atau jadikan komentar.
- **Semua variasi di-compile saat build** (termasuk yang tidak dipakai): file variasi yang error membuat build gagal.
- **`catalog › limit`:** kosong = semua produk, `0` = tanpa daftar produk (beda!).
- **Rute `/prototype` dirender per permintaan** (`prerender: false`) supaya `?query` terbaca; `getStaticPaths` tidak dipakai di sana.
- **`NavbarPanel_001` (tidak dipakai) memakai `fixed`** dan menaruh spacer `h-16` sendiri; `NavbarDropdown_001` memakai `sticky`. Di `/prototype/navbar`, navbar ditaruh di bingkai ber-`transform` supaya tidak menimpa bar prototype.
- **Konten uji prototype** (`src/prototype/content/`) ikut muncul di daftar saat dev, tidak saat build.
- **Tailwind v4:** `@theme inline` tidak bisa ditimpa per elemen → font memakai variabel `--display-family`/`--heading-family`. Override `.prose` sengaja di luar `@layer`. Aturan `h1 { letter-spacing: 0 }` mengecualikan `text-ref-*`.
- Komentar CSS jangan memuat urutan `*/` (pernah merusak aturan).
- **`.gitignore`** mengabaikan `dist/`, kecuali `reference/Parametris_Complete_Source_v8/Parametris_Complete_Source_v8/dist/` (bagian arsip klien).
- **`.htaccess`** hanya berlaku di hosting Apache; Netlify mengabaikannya (pakai `netlify.toml` / `_redirects`).
- **MODULES.md harus ikut diperbarui** setiap menambah field, variasi, atau jenis section baru.

---

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

Perintah lain: `npm run build` (hasil di `dist/`), `npm run preview`, `npm run import:notion -- "<folder>"`.
Halaman penting saat dev: `http://localhost:4321/` (situs), `/prototype` (daftar alat), `/prototype/variants` (semua variasi + dipakai di mana).

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
