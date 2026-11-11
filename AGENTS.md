# AGENTS.md — panduan & serah-terima proyek

> Baca file ini dulu di setiap sesi baru. Isinya: tujuan proyek, cara bekerja dengan pemilik proyek, peta arsitektur,
> resep pekerjaan umum, status terakhir, rencana ke depan, dan jebakan yang sudah diketahui.
> Detail desain & teknis lengkap (palet, tipografi, katalog semua variasi, skema, SEO): [DESIGN.md](DESIGN.md), dengan riwayat keputusan di bagian paling bawah.
> Template YAML siap tempel untuk setiap bagian halaman (mandatory & modul): [MODULES.md](MODULES.md).
> Terakhir diperbarui: **2026-11-10**.

---

## 1. Tentang proyek

- **Tujuan:** membangun ulang **parametris.com** (PT Parametrik Solusi Integrasi: reseller software PTC, solusi IoT, layanan engineering) dengan **Astro 7** + **Tailwind v4**.
- **Fase sekarang (2026-11-10):** **arsitektur stabil, desain dikelola sebagai kit.** Situs sudah mengikuti parametris.com: isi asli (versi Indonesia), URL sama, palet referensi, semua modul memakai variasi bergaya parametris.com. Pekerjaan berikutnya umumnya perubahan kecil (isi, variasi, detail tampilan) di atas arsitektur yang ada.
- **Sumber acuan:** arsip export situs asli dari klien, `reference/Parametris_Complete_Source_v8/` (`app.js` = susunan halaman, `data.js` = teks ID/EN, `products.js` = katalog PTC, `style.css` = gaya). parametris.com sendiri dicek hanya kalau arsip kurang.
- **Syarat utama dari atasan:** semua **data-driven**. Tidak ada teks hardcode di komponen; **menambah konten = menambah file** (YAML/Markdown).
- **Desain dikerjakan langsung di kode** (bukan Figma) dalam bentuk **kit desain**: satu folder `kits/<kit>/` = satu set desain utuh (navbar, section, footer, artikel + tema) dari satu orang/tim, berisi **variasi bernomor** (`HeroText_001`, `HeroText_002`, …). Semua yang baru dicoba di **prototype** dulu, ditinjau pemilik, baru dipakai situs/Netlify setelah disetujui.
- **Peta situs** (sama dengan parametris.com): `/` · `/software` (kategori CAD, CAM, CAE, PLM, ALM, AR → produk PTC, link ke ptc.com) · `/iot` (+ `/manufacturing`, `/healthcare`, `/energy`, `/smart-city`) · `/services` (+ `/training`, `/consulting`, `/engineering`) · `/about` · `/contact`. parametris.com punya dua bahasa (`?lang=id|en`, default EN); situs ini baru versi Indonesia.
- **Kontak asli:** sales@parametris.com, support@parametris.com, +62 21 3044 8230, WhatsApp +62 821 1629 1814, Synergy Building Suite 1508, Alam Sutera · Tangerang; Instagram, LinkedIn, YouTube (semua di `site.yaml`).
- **Referensi gaya sebelumnya** (desain lama yang tidak dipakai, palet situs): fastems.com (hero berkartu, pembungkus section `tone/width/pulldown`), dhl.com (latar putih, sosial media di kanan footer), beckhoff.com, promot-automation.com.

## 2. Cara bekerja dengan pemilik proyek (WAJIB)

