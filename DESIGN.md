# Parametrik — Design System

> Dokumen hidup. Semua nilai di sini sudah terpasang sebagai token di [`src/styles/global.css`](src/styles/global.css).
> Contoh visualnya bisa dilihat di halaman `/preview_001` (jalankan `astro dev`).
> Kalau mengubah token, ubah di `global.css` **dan** catat di sini.

## Ringkasan

- **Tema:** gelap sebagai default (`#070C11`), dengan section terang (`#F4F6F6`) sebagai selingan.
- **Warna brand:** olive dari logo (`#C1BE81`). Hanya dipakai di atas latar gelap.
- **Font:** Archivo (judul & teks) + JetBrains Mono (label, angka, eyebrow).
- **Prinsip:** komponen memakai **token semantik** (`bg-primary`, `text-muted-foreground`), bukan kode warna langsung. Ganti warna cukup di satu tempat.

## Warna

### Palet mentah

| Token | Hex | Peran |
|---|---|---|
| `ink-950` | `#070C11` | Latar utama |
| `ink-900` | `#0C131A` | Latar section selang-seling |
| `ink-800` | `#121920` | Kartu |
| `ink-700` | `#1A232C` | Kartu hover, input |
| `steel-600` | `#323B42` | Garis dan border |
| `steel-400` | `#9BA7B1` | Teks sekunder |
| `steel-100` | `#EDF1F4` | Teks utama di latar gelap |
| `paper` | `#F4F6F6` | Latar section terang |
| `olive-300` | `#D8D6AC` | Hover tombol utama |
| `olive-400` | `#C1BE81` | **Warna brand utama** |
| `olive-500` | `#AAA753` | Warna asli logo |
| `olive-800` | `#4A4A1C` | Olive gelap |
| `teal-600` | `#027B62` | Aksen di section terang |
| `blue-500` | `#3E90CB` | Sentuhan: glow, gradasi |

### Token semantik

Nama mengikuti konvensi shadcn, jadi komponen shadcn otomatis memakai palet ini.

| Token | Tema gelap (default) | Section terang (`.surface-light`) |
|---|---|---|
| `background` | `ink-950` | `paper` |
| `background-alt` | `ink-900` | — |
| `foreground` | `steel-100` | `ink-950` |
| `card` | `ink-800` | `#FFFFFF` |
| `primary` | `olive-400` | `teal-600` |
| `primary-foreground` | `ink-950` | `#FFFFFF` |
| `muted-foreground` | `steel-400` | `#5D6A74` |
| `border` | `steel-600` | `#DFE5E8` |
| `highlight` | `blue-500` | `blue-500` |
| `ring` | `olive-400` | `teal-600` |

Untuk section terang, cukup tambahkan class `surface-light` pada `<section>`. Token di dalamnya otomatis berganti.

### Aturan pemakaian warna

| Kombinasi | Kontras | Boleh? |
|---|---|---|
| Olive `#C1BE81` di `#070C11` | 10.2 : 1 | ✅ Teks apa pun |
| Biru `#3E90CB` di `#070C11` | 5.7 : 1 | ✅ Teks/link, tapi pakai seperlunya |
| Teal `#027B62` di putih | 5.2 : 1 | ✅ Teks di section terang |
| Teal di `#070C11` | 3.8 : 1 | ❌ Jangan untuk teks di latar gelap |
| Biru di putih | 3.5 : 1 | ❌ Jangan untuk teks di section terang |
| Olive di putih | 1.9 : 1 | ❌ Olive hanya untuk latar gelap |

- **Olive** = warna brand: tombol utama, aksen judul, link, logo, blok CTA.
- **Teal** = aksen di section terang: label, tag, link.
- **Biru** = sentuhan saja: glow, gradasi gambar. Bukan untuk tombol.
- Jangan pakai olive, teal, dan biru sama banyak di satu area. Satu aksen dominan per section.

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

## Navbar & glassmorphism

- Posisi `fixed` di atas, tinggi 64px (`h-16`), border bawah `border-white/10`.
- Latar kaca **ringan**: `bg-ink-950/35` (opacity 35%) + `backdrop-blur-sm` (8px) + `backdrop-saturate-150`.
- Sudah dibandingkan dengan varian sedang (55% / 16px) dan kuat (75% / 24px); yang dipilih varian ringan.
### Menu pop-up (gaya panel geser)

- Dibuka lewat tombol menu (garis dua → silang) di kanan navbar, di semua ukuran layar.
- Panel masuk dari kanan, tepat di bawah navbar: lebar penuh di HP, 420px mulai `md`. Latar `bg-background` solid dengan garis kiri `border-border`.
- Di belakang panel ada lapisan gelap `bg-ink-950/60`. Klik lapisan itu atau tekan Escape untuk menutup. Scroll halaman dikunci selama menu terbuka.
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

- File sementara: `public/logo-parametrik.png` (PNG semi-transparan ±73%). Di halaman memakai `drop-shadow` sebagai trik agar tampak lebih solid.
- **TODO:** minta versi SVG solid dengan warna `#AAA753` atau `#C1BE81`.

## Struktur konten (rencana)

Tujuannya: menambah konten = menambah file, tanpa mengubah kode komponen.

| Data | Lokasi |
|---|---|
| Menu navbar & footer | `src/data/navigation.json` |
| Artikel | `src/content/articles/*.md` |
| Layanan | `src/content/services/*.md` |
| Proyek | `src/content/projects/*.md` |

## Riwayat keputusan

- **2026-11-02:** Palet B dipilih (olive + `#070C11` + teal + biru). Archivo dipilih sebagai font utama (sementara). Tailwind v4 diaktifkan dengan token di `global.css`. Glass navbar: varian ringan.
