# MODULES.md — template siap tempel

> Katalog semua bagian halaman beserta **blok YAML lengkap** yang tinggal di-copy-paste.
> Lihat tampilannya dulu di `/prototype` (hanya saat `astro dev`), dikelompokkan per folder kode: **global.css** (palet), **layout** (navbar, footer),
> **sections** (modul per halaman + artikel), dan **ui** (tombol, ikon, dll.).
> Arsitektur & aturan desain: [DESIGN.md](DESIGN.md) · cara kerja & status proyek: [AGENTS.md](AGENTS.md).
> Kolom **Pemakaian** di bawah per **2026-11-09** (**dipakai** = dipakai di situs, **base** = versi Basic, **tidak dipakai** = desain yang tidak dipakai saat ini). Data terbaru (dihitung otomatis dari YAML) selalu ada di `/prototype/variants`. Gaya apa pun boleh dipakai: yang ditulis di YAML itulah yang tampil, sama saat dev dan build.

---

## Cara pakai

1. **Halaman baru = folder baru** `src/content/pages/<url>/` berisi `index.yaml` + gambar-gambar halaman itu (sama seperti artikel: 1 artikel = 1 folder). Nama folder = URL. Tidak perlu file `.astro`. Mulai dari [Kerangka halaman](#kerangka-halaman).
2. **Tambah modul** = copy blok modul di bawah ke daftar `sections:` halaman itu (indentasi 2 spasi, diawali `- type:`). Urutan blok = urutan tampil.
3. **Pilih gaya** lewat `variant:` (daftar pilihan ada di komentar tiap blok). Bandingkan dulu di `/prototype/<modul>`.
4. **Isi teks, jumlah kartu/tombol/item** cukup di YAML: tambah atau hapus baris item.

### Kenapa blok di sini selalu lengkap

Semua gaya satu modul menerima **data yang sama**, tetapi tidak semua gaya **menampilkan** semua field (lihat tabel "dipakai oleh" di tiap modul).
Kalau sebuah field tidak ditulis, gaya yang membutuhkannya tidak error, tetapi bagiannya **kosong** (mis. tombol tidak muncul).
Jadi: **copy blok lengkap, isi semua field yang mungkin dibutuhkan**, baru hapus yang benar-benar tidak dipakai. Dengan begitu gaya bisa ditukar kapan saja tanpa kehilangan isi.

### Yang membuat error vs yang diam-diam kosong

| Kejadian | Akibat |
|---|---|
| Field bertanda **WAJIB** tidak diisi | ❌ Error saat dev/build, pesannya menyebut field yang kurang |
| `variant:` salah ketik / tidak ada | ❌ Error, pesannya menyebut semua pilihan |
| `icon:` tidak ada di `src/assets/icons/` | ❌ Error, pesannya menyebut semua ikon |
| Kunci tanpa nilai, mis. `title:` lalu kosong | ❌ Error (`null`). Hapus barisnya atau beri `#` di depannya |
| **Nama field salah ketik**, mis. `action:` | ⚠️ **Diam-diam diabaikan**, tidak ada pesan. Cocokkan dengan blok di sini |
| Field tidak dipakai gaya yang dipilih | Diabaikan, aman; tampil lagi kalau ganti ke gaya yang memakainya |

### Aturan menulis YAML

- Teks yang mengandung `:` `#` `"` atau diawali `-` `[` `{` → bungkus dengan tanda kutip: `title: "Software: CAD & CAM"`.
- Paragraf panjang / beberapa paragraf → `description: |` lalu teks di baris berikutnya (menjorok), paragraf dipisah satu baris kosong.
- Gambar → simpan **di folder halaman itu**, tulis `src: ./foto.jpg` (path relatif dari `index.yaml`). Gambar produk sefolder dengan file kategori di `src/content/products/`.
- Link internal ditulis dari akar: `/training`. Link luar lengkap dengan `https://`.

### Field bersama hampir semua modul

| Field | Isi |
|---|---|
| `variant` | Nama gaya (= nama file). Kosong = versi Basic |
| `tone` | Latar section: `default` · `alt` (abu muda) · `dark` · `green` · `olive` · `gradient`. Diabaikan versi Basic |
| `width` | `full` (latar selebar layar) · `contained` (panel membulat) |
| `eyebrow` | Label kecil di atas judul, mis. `"01 / SOFTWARE"` |
| `title` | Judul section |
| `accent` | Lanjutan judul di **baris baru berwarna aksen** (gaya referensi). Gaya lama tidak menampilkannya |
| `description` | Kalimat pengantar |

---

# Mandatory

Bagian yang **berlaku di semua halaman**. Diatur sekali, bukan per halaman. Preview di `/prototype` › grup global.css (palet), layout (navbar, footer), dan sections › post (artikel).

## Palet warna & font

Bukan YAML: semua token ada di `src/styles/global.css` (dokumentasi di DESIGN.md › Warna, Tipografi). Preview: `/prototype/colors`, `/prototype/fonts`.
Ada dua palet yang bisa dibandingkan di setiap halaman prototype lewat combo box **Palet**:

| Palet | Di mana | Isi |
|---|---|---|
| Situs | `:root` (dipakai situs sekarang) | midnight, blue, green, mantis, lime + putih/hitam; Roboto Condensed + Archivo |
| Referensi parametris.com (aktif, `theme: parametris`) | class `.theme-parametris` | ink #14252e, emas #86732c, gelap #11262c; Arial; jarak lebih lega |

Palet yang dipakai situs dipilih di `src/content/site.yaml` › `theme` (`parametris` sekarang). Ganti warna = ubah nilai token di `global.css` (komponen ikut berubah semua). Catat perubahannya di DESIGN.md.

## Navbar (header)

File: `src/content/site.yaml` (nama, tombol CTA, gaya) + `src/content/menu/*.yaml` (item menu, **1 item = 1 file**). Preview: `/prototype/navbar`.

| Gaya | Pemakaian | Dipakai oleh gaya ini |
|---|---|---|
| `NavbarBasic_001` | base | nama situs, item menu + sub-menu, CTA (teks saja) |
| `NavbarPanel_001` | tidak dipakai | logo, CTA, menu panel geser dari kanan (hanya judul utama, tanpa sub-menu) |
| `NavbarDropdown_001` | dipakai | logo, menu dengan dropdown sub-menu, CTA bergaris (gaya referensi) |

```yaml
# src/content/site.yaml
name: Parametrik                # WAJIB. Nama situs (judul tab, label logo)
homeTitle: "Parametrik — Software, IoT & Engineering"   # Judul tab beranda
theme: parametris               # Palet seluruh situs: situs | parametris
cta:                            # WAJIB. Tombol aksi di navbar
  label: Kontak
  href: /contact
navbar:
  variant: NavbarDropdown_001   # NavbarBasic_001 | NavbarPanel_001 | NavbarDropdown_001
```

```yaml
# src/content/menu/services.yaml  (1 item menu = 1 file)
title: Layanan                  # WAJIB. Teks menu
description: Description        # Teks kecil di bawah judul (dipakai kartu HeroImage_002)
href: /services                 # WAJIB. "" = item hanya judul dropdown tanpa halaman (khusus NavbarDropdown_001)
order: 3                        # Urutan di menu (kecil = kiri/atas)
children:                       # Sub-menu (dropdown NavbarDropdown_001, daftar di NavbarBasic_001)
  - { title: Pelatihan, href: /training }
  - { title: Konsultasi, href: /consulting }
```

## Footer

File: `src/content/site.yaml` › `footer`. Kolom menu (FooterColumns_001) otomatis dari `src/content/menu/`. Preview: `/prototype/footer`.

| Gaya | Pemakaian | Dipakai oleh gaya ini |
|---|---|---|
| `FooterBasic_001` | base | company, address, email, socialsTitle, socials (teks saja) |
| `FooterSimple_001` | tidak dipakai | logo, company, address, email, socialsTitle, socials (ikon bulat) |
| `FooterColumns_001` | dipakai | logo, company, tagline, menu (`exploreTitle`), email/phone/location (`contactTitle`), socials (link teks) |

```yaml
# src/content/site.yaml
footer:
  variant: FooterColumns_001    # FooterBasic_001 | FooterSimple_001 | FooterColumns_001
  company: PT Parametrik Solusi Integrasi   # WAJIB. Nama perusahaan (juga di copyright)
  tagline: "Produk dan layanan untuk engineering, manufaktur, dan teknologi terhubung."
  address:                      # 1 baris = 1 item
    - Synergy Building Suite 1508
    - Alam Sutera, Tangerang 15325
  email: support@parametris.com
  phone: "+62 21 3044 8230"
  location: { label: "Alam Sutera · Tangerang", href: /contact }
  explore:                      # Isi kolom menu (FooterColumns_001). Hapus = item menu utama
    - { label: Software, href: /software }
    - { label: Layanan, href: /services }
  exploreTitle: Jelajahi        # Judul kolom menu (FooterColumns_001)
  contactTitle: Hubungi kami    # Judul kolom kontak (FooterColumns_001)
  socialsTitle: Ikuti Kami      # Judul di atas ikon sosial (FooterSimple_001)
  socials:                      # platform: facebook | instagram | linkedin | youtube | x | tiktok | whatsapp
    - { platform: instagram, href: "https://www.instagram.com/parametriksi/" }
    - { platform: linkedin, href: "https://www.linkedin.com/company/parametrik-solusi-integrasi/" }
    - { platform: youtube, href: "https://www.youtube.com/@parametriksi" }
```

## Data kontak perusahaan

Dipakai modul `contact` di semua halaman (boleh ditimpa per halaman, lihat modul [contact](#contact)).

```yaml
# src/content/site.yaml
contact:
  email: sales@parametris.com
  phone: "+62 21 3044 8230"
  address:
    - Synergy Building Suite 1508
    - Jalur Sutera Barat Kav. 17
    - Alam Sutera
    - Tangerang 15325 – Indonesia
  hours: "Senin–Jumat, 08.00–17.00"
  emails:                       # Email tambahan berlabel
    - { label: "Dukungan teknis", email: support@parametris.com }
  phones:                       # Nomor tambahan berlabel
    - { label: WhatsApp, number: "+62 821 1629 1814" }
    - { label: Fax, number: "+62 21 3044 8240" }
```

## Halaman artikel

Tampilan semua artikel `/posts/<slug>/`. Isi artikel = folder `src/content/posts/<slug>/index.md` (impor: `npm run import:notion`). Preview: `/prototype/post`.

| Gaya | Pemakaian |
|---|---|
| `PostBasic_001` | base |
| `PostArticle_001` | dipakai (satu kolom sempit) |
| `PostArticle_002` | tidak dipakai (cover, daftar isi sticky, artikel terkait) |

```yaml
# src/content/site.yaml
post:
  variant: PostArticle_001      # PostBasic_001 | PostArticle_001 | PostArticle_002
  labels:                       # WAJIB semua: teks kecil di halaman artikel
    author: Penulis
    published: Terbit
    updated: Diperbarui
    tags: Tag
    toc: Daftar isi
    related: Artikel terkait
```

---

# Modul

Section yang **disusun per halaman** di `sections:`. Preview tiap modul di `/prototype/<modul>` (combo box gaya, contoh isi, palet).

## Kerangka halaman

```yaml
# src/content/pages/<url>/index.yaml  →  URL /<url>      (beranda: pages/home/index.yaml → /)
# Gambar halaman ini disimpan di folder yang sama: src/content/pages/<url>/foto.jpg
title: Software                 # Judul tab browser; juga judul kartu kalau halaman ini tampil di cards › from
description: "..."              # Deskripsi SEO
summary: "..."                  # Teks kartu kalau halaman ini tampil di cards › from (halaman induk)
order: 1                        # Urutan kartu di halaman induk
parent: iot                     # Halaman induk: halaman ini jadi kartu di `cards › from: iot` (URL tetap datar: /<url>)
image:                          # Gambar kartu di halaman induk (CardsGallery_*)
  src: ./software.jpg
  alt: Software

sections:
  # tempel blok modul di sini, urut dari atas ke bawah
```

## hero

Pembuka halaman, biasanya section pertama. Preview: `/prototype/hero`.

| Gaya | Pemakaian | Dipakai oleh gaya ini |
|---|---|---|
| `HeroBasic_001` | base | semua field sebagai teks; `links` hanya kalau diisi |
| `HeroImage_001` | tidak dipakai | foto penuh + eyebrow, title, description, **semua** actions, size |
| `HeroImage_002` | tidak dipakai | foto penuh + kartu: title, description, **links** (kosong = item menu), size. **Tanpa actions** |
| `HeroText_001` | dipakai | eyebrow, aside, title, **accent**, description, **action pertama saja**, size. Tanpa foto |
| `HeroText_002` | dipakai | seperti HeroText_001 di atas **foto** (image) berlapis gelap |

```yaml
  - type: hero
    variant: HeroText_001       # HeroBasic_001 | HeroImage_001 | HeroImage_002 | HeroText_001 | HeroText_002
    size: default               # xl = beranda (judul terbesar) | default = halaman lain
    eyebrow: "PRODUK / SOFTWARE"
    aside: { label: Beranda, href: / }        # Teks kanan atas (HeroText_*); href boleh dihapus
    title: "Dari desain."       # WAJIB
    accent: "Hingga pengembangan produk."
    description: "Solusi CAD, CAM, CAE, PLM, ALM, dan AR untuk meningkatkan produktivitas tim Anda."
    actions:                    # Tombol, jumlah bebas; yang pertama = tombol utama
      - { label: "Diskusikan kebutuhan", href: /contact }
      - { label: Software, href: /software }
    links:                      # Daftar link di kartu (HeroImage_002). Hapus blok ini = pakai item menu
      - { label: Software, href: /software, description: "CAD, CAM, CAE, PLM" }
      - { label: IoT, href: /iot, description: "Solusi terhubung" }
    image:                      # Foto (HeroImage_*, HeroText_002), min. lebar 1600px, lanskap
      src: ./hero.jpg
      alt: Desain dan pengembangan produk
```

## intro

Pengantar teks + video/gambar tepat setelah hero. Preview: `/prototype/intro`.

| Gaya | Pemakaian | Dipakai oleh gaya ini |
|---|---|---|
| `IntroBasic_001` | base | semua field sebagai teks |
| `IntroMedia_001` | tidak dipakai | panel: teks kiri + media kanan (bawaan width contained) |
| `IntroMedia_002` | tidak dipakai | judul besar di atas, teks + media di bawah (bawaan width full) |

```yaml
  - type: intro
    variant: IntroMedia_002     # IntroBasic_001 | IntroMedia_001 | IntroMedia_002
    tone: dark                  # kosongkan = bawaan gaya
    width: full                 # kosongkan = bawaan gaya
    pulldown: true              # true = menumpuk ke bawah hero (mulai tablet)
    eyebrow: "TENTANG KAMI"
    title: "Dari konsep menuju realisasi."   # WAJIB
    description: |
      Paragraf pertama.

      Paragraf kedua.
    highlight: "Satu kalimat penutup yang lebih besar."
    media:                      # pilih SALAH SATU dari tiga bentuk di bawah
      type: youtube
      id: dQw4w9WgXcQ           # bagian setelah v= di link YouTube
      title: Judul video
    # media: { type: image, src: ./intro.jpg, alt: "..." }
    # media: { type: placeholder, label: Video }
```

## media

Gambar sebagai section sendiri. Preview: `/prototype/media`.

| Gaya | Pemakaian | Dipakai oleh gaya ini |
|---|---|---|
| `MediaBasic_001` | base | gambar + teks polos |
| `MediaBanner_001` | dipakai | foto selebar layar, gradasi gelap, eyebrow + title + accent putih di kiri bawah |
| `MediaFigure_001` | dipakai | gambar utuh selebar isi halaman; judul jadi keterangan di bawahnya |

```yaml
  - type: media
    variant: MediaBanner_001    # MediaBasic_001 | MediaBanner_001 | MediaFigure_001
    image:                      # WAJIB
      src: ./banner.jpg
      alt: Desain dan pengembangan produk
    eyebrow: "ENGINEERING · SOFTWARE · IOT"
    title: "Teknologi bertemu"
    accent: "kebutuhan nyata."
```

## cards

Kartu ke halaman lain. Isi dari halaman anak (`from`) **atau** daftar manual (`items`); kalau dua-duanya diisi, `from` yang dipakai. Preview: `/prototype/cards`.

| Gaya | Pemakaian | Dipakai oleh gaya ini |
|---|---|---|
| `CardsBasic_001` | base | judul section, kartu sebagai link teks, more |
| `CardsGallery_001` | dipakai | foto 2 kolom bernomor + linkLabel + more (cocok tone dark) |
| `CardsGallery_002` | dipakai | foto 3 kolom bernomor + linkLabel + more |

```yaml
  - type: cards
    variant: CardsGallery_002   # CardsBasic_001 | CardsGallery_001 | CardsGallery_002
    tone: default
    eyebrow: "03 / LAYANAN"
    title: "Keahlian untuk"
    accent: "melangkah lebih jauh."
    description: "..."
    more: { label: "Semua layanan", href: /services }   # Link kanan atas
    linkLabel: "Lihat layanan"  # Teks link di tiap kartu
    # Isi kartu, pilih SALAH SATU:
    from: services              # Otomatis: setiap halaman ber-`parent: services` jadi kartu (title, summary, image, order)
    items:                      # Manual: jumlah kartu = jumlah item
      - title: Pelatihan        # WAJIB per item
        description: "Tingkatkan keterampilan tim, dari dasar hingga lanjutan."
        href: /training
        image: { src: ./pelatihan.jpg, alt: Pelatihan }
      - title: Konsultasi
        description: "Arahan ahli untuk kebutuhan bisnis Anda."
        href: /consulting
        image: { src: ./konsultasi.jpg, alt: Konsultasi }
```

## catalog

Showcase produk dari `src/content/products/` (1 file = 1 kategori, lihat [Data produk](#data-produk)). Preview: `/prototype/catalog`.

| Gaya | Pemakaian | Dipakai oleh gaya ini |
|---|---|---|
| `CatalogBasic_001` | base | kategori + daftar produk sebagai teks/link, more |
| `CatalogGrid_001` | dipakai | kartu kategori bergambar 3 kolom bernomor, daftar produk di bawah kartu, more |

```yaml
  - type: catalog
    variant: CatalogGrid_001    # CatalogBasic_001 | CatalogGrid_001
    eyebrow: "01 / SOFTWARE"
    title: "Perangkat yang tepat."
    accent: "Di setiap tahap desain."
    description: "Dari pemodelan dan simulasi hingga pengelolaan siklus hidup produk."
    more: { label: "Semua solusi software", href: /software }
    categories: [cad, cam, cae] # id = nama file di products/. Hapus baris = semua kategori
    limit: 0                    # Produk per kategori: hapus = semua, 0 = tanpa daftar (ringkasan beranda)
```

## features

Daftar kapabilitas bernomor (judul + penjelasan per baris). Preview: `/prototype/features`.

| Gaya | Pemakaian | Dipakai oleh gaya ini |
|---|---|---|
| `FeaturesBasic_001` | base | daftar bernomor teks |
| `FeaturesRows_001` | dipakai | baris bernomor bergaris: nomor · judul · penjelasan |

```yaml
  - type: features
    variant: FeaturesRows_001   # FeaturesBasic_001 | FeaturesRows_001
    tone: default
    eyebrow: "KAPABILITAS"
    title: ""                   # opsional; hapus kalau tidak dipakai
    items:                      # Jumlah baris = jumlah item
      - title: "Pemantauan real-time"            # WAJIB per item
        description: "Data langsung dari perangkat untuk keputusan lebih cepat."
      - title: "Otomatisasi proses"
        description: "Otomatisasi tugas berdasarkan data untuk meningkatkan efisiensi."
```

## benefits

Manfaat / bidang penerapan. Isi yang sama bisa tampil sebagai grid ikon, deretan tag, atau dua kolom berincian. Preview: `/prototype/benefits`.

| Gaya | Pemakaian | Dipakai oleh gaya ini |
|---|---|---|
| `BenefitsBasic_001` | base | judul — penjelasan, entries, note (tanpa ikon) |
| `BenefitsIcons_001` | dipakai | ikon + judul + penjelasan, 3 kolom (tepat 4 item → 4 kolom), note |
| `BenefitsTags_001` | dipakai | **hanya judul** sebagai tag + note |
| `BenefitsColumns_001` | dipakai | 2 kolom besar: ikon + judul + penjelasan + **entries**, note |

```yaml
  - type: benefits
    variant: BenefitsIcons_001  # BenefitsBasic_001 | BenefitsIcons_001 | BenefitsTags_001 | BenefitsColumns_001
    tone: default
    eyebrow: "MANFAAT & KEUNGGULAN"
    title: "Pelatihan sesuai"
    accent: "kebutuhan tim Anda."
    items:                      # Jumlah kotak = jumlah item
      - icon: gauge             # Nama file di src/assets/icons/ tanpa .svg (lihat daftar di bawah)
        title: "Efisiensi operasional"           # WAJIB per item
        description: "Kurangi pekerjaan manual melalui pemantauan otomatis."
        entries:                # Rincian istilah–penjelasan (BenefitsColumns_001)
          - { term: Off-site, detail: "Dilaksanakan di fasilitas Parametrik." }
          - { term: On-site, detail: "Dilaksanakan di fasilitas pelanggan." }
      - icon: shield-check
        title: "Keamanan terintegrasi"
        description: "Lindungi perangkat, data, dan sistem."
    note: "Paragraf penutup di bawah daftar (opsional)."
```

Ikon tersedia (`src/assets/icons/`, Lucide): `badge-check` `calendar-check` `chart-no-axes-combined` `compass` `database` `factory` `file-check` `gauge` `graduation-cap` `heart` `heart-handshake` `monitor-smartphone` `panels-top-left` `scan-line` `settings` `shield-check` `sliders-horizontal` `target` `timer` `users`. Ikon baru: taruh `.svg` Lucide di folder itu (ganti warna stroke jadi `currentColor`).

## posts

Daftar artikel dari `src/content/posts/` (terbaru di atas). Preview: `/prototype/posts`.

| Gaya | Pemakaian | Dipakai oleh gaya ini |
|---|---|---|
| `PostsBasic_001` | base | judul + tanggal, more |
| `PostsGrid_001` | dipakai | 2 kolom: kategori, judul, linkLabel, more |

```yaml
  - type: posts
    variant: PostsGrid_001      # PostsBasic_001 | PostsGrid_001
    eyebrow: "04 / ARTIKEL & WAWASAN"
    title: "Pengetahuan yang"
    accent: "terus berkembang."
    limit: 2                    # Hapus = semua artikel
    category: ""                # Saring per kategori artikel; hapus = semua kategori
    linkLabel: "Baca artikel"
    more: { label: "Semua artikel", href: /artikel }
    items:                      # Opsional: artikel manual (mis. di situs lain). Kalau diisi, koleksi posts tidak dipakai
      - { category: SOFTWARE, title: "Software Mathcad di Jakarta", href: "https://www.parametris.com/mathcad-software-in-jakarta/" }
```

## text

Teks bebas beberapa paragraf. Preview: `/prototype/text`.

| Gaya | Pemakaian |
|---|---|
| `TextBasic_001` | base (belum ada gaya berdesain) |

```yaml
  - type: text
    variant: TextBasic_001
    eyebrow: "TENTANG KAMI"
    title: "Siapa kami"
    body: |
      Paragraf pertama.

      Paragraf kedua.
```

## cta

Ajakan bertindak, biasanya section terakhir. Preview: `/prototype/cta`.

| Gaya | Pemakaian | Dipakai oleh gaya ini |
|---|---|---|
| `CtaBasic_001` | base | judul, deskripsi, tombol sebagai link |
| `CtaClosing_001` | dipakai | eyebrow, judul sangat besar + accent, deskripsi, tombol bergaris (bawaan tone alt) |

```yaml
  - type: cta
    variant: CtaClosing_001     # CtaBasic_001 | CtaClosing_001
    tone: alt                   # kosongkan = bawaan gaya
    eyebrow: "MULAI PERCAKAPAN"
    title: "Kebutuhan Anda."
    accent: "Langkah kita berikutnya."
    description: ""             # opsional
    actions:                    # Jumlah bebas; yang pertama = tombol utama
      - { label: "Diskusikan kebutuhan Anda", href: /contact }
```

## contact

Info kontak (dari `site.yaml › contact`, lihat [Data kontak](#data-kontak-perusahaan)) + formulir. Preview: `/prototype/contact`.

| Gaya | Pemakaian | Dipakai oleh gaya ini |
|---|---|---|
| `ContactBasic_001` | base | semua info kontak + actions + **formulir** (mockup, belum terkirim) |
| `ContactDirect_001` | dipakai | email besar, emails, actions (tombol), phones, alamat kanan. **Tanpa formulir** |

```yaml
  - type: contact
    variant: ContactDirect_001  # ContactBasic_001 | ContactDirect_001
    eyebrow: "HUBUNGI TIM KAMI"
    title: ""                   # opsional
    description: ""             # opsional
    addressLabel: "ALAMAT"
    actions:
      - { label: WhatsApp, href: "https://api.whatsapp.com/send?phone=6282116291814" }
      - { label: "+62 21 3044 8230", href: "tel:+622130448230" }
    contact:                    # Opsional: menimpa site.yaml › contact HANYA untuk section ini (field yang diisi saja)
      email: sales@parametris.com
      hours: ""                 # "" = sembunyikan field dari site.yaml
    form:                       # Formulir (ContactBasic_001)
      fields:                   # type: text | email | tel | textarea
        - { name: name, label: Nama, required: true }
        - { name: email, label: Email, type: email, required: true }
        - { name: message, label: Pesan, type: textarea, required: true }
      submit: Kirim
```

---

# Data pendukung

## Data produk

Dipakai modul `catalog`. 1 kategori = 1 file; id kategori = nama file.

```yaml
# src/content/products/cad.yaml
title: CAD                      # WAJIB
summary: "Desain dan pemodelan produk."
order: 1
image: { src: ./cad.jpg, alt: CAD }       # Foto kartu (CatalogGrid_001), sefolder dengan file ini
items:                          # Daftar produk, jumlah bebas
  - { name: "Creo Parametric", href: "https://www.ptc.com/en/products/creo/parametric" }
  - { name: "Creo View", description: "opsional", href: "https://www.ptc.com/en/products/creo/creo-view" }
```

## Memilih gaya

**Gaya apa pun boleh dipakai.** Yang ditulis di `variant:` itulah yang tampil, sama saat dev dan build (tidak ada status/persetujuan). Alurnya: coba gaya di `/prototype/<modul>` (combo box **Variasi** + **Contoh isi**), lalu tulis namanya di YAML. Nama salah ketik = error yang menyebut semua pilihan. Daftar semua gaya + di mana dipakai: `/prototype/variants`.

## Contoh nyata

Ke-13 halaman situs (`src/content/pages/*/index.yaml`, isi asli parametris.com) memakai blok-blok di atas. Buka file-nya sebagai contoh lengkap, mis. `home/index.yaml` (hampir semua modul) dan `training/index.yaml` (benefits tiga gaya).
