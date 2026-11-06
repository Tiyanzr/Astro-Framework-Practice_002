// Integrasi "prototype": halaman di src/prototype/pages/ hanya hidup saat `astro dev`, tidak pernah ikut `astro build`.
// Semua file src/prototype/pages/**/*.astro tampil di /prototype/... lewat satu rute penampung (file baru langsung terbaca).
// Konten uji di src/prototype/content/ diatur terpisah di src/content.config.ts (juga hanya saat dev).
// Status variasi (draft/disetujui) TIDAK diatur di sini, tapi di src/content/variants.yaml.
import { fileURLToPath } from "node:url";

export default function prototype() {
  return {
    name: "prototype",
    hooks: {
      "astro:config:setup": ({ command, injectRoute }) => {
        if (command !== "dev") return;
        // prerender: false supaya ?query (mis. /prototype/post?v=...) terbaca. Aman karena rute ini hanya ada saat dev.
        injectRoute({
          pattern: "/prototype/[...path]",
          entrypoint: fileURLToPath(new URL("./route.astro", import.meta.url)),
          prerender: false,
        });
      },
    },
  };
}