- **Bahasa:** balas dalam **Bahasa Indonesia**. Kode & komentar kode juga berbahasa Indonesia (mengikuti yang sudah ada).
- **Commit / push hanya kalau diminta.** Jangan pernah `--force` tanpa izin eksplisit untuk aksi itu.
- **Jangan pernah menulis nama AI/asisten di repo atau GitHub:** tanpa `Co-Authored-By`, tanpa link session, tanpa "Generated with …", penulis commit = konfigurasi git pemilik (Tiyan Razzaq). Ini repo kerja publik yang dilihat atasan. (Riwayat lama pernah ditulis ulang + force-push untuk membuang nama AI dari daftar Contributors.)
- **Kalau diminta "jangan buat kode dulu" / "aku hanya bertanya"** → jawab/diskusikan saja, jangan mengubah file.
- **Alur kerja:** buat variasi baru di `kits/<kit>/<section>/` (atau kit baru) → pemilik meninjau di `/prototype/...` (`/prototype/kits` untuk satu kit utuh) → kalau disetujui, tulis namanya di `variant:` YAML halaman (atau ganti `kit:` di `site.yaml`) → commit/push `prototype-01` → `demo` (Netlify). **Tidak ada status/daftar persetujuan**: yang ditulis di YAML = yang tampil, sama saat dev dan build.
- **Setiap keputusan desain/arsitektur dicatat** di DESIGN.md (bagian terkait + satu baris di *Riwayat keputusan*). Field/variasi/section baru juga dicatat di **MODULES.md**.
- **Istilah:** label pemakaian variasi di prototype = **dipakai** (ditulis di YAML situs), **base** (versi Basic), **tidak dipakai**. Sistem status lama (pass/draft, `variants.yaml`) sudah dihapus 2026-11-09; jangan dibuat lagi.
- **Isi:** pakai teks asli parametris.com (`data.js`). Kalau belum ada isi asli, placeholder: judul `Title`, deskripsi `Description`, paragraf lorem ipsum, label tombol/menu = nama halaman tujuan.
- **Halaman prototype harus "murni":** tanpa navbar/footer situs; hanya bar combo box (atas) dan tombol kembali (bawah), keduanya putih.
- Sebelum melapor "selesai", verifikasi: buka halamannya (dev) dan jalankan `npm run build`. Laporkan jujur kalau belum dicek secara visual.

## 3. Peta arsitektur (ringkas)

```
reference/Parametris_Complete_Source_v8/  ← arsip export klien (read-only, di luar src/)
public/                          ← favicon, logo (+ mask), robots.txt, .htaccess
kits/                            ← KIT DESAIN (di luar src/): 1 folder = 1 set desain utuh, terdeteksi otomatis
├── base/                        ← versi polos semua section (Basic_001), cadangan otomatis. Jangan dihapus
├── parametris/                  ← gaya parametris.com (dipakai situs: site.yaml › kit) + theme.css
├── awal/                        ← desain awal (palet hijau-midnight; hero foto, intro, panel menu); dipakai /contoh-halaman
└── <kit>/
    ├── kit.ts                   ← nama, pembuat, keterangan, `defaults` tone/width per variasi
    ├── theme.css                ← (opsional) token warna/font/jarak kit, di dalam [data-kit="<kit>"]
    ├── <section>/<Nama><Gaya>_<NNN>.astro  ← 1 file = 1 variasi (section = hero, cards, navbar, footer, post, ...)
    └── parts/                   ← komponen bantu kit itu (mis. BasicHeading, SplitHeading), bukan variasi
src/
├── content/                     ← SEMUA isi & kalimat (data-driven)
│   ├── site.yaml                ← nama, url, lang, homeTitle, kit (kit desain situs), cta navbar, contact, navbar.variant, footer, post
│   ├── pages/<url>/index.yaml   ← 1 halaman = 1 folder (index.yaml + gambarnya), nama folder = URL (home/ = /); isi = `sections`, opsional `kit`
│   ├── menu/*.yaml              ← 1 item menu = 1 file (title, href, order, children[]; href "" = judul dropdown)
│   ├── products/<id>.yaml + .jpg ← 1 kategori produk = 1 file + gambarnya (title, summary, order, image, items[])
│   └── posts/<slug>/index.md    ← 1 artikel = 1 folder (index.md + gambar). Sekarang 2 artikel (Mathcad, Pelatihan)
├── content.config.ts            ← skema semua koleksi (zod)
├── lib/content.ts               ← getSite, getPage, getSection, getMainLinks, pageHref, getChildPages, getProductCategories, getPosts, getRelatedPosts
├── lib/kits.ts                  ← registry kit (scan kits/), resolveVariant ("Nama" / "kit/Nama"), isBasic, allRefs
├── lib/section.ts               ← nilai tone/width untuk ui/Section
├── layouts/BaseLayout.astro     ← <head> (title, canonical, Open Graph), data-kit di body + semua kits/*/theme.css, Navbar, <main>, Footer (prop `bare`, `kit`)
├── pages/[...slug].astro        ← SEMUA halaman dari content/pages
├── pages/posts/[id].astro       ← halaman artikel
├── components/
│   ├── layout/navbar/, layout/footer/       ← pintu masuk + types.ts (variasi di kits/<kit>/navbar|footer/, dipilih di site.yaml)
│   ├── sections/<section>/                  ← hero, intro, media, cards, catalog, features, benefits, posts, text, cta, contact, post
│   │   ├── <Nama>.astro                     ← pintu masuk: ambil data (menu, artikel, produk, kontak), lalu KitVariant
│   │   └── types.ts                         ← "kontrak" props, sama untuk semua kit
│   ├── sections/Sections.astro              ← peta `type` → pintu masuk (daftarkan section baru di sini)
│   ├── sections/KitVariant.astro            ← pilih variasi dari kit + bungkus ui/Section + bungkus [data-kit] kalau beda kit
│   ├── sections/types.ts                    ← tipe bersama (SectionHeading, Link, numbered)
│   ├── sections/hero/HeroBackground.astro, sections/post/blocks/ (+ prose.css)  ← blok bersama, dipakai variasi dari kit mana pun
│   └── ui/                                  ← Button, TextLink, Icon, Logo, Section, SocialIcon, YouTube, MediaPlaceholder (bersama semua kit)
├── assets/icons/*.svg           ← ikon Lucide untuk ui/Icon (field `icon` di benefits)
├── styles/global.css            ← token tema bawaan (:root + :where([data-kit])), font, skala, text-ref-*, jarak, tone. Tema kit di kits/<kit>/theme.css
└── prototype/                   ← HANYA saat `astro dev`, tidak pernah ikut build
    ├── pages/                   ← /prototype/... (index, kits, variants, colors, fonts, ui, navbar, footer, post, + 1 file per section)
    ├── content/pages, posts     ← halaman & artikel uji (dev saja): /contoh-halaman, contoh-semua-elemen, article-title-1..4
    ├── SectionPreview.astro     ← preview generik satu section (halaman modul = 1 baris)
    ├── usage.ts                 ← label dipakai / base / tidak dipakai, dihitung dari YAML
    ├── PrototypeLayout.astro, controls.ts, VariantLabel.astro, route.astro
    └── integration.mjs          ← mendaftarkan rute /prototype/[...path] hanya saat dev (prerender: false)
scripts/import-notion.mjs        ← impor export Notion → src/content/posts/<slug>/ (draft: true)
keystatic.config.ts              ← UJI COBA editor artikel /keystatic (dev saja, mode local): field = skema posts
astro.config.mjs                 ← site: https://www.parametris.com, sitemap, integrasi prototype + keystaticDevOnly()
netlify.toml                     ← build Netlify (npm run build → dist, Node 22)
```

