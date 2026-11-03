# Parametrik — Design System

> Dokumen hidup. Semua nilai di sini sudah terpasang sebagai token di [`src/styles/global.css`](src/styles/global.css).
> Contoh visualnya bisa dilihat di halaman `/preview_001` (jalankan `astro dev`). Struktur folder ada di bagian [Struktur file](#struktur-file).
> Kalau mengubah token, ubah di `global.css` **dan** catat di sini.

## Ringkasan

- **Tema:** seluruh situs **light mode**, latar putih `#FFFFFF` (sama dengan latar artikel dhl.com), teks hitam `#000000`. Tidak ada tombol ganti tema. Section gelap memakai `theme-dark`.
- **Palet:** **5 warna + putih + hitam**: midnight `#001F3E`, blue `#1E4890`, green `#00804D`, mantis `#75C462`, lime `#DBE64C`. Warna lain (garis, teks sekunder, hover) diturunkan dari palet lewat `color-mix`.
- **Font:** judul besar (`h1`) **Roboto Condensed** (sementara), judul lain dan teks biasa **Archivo**, label/angka/eyebrow JetBrains Mono.
- **Prinsip:** komponen memakai **token semantik** (`bg-primary`, `text-muted-foreground`), bukan kode warna langsung. Ganti warna cukup di satu tempat.

## Warna

### Palet (5 warna + putih + hitam)

Hanya warna ini yang boleh muncul. Sumber: palet Coolors `001F3E · 1E4890 · 00804D · 75C462 · DBE64C`.

| Token | Hex | Peran |
|---|---|---|
| `white` | `#FFFFFF` | Latar seluruh situs, teks di section gelap |
| `black` | `#000000` | **Teks biasa & judul** di latar putih |
| `midnight` | `#001F3E` | Latar section gelap, bahan turunan (garis, teks sekunder) |
| `blue` | `#1E4890` | Link/highlight di latar putih |
| `green` | `#00804D` | **Aksi utama** (tombol, eyebrow) di latar putih |
| `mantis` | `#75C462` | Link/highlight di section gelap |
| `lime` | `#DBE64C` | **Aksi utama** di section gelap |

### Turunan (bukan warna baru)

Dicampur dari palet dengan `color-mix(in srgb, ...)`, jadi otomatis ikut berubah kalau palet diganti.

| Token | Rumus | Hasil | Peran |
|---|---|---|---|
| `background-alt` | midnight 4% + putih | `#F5F6F7` | Section selang-seling, callout |
| `border` | midnight 12% + putih | `#E0E4E8` | Garis & border |
| `muted-foreground` | midnight 70% + putih | `#4D6278` | Teks sekunder |
| `primary-hover` | green 80% + midnight | `#006D4A` | Hover tombol |
| `background-alt` (gelap) | putih 5% + midnight | `#0D2A48` | Selang-seling di section gelap |
| `card` (gelap) | putih 8% + midnight | `#14314D` | Kartu, hover menu di section gelap |
| `border` (gelap) | putih 18% + midnight | `#2E4761` | Garis di section gelap |
| `muted-foreground` (gelap) | putih 70% + midnight | `#B3BCC5` | Teks sekunder di section gelap |
| `primary-hover` (gelap) | lime 75% + putih | `#E4EC79` | Hover tombol di section gelap |

### Token semantik

Nama mengikuti konvensi shadcn, jadi komponen shadcn otomatis memakai palet ini.

| Token | Terang (`:root`, `.theme-light`) | Gelap (`.theme-dark`) |
|---|---|---|
| `background` | `white` | `midnight` |
| `foreground` | `black` | `white` |
| `card` | `white` | turunan |
| `primary` | `green` | `lime` |
| `primary-foreground` | `white` | `midnight` |
| `highlight` | `blue` | `mantis` |
| `ring` | `green` | `lime` |
| `logo` | `#AAA753` (warna asli logo) | `#AAA753` |

> ⚠️ Logo olive di latar putih hanya **2.5 : 1** (di midnight 6.6 : 1), di bawah anjuran 3 : 1 untuk grafis. Perlu diputuskan: tetap, atau pakai versi logo lebih gelap di latar terang.

### Cara memakai tema

- **Seluruh situs memakai tema terang.** `<html>` tidak diberi class `dark` dan navbar tidak punya tombol ganti tema.
- **Section gelap sebagai aksen** (mis. hero, CTA, footer): tambahkan `theme-dark` pada `<section>`. Token di dalamnya berganti ke kolom gelap dan latarnya ikut terpasang (midnight).

### Aturan pemakaian warna

| Kombinasi | Kontras | Boleh? |
|---|---|---|
| Hitam di putih | 21 : 1 | ✅ Teks biasa & judul |
| Midnight di putih | 16.6 : 1 | ✅ Teks apa pun |
| Blue di putih | 8.8 : 1 | ✅ Teks/link |
| Green di putih | 5.0 : 1 | ✅ Teks/link |
| Putih di green (tombol) | 5.0 : 1 | ✅ |
| `muted-foreground` di putih | 6.3 : 1 | ✅ |
| Mantis di putih | 2.1 : 1 | ❌ Jangan untuk teks |
| Lime di putih | 1.4 : 1 | ❌ Jangan untuk teks |
| Lime di midnight | 12.2 : 1 | ✅ Teks apa pun |
| Mantis di midnight | 7.8 : 1 | ✅ Teks/link |
| Green di midnight | 3.3 : 1 | ⚠️ Hanya teks besar atau isian blok |
| Blue di midnight | 1.9 : 1 | ❌ Jangan untuk teks |
| Midnight di lime (tombol) | 12.2 : 1 | ✅ |

- **Latar putih:** green untuk aksi utama, blue untuk link. Mantis dan lime hanya sebagai isian blok (dengan teks midnight di atasnya).
- **Section gelap:** lime untuk aksi utama, mantis untuk link. Green dan blue hanya sebagai isian blok.
- Satu aksen dominan per section; jangan memakai keempat warna aksen sama banyak di satu area.

## Tipografi

### Font

| Peran | Font | Paket |
|---|---|---|
| Judul & teks | **Archivo** (variable: weight 100–900, width 62–125%) | `@fontsource-variable/archivo` |
| Label, angka, eyebrow | **JetBrains Mono** | `@fontsource-variable/jetbrains-mono` |

Archivo dipilih sementara. Kalau nanti diganti, cukup ubah `--font-sans` di `global.css` dan paket font-nya.

### Font judul

| Elemen | Token (di `:root`) | Utility | Font sekarang |
|---|---|---|---|
| `h1` (judul hero, judul halaman & artikel) | `--display-family` | `font-display` | **Roboto Condensed** (sementara), `@fontsource-variable/roboto-condensed` (100–900) |
| `h2`–`h6` | `--heading-family` | `font-heading` | Archivo |
| Teks biasa | `--font-sans` | `font-sans` | Archivo |

- Semua `h1` otomatis Roboto Condensed, `h2`–`h6` otomatis Archivo (aturan di `@layer base`). Ganti font cukup di nilai token.
- Roboto Condensed sudah rapat dari sananya, jadi `h1` diberi `letter-spacing: 0` (menetralkan letter-spacing negatif token yang dibuat untuk Archivo). Weight mengikuti token (800).
- Referensi awal: **Trim** (berbayar). Kandidat gratis lain masih terpasang untuk dibandingkan di `/preview_003` (Schibsted Grotesk, Hanken Grotesk, Instrument Sans). Setelah final: hapus `@import` dan paket yang tidak dipakai (`npm uninstall ...`) serta `/preview_003`.
- Kalau nanti punya file Trim berlisensi: taruh `.woff2` di `public/fonts/`, tambahkan `@font-face`, lalu isi tokennya.

### Skala

Ukuran judul memakai `clamp()`, jadi otomatis mengecil di layar kecil.

| Class | Ukuran (mobile → desktop) | Line height | Letter spacing | Weight | Pemakaian |
|---|---|---|---|---|---|
| `text-display-xl` | 48 → 88px | 1.0 | -0.035em | 800 | Hero halaman utama |
| `text-display` | 40 → 64px | 1.05 | -0.03em | 800 | Hero halaman lain |
| `text-h1` | 36 → 52px | 1.1 | -0.025em | 800 | Judul halaman |
| `text-h2` | 28 → 40px | 1.15 | -0.02em | 700 | Judul section |
| `text-h3` | 24px | 1.25 | -0.01em | 700 | Judul kartu besar |
| `text-h4` | 20px | 1.3 | 0 | 700 | Judul kartu kecil |
| `text-lead` | 20px | 1.55 | 0 | 400 | Paragraf pembuka |
| `text-body` | 16px | 1.6 | 0 | 400 | Teks utama |
| `text-small` | 14px | 1.5 | 0 | 400 | Teks sekunder, menu |
| `text-caption` | 13px | 1.4 | 0 | 400 | Caption, teks bantuan |
| `text-eyebrow` | 12px | 1.4 | 0.14em | 500 | Label section (pakai dengan `font-mono uppercase`) |

### Aturan

- Judul besar: letter spacing negatif supaya rapat dan tegas.
- Eyebrow selalu `font-mono uppercase text-primary`, contoh: `LAYANAN · 01`.
- Lebar huruf Archivo (`font-stretch`) boleh dipakai untuk variasi judul, tapi jangan dicampur lebih dari dua lebar di satu halaman.

## Radius

| Class | Nilai | Pemakaian |
|---|---|---|
| `rounded-sm` | 6px | Chip kecil, tag |
| `rounded-md` | 8px | Tombol, input |
| `rounded-lg` | 12px | Kartu |
| `rounded-xl` | 16px | Panel besar |
| `rounded-full` | — | Badge, avatar |

## Navbar

- Komponen: `src/components/layout/Navbar.astro`, otomatis terpasang lewat `BaseLayout`. Isi menu di `src/content/menu/*.yaml` (1 item = 1 file), tombol CTA di `src/content/site.yaml` (`cta`).
- Posisi `fixed` di atas, tinggi 64px (`h-16`).
- Latar **solid** `bg-background` dengan garis bawah `border-border`. **Tanpa glassmorphism** (tanpa transparansi dan blur), supaya terlihat lebih profesional dan tenang.
- Karena navbar `fixed`, konten halaman diberi `pt-16` agar tidak tertutup.
### Menu pop-up (gaya panel geser)

- Dibuka lewat tombol menu (garis dua → silang) di kanan navbar, di semua ukuran layar.
- Panel masuk dari kanan, tepat di bawah navbar: lebar penuh di HP, 420px mulai `md`. Latar `bg-background` solid dengan garis kiri `border-border`.
- Di belakang panel ada lapisan gelap `bg-midnight/60`. Klik lapisan itu atau tekan Escape untuk menutup. Scroll halaman dikunci selama menu terbuka.
- Item menu: baris dipisah garis (`divide-y divide-border`), teks `text-h4`, latar hover `bg-background-alt`. Semua item ikut bergerak bersama panel (tidak muncul bergantian).
- Hover item: latar berubah ke `bg-background-alt` (300ms `ease-out-quart`). Tanpa gerakan geser; panah kanan diam.
- Tombol menu: tanpa indikator hover. Perubahan garis → silang instan, tanpa animasi.
- Semua status diatur satu atribut `data-state="open|closed"` pada pembungkus `group/menu`; class memakai `group-data-[state=open]/menu:`.

| Bagian | Buka | Tutup |
|---|---|---|
| Panel | 700ms `ease-out-expo` | 400ms `ease-in-out-quart` |
| Lapisan gelap | 500ms `ease-out-quart` | 500ms `ease-out-quart` |

## Footer — `src/components/layout/footer/`

Polanya sama dengan Hero: 1 file per variasi (`Footer<Gaya>_<NNN>.astro`), terdeteksi otomatis, dipilih lewat `footer.variant` di `src/content/site.yaml`. Footer otomatis terpasang di semua halaman lewat `BaseLayout` dan selalu berada di dasar layar walau isi halaman pendek (`body` = `flex min-h-screen flex-col`, `main` = `flex-1`).

```
src/components/layout/footer/
├── Footer.astro            ← pintu masuk, membaca site.yaml › footer
├── types.ts                ← props bersama (diturunkan dari skema site.footer)
└── FooterSimple_001.astro  ← kiri: logo + alamat/email; kanan: judul + ikon sosial; lalu garis + copyright
```

**Isi** (`src/content/site.yaml` › `footer`, semuanya bisa dikosongkan dan bagiannya otomatis hilang):

| Field | Keterangan |
|---|---|
| `variant` | Nama file variasi, default `FooterSimple_001` |
| `company` | Nama perusahaan, dipakai di blok alamat dan copyright |
| `address` | Daftar baris alamat (1 baris = 1 item) |
| `email` | Ditampilkan sebagai link `mailto:` |
| `socialsTitle` | Judul di atas ikon sosial, mis. "Ikuti Kami" |
| `socials` | Daftar `{ platform, href }`. Platform yang dikenali: facebook, instagram, linkedin, youtube, x, tiktok, whatsapp |

**FooterSimple_001** (referensi: fastems.com untuk blok alamat, dhl.com untuk posisi media sosial): latar `bg-background-alt`, garis atas `border-border`. Mulai `md`: dua kolom, media sosial di **kanan** sejajar logo; di HP media sosial turun ke bawah alamat. Alamat `text-small font-semibold`. Ikon sosial: lingkaran 40px, garis `foreground/70`, hover garis & ikon `primary`. Copyright `© <tahun otomatis> <company>`, `text-small text-muted-foreground`, dipisah garis di atasnya.

- Komponen kecil yang dipakai: `ui/Logo.astro` (logo + link beranda, juga dipakai navbar) dan `ui/SocialIcon.astro` (ikon garis SVG; platform baru ditambahkan di sini dan di enum skema).
- Alamat & email masih placeholder.

## Section

### Hero — `src/components/sections/hero/`

Hero punya beberapa variasi. Setiap variasi = 1 file bernomor, semuanya menerima props yang sama (`types.ts`), dan halaman memilihnya lewat satu kata `variant` (= nama file). **File variasi terdeteksi otomatis** (`import.meta.glob`), jadi tidak ada daftar yang perlu diisi manual.

```
src/components/sections/hero/
├── Hero.astro            ← pintu masuk: <Hero variant="HeroImage_002" {...isi} />, mendeteksi semua file Hero*_*.astro
├── types.ts              ← props bersama semua variasi
├── HeroBackground.astro  ← latar foto penuh / placeholder, dipakai HeroImage_*
├── HeroImage_001.astro   ← foto penuh + gradasi gelap, teks putih kiri bawah
└── HeroImage_002.astro   ← foto penuh + kartu putih berisi judul dan daftar link
```

**Penamaan:** `Hero<Gaya>_<NNN>`. Gaya = bentuk dasarnya (`Image` = foto penuh selebar layar); nomor = variasi dari gaya itu. Gaya baru (mis. teks kiri, gambar kanan) memakai nama gaya baru, mulai dari `_001`.

**Ganti variasi:** ubah `hero.variant` di `src/content/pages/home.yaml`. Semua variasi bisa dibandingkan di `/preview_002` dengan isi yang sama; **menambah variasi = menambah file** `Hero<Gaya>_<NNN>.astro`, dan otomatis ikut tampil di sana. Setelah ada yang terpilih, cukup hapus file variasi yang tidak dipakai.

| Prop | Wajib | Keterangan |
|---|---|---|
| `variant` | | Nama file variasi, default `HeroImage_001` |
| `title` | ✅ | Judul (`h1`) |
| `eyebrow` | | Label kecil di atas judul (HeroImage_001) |
| `description` | | Paragraf pembuka |
| `primaryAction` / `secondaryAction` | | `{ label, href }` → tombol (HeroImage_001) |
| `image` | | `{ src, alt }` (import dari `src/assets/hero/`). **Tanpa gambar = placeholder** midnight bergaris kotak 48px |
| `size` | | `"xl"` (default, halaman utama) atau `"default"` (halaman lain, lebih pendek) |
| `links` | | Daftar link HeroImage_002. **Kosongkan** agar otomatis memakai item menu dari `src/content/menu/` |

**HeroImage_001:** gradasi `black/85` → transparan dari bawah, `theme-dark` (tombol lime), tinggi min. 520px / 640px.

**HeroImage_002** (referensi: fastems.com): kartu `bg-background` solid (tanpa transparansi) maks. `max-w-xl`, bayangan `shadow-xl`, judul `text-h1`. Setiap baris: judul `text-h4 text-primary`, deskripsi `text-small text-muted-foreground`, panah kanan `text-primary`, dipisah `divide-border`; hover latar `bg-background-alt`. **Jumlah baris mengikuti jumlah file di `src/content/menu/`.**

- **Foto hero:** minimal lebar 1600px (ideal 2400px), lanskap. Foto dari postingan tidak cocok (≤ 633px atau berupa diagram). Pasang dengan menaruh foto di `src/content/pages/` (sefolder dengan `home.yaml`), lalu aktifkan baris `image:` yang dikomentari di `home.yaml`.

### Tombol — `src/components/ui/Button.astro`

| Prop | Nilai |
|---|---|
| `variant` | `primary` (isi `bg-primary`, hover `bg-primary-hover`) · `secondary` (garis `foreground/25`, hover garis penuh + latar tipis) |
| `size` | `md` (40px, `text-small`) · `lg` (48px, `text-body`) |

## Gerak (motion)

| Token | Nilai | Pemakaian |
|---|---|---|
| `ease-out-expo` | `cubic-bezier(0.16, 1, 0.3, 1)` | Panel/menu muncul — cepat di awal, melambat halus |
| `ease-out-quart` | `cubic-bezier(0.25, 1, 0.5, 1)` | Hover umum |
| `ease-in-out-quart` | `cubic-bezier(0.76, 0, 0.24, 1)` | Perpindahan besar (halaman, overlay) |

- Durasi standar: hover 300ms, panel/menu 500ms.
- Animasikan `transform` dan `opacity` saja supaya ringan.
- Rencana berikutnya: View Transitions Astro (`<ClientRouter />`), smooth scroll (Lenis), dan animasi menu dengan easing di atas.

## Logo

- File asli: `public/logo-parametrik.png` (olive `#AAA753`, semi-transparan ±73%).
- Di website, logo dirender dari `public/logo-parametrik-mask.png` (bentuk logo dengan transparansi dinormalkan) sebagai CSS mask, lalu diwarnai token `--logo`.
- Warna logo **tetap warna aslinya**, olive `#AAA753`, di dark maupun light mode. Logo tidak mengikuti palet.
- Kalau suatu saat warna logo perlu diganti, cukup ubah nilai `--logo` di `global.css`.
- **TODO:** minta versi SVG logo, supaya tajam di semua ukuran.

## Struktur file

Tujuannya: menambah konten = menambah file, tanpa mengubah kode komponen. Pola ini mengikuti branch `referensi` (1 file = 1 section, halaman tinggal menyusun section).

```
src/
├── content/                    ← SEMUA kalimat & konten ada di sini (tidak ada teks di kode)
│   ├── site.yaml               ← nama situs, deskripsi, URL, bahasa, tombol CTA navbar, isi footer
│   ├── pages/home.yaml         ← isi halaman utama (hero: variant, judul, foto); 1 halaman = 1 file
│   ├── menu/*.yaml             ← 1 item menu = 1 file (title, description, href, order)
│   └── posts/<slug>/           ← 1 postingan = 1 folder: index.md + gambar-gambarnya
├── content.config.ts           ← skema setiap koleksi konten
├── lib/content.ts              ← pembaca konten: getSite(), getPage(id), getMainLinks()
├── layouts/BaseLayout.astro    ← <head>, tema, Navbar, <main><slot/></main>
├── components/
│   ├── layout/Navbar.astro     ← bagian yang muncul di semua halaman
│   ├── layout/footer/          ← Footer.astro + FooterSimple_001, ... (variasi, sama seperti hero)
│   ├── sections/hero/          ← 1 folder per section yang punya variasi (Hero.astro + HeroImage_001, _002, ...)
│   └── ui/Button, Logo, SocialIcon ← komponen kecil yang dipakai section (Button, PostCard, ...); shadcn juga menaruh komponennya di sini
├── assets/                     ← gambar yang dioptimasi lewat astro:assets
├── styles/global.css           ← semua token desain
└── pages/                      ← rute; isinya hanya menyusun section di dalam BaseLayout
    └── posts/[id].astro        ← halaman otomatis untuk setiap folder di content/posts
```

### Aturan

- **Section tidak berisi teks atau warna hardcode.** Teks datang dari `src/content/` (lewat props atau `lib/content.ts`); warna dari token (`bg-primary`, bukan `bg-green-500`).
- **Satu komponen untuk bentuk yang sama.** Contoh: satu `Hero` dengan props, bukan `HeroHome`, `HeroAbout`, dst.
- Import memakai alias `@/` (contoh: `@/components/sections/hero/Hero.astro`).
- **Section dengan variasi:** 1 folder, 1 pintu masuk dengan prop `variant`, 1 file per variasi bernama `<Section><Gaya>_<NNN>.astro`, props bersama di `types.ts`. Lihat bagian Hero.
- Halaman baru selalu memakai `BaseLayout`:

```astro
<BaseLayout title="Judul" description="...">
  <Hero ... />
  <LatestPosts />
</BaseLayout>
```

### Koleksi konten

| Koleksi | Lokasi | Field |
|---|---|---|
| `posts` | `src/content/posts/<slug>/index.md` | `title`, `description`, `pubDate`, `updatedDate?`, `author`, `category?`, `tags`, `cover?` (path relatif), `coverAlt?` |
| `site` | `src/content/site.yaml` | `name`, `description`, `url`, `lang`, `cta` (`label`, `href`), `footer` (lihat bagian Footer) |
| `pages` | `src/content/pages/<id>.yaml` | `hero` (`variant`, `title`, `eyebrow?`, `description?`, `primaryAction?`, `secondaryAction?`, `image?` = `src` relatif + `alt`) |
| `menu` | `src/content/menu/*.yaml` | `title`, `description?`, `href`, `order` — dipakai panel menu navbar & HeroImage_002 |
| `services` (rencana) | `src/content/services/*.md` | — |
| `projects` (rencana) | `src/content/projects/*.md` | — |

### Postingan: 1 folder per postingan

Gambar disimpan **di folder postingannya sendiri**, bukan di satu folder gambar terpusat seperti di branch `referensi`. Alasannya: author mengirim postingan sebagai satu folder (export Notion), jadi upload cukup menaruh satu folder; menghapus postingan tidak meninggalkan gambar yatim; dan nama gambar tidak bisa bentrok antar-postingan.

```
src/content/posts/7-hal-krusial-.../
├── index.md        ← frontmatter + isi; gambar ditulis ![alt](./gambar-1.png)
├── gambar-1.png    ← dioptimasi otomatis oleh Astro (WebP, ukuran tepat)
└── gambar-2.png
```

**Import dari Notion** (Export → Markdown & CSV, lalu ekstrak zip-nya):

```bash
npm run import:notion -- "D:\Downloads\folder-export"
npm run import:notion -- "D:\Downloads\folder-export" --slug judul-pendek   # URL lebih pendek
npm run import:notion -- "D:\Downloads\folder-export" --force               # timpa versi lama
```

Script `scripts/import-notion.mjs`:
- memindahkan metadata tebal (**Deskripsi**, **Tanggal Publikasi**, **Tanggal Pembaruan**, **Penulis**, **Kategori**, **Tag**) ke frontmatter;
- memberi nama gambar `gambar-1.png`, `gambar-2.png`, ... dengan alt dari judul bagian terdekat; gambar pertama jadi `cover`;
- membuka link yang terbungkus `google.com/search?q=` (salah salin dari author);
- mempertahankan pindah baris (Shift+Enter) dan callout Notion, serta memisahkan FAQ `Tanya:`/`Jawab:` yang menempel.

Isi artikel ditampilkan dengan class `prose` yang warnanya diambil dari token (lihat `@utility prose` di `global.css`): link `highlight`, garis kutipan `primary`, callout memakai `background-alt`.

## Riwayat keputusan

- **2026-11-02:** Palet B dipilih (olive + `#070C11` + teal + biru). Archivo dipilih sebagai font utama (sementara). Tailwind v4 diaktifkan dengan token di `global.css`. Navbar sempat memakai glass ringan, lalu diganti **solid tanpa glassmorphism**.
- **2026-11-02 (revisi):** Palet B diganti dengan palet yang lebih sederhana: 2 warna dasar (Midnight Mirage, Praxeti White) untuk dark/light mode, dan 4 warna utama (lime, mantis, green, blue). Olive dan teal tidak dipakai lagi di palet, tetapi logo tetap memakai warna aslinya (olive `#AAA753`). Halaman `/preview_001` kini hanya berisi navbar, menu, dan kotak-kotak palet.
- **2026-11-03:** Struktur file ditetapkan (mengikuti pola branch `referensi`): `BaseLayout`, `components/{layout,sections,ui}`, `data/navigation.ts`, `config/site.ts`, koleksi `posts`. Navbar dipindah dari `preview_001` menjadi komponen. Plugin `@tailwindcss/typography` diaktifkan untuk isi artikel.
- **2026-11-03 (revisi):** Postingan diubah menjadi **1 folder per postingan** (gambar di folder yang sama), atas masukan atasan bahwa folder gambar terpusat merepotkan upload. Ditambah script `npm run import:notion` dan postingan contoh pertama dari export Notion.
- **2026-11-03 (revisi 2):** Situs disederhanakan menjadi **light mode saja**. Tombol ganti tema dan script `localStorage` dihapus. Token dark dipertahankan untuk section gelap (`theme-dark`). Override warna `prose` dipindah ke luar `@layer` karena sebelumnya kalah dengan warna bawaan plugin typography.
- **2026-11-03 (revisi 3):** Palet dirampingkan menjadi **5 warna + putih** (midnight `#001F3E`, blue `#1E4890`, green `#00804D`, mantis `#75C462`, lime `#DBE64C`). Latar diganti dari Praxeti ke putih `#FFFFFF` seperti artikel dhl.com. Netral lama (praxeti-*, midnight-900…600, mist, slate) dihapus; garis, teks sekunder, dan hover kini diturunkan dari palet lewat `color-mix`.
- **2026-11-03 (revisi 4):** Teks biasa dan judul memakai **hitam `#000000`** (token `black`, ditambahkan ke palet); midnight kini untuk section gelap dan bahan turunan. Judul ditebalkan: display/h1 700 → 800, h2–h4 600 → 700 (termasuk judul di isi artikel).
- **2026-11-03 (revisi 5):** Fokus pindah ke section. Dibuat `Hero` (props, varian gambar/tanpa gambar, `tone` terang/gelap) dan `Button` (primary/secondary). Halaman utama `/` kini memakai `BaseLayout` + `Hero` dengan isi dari `src/data/home.ts`.
- **2026-11-03 (revisi 6):** Hero diganti gaya **foto penuh + gradasi gelap, teks putih kiri bawah** (sesuai referensi "Teknologi bertemu kebutuhan nyata."). Varian dua kolom dan prop `tone` dihapus. Sementara memakai placeholder bergaris karena belum ada foto yang cukup besar.
- **2026-11-03 (revisi 7):** Hero dipecah menjadi variasi bernomor (`HeroImage_001`, `HeroImage_002`) dalam folder `sections/hero/` dengan pintu masuk `Hero.astro` dan halaman perbandingan `/preview_002`. Item menu dipindah ke koleksi `menu` (1 item = 1 file YAML) supaya panel menu dan HeroImage_002 adaptif terhadap jumlah item. Halaman utama memakai `HeroImage_002`.
- **2026-11-03 (revisi 8):** `variants.ts` (daftar variasi manual) dihapus. `Hero.astro` dan `/preview_002` kini mendeteksi file `Hero*_*.astro` secara otomatis, jadi menambah variasi cukup menambah file.
- **2026-11-03 (revisi 9):** Font judul dipisah dari teks biasa (`--heading-family` → utility `font-heading`, dipakai semua `h1`–`h6`). Referensi Trim berbayar, jadi diuji 3 alternatif gratis (Schibsted Grotesk, Hanken Grotesk, Instrument Sans) di `/preview_003`; sementara dipakai Schibsted Grotesk.
- **2026-11-03 (revisi 10):** Judul besar (`h1`) memakai **Bebas Neue** (sementara) lewat token baru `--display-family`; `h2`–`h6` dan teks biasa kembali ke Archivo. `h1` diberi `font-synthesis-weight: none` dan `letter-spacing: 0.01em` karena Bebas Neue hanya 1 weight dan sudah rapat.
- **2026-11-03 (revisi 11):** Bebas Neue (hanya kapital, 1 weight) diganti **Roboto Condensed** untuk `h1`. Paket Bebas Neue dihapus.
- **2026-11-03 (revisi 12):** Semua kalimat disatukan di `src/content/`: `site.yaml` (info situs + tombol CTA) dan `pages/home.yaml` (isi hero) menggantikan `src/config/site.ts`, `src/data/home.ts`, dan `src/data/navigation.ts`. Fungsi pembaca dipindah ke `src/lib/content.ts`. Foto hero kini ditaruh sefolder dengan `home.yaml`. Sekalian diperbaiki komentar CSS yang rusak (`-*/`) sehingga `letter-spacing: 0` pada `h1` kini benar-benar berlaku.
- **2026-11-03 (revisi 13):** Footer dibuat dengan pola variasi seperti hero (`layout/footer/`, `FooterSimple_001`, referensi fastems.com). Isinya dari `site.yaml` › `footer`. Logo navbar dipisah menjadi `ui/Logo.astro` agar dipakai bersama footer; ikon sosial di `ui/SocialIcon.astro`.
- **2026-11-03 (revisi 14):** Media sosial footer dipindah ke kolom kanan (seperti dhl.com) dengan judul `socialsTitle` ("Ikuti Kami") dari `site.yaml`.
