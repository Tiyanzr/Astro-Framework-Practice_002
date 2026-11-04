// Integrasi "prototype": semua yang ada di src/prototype/ hanya hidup saat `astro dev`, tidak pernah ikut `astro build`.
// - Halaman src/prototype/pages/**/*.astro tampil di /prototype/... (lewat satu rute penampung, file baru langsung terbaca).
// - Variasi kandidat src/prototype/variants/<section>/ ikut terbaca oleh variants.ts tiap section lewat modul "prototype:variants".
//   Saat build, "prototype:variants" diganti modul kosong, jadi kandidat tidak ikut di-bundle dan
//   halaman produksi yang menunjuk variasi kandidat gagal di-build dengan pesan jelas.
import { fileURLToPath } from "node:url";

const PROTOTYPE_VARIANTS = "prototype:variants";
const OFF = "\0prototype:variants-off";

export default function prototype() {
  return {
    name: "prototype",
    hooks: {
      "astro:config:setup": ({ command, injectRoute, updateConfig }) => {
        const dev = command === "dev";
        if (dev) {
          // prerender: false supaya ?query (mis. /prototype/post?v=...) terbaca. Aman karena rute ini hanya ada saat dev.
          injectRoute({ pattern: "/prototype/[...path]", entrypoint: fileURLToPath(new URL("./route.astro", import.meta.url)), prerender: false });
        }
        updateConfig({
          vite: {
            plugins: [
              {
                name: "prototype-variants",
                enforce: "pre",
                resolveId(id) {
                  if (id !== PROTOTYPE_VARIANTS) return;
                  return dev ? fileURLToPath(new URL("./variants/index.ts", import.meta.url)) : OFF;
                },
                load(id) {
                  if (id === OFF) return "export default {};";
                },
              },
            ],
          },
        });
      },
    },
  };
}
