// Variasi KANDIDAT (belum disetujui), per section. Hanya terbaca saat `astro dev` (lihat ../integration.mjs).
// Taruh file di src/prototype/variants/<section>/<Nama><Gaya>_<NNN>.astro → otomatis muncul di /prototype/<section>.
// Setelah disetujui: pindahkan filenya ke folder section produksi (src/components/...), lalu pilih lewat YAML.
type Modules = Record<string, { default: any }>;

const prototypeVariants: Record<string, Modules> = {
  hero: import.meta.glob("./hero/Hero*_*.astro", { eager: true }),
  intro: import.meta.glob("./intro/Intro*_*.astro", { eager: true }),
  footer: import.meta.glob("./footer/Footer*_*.astro", { eager: true }),
  post: import.meta.glob("./post/Post*_*.astro", { eager: true }),
};

export default prototypeVariants;
