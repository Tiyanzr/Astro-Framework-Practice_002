# Parametrik — Design System

> Dokumen hidup. Semua nilai di sini sudah terpasang sebagai token di [`src/styles/global.css`](src/styles/global.css).
> Contoh visualnya bisa dilihat di halaman `/preview_001` (jalankan `astro dev`). Struktur folder ada di bagian [Struktur file](#struktur-file).
> Kalau mengubah token, ubah di `global.css` **dan** catat di sini.

## Ringkasan

- **Tema:** dark mode (Midnight Mirage `#001F3F`) dan light mode (Praxeti White `#F6F7ED`). Default dark.
- **Warna utama:** 4 warna: lime `#DBE64C`, mantis `#74C365`, green `#00804C`, blue `#1E488F`.
- **Font:** Archivo (judul & teks) + JetBrains Mono (label, angka, eyebrow).
- **Prinsip:** komponen memakai **token semantik** (`bg-primary`, `text-muted-foreground`), bukan kode warna langsung. Ganti warna cukup di satu tempat.

## Warna

### 2 warna dasar

| Token | Hex | Nama | Peran |
|---|---|---|---|
| `midnight` | `#001F3F` | Midnight Mirage | Latar dark mode, teks utama light mode |
| `praxeti` | `#F6F7ED` | Praxeti White | Latar light mode, teks utama dark mode |

### 4 warna utama

| Token | Hex | Nama | Peran |
|---|---|---|---|
| `lime` | `#DBE64C` | First Colors of Spring | **Primary di dark mode** (tombol, aksen) |
| `mantis` | `#74C365` | Mantis | Highlight/link di dark mode |
| `green` | `#00804C` | Picture Book Green | **Primary di light mode** |
| `blue` | `#1E488F` | Nuit Blanche | Highlight/link di light mode |

### Turunan netral (dari 2 warna dasar)

| Token | Hex | Peran |
|---|---|---|
| `midnight-900` | `#062949` | Section selang-seling (dark) |
| `midnight-800` | `#0B2B4D` | Kartu (dark) |
| `midnight-700` | `#0E3358` | Hover/input (dark) |
| `midnight-600` | `#24476B` | Garis & border (dark) |
| `mist` | `#A7B6C6` | Teks sekunder (dark) |
| `praxeti-200` | `#EDEFE0` | Section selang-seling (light) |
| `praxeti-300` | `#DCDFCF` | Garis & border (light) |
| `slate` | `#4F5D6B` | Teks sekunder (light) |
| `lime-hover` | `#E6EE7F` | Hover tombol primary (dark) |
| `green-hover` | `#006B40` | Hover tombol primary (light) |

### Token semantik

Nama mengikuti konvensi shadcn, jadi komponen shadcn otomatis memakai palet ini.

| Token | Light mode (`:root`, `.theme-light`) | Dark mode (`.dark`, `.theme-dark`) |
|---|---|---|
| `background` | `praxeti` | `midnight` |
| `background-alt` | `praxeti-200` | `midnight-900` |
| `foreground` | `midnight` | `praxeti` |
| `card` | `#FFFFFF` | `midnight-800` |
| `primary` | `green` | `lime` |
| `primary-hover` | `green-hover` | `lime-hover` |
| `primary-foreground` | `#FFFFFF` | `midnight` |
| `muted-foreground` | `slate` | `mist` |
| `border` | `praxeti-300` | `midnight-600` |
| `highlight` | `blue` | `mantis` |
| `ring` | `green` | `lime` |
| `logo` | `#AAA753` (warna asli logo) | `#AAA753` (warna asli logo) |

### Cara memakai tema

- **Seluruh halaman:** class `dark` pada `<html>` = dark mode. Tanpa class itu = light mode.
- **Satu section saja:** tambahkan `theme-light` atau `theme-dark` pada `<section>`. Token di dalamnya berganti dan latarnya ikut terpasang.
- Pilihan pengguna disimpan di `localStorage` (`theme` = `light`/`dark`). Script kecil di `<head>` menerapkannya sebelum halaman tampil supaya tidak berkedip.

### Aturan pemakaian warna

| Kombinasi | Kontras | Boleh? |
|---|---|---|
| Lime di `midnight` | 12.2 : 1 | ✅ Teks apa pun |
| Mantis di `midnight` | 7.7 : 1 | ✅ Teks/link |
| Green di `midnight` | 3.3 : 1 | ⚠️ Hanya teks besar atau isian blok |
| Blue di `midnight` | 1.9 : 1 | ❌ Jangan untuk teks di dark mode |
| Blue di `praxeti` | 8.2 : 1 | ✅ Teks/link |
| Green di `praxeti` | 4.6 : 1 | ✅ Teks/link |
| Putih di green (tombol) | 5.0 : 1 | ✅ |
| Midnight di lime (tombol) | 12.2 : 1 | ✅ |
| Mantis di `praxeti` | 2.0 : 1 | ❌ Jangan untuk teks di light mode |
| Lime di `praxeti` | 1.3 : 1 | ❌ Jangan untuk teks di light mode |

- **Dark mode:** lime untuk aksi utama, mantis untuk link/highlight. Green dan blue sebagai isian blok saja.
- **Light mode:** green untuk aksi utama, blue untuk link/highlight. Lime dan mantis sebagai isian blok saja (dengan teks `midnight` di atasnya).
- Satu aksen dominan per section; jangan memakai keempat warna utama sama banyak di satu area.

## Tipografi

### Font

| Peran | Font | Paket |
|---|---|---|
| Judul & teks | **Archivo** (variable: weight 100–900, width 62–125%) | `@fontsource-variable/archivo` |
| Label, angka, eyebrow | **JetBrains Mono** | `@fontsource-variable/jetbrains-mono` |

Archivo dipilih sementara. Kalau nanti diganti, cukup ubah `--font-sans` di `global.css` dan paket font-nya.

### Skala

Ukuran judul memakai `clamp()`, jadi otomatis mengecil di layar kecil.

| Class | Ukuran (mobile → desktop) | Line height | Letter spacing | Weight | Pemakaian |
|---|---|---|---|---|---|
| `text-display-xl` | 48 → 88px | 1.0 | -0.035em | 700 | Hero halaman utama |
| `text-display` | 40 → 64px | 1.05 | -0.03em | 700 | Hero halaman lain |
| `text-h1` | 36 → 52px | 1.1 | -0.025em | 700 | Judul halaman |
| `text-h2` | 28 → 40px | 1.15 | -0.02em | 600 | Judul section |
| `text-h3` | 24px | 1.25 | -0.01em | 600 | Judul kartu besar |
| `text-h4` | 20px | 1.3 | 0 | 600 | Judul kartu kecil |
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

- Komponen: `src/components/layout/Navbar.astro`, otomatis terpasang lewat `BaseLayout`. Isi menu di `src/data/navigation.ts`.
- Posisi `fixed` di atas, tinggi 64px (`h-16`).
- Latar **solid** `bg-background` dengan garis bawah `border-border`. **Tanpa glassmorphism** (tanpa transparansi dan blur), supaya terlihat lebih profesional dan tenang.
- Karena navbar `fixed`, konten halaman diberi `pt-16` agar tidak tertutup.
### Menu pop-up (gaya panel geser)

- Dibuka lewat tombol menu (garis dua → silang) di kanan navbar, di semua ukuran layar.
- Panel masuk dari kanan, tepat di bawah navbar: lebar penuh di HP, 420px mulai `md`. Latar `bg-background` solid dengan garis kiri `border-border`.
- Di belakang panel ada lapisan gelap `bg-midnight/60`. Klik lapisan itu atau tekan Escape untuk menutup. Scroll halaman dikunci selama menu terbuka.
- Item menu: baris dipisah garis (`divide-y divide-border`), teks `text-h4`, latar hover `bg-card`. Semua item ikut bergerak bersama panel (tidak muncul bergantian).
- Hover item: hanya latar yang makin terang (`bg-background` → `bg-card`, 300ms `ease-out-quart`). Tanpa gerakan geser; panah kanan diam.
- Tombol menu: tanpa indikator hover. Perubahan garis → silang instan, tanpa animasi.
- Semua status diatur satu atribut `data-state="open|closed"` pada pembungkus `group/menu`; class memakai `group-data-[state=open]/menu:`.

| Bagian | Buka | Tutup |
|---|---|---|
| Panel | 700ms `ease-out-expo` | 400ms `ease-in-out-quart` |
| Lapisan gelap | 500ms `ease-out-quart` | 500ms `ease-out-quart` |

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
├── config/site.ts              ← nama situs, deskripsi, URL, bahasa
├── data/navigation.ts          ← isi menu navbar + tombol CTA
├── content.config.ts           ← skema setiap koleksi konten
├── content/posts/*.md          ← 1 postingan = 1 file
├── layouts/BaseLayout.astro    ← <head>, tema, Navbar, <main><slot/></main>
├── components/
│   ├── layout/Navbar.astro     ← bagian yang muncul di semua halaman (Navbar, nanti Footer)
│   ├── sections/               ← 1 file = 1 section (Hero, Carousel, LatestPosts, ...)
│   └── ui/                     ← komponen kecil yang dipakai section (Button, PostCard, ...); shadcn juga menaruh komponennya di sini
├── assets/                     ← gambar yang dioptimasi lewat astro:assets
├── styles/global.css           ← semua token desain
└── pages/                      ← rute; isinya hanya menyusun section di dalam BaseLayout
    └── posts/[id].astro        ← halaman otomatis untuk setiap file di content/posts
```

### Aturan

- **Section tidak berisi teks atau warna hardcode.** Teks datang dari props, `src/data/`, atau `src/content/`; warna dari token (`bg-primary`, bukan `bg-green-500`).
- **Satu komponen untuk bentuk yang sama.** Contoh: satu `Hero` dengan props, bukan `HeroHome`, `HeroAbout`, dst.
- Import memakai alias `@/` (contoh: `@/components/sections/Hero.astro`).
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
| `posts` | `src/content/posts/*.md` | `title`, `description`, `pubDate`, `author`, `image?` (`url`, `alt`), `tags` |
| `services` (rencana) | `src/content/services/*.md` | — |
| `projects` (rencana) | `src/content/projects/*.md` | — |

## Riwayat keputusan

- **2026-11-02:** Palet B dipilih (olive + `#070C11` + teal + biru). Archivo dipilih sebagai font utama (sementara). Tailwind v4 diaktifkan dengan token di `global.css`. Navbar sempat memakai glass ringan, lalu diganti **solid tanpa glassmorphism**.
- **2026-11-02 (revisi):** Palet B diganti dengan palet yang lebih sederhana: 2 warna dasar (Midnight Mirage, Praxeti White) untuk dark/light mode, dan 4 warna utama (lime, mantis, green, blue). Olive dan teal tidak dipakai lagi di palet, tetapi logo tetap memakai warna aslinya (olive `#AAA753`). Halaman `/preview_001` kini hanya berisi navbar, menu, dan kotak-kotak palet.
- **2026-11-03:** Struktur file ditetapkan (mengikuti pola branch `referensi`): `BaseLayout`, `components/{layout,sections,ui}`, `data/navigation.ts`, `config/site.ts`, koleksi `posts`. Navbar dipindah dari `preview_001` menjadi komponen. Plugin `@tailwindcss/typography` diaktifkan untuk isi artikel.