**Konsep kunci:**

1. **Halaman = folder YAML.** `src/content/pages/<url>/index.yaml` (+ gambar di folder yang sama) berisi `sections: [{ type, variant, ...isi }]`, dirender berurutan. Section boleh dipakai berkali-kali, urutan bebas. Halaman anak memakai URL datar + `parent: <induk>`.
2. **Section = fungsi, variasi = tampilan.** Semua variasi satu section, di kit mana pun, menerima props yang sama (`src/components/<sections|layout>/<section>/types.ts` = kontrak), jadi ganti `variant:` atau `kit:` tidak merusak isi (field yang tidak dipakai variasi diabaikan, field yang kosong bagiannya hilang). Data (menu, artikel, produk, kontak) disiapkan pintu masuk di `src/`; file kit hanya menerima props, tidak membaca konten sendiri.
3. **Kit desain = set desain utuh** di `kits/<kit>/` (lihat peta di atas). Kit dipilih berlapis: `site.yaml › kit` (seluruh situs) → `kit:` di YAML halaman (isi halaman itu) → `variant: kit/Nama` (satu section). `variant: Nama` dicari di kit aktif, lalu di `base`; `variant` kosong = variasi pertama kit aktif. Section yang belum dibuat sebuah kit otomatis memakai `base`. **Navbar, footer, dan halaman artikel selalu ikut kit situs.** Detail: DESIGN.md › *Kit desain*.
4. **Yang ditulis di YAML = yang tampil**, sama saat dev dan build (tidak ada status/persetujuan; peninjauan terjadi di prototype sebelum variasi ditulis di YAML). Variasi Basic (kit `base`) mengabaikan `tone/width/pulldown` dari YAML.
5. **Tema per kit:** `global.css` = tema bawaan; `kits/<kit>/theme.css` menimpa token di dalam `[data-kit="<kit>"]` (body halaman, atau pembungkus section dari kit lain). Variasi hanya memakai token semantik (`text-primary`, `bg-background-alt`), jadi otomatis ikut tema kit-nya. Kit `base` tidak punya tema: ikut tema di sekitarnya.
6. **Gaya:** class Tailwind langsung di file variasi, nilai dari token (`text-ref-h2`, `bg-primary`, `container-page`, `section-y`). CSS yang hanya dipakai satu modul ditaruh di modul itu (`<style>` di file variasi, `theme.css` kit, atau file `.css` di sebelah komponennya, mis. `post/blocks/prose.css`). `global.css` hanya untuk token & aturan situs-wide.
7. **Prototype** (`/prototype`, dev saja): daftar dikelompokkan **per folder kode**: **global.css** (colors, fonts) · **ui** · **kits** (`/prototype/kits`: ringkasan semua kit + pratinjau halaman situs dengan kit tertentu) · **layout** (navbar, footer) · **sections** (11 section + post) · **Tinjauan** (variants). Preview dengan combo box (`?v=kit/Nama`, `?c=` contoh isi, opsi "Semua variasi" = semua kit berjajar, masing-masing dengan tema kit-nya); **`/prototype/variants`** = tabel semua variasi (kolom Kit) + dipakai / base / tidak dipakai + dipakai di mana, **discan otomatis dari `kits/`** (file salinan, section baru, dan kit baru langsung ikut).

