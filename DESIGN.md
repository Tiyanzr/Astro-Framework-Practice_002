# Parametrik — Design System & Arsitektur

> Dokumen hidup: **kondisi terkini** sistem desain dan arsitektur situs, ditambah riwayat keputusan di bagian paling bawah.
> Semua nilai warna/font/jarak terpasang sebagai token di [`src/styles/global.css`](src/styles/global.css); kalau mengubah token, ubah di sana **dan** catat di sini.
> Contoh visual: `/prototype` (hanya saat `astro dev`).
> Ringkasan proyek, cara kerja, status, rencana: [AGENTS.md](AGENTS.md). Template YAML siap tempel: [MODULES.md](MODULES.md).
> Terakhir diperbarui: **2026-11-09**.

## Daftar isi

1. [Ringkasan](#ringkasan)
2. [Tema & palet](#tema--palet)
3. [Tipografi](#tipografi)
4. [Jarak, radius, gerak](#jarak-radius-gerak)
5. [Logo](#logo)
6. [Halaman: data-driven dari YAML](#halaman-data-driven-dari-yaml)
7. [Section & variasi](#section--variasi)
8. [Katalog section & variasi](#katalog-section--variasi)
9. [Navbar, footer, artikel](#navbar-footer-artikel)
10. [Komponen UI bersama](#komponen-ui-bersama)
11. [Koleksi konten (skema)](#koleksi-konten-skema)
12. [SEO & indexing](#seo--indexing)
13. [Pemakaian variasi & prototype](#pemakaian-variasi--prototype)
14. [Struktur file](#struktur-file)
15. [Aturan](#aturan)
16. [Riwayat keputusan](#riwayat-keputusan)

---

## Ringkasan

- **Acuan sekarang: parametris.com.** Isi, URL, susunan halaman, dan gaya modul direkonstruksi dari export situs asli klien (`reference/Parametris_Complete_Source_v8/`: `app.js` = susunan halaman, `data.js` = teks ID/EN, `products.js` = katalog PTC, `style.css` = gaya).
- **Data-driven:** semua kalimat ada di `src/content/` (YAML/Markdown). Komponen tidak berisi teks atau warna hardcode. **Menambah konten = menambah file.**
- **Halaman = daftar section** di YAML; **section = fungsi, variasi = tampilan.** Ganti tampilan cukup ganti `variant:`.
- **Dua palet tersedia**, dipilih sekali di `site.yaml › theme`:
  - `parametris` (**aktif**): palet, font Arial, dan jarak parametris.com (class `.theme-parametris`).
  - `situs`: palet 5 warna + putih + hitam buatan sendiri (token `:root`). Disimpan sebagai cadangan.
- **Light mode saja.** Section gelap memakai `theme-dark` (lewat `tone: dark`). Tidak ada tombol ganti tema.
- **Prinsip token:** komponen memakai token semantik (`bg-background`, `text-primary`, `border-border`, `text-muted-foreground`), bukan kode warna. Karena itu satu variasi bisa tampil benar di kedua palet.

## Tema & palet

### Memilih palet

| Di mana | Caranya |
|---|---|
| Seluruh situs | `src/content/site.yaml › theme: parametris \| situs`. `BaseLayout` memasang class `theme-parametris` di `<body>` kalau `parametris` |
| Prototype | combo box **Palet** (`?palet=situs\|referensi`), bawaan = palet situs yang aktif |

`.theme-parametris` hanya **menimpa nilai token semantik** + font + jarak, jadi komponen tidak perlu tahu palet mana yang aktif.

### Palet aktif: parametris.com (`.theme-parametris`)

| Token semantik | Terang | Gelap (`.theme-parametris .theme-dark`) |
|---|---|---|
| `background` | `#FFFFFF` | `#11262C` |
| `background-alt` | `#F2F3EF` (latar closing/CTA) | `#193039` |
| `foreground` | `#14252E` (ink) | `#FFFFFF` |
| `card` | `#FFFFFF` | `#193039` |
| `primary` / `ring` / `highlight` | `#86732C` (emas) | `#C7B775` (emas terang), highlight `#D0BD7B` |
| `primary-hover` | emas 80% + ink | `#D0BD7B` |
| `primary-foreground` | `#FFFFFF` | `#11262C` |
| `muted-foreground` | `#606B70` | `#B7C4C6` |
| `border` / `input` | `#D8DCD9` | putih 19% |
| seleksi teks | latar emas, teks putih | — |

Font: **Arial** (`--display-family`, `--heading-family`, `font-family`). Jarak: lihat [Jarak](#jarak-radius-gerak).

### Palet cadangan: situs (`:root`, `theme: situs`)

**5 warna + putih + hitam** (Coolors `001F3E · 1E4890 · 00804D · 75C462 · DBE64C`):

| Token | Hex | Peran |
|---|---|---|
| `white` | `#FFFFFF` | Latar situs, teks di section gelap |
| `black` | `#000000` | Teks & judul di latar putih |
| `midnight` | `#001F3E` | Latar section gelap, bahan turunan |
| `blue` | `#1E4890` | Link/highlight di latar putih |
| `green` | `#00804D` | Aksi utama di latar putih |
| `mantis` | `#75C462` | Link/highlight di section gelap |
| `lime` | `#DBE64C` | Aksi utama di section gelap |

**Turunan** (`color-mix(in srgb, …)`, otomatis ikut kalau palet diganti):

| Token | Rumus | Hasil |
|---|---|---|
| `background-alt` | midnight 4% + putih | `#F5F6F7` |
| `border` | midnight 12% + putih | `#E0E4E8` |
| `muted-foreground` | midnight 70% + putih | `#4D6278` |
| `primary-hover` | green 80% + midnight | `#006D4A` |
| gelap: `background-alt` / `card` / `border` / `muted-foreground` | putih 5% / 8% / 18% / 70% + midnight | `#0D2A48` / `#14314D` / `#2E4761` / `#B3BCC5` |
| gelap: `primary-hover` | lime 75% + putih | `#E4EC79` |

**Token semantik** (nama mengikuti shadcn): terang `background` white · `foreground` black · `primary` green · `highlight` blue · `ring` green; gelap `background` midnight · `foreground` white · `primary` lime · `primary-foreground` midnight · `highlight` mantis. `logo` = `#AAA753` di keduanya.

**Tone tambahan palet situs:** `theme-green` (latar green, teks putih, tombol lime; maks. satu per halaman) dan `theme-olive` (latar warna logo `#AAA753`, teks putih). ⚠️ Putih di olive hanya 2.5 : 1 (di bawah WCAG), keputusan sadar; jangan menaruh logo di atas olive.

**Kontras penting (palet situs):** hitam/midnight/blue/green di putih ✅ (21 / 16.6 / 8.8 / 5.0 : 1) · mantis & lime di putih ❌ untuk teks (2.1 / 1.4 : 1) · lime/mantis di midnight ✅ (12.2 / 7.8 : 1) · green di midnight ⚠️ hanya teks besar (3.3 : 1) · blue di midnight ❌ (1.9 : 1). Aturan: di latar putih green = aksi, blue = link; di section gelap lime = aksi, mantis = link; satu aksen dominan per section.

### Tone section (`tone:` di YAML)

| `tone` | Hasil | Catatan |
|---|---|---|
| `default` | `bg-background` | |
| `alt` | `bg-background-alt` | bawaan `CtaClosing_001` |
| `dark` | `theme-dark` | kartu sektor IoT di beranda |
| `green`, `olive` | `theme-green`, `theme-olive` | dirancang untuk palet situs |
| `gradient` | `bg-gradient-soft` (blue 10% → mantis 14% + putih) | dirancang untuk palet situs |

## Tipografi

### Palet parametris.com (aktif)

Semua judul & teks **Arial**. Judul tipis (weight 400) dengan letter-spacing sangat rapat, lewat utility **`text-ref-*`**:

| Utility | Ukuran (HP → desktop) | Line height | Letter spacing | Pemakaian |
|---|---|---|---|---|
| `text-ref-h1` | 42 → 91px | 1.08 | −0.065em | judul hero beranda |
| `text-ref-h1-inner` | 42 → 82px | 1.08 | −0.06em | judul hero halaman lain |
| `text-ref-closing` | 40 → 78px | 1.12 | −0.05em | judul ajakan penutup (CTA) |
| `text-ref-h2` | 35 → 60px | 1.12 | −0.05em | judul section (`SplitHeading`) |
| `text-ref-caption` | 36 → 57px | 1.12 | −0.05em | judul di atas foto banner |
| `text-ref-h3-lg` | 26 → 30px | 1.25 | −0.025em | judul kartu besar |
| `text-ref-h3` | 25px | 1.25 | −0.025em | judul kartu/item |
| `text-ref-contact` | 22 → 40px | 1.3 | −0.04em | email besar di kontak |
| `text-ref-lead` | 17px | 1.75 | — | paragraf pembuka hero (mulai `md`) |

- Aturan global `h1:not([class*="text-ref-"]) { letter-spacing: 0 }` sengaja **mengecualikan** `text-ref-*`, supaya letter-spacing rapat dari token tetap berlaku.
- `accent` (field YAML) = lanjutan judul di baris baru berwarna `text-primary` (emas), ciri khas judul parametris.com.

### Palet situs (cadangan)

| Peran | Font | Paket |
|---|---|---|
| `h1` (`--display-family`, `font-display`) | **Roboto Condensed** (sementara), `letter-spacing: 0` | `@fontsource-variable/roboto-condensed` |
| `h2`–`h6` (`--heading-family`, `font-heading`) | Archivo | `@fontsource-variable/archivo` |
| Teks biasa (`--font-sans`) | Archivo (variable: weight 100–900, width 62–125%) | |
| Label, angka, eyebrow (`font-mono`) | JetBrains Mono | `@fontsource-variable/jetbrains-mono` |

Skala (`clamp()`): `text-display-xl` 48→88px/800 · `text-display` 40→64px/800 · `text-h1` 36→52px/800 · `text-h2` 28→40px/700 · `text-h3` 24px/700 · `text-h4` 20px/700 · `text-lead` 20px · `text-body` 16px · `text-small` 14px · `text-caption` 13px · `text-eyebrow` 12px/500/0.14em (pakai dengan `font-mono uppercase`).

- Kandidat font lain masih terpasang untuk `/prototype/fonts` (Schibsted Grotesk, Hanken Grotesk, Instrument Sans; referensi awal Trim berbayar). Setelah final: hapus `@import`, `npm uninstall`, dan `src/prototype/pages/fonts.astro`.
- Tailwind v4: `@theme inline` tidak bisa ditimpa per elemen, maka font judul memakai variabel `--display-family` / `--heading-family` di `:root` (dan ditimpa `.theme-parametris`).

## Jarak, radius, gerak

### Jarak universal

| Token | Palet situs | Palet parametris.com | Fungsi |
|---|---|---|---|
| `--page-max` | 80rem (1280px) | 90rem (1440px) | lebar maksimum isi |
| `--page-gutter` | 1rem → 2rem (`md`) | 5% → 6.2% (mulai 1050px) | jarak kiri-kanan |
| `--section-y` | 4rem → 6rem (`md`) | 60px → 95px (mulai 781px) | jarak atas-bawah section |

| Utility | Isi |
|---|---|
| `container-page` | tengah + `max-width: --page-max` + `padding-inline: --page-gutter` |
| `section-y` | `padding-block: --section-y` |

Komponen baru **wajib** memakai `container-page` / `section-y` (bukan `mx-auto max-w-7xl px-4`), supaya semua tepi kiri sejajar dan ikut berganti saat palet diganti.

### Radius

`rounded-sm` 6px (chip, tag) · `rounded-md` 8px (tombol, input) · `rounded-lg` 12px (kartu) · `rounded-xl` 16px (panel) · `rounded-full` (badge). Variasi gaya parametris.com memakai **sudut tegas** (`square` / `rounded-none`).

### Gerak

| Token | Nilai | Pemakaian |
|---|---|---|
| `ease-out-expo` | `cubic-bezier(0.16, 1, 0.3, 1)` | panel/menu muncul |
| `ease-out-quart` | `cubic-bezier(0.25, 1, 0.5, 1)` | hover umum (300ms) |
| `ease-in-out-quart` | `cubic-bezier(0.76, 0, 0.24, 1)` | perpindahan besar |

Animasikan `transform` dan `opacity` saja. Rencana: View Transitions (`<ClientRouter />`), smooth scroll.

## Logo

- File asli `public/logo-parametrik.png` (olive `#AAA753`, semi-transparan ±73%). Di situs dirender dari `public/logo-parametrik-mask.png` sebagai CSS mask, diwarnai token `--logo` (tetap olive di semua tone). Komponen: `ui/Logo.astro` (dipakai navbar & footer).
- ⚠️ Olive di putih hanya 2.5 : 1. **TODO:** minta versi SVG logo.

## Halaman: data-driven dari YAML

### 1 halaman = 1 folder

```
src/content/pages/
├── home/index.yaml + banner.jpg            → /
├── software/index.yaml                     → /software
├── manufacturing/index.yaml + illustration.png   → /manufacturing  (parent: iot)
└── ...
```

- **Nama folder = URL** (`home/` → `/`). `generateId` di `content.config.ts` membuang `/index`.
- **Gambar di folder yang sama** dengan `index.yaml`, ditulis relatif (`src: ./banner.jpg`) dan dioptimasi `astro:assets`.
- **URL datar seperti parametris.com** (`/manufacturing`, bukan `/iot/manufacturing`): hubungan induk–anak lewat field **`parent: iot`**. Folder bertingkat (`pages/iot/x/index.yaml` → `/iot/x`) tetap didukung dan juga dianggap anak.
- File tunggal `pages/<nama>.yaml` masih terbaca, tapi pola folder yang dipakai.
- Satu rute `src/pages/[...slug].astro` membuat semua halaman. **Tidak ada file `.astro` per halaman.**

### Field halaman

| Field | Fungsi |
|---|---|
| `title` | judul tab (`<title> — Parametrik`) dan judul kartu kalau jadi anak |
| `description` | meta description + Open Graph |
| `parent` | id halaman induk (kartu otomatis di induk lewat `cards › from`) |
| `summary`, `order`, `image` | isi kartu di halaman induk (urut `order`) |
| `sections[]` | daftar section, dirender berurutan |

```yaml
title: Manufaktur
description: ...
parent: iot
summary: ...
order: 1
image: { src: ./illustration.png, alt: ... }
sections:
  - type: hero
    variant: HeroText_001
    title: ...
    accent: ...
  - type: features
    variant: FeaturesRows_001
    items: [...]
```

Urutan bebas, section yang sama boleh dipakai berkali-kali, isi selalu per halaman. Template lengkap tiap section: [MODULES.md](MODULES.md).

### Halaman situs (= parametris.com versi Indonesia)

| URL | Folder | Isi |
|---|---|---|
| `/` | `home/` | hero, banner foto, catalog ringkas (6 kategori), kartu IoT (tone dark), kartu layanan, 2 artikel asli (`posts › items`), cta |
| `/software` | `software/` | hero, catalog lengkap dengan daftar produk PTC (link ke ptc.com) |
| `/iot` | `iot/` | hero, kartu otomatis dari halaman `parent: iot`, features, benefits, cta |
| `/manufacturing`, `/healthcare`, `/energy`, `/smart-city` | `parent: iot` | hero, ilustrasi (`MediaFigure_001`), features, benefits, cta |
| `/services` | `services/` | hero di atas foto (`HeroText_002`), kartu otomatis dari `parent: services`, features, benefits, cta |
| `/training`, `/consulting`, `/engineering` | `parent: services` | seperti sektor; training + custom training (tag) & metode pelaksanaan (kolom) |
| `/about` | `about/` | hero, features, bidang penerapan (tag), cta |
| `/contact` | `contact/` | hero, kontak langsung (data `site.yaml › contact`, tombol WhatsApp & telepon) |

Halaman uji (dev saja): `src/prototype/content/pages/contoh-halaman.yaml` → `/contoh-halaman`.

## Section & variasi

### Susunan folder (standar semua section)

```
src/components/sections/<nama>/          (navbar/footer: src/components/layout/<nama>/)
├── <Nama>.astro                ← pintu masuk: ambil data, pilih variasi (lewat WrappedVariant)
├── variants.ts                 ← deteksi otomatis file <Nama>*_*.astro (import.meta.glob) + bawaan per variasi (opsional)
├── types.ts                    ← props bersama SEMUA variasi
└── <Nama><Gaya>_<NNN>.astro    ← 1 file = 1 variasi
```

| Bagian | Aturan |
|---|---|
| Nama variasi | `<Nama><Gaya>_<NNN>`. Gaya = bentuk dasar (`Text`, `Gallery`, `Rows`, …); nomor 3 digit mulai `_001`. Gaya baru mulai lagi `_001` |
| Basic | setiap section punya `<Nama>Basic_001`: HTML polos tanpa desain, hanya `container-page` + `section-y`. Bawaan kalau `variant:` tidak diisi, dan bukti semua data sampai ke halaman. Jangan dihapus |
| Menambah variasi | tambah file; tidak ada daftar manual. Langsung bisa dipilih, muncul di `/prototype/<nama>` dan `/prototype/variants` (sebagai "tidak dipakai" sampai ditulis di YAML) |
| Props sama | semua variasi menerima props yang sama (`types.ts`), jadi ganti `variant:` tidak merusak isi. Variasi boleh **mengabaikan** field (mis. Basic tidak menampilkan gambar kartu); field yang dikosongkan bagiannya hilang |
| Helper | `src/lib/variants.ts`: `collectVariants`, `isBasic`, `resolveVariant`, `pickVariant` (pesan error menyebut pilihan yang ada) |
| Kode bersama | `sections/WrappedVariant.astro` (pilih variasi + bungkus `ui/Section`), `sections/BasicHeading.astro` (judul versi Basic), `sections/SplitHeading.astro` (judul gaya parametris.com), `sections/types.ts` (`SectionHeading`, `SectionImage`, `Link`, `numbered(i)`) |

**Mengganti variasi aman ke dua arah:** pindah dari variasi tanpa tombol ke variasi bertombol tidak error; tombol muncul kalau `actions` diisi di YAML. Yang perlu diwaspadai: **field salah ketik dibuang diam-diam** oleh zod (mis. `action:` → tombol hilang tanpa pesan). Cocokkan dengan MODULES.md.

### Pembungkus section — `ui/Section.astro`

Mengatur latar, lebar, dan posisi, terpisah dari isi (pola `b-section` + `s-context` fastems.com). Nilai yang diizinkan di `src/lib/section.ts`.

| Prop | Nilai | Keterangan |
|---|---|---|
| `tone` | `default` · `alt` · `dark` · `green` · `olive` · `gradient` | lihat [Tone section](#tone-section-tone-di-yaml) |
| `width` | `full` · `contained` | `contained` = panel `rounded-xl` di dalam gutter |
| `pulldown` | `true` / `false` | ditarik ke atas 96px (`md:-mt-24`) menumpuk section sebelumnya, hanya mulai `md` |

- **Bawaan per variasi** di `variants.ts` (`introDefaults`, `ctaDefaults`). Nilai di YAML selalu menang. Contoh: `CtaClosing_001` bawaan `tone: alt`.
- **Variasi Basic selalu mengabaikan `tone/width/pulldown`.**
- Section `media` dan `hero` **tidak** dibungkus `ui/Section` (mengatur latarnya sendiri).

## Katalog section & variasi

Pemakaian per 2026-11-09: **dipakai** = dipakai di situs, **base** = versi Basic, **tidak dipakai** = desain yang tidak dipakai saat ini (data terbaru otomatis di `/prototype/variants`). Field per variasi: [MODULES.md](MODULES.md).

### Hero — `sections/hero/`

Isi: `eyebrow`, `aside` (`label`, `href?`), `title`, `accent`, `description`, `actions[]` (`label`, `href`, jumlah bebas; pertama = utama), `image`, `size` (`xl`/`default`), `links[]`.

| Variasi | Pemakaian | Tampilan |
|---|---|---|
| `HeroBasic_001` | base | teks polos |
| `HeroText_001` | **dipakai** | hero teks parametris.com: label kiri + `aside` kanan, judul tipis sangat besar (`text-ref-h1`, halaman lain `-inner`) + `accent` emas, deskripsi + tombol bergaris. Dipakai 12 halaman |
| `HeroText_002` | **dipakai** | seperti `_001` di atas foto (`image`) dengan lapisan gelap. Dipakai `/services` |
| `HeroImage_001` | tidak dipakai | foto penuh + gradasi gelap, teks putih kiri bawah (palet situs) |
| `HeroImage_002` | tidak dipakai | foto penuh + kartu putih berisi judul dan daftar link (`links`, kosong = item menu); referensi fastems.com |

`HeroBackground.astro` = latar foto / placeholder bergaris untuk `HeroImage_*`. Foto hero ideal ≥ 1600px lanskap.

### Intro — `sections/intro/`

Isi: `eyebrow`, `title`, `description` (paragraf dipisah baris kosong), `highlight`, `media` (`youtube` + `id` · `image` + `src` · `placeholder`). Bawaan per variasi: `introDefaults`.

| Variasi | Pemakaian | Tampilan |
|---|---|---|
| `IntroBasic_001` | base | teks + link media |
| `IntroMedia_001` | tidak dipakai | panel teks kiri + media kanan (bawaan `contained`) |
| `IntroMedia_002` | tidak dipakai | judul besar di atas, teks + media bersudut tegas di bawah (bawaan `full`) |

Belum dipakai halaman situs (parametris.com tidak punya section ini).

### Media — `sections/media/`

Isi: `image` (wajib), `eyebrow`, `title`, `accent`. Tidak dibungkus `ui/Section`.

| Variasi | Pemakaian | Tampilan |
|---|---|---|
| `MediaBasic_001` | base | gambar + teks |
| `MediaBanner_001` | **dipakai** | foto selebar layar + judul putih kiri bawah (`text-ref-caption`); `.visual` referensi. Beranda |
| `MediaFigure_001` | **dipakai** | gambar utuh selebar isi (`.detail-image`). Ilustrasi halaman sektor & layanan |

### Cards — `sections/cards/`

Isi: judul section + **`from: <id induk>`** (otomatis dari halaman ber-`parent`, pakai `title`/`summary`/`image`, urut `order`) **atau** `items[]` manual (`title`, `description`, `href`, `image`); `linkLabel`, `more`.

| Variasi | Pemakaian | Tampilan |
|---|---|---|
| `CardsBasic_001` | base | daftar link |
| `CardsGallery_001` | **dipakai** | kartu foto 2 kolom bergaris, bernomor (sektor IoT; biasanya `tone: dark`) |
| `CardsGallery_002` | **dipakai** | kartu foto 3 kolom (layanan) |

### Catalog — `sections/catalog/`

Isi: judul section, `categories[]` (kosong = semua kategori tingkat atas), `limit` (produk per kategori; kosong = semua, `0` = tanpa daftar produk), `more`. Data dari koleksi `products`; setiap kategori punya anchor `#<id>`.

| Variasi | Pemakaian | Tampilan |
|---|---|---|
| `CatalogBasic_001` | base | daftar kategori + produk |
| `CatalogGrid_001` | **dipakai** | grid kategori bergambar bernomor; daftar produk di bawah kartu. Beranda (`limit: 0`) & `/software` |

### Features — `sections/features/`

Isi: judul section + `items[]` (`title`, `description`).

| Variasi | Pemakaian | Tampilan |
|---|---|---|
| `FeaturesBasic_001` | base | daftar |
| `FeaturesRows_001` | **dipakai** | baris bernomor bergaris ("KAPABILITAS") |

### Benefits — `sections/benefits/`

Isi: judul section + `items[]` (`icon`, `title`, `description`, `entries[]` = `term`/`detail`) + `note`. `icon` = nama file di `src/assets/icons/` (tanpa `.svg`).

| Variasi | Pemakaian | Tampilan |
|---|---|---|
| `BenefitsBasic_001` | base | daftar |
| `BenefitsIcons_001` | **dipakai** | grid ikon ("MANFAAT & KEUNGGULAN") |
| `BenefitsTags_001` | **dipakai** | deretan tag ("BIDANG PENERAPAN", custom training) |
| `BenefitsColumns_001` | **dipakai** | dua kolom berincian `entries` ("METODE PELAKSANAAN") |

### Posts — `sections/posts/`

Isi: judul section, `limit`, `category`, `more`, `linkLabel`, atau **`items[]` manual** (`title`, `category?`, `href`; link luar dibuka di tab baru). Tanpa `items` = koleksi `posts` (artikel `draft: true` tidak ikut build), terbaru di atas.

| Variasi | Pemakaian | Tampilan |
|---|---|---|
| `PostsBasic_001` | base | judul + tanggal |
| `PostsGrid_001` | **dipakai** | 2 kolom: kategori, judul, link teks |

### Text — `sections/text/`

Isi: judul section + `body` (paragraf dipisah baris kosong). Hanya `TextBasic_001` (base). Belum dipakai situs.

### CTA — `sections/cta/`

Isi: judul section + `actions[]`.

| Variasi | Pemakaian | Tampilan |
|---|---|---|
| `CtaBasic_001` | base | judul + link |
| `CtaClosing_001` | **dipakai** | penutup "MULAI PERCAKAPAN", judul `text-ref-closing`, bawaan `tone: alt`. Dipakai 12 halaman |

### Contact — `sections/contact/`

Isi: judul section, `contact` (menimpa `site.yaml › contact` untuk section ini), `actions[]`, `addressLabel`, `form` (`fields[]`, `submit`; **mockup**, belum terkirim). Data bawaan: `site.yaml › contact` (`email`, `phone`, `address[]`, `hours`, `emails[]`, `phones[]` berlabel). Link telepon dibuat `telHref()`.

| Variasi | Pemakaian | Tampilan |
|---|---|---|
| `ContactBasic_001` | base | data kontak + formulir polos |
| `ContactDirect_001` | **dipakai** | email besar, tombol WhatsApp/telepon, alamat di kolom kanan, tanpa formulir |

## Navbar, footer, artikel

Ketiganya **mandatory**: berlaku di semua halaman, variasinya dipilih sekali di `site.yaml`.

### Navbar — `layout/navbar/`

Variasi: `site.yaml › navbar.variant`. Item menu: `src/content/menu/*.yaml` (1 item = 1 file: `title`, `description?`, `href`, `order`, `children[]`). Item dengan `href: ""` = hanya judul dropdown (mis. **Produk** → Software, Internet of Things). Tombol CTA: `site.yaml › cta`.

| Variasi | Pemakaian | Tampilan |
|---|---|---|
| `NavbarBasic_001` | base | link teks + sub-menu |
| `NavbarDropdown_001` | **dipakai** | header **sticky** putih sedikit transparan + blur (`bg-background/96 backdrop-blur-md`, sengaja seperti referensi walau dulu diputuskan "tanpa glassmorphism"), dropdown sub-menu (`<details>`), CTA bergaris, tombol menu di HP (script kecil `data-navdrop`). Tombol bahasa EN/ID belum |
| `NavbarPanel_001` | tidak dipakai | `fixed` 64px, latar solid tanpa glassmorphism, tombol menu → panel geser dari kanan (700ms `ease-out-expo` buka / 400ms tutup), lapisan `bg-midnight/60`, Escape menutup; hanya judul utama. Menaruh spacer `h-16` sendiri |

### Footer — `layout/footer/`

Variasi: `site.yaml › footer.variant`. Selalu di dasar layar (`body` flex `min-h-screen`, `main` `flex-1`).

| Field (`site.yaml › footer`) | Keterangan |
|---|---|
| `company` | nama perusahaan (alamat & copyright) |
| `tagline` | kalimat di bawah logo |
| `email`, `phone`, `location` (`label`, `href`) | kolom kontak |
| `exploreTitle`, `contactTitle` | judul kolom |
| `explore[]` (`label`, `href`) | isi kolom menu; kosong = item menu utama |
| `address[]`, `socialsTitle` | dipakai `FooterSimple_001` |
| `socials[]` (`platform`, `href`) | facebook, instagram, linkedin, youtube, x, tiktok, whatsapp |

| Variasi | Pemakaian | Tampilan |
|---|---|---|
| `FooterBasic_001` | base | teks polos |
| `FooterColumns_001` | **dipakai** | 3 kolom (logo + tagline, menu, kontak) + copyright & sosial sebagai link teks |
| `FooterSimple_001` | tidak dipakai | logo + alamat kiri, ikon sosial bulat kanan (dhl.com), garis + copyright |

### Artikel — `sections/post/`

Halaman `/posts/<slug>/`. Variasi hanya **menyusun** blok di `blocks/` (`PostHeader`, `PostCover`, `PostBody`, `PostToc`, `PostTags`, `PostRelated`), tidak menulis ulang isi.

| Aturan | Isi |
|---|---|
| Pilih variasi | `site.yaml › post.variant`; satu artikel boleh menimpa lewat `variant:` di frontmatter |
| Elemen isi (kutipan, callout, tabel, gambar, FAQ) | ditulis di Markdown, gayanya di `global.css › .prose` (warna dari token; override sengaja di luar `@layer`) |
| Sidebar otomatis | daftar isi dari judul `##`/`###` (hilang kalau < 3); artikel terkait `getRelatedPosts` (kategori sama +2, tiap tag sama +1) |
| Label kecil | `site.yaml › post.labels` |

| Variasi | Pemakaian | Tampilan |
|---|---|---|
| `PostBasic_001` | base | HTML polos |
| `PostArticle_001` | **dipakai** | satu kolom sempit |
| `PostArticle_002` | tidak dipakai | kepala lebar + cover, sidebar daftar isi sticky, artikel terkait |

**1 artikel = 1 folder** (`src/content/posts/<slug>/index.md` + gambarnya): upload cukup satu folder, hapus artikel tidak meninggalkan gambar yatim, nama gambar tidak bentrok. Import Notion:

```bash
npm run import:notion -- "D:\Downloads\folder-export"            # + --slug judul-pendek, --force
```

Script `scripts/import-notion.mjs`: metadata tebal (Deskripsi, Tanggal Publikasi/Pembaruan, Penulis, Kategori, Tag) → frontmatter; gambar → `gambar-N.png` (pertama jadi `cover`); membuka link `google.com/search?q=`; mempertahankan Shift+Enter, callout, FAQ; menulis `draft: true`. Catatan: cover = gambar pertama isi, jadi `PostArticle_002` menampilkannya dua kali; sebaiknya siapkan cover terpisah.

## Komponen UI bersama

| Komponen | Fungsi |
|---|---|
| `ui/Section.astro` | pembungkus tone/width/pulldown |
| `ui/Button.astro` | link berbentuk tombol. `variant`: `primary` (isi `bg-primary`) · `secondary` (garis `foreground/25`) · `outline` (garis warna teks, hover terisi; gaya parametris.com) · `solid` (terisi warna teks). `size`: `md` 40px / `lg` 48px. `square` = sudut tegas |
| `ui/TextLink.astro` | link teks bergaris bawah (gaya parametris.com: "Semua solusi software"); tanpa `href` jadi `<span>` untuk di dalam kartu yang sudah berupa link |
| `ui/Icon.astro` | ikon SVG dari `src/assets/icons/<nama>.svg` (Lucide, `stroke="currentColor"`, lisensi di `LICENSE.txt`). Nama salah = error berisi daftar nama yang ada. Ikon baru = taruh file SVG |
| `ui/Logo.astro` | logo (CSS mask) + link beranda |
| `ui/SocialIcon.astro` | ikon garis per platform (platform baru: di sini + enum skema) |
| `ui/YouTube.astro` | facade: thumbnail + tombol play, iframe `youtube-nocookie.com` baru dimuat saat diklik. Props `id`, `title`, `square` |
| `ui/MediaPlaceholder.astro` | kotak `aspect-video` bergaris 48px + ikon play + `label`, pengganti media yang belum ada |

## Koleksi konten (skema)

Skema di `src/content.config.ts` (zod). **Kunci yang tidak dikenal dibuang tanpa pesan**; kunci tanpa nilai (`title:`) = `null` dan gagal `optional()`.

| Koleksi | Lokasi | Field |
|---|---|---|
| `site` | `src/content/site.yaml` | `name`, `description`, `url`, `lang`, `homeTitle?`, `theme` (`situs`/`parametris`), `cta`, `contact` (`email?`, `phone?`, `address[]`, `hours?`, `emails[]`, `phones[]`), `navbar.variant`, `footer` (lihat Footer), `post` (`variant`, `labels`) |
| `pages` | `src/content/pages/**` (dev: + `src/prototype/content/pages/`) | `title?`, `description?`, `parent?`, `summary?`, `order`, `image?`, `sections[]` (union berdasarkan `type`: hero, intro, cards, catalog, posts, text, cta, contact, media, features, benefits) |
| `menu` | `src/content/menu/*.yaml` | `title`, `description?`, `href` (`""` = judul dropdown), `order`, `children[]` (`title`, `href`) |
| `products` | `src/content/products/<id>.yaml` + `<id>.jpg` (dev: + `src/prototype/content/products/`) | 1 file = 1 kategori: `title`, `summary?`, `order`, `image?`, `items[]` (`name`, `description?`, `href?`). Kategori di subfolder hanya tampil kalau diminta lewat `categories:` |
| `posts` | `src/content/posts/<slug>/index.md` (dev: + `src/prototype/content/posts/`) | `title`, `description`, `pubDate`, `updatedDate?`, `author`, `category?`, `tags`, `cover?`, `coverAlt?`, `draft` (default false), `variant?` |

Pembaca data (`src/lib/content.ts`): `getSite`, `getPage`, `getSection`, `getMainLinks`, `pageHref`, `getChildPages` (by `parent` atau subfolder), `getProductCategories`, `getPosts`, `getRelatedPosts`.

Isi sekarang: 13 halaman, 6 kategori produk PTC (`cad`, `cam`, `cae`, `plm`, `alm`, `ar`; 32 produk, link ke ptc.com), 4 item menu (Beranda, Produk ▾, Layanan ▾, Tentang Kami), **0 artikel** (koleksi kosong, build memberi satu peringatan yang aman diabaikan).

## SEO & indexing

| Bagian | Isi |
|---|---|
| Domain | `astro.config.mjs › site` = `https://www.parametris.com` (samakan dengan `site.yaml › url`) |
| URL | sama dengan parametris.com (13 halaman, lihat [Halaman situs](#halaman-situs--parametriscom-versi-indonesia)) |
| `<title>` | beranda: `site.homeTitle` ("Parametrik — Software, IoT & Engineering"); lainnya: `<title halaman> — Parametrik` |
| Meta | `description` per halaman (kosong = `site.description`), `<html lang>` dari `site.lang` |
| Canonical | `Astro.site` + path dengan garis miring akhir |
| Open Graph | `og:type`, `og:site_name`, `og:title`, `og:description`, `og:url`, `og:locale` (`id_ID`). Belum: `og:image`, Twitter card |
| Sitemap | `@astrojs/sitemap` → `/sitemap-index.xml` (hanya halaman produksi; prototype tidak ikut) |
| `public/robots.txt` | izinkan semua, menunjuk sitemap www.parametris.com |
| `public/.htaccess` | (untuk hosting Apache) paksa HTTPS + `www`, 404, cache `_astro/` 1 tahun. Netlify mengabaikannya |

Catatan: link internal ditulis tanpa garis miring akhir, canonical dengan; Netlify (pretty URLs) menyamakannya. URL lama demo (`/iot/manufaktur`, `/layanan`, `/tentang`, `/kontak`, `/artikel`) sudah tidak ada.

## Pemakaian variasi & prototype

### Yang ditulis di YAML = yang tampil

**Tidak ada status atau daftar persetujuan.** Variasi yang ditulis di `variant:` (YAML halaman atau `site.yaml`) itulah yang tampil, **sama persis saat dev dan build**. Persetujuan terjadi lewat alur kerja:

1. Buat variasi baru (file `<Nama><Gaya>_<NNN>.astro`) di folder section.
2. Tinjau di `/prototype/<section>` (combo box variasi + contoh isi dari halaman mana pun).
3. Kalau oke, tulis namanya di `variant:` YAML halaman.
4. Commit/push ke `demo` (Netlify) hanya kalau diminta.

`/prototype/variants` dan combo box prototype memberi label yang **dihitung otomatis dari YAML** (`src/prototype/usage.ts`):

| Label | Artinya |
|---|---|
| **dipakai** | ditulis di YAML situs (halaman, `site.yaml`, frontmatter artikel) |
| **base** | versi `<Nama>Basic_<NNN>` yang tidak dipakai. Jangan dihapus: bawaan kalau `variant:` kosong |
| **tidak dipakai** | desain yang tidak dipakai saat ini. Boleh dihapus kalau tidak diperlukan lagi (riwayat tetap di git) |

- Pemakaian di konten uji (`src/prototype/content/`) tetap ditampilkan dengan tanda "(uji)", tetapi tidak dihitung sebagai dipakai.
- Nama variasi salah ketik di YAML = error saat dev/build yang menyebut semua pilihan yang ada.
- Semua variasi (dipakai atau tidak) ikut di-compile saat build: file variasi yang error membuat build gagal.
- Sekarang (2026-11-09): **17 dipakai, 7 tidak dipakai, 14 base**.

### Prototype (`/prototype`, hanya `astro dev`)

Tidak pernah ikut build (`src/prototype/integration.mjs` menyuntik rute `/prototype/[...path]` dengan `prerender: false` hanya saat dev, didaftarkan di `astro.config.mjs`). Halaman prototype "murni": tanpa navbar/footer situs, hanya bar combo box (atas, sticky) dan tombol kembali (bawah, fixed), keduanya putih.

Daftar `/prototype` dikelompokkan **per folder kode**, supaya nama grup langsung menunjukkan file mana yang diubah:

| Grup | Halaman | Isi |
|---|---|---|
| **global.css** | colors, fonts | token warna, font, jarak untuk seluruh situs (`src/styles/global.css`) |
| **ui** | ui | semua komponen `src/components/ui/` dengan semua pilihan props-nya (Button variant × size × square, TextLink, semua ikon di `src/assets/icons/`, SocialIcon, Logo, MediaPlaceholder); combo box palet + latar terang/gelap |
| **layout** | navbar, footer | `src/components/layout/`: ada di semua halaman, variasinya dipilih di `site.yaml` |
| **sections** | hero, intro, media, cards, catalog, features, benefits, posts, text, cta, contact, post | `src/components/sections/`: disusun per halaman di YAML (template di MODULES.md); `post` = halaman artikel |
| **Tinjauan** | variants | tabel semua variasi: dipakai / base / tidak dipakai, dipakai di mana (halaman, `site.yaml`, frontmatter), link preview |
| Lainnya | (otomatis) | file baru yang belum dikelompokkan di `pages/index.astro` |

Combo box (nilai di URL, bisa dibagikan): `?v=` variasi (dengan tanda pemakaian, opsi **Semua variasi** = berjajar dengan label), `?c=` contoh isi (setiap section berjenis itu di semua halaman YAML, beranda dulu), `?palet=` palet, `?tone=`, `?p=` artikel, `?font=`. Bawaan = yang dipakai situs.

Halaman modul cukup satu baris: `<SectionPreview section="cards" />` (`src/prototype/SectionPreview.astro`). Section baru perlu didaftarkan di `variantsBySection` di file itu.

Konten uji (dev saja): `src/prototype/content/pages/contoh-halaman.yaml`, `src/prototype/content/posts/` (`contoh-semua-elemen` berisi semua elemen artikel, artikel kelistrikan asli, `article-title-1..4`). Konten uji ikut muncul di daftar artikel saat dev, tidak saat build.

## Struktur file

```
├── astro.config.mjs            ← site (domain), integrasi (sitemap, mdx, react, prototype), Tailwind
├── netlify.toml                ← build Netlify: npm run build → dist, Node 22
├── public/                     ← favicon, logo (+ mask), robots.txt, .htaccess
├── reference/Parametris_Complete_Source_v8/   ← arsip export parametris.com dari klien (read-only, di luar src/, tidak di-scan Astro/Tailwind)
├── scripts/import-notion.mjs   ← impor export Notion → src/content/posts/<slug>/
├── AGENTS.md · DESIGN.md · MODULES.md
└── src/
    ├── content/                ← SEMUA isi (lihat Koleksi konten)
    │   ├── site.yaml
    │   ├── pages/<url>/index.yaml + gambar
    │   ├── menu/*.yaml
    │   ├── products/<id>.yaml + <id>.jpg
    │   └── posts/<slug>/index.md + gambar
    ├── content.config.ts       ← skema zod
    ├── lib/                    ← content.ts (pembaca data), variants.ts (deteksi & pemilihan variasi), section.ts (tone/width)
    ├── layouts/BaseLayout.astro ← <head> (SEO), tema, Navbar, <main>, Footer; prop `bare` = tanpa navbar/footer
    ├── pages/
    │   ├── [...slug].astro     ← SEMUA halaman dari content/pages
    │   └── posts/[id].astro    ← halaman artikel
    ├── components/
    │   ├── layout/navbar/, layout/footer/       ← mandatory
    │   ├── sections/<nama>/                     ← hero, intro, media, cards, catalog, features, benefits, posts, text, cta, contact, post
    │   ├── sections/Sections.astro              ← peta `type` → pintu masuk
    │   ├── sections/WrappedVariant.astro, BasicHeading.astro, SplitHeading.astro, types.ts
    │   └── ui/                                  ← Button, TextLink, Icon, Logo, Section, SocialIcon, YouTube, MediaPlaceholder
    ├── assets/icons/*.svg      ← ikon Lucide untuk ui/Icon
    ├── styles/global.css       ← SEMUA token (dua palet, font, skala, jarak, tone, .prose)
    └── prototype/              ← hanya dev
        ├── pages/              ← /prototype/... (index, variants, colors, fonts, ui, navbar, footer, post, + 1 file per section)
        ├── content/            ← halaman & artikel uji
        ├── PrototypeLayout.astro, SectionPreview.astro, VariantLabel.astro, controls.ts, route.astro
        └── integration.mjs
```

Branch: `prototype-01` (kerja harian) → `demo` (Netlify https://parametris-astro-practice-001.netlify.app) → `master` (lewat PR). `referensi` = kode asli Jasa Listrik Bandung (read-only), asal pola "1 file = 1 section".

## Aturan

- **Tanpa teks atau warna hardcode di komponen.** Teks dari `src/content/`, warna dari token (`bg-primary`, bukan `bg-green-500` atau `#86732c`).
- **Satu komponen untuk bentuk yang sama** (satu `Hero` dengan props, bukan `HeroHome`, `HeroAbout`).
- **Latar & lebar diatur `ui/Section`**, bukan di dalam variasi.
- **Gaya:** class Tailwind langsung di file variasi, nilainya dari token. `<style>` di variasi hanya untuk hal khusus. `global.css` hanya untuk token situs-wide.
- **Jarak:** selalu `container-page` / `section-y`.
- Import memakai alias `@/` (mis. `@/components/sections/hero/Hero.astro`).
- Komentar CSS jangan memuat `*/` di tengah teks.
- Setiap menambah field, variasi, atau jenis section: perbarui **MODULES.md**, bagian terkait di dokumen ini, dan satu baris di *Riwayat keputusan*.

## Riwayat keputusan

- **2026-11-02:** Palet B dipilih (olive + `#070C11` + teal + biru). Archivo font utama (sementara). Tailwind v4 dengan token di `global.css`. Navbar sempat glass ringan, lalu **solid tanpa glassmorphism**.
- **2026-11-02 (revisi):** Palet B diganti 2 warna dasar (Midnight Mirage, Praxeti White) + 4 warna utama (lime, mantis, green, blue). Logo tetap olive `#AAA753`.
- **2026-11-03:** Struktur file ditetapkan mengikuti branch `referensi` (`BaseLayout`, `components/{layout,sections,ui}`, koleksi `posts`). Plugin `@tailwindcss/typography` untuk artikel.
- **2026-11-03 (revisi):** Postingan **1 folder per postingan** (gambar di folder yang sama), atas masukan atasan. Script `npm run import:notion`.
- **2026-11-03 (revisi 2):** **Light mode saja**; token gelap dipertahankan untuk `theme-dark`. Override `prose` dipindah ke luar `@layer`.
- **2026-11-03 (revisi 3):** Palet dirampingkan menjadi **5 warna + putih**; latar putih `#FFFFFF` seperti dhl.com; netral diturunkan lewat `color-mix`.
- **2026-11-03 (revisi 4):** Teks & judul **hitam `#000000`**; judul ditebalkan (display/h1 800, h2–h4 700).
- **2026-11-03 (revisi 5–8):** Fokus ke section: `Hero` + `Button`; hero foto penuh + gradasi; hero dipecah jadi **variasi bernomor** (`HeroImage_001/_002`) yang **terdeteksi otomatis**; item menu jadi koleksi `menu` (1 item = 1 file).
- **2026-11-03 (revisi 9–11):** Font judul dipisah (`--heading-family`, lalu `--display-family` untuk `h1`); Bebas Neue sempat dicoba lalu diganti **Roboto Condensed**.
- **2026-11-03 (revisi 12):** Semua kalimat disatukan di `src/content/` (`site.yaml`, `pages/home.yaml`); pembaca di `src/lib/content.ts`.
- **2026-11-03 (revisi 13–14):** Footer dengan pola variasi (`FooterSimple_001`, fastems.com), sosial media di kanan (dhl.com). `ui/Logo`, `ui/SocialIcon`.
- **2026-11-04 (revisi 15):** **Standar section dengan variasi** (`variants.ts` + `lib/variants.ts`). Halaman preview `/preview/<nama>`. Pembungkus `ui/Section` (tone/width/pulldown, fastems.com), section Intro, `ui/YouTube` (facade).
- **2026-11-04 (revisi 16–18):** Placeholder media (`ui/MediaPlaceholder`); tone `green` dan `olive`; `IntroMedia_002`; bawaan per variasi (`introDefaults`).
- **2026-11-04:** Teks di tone olive diganti putih (2.5 : 1, keputusan sadar). Judul intro disamakan dengan hero (Roboto Condensed `text-h1`, tag `h2`).
- **2026-11-04 (revisi 3):** Jarak universal `--page-max`, `--page-gutter`, `--section-y` + utility `container-page`, `section-y`.
- **2026-11-04 (revisi 4–8):** **Produksi dipisah dari prototype** (`src/prototype/`, hanya dev, rute `/prototype/<nama>`, render per permintaan). Modul artikel dengan blok bersama (`sections/post/blocks/`). `PrototypeLayout` murni (tanpa navbar/footer), bar atas combo box di URL + opsi "Semua", bar bawah tombol kembali, keduanya putih.
- **2026-11-05:** **Susunan halaman pindah ke YAML** (`sections` + `type` + `variant`), satu rute `[...slug].astro`. Hero `actions` jumlah bebas.
- **2026-11-05 (revisi 2–4):** Belum ada desain resmi: produksi hanya **Basic**, desain jadi kandidat. `resolveVariant()`: saat build kandidat diganti Basic. Navbar dijadikan section bervariasi. YAML tetap menunjuk desain kandidat supaya dev berdesain.
- **2026-11-05 (revisi 5):** Mockup arsitektur ala parametris.com: section `cards`, `catalog` (koleksi `products`), `posts`, `text`, `cta`, `contact`; menu `children`; teks placeholder.
- **2026-11-05 (revisi 6):** **Variasi kembali ke folder section-nya**, status di `src/content/variants.yaml` (pass/draft/base). Istilah "kandidat" → "draft". Halaman `/prototype/variants`.
- **2026-11-06:** Variasi yang dipakai situs disetujui untuk demo. Dokumentasi serah-terima `AGENTS.md`.
- **2026-11-06 (revisi 2):** **Rekonstruksi parametris.com di prototype** dari export klien: section baru `media`, `features`, `benefits`; variasi gaya referensi untuk navbar, hero, cards, catalog, posts, cta, contact, footer; palet `.theme-parametris` + `text-ref-*`; komponen `SplitHeading`, `TextLink`, `Icon`, Button `outline`/`solid`/`square`. Semua awalnya draft.
- **2026-11-06 (revisi 3):** Halaman prototype `coba/`, `tutorial/`, dan `src/prototype/sections/` dihapus. Ide baru = variasi draft di folder section.
- **2026-11-06 (revisi 4):** **MODULES.md** (template YAML per bagian). Daftar `/prototype` dikelompokkan Mandatory / Modul / Tinjauan.
- **2026-11-06 (revisi 5):** Label status disingkat **base / pass / draft**.
- **2026-11-06 (revisi 6):** **Situs dimigrasi ke parametris.com:** isi asli (ID), URL sama, **1 halaman = 1 folder** + field `parent`, gambar produk sefolder dengan YAML, variasi gaya parametris.com jadi **pass** (desain lama draft), `site.yaml › theme: parametris`, `homeTitle`, `footer.explore`, `posts › items`; canonical + Open Graph; domain `https://www.parametris.com` (astro.config, robots.txt, .htaccess); arsip export dipindah ke `reference/`; `/prototype/referensi` dihapus; artikel dummy pindah ke prototype.
- **2026-11-06 (revisi 7):** **Dokumentasi dirapikan** ke kondisi terkini: DESIGN.md disusun ulang (dua palet, katalog semua variasi, SEO, skema, struktur), riwayat diurutkan kronologis. Arsitektur dianggap stabil; selanjutnya perubahan kecil.
- **2026-11-09:** **Sistem status variasi (base/pass/draft) dihapus.** Alasannya: desain baru sudah ditinjau di prototype sebelum ditulis di YAML, jadi "dipakai di YAML" = disetujui; status manual hanya pekerjaan dobel dan membuat dev ≠ build (draft diganti Basic). Dihapus: `src/content/variants.yaml`, koleksi `variants`, `variantStatus`/`getApprovedVariants` dan pengganti Basic saat build. Gantinya: label **dipakai / base / tidak dipakai** di prototype, dihitung otomatis dari YAML (`src/prototype/usage.ts`; pemakaian di konten uji ditandai "uji" dan tidak dihitung). Versi Basic tetap ada.
- **2026-11-09 (revisi 2):** Daftar `/prototype` dikelompokkan **per folder kode** (global.css · ui · layout · sections · Tinjauan), menggantikan Mandatory / Modul. Ditambah halaman **`/prototype/ui`** (semua komponen `ui/` + semua ikon, palet & latar gelap).