## 4. Resep pekerjaan umum

| Mau… | Caranya |
|---|---|
| Menambah halaman | Buat folder `src/content/pages/<url>/` berisi `index.yaml` (+ gambarnya). Salin kerangka & modul dari [MODULES.md](MODULES.md). Tidak perlu file `.astro`. |
| Menambah halaman anak (jadi kartu di induk) | Di `index.yaml` anak isi `parent: <induk>`, `title`, `summary`, `order`, `image`. Induk memakai section `type: cards` + `from: <induk>`. |
| Mengubah teks | Edit YAML halaman / `site.yaml` / `menu/` / `products/`. Teks asli EN ada di arsip `data.js`. |
| Menambah produk / kategori | Edit `items` di `src/content/products/<kategori>.yaml`, atau tambah file kategori baru + `<kategori>.jpg` di folder yang sama. |
| Menambah item menu / sub-menu | Tambah file di `src/content/menu/` / isi `children` di file item induk (`href: ""` = hanya judul dropdown). |
| Mengubah menu footer | `site.yaml › footer.explore`. |
| Melihat semua artikel | `/artikel` (menu navbar & footer "Artikel", link "Semua artikel" di beranda). Beranda menampilkan 2 terbaru (`limit: 2`). Keduanya otomatis dari `src/content/posts/`. |
| Menambah artikel | **Editor (uji coba):** buka `/keystatic` saat dev → Artikel → Add → isi → Create; hapus centang Draft untuk terbit. **Atau Notion:** `npm run import:notion -- "<folder export Notion>" [--slug x] [--force]` → cek di dev → hapus baris `draft: true`. Hasil keduanya sama: `src/content/posts/<slug>/`. |
| Menambah ikon | Taruh SVG (Lucide, `stroke="currentColor"`) di `src/assets/icons/<nama>.svg`, pakai `icon: <nama>`. Langsung muncul di `/prototype/ui`. |
| Menambah/mengubah komponen `ui/` | Edit di `src/components/ui/` (dipakai bersama semua kit); cek semua pilihan props-nya di `/prototype/ui` (tema tiap kit & latar gelap). Komponen baru: tambahkan juga contohnya di `src/prototype/pages/ui.astro`. |
| Membuat variasi baru | Salin variasi terdekat ke `kits/<kit>/<section>/` → beri nama `<Nama><Gaya>_<NNN>.astro` (gaya baru mulai `_001`). Langsung muncul di `/prototype/<section>`, `/prototype/variants`, dan `/prototype/kits`. Salinan yang belum diganti namanya (`... copy.astro`) juga terdeteksi. |
| **Membuat kit baru** | Salin folder `kits/base/` (atau kit lain) ke `kits/<nama-kit>/`, ubah `kit.ts` (nama, pembuat, keterangan), tambah `theme.css` kalau perlu warna/font sendiri (contoh: `kits/parametris/theme.css`), lalu desain ulang variasinya. Hapus section yang belum mau dibuat: otomatis memakai `base`. Lihat hasilnya di `/prototype/kits?k=<nama-kit>&h=home`. |
| Memakai variasi di situs | Setelah ditinjau di prototype, tulis namanya di `variant:` YAML halaman (`Nama` dari kit halaman, atau `kit/Nama` dari kit lain; navbar/footer/artikel: `site.yaml`). |
| Memakai kit lain di satu halaman | Tulis `kit: <nama-kit>` di `index.yaml` halaman itu (contoh: `src/prototype/content/pages/contoh-halaman.yaml`). Navbar & footer tetap kit situs. |
| Ganti kit seluruh situs | `site.yaml › kit: <nama-kit>`. Pastikan nama di `navbar.variant`, `footer.variant`, `post.variant`, dan `variant:` halaman ada di kit itu (atau kosongkan = variasi pertama kit). Cek dulu di `/prototype/kits`. |
| Membuang variasi / kit | Hapus filenya / foldernya (cek dulu di `/prototype/variants` / `/prototype/kits` bahwa tidak dipakai). Kit `base` jangan dihapus. |
| Membuat **jenis** section baru | 1) folder `src/components/sections/<nama>/` berisi `<Nama>.astro` (pakai `KitVariant`, salin pola `cta/` atau `cards/`) dan `types.ts`; 2) variasi polos `kits/base/<nama>/<Nama>Basic_001.astro` (wajib) + variasi berdesain di kit lain; 3) skema `type: z.literal("<nama>")` di `content.config.ts` + masukkan ke `discriminatedUnion`; 4) daftarkan di `Sections.astro`; 5) `src/prototype/pages/<nama>.astro` (`<SectionPreview section="<nama>" />`), grup `sections` (`prototype/pages/index.astro`), dan `sectionOrder` (`prototype/pages/variants.astro`); 6) catat di DESIGN.md + MODULES.md. |
| Menambah token warna/jarak/font | Untuk semua kit: `src/styles/global.css` (tema bawaan). Hanya untuk satu kit: `kits/<kit>/theme.css`. Catat di DESIGN.md. |
| Deploy ke Netlify | `git push origin prototype-01` lalu `git push origin prototype-01:demo` (hanya kalau diminta). |

## 5. Status terakhir (2026-11-10)

**Branch & deploy**

| Branch | Fungsi |
|---|---|
| `prototype-01` | **branch kerja sehari-hari** |
| `demo` | dideploy otomatis ke Netlify: https://parametris-astro-practice-001.netlify.app (`git push origin prototype-01:demo`) |
| `master` | versi resmi; diperbarui lewat Pull Request dari `prototype-01` |
| `referensi` | kode asli Jasa Listrik Bandung (read-only), asal pola "1 file = 1 section" |

Remote: hanya `origin` = github.com/Tiyanzr/Astro-Framework-Practice_002. (README masih menyebut `master` sebagai branch harian; kenyataannya `prototype-01`.)

**Sudah jadi**

- **Situs = parametris.com versi Indonesia:** 13 halaman dengan URL sama, ditambah `/artikel` dan 2 artikel di `/posts/<slug>/` (build = 16 halaman). Isi asli, 6 kategori produk PTC (32 produk), navbar/footer/kontak asli, `kit: parametris`.
- **SEO:** domain `https://www.parametris.com` (astro.config, sitemap, robots.txt, .htaccess), canonical, Open Graph dasar, judul tab seperti parametris.com.
- **11 jenis section** (`hero`, `intro`, `media`, `cards`, `catalog`, `features`, `benefits`, `posts`, `text`, `cta`, `contact`) + navbar, footer, halaman artikel. Semua punya Basic.
- **Kit desain (2026-11-10):** 3 kit: `base` (14 variasi polos + 1 salinan uji), `parametris` (20 variasi termasuk `PostArticle_001/_002` + 1 salinan uji, dipakai situs), `awal` (6 variasi desain lama: `HeroImage_001/_002`, `IntroMedia_001/_002`, `NavbarPanel_001`, `FooterSimple_001`; dipakai `/contoh-halaman`). Hasil build situs identik dengan sebelum pemindahan ke kit (dibandingkan per halaman). Daftar lengkap: DESIGN.md › *Katalog section & variasi*.
- **Prototype** lengkap (global.css / ui / kits / layout / sections / Tinjauan), MODULES.md, import Notion, draft artikel.
- **Editor artikel Keystatic (uji coba, 2026-11-10):** `/keystatic` saat dev, mode local tanpa login. Buat/edit artikel, cover, gambar isi, tabel, draft/terbit sudah diuji; build tetap statis. Detail & pengaturan penting: DESIGN.md › *Editor artikel: Keystatic*. Artikel uji sudah dihapus; 2 artikel situs bisa langsung dibuka & diedit di sana.
- **Belum di-commit:** sistem kit desain, artikel & `/artikel`, Keystatic, dan dokumentasi ini masih perubahan lokal di `prototype-01` (sampai pemilik meminta commit/push).

**Belum / sengaja ditunda**

- Versi bahasa Inggris (teks EN sudah ada di arsip `data.js`; parametris.com default EN).
- Artikel: 2 artikel lama parametris.com (sudah 404 di sana; sumber: Wayback Machine, versi EN) **ditulis ulang** dalam bahasa Indonesia, bukan terjemahan kata per kata. Slug sama dengan URL lama. Belum ada redirect `/mathcad-software-in-jakarta` → `/posts/mathcad-software-in-jakarta` (dan `/parametrik-training-certification`) untuk saat situs ini menggantikan parametris.com. Artikel lama lain (mis. "IoT Solutions for Manufacturing") belum dipindahkan.
- Formulir kontak (tidak dipakai `ContactDirect_001`; Basic masih mockup).
- Daftar artikel tanpa pagination & filter kategori; belum halaman per produk.
- `og:image` / Twitter card; redirect dari URL demo lama (`/iot/manufaktur`, `/layanan`, `/tentang`, `/kontak`) dan URL artikel lama parametris.com.
- Font kandidat (Schibsted Grotesk, Hanken Grotesk, Instrument Sans) masih terpasang untuk `/prototype/fonts`; palet aktif memakai Arial.
- Logo versi SVG (minta ke klien).

## 6. Rencana ke depan (urutan saran)

1. **Tinjau situs hasil migrasi** bersama pemilik (dev & Netlify), lalu commit + push → `prototype-01` → `demo`, dan PR ke `master`.
2. **Editor artikel:** putuskan dengan atasan tempat simpan online (Keystatic mode GitHub + login GitHub, atau database + admin sendiri). Tambah tombol callout/FAQ di editor. Lihat DESIGN.md › *Editor artikel: Keystatic*.
3. **Artikel lama parametris.com lainnya:** cek daftar lengkap di Wayback Machine (CDX `parametris.com/*`), tulis ulang yang masih relevan, plus redirect URL lamanya.
4. **Dua bahasa (id/en):** putuskan dengan pemilik. Opsi: i18n Astro (`/en/...`) + konten per bahasa. Paling mahal kalau ditunda lama.
5. **SEO lanjutan:** `og:image` per halaman, Twitter card, `public/_redirects` Netlify untuk URL demo lama dan URL artikel lama parametris.com.
6. **Kualitas:** `@astrojs/check` + `typescript` (`astro check`); skema `strict()` supaya field salah ketik memberi error.
7. **Script `npm run new:section <nama>`** / **`new:kit <nama>`** untuk kerangka jenis section / kit baru (agar langkah resep tidak terlewat).
8. **Kit sebagai package** (kalau nanti dipakai lintas situs): `kits/<kit>/` sudah mandiri (props saja, tema sendiri); tinggal dijadikan npm workspace.
9. **Daftar artikel:** pagination + filter kategori.
10. **Formulir kontak** (opsional, kalau diminta): Netlify Forms di variasi contact.
11. **Halaman per produk** (opsional): rute `/software/<produk>`; sekarang produk = link ke ptc.com.
12. **Bersih-bersih setelah final:** hapus font kandidat, variasi "tidak dipakai", dan file salinan uji (`... copy.astro`) yang tidak akan dipakai lagi.
13. **Widget ala Notion di Keystatic** (ditunda 2026-11-10): callout, toggle/FAQ, kolom, embed, kartu link; perlu isi artikel `.mdx`.

## 7. Jebakan yang sudah diketahui

- **Cache konten basi saat dev:** perubahan YAML / folder baru kadang tidak muncul (404 atau isi lama). Solusi: `astro dev stop` → hapus `node_modules/.astro/data-store.json` dan `.astro/data-store.json` → `astro dev --background`. Kemungkinan dipicu perbedaan huruf drive `d:` vs `D:` di Windows.
- **Dev server mengunci file:** `git mv` / hapus folder bisa gagal "Permission denied" → hentikan dev server dulu.
- **Memori Windows penuh** saat `astro build` bersamaan dengan dev server → hentikan dev server dulu sebelum build.
- **Shell (Git Bash) di Windows:** heredoc panjang berisi kutip/backslash sering gagal ("unexpected EOF"). Tulis script ke file sementara lalu jalankan, atau pakai tool tulis-file. Hapus file dengan path literal.
- **Field YAML salah ketik diam-diam diabaikan** (zod membuang kunci tak dikenal), mis. `action:` → tombol tidak muncul tanpa pesan. Cocokkan dengan MODULES.md.
- **YAML:** kunci tanpa nilai (`title:`) = `null` → gagal skema `optional()`. Hapus barisnya atau jadikan komentar.
- **Semua variasi di semua kit di-compile saat build** (termasuk yang tidak dipakai): file variasi yang error membuat build gagal.
- **Kit:** nama variasi tanpa `kit/` dicari di kit aktif lalu `base`; kalau tidak ada → error yang menyebut pilihan. Setelah menyalin kit, nama file sama di dua kit itu wajar (yang dipakai = kit aktif). Folder bernama `parts/` tidak dianggap section. CSS kit di `theme.css` harus CSS biasa (tanpa `@apply`/`@theme`); utility baru seperti `text-ref-*` tetap di `global.css`. Section dari kit lain dibungkus `<div data-kit class="contents">`; aturan `[data-kit="x"] .theme-dark` bisa ikut berlaku pada section gelap kit lain yang bersarang di dalamnya.
- **`catalog › limit`:** kosong = semua produk, `0` = tanpa daftar produk (beda!).
- **Rute `/prototype` dirender per permintaan** (`prerender: false`) supaya `?query` terbaca; `getStaticPaths` tidak dipakai di sana.
- **`NavbarPanel_001` (kit awal) memakai `fixed`** dan menaruh spacer `h-16` sendiri; `NavbarDropdown_001` memakai `sticky`. Di `/prototype/navbar` dan `/prototype/kits`, navbar ditaruh di bingkai ber-`transform` (+ `overflow-x-clip`) supaya tidak menimpa bar prototype dan panel tersembunyi tidak melebarkan halaman.
- **Konten uji prototype** (`src/prototype/content/`): halaman uji ikut terbaca saat dev. Artikel uji **tidak** ikut daftar artikel situs (beranda, `/artikel`, artikel terkait) karena `getPosts()` menyaringnya; hanya bisa dibuka lewat URL-nya dan `/prototype/post` (`getPosts({ withTestPosts: true })`).
- **Tailwind v4:** `@theme inline` tidak bisa ditimpa per elemen → font memakai variabel `--display-family`/`--heading-family`. Override `.prose` (`post/blocks/prose.css`) sengaja di luar `@layer`. Aturan `h1 { letter-spacing: 0 }` mengecualikan `text-ref-*`. `kits/` di luar `src/`, jadi dipindai lewat `@source "../../kits"` di `global.css`.
- Komentar CSS jangan memuat urutan `*/` (pernah merusak aturan).
- **`.gitignore`** mengabaikan `dist/`, kecuali `reference/Parametris_Complete_Source_v8/Parametris_Complete_Source_v8/dist/` (bagian arsip klien).
- **`.htaccess`** hanya berlaku di hosting Apache; Netlify mengabaikannya (pakai `netlify.toml` / `_redirects`).
- **Keystatic:** jangan ganti isi ke `fields.markdoc` (tabel jadi `{% table %}`), dan jangan ubah `publicPath: "../"` / `directory` gambar tanpa menguji ulang (rujukan gambar jadi salah → halaman artikel error 500). Dev server berjalan di `127.0.0.1:4321` karena Keystatic.
- **MODULES.md harus ikut diperbarui** setiap menambah field, variasi, atau jenis section baru.

---

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

Perintah lain: `npm run build` (hasil di `dist/`), `npm run preview`, `npm run import:notion -- "<folder>"`.
Halaman penting saat dev: `http://localhost:4321/` (situs), `/prototype` (daftar alat), `/prototype/kits` (semua kit + pratinjau situs per kit), `/prototype/variants` (semua variasi + dipakai di mana), `/keystatic` (editor artikel, uji coba).

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
