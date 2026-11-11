# Astro Framework Practice

A practice repository for learning the [Astro](https://astro.build) framework.

Demo (Beta Test): https://parametris-astro-practice-001.netlify.app

## Branches

| Branch | Purpose |
| :--- | :--- |
| `prototype-01` | Day-to-day development & prototype testing |
| `master` | Main official release branch |
| `demo` | Version deployed to Netlify (Beta Test site) |
| `referensi` | Reference source code (read-only) |

## Getting started

Requires Node.js 22.12 or later.

```sh
npm install
npm run dev
```

Open `http://localhost:4321` in your browser.

## Commands

| Command | Action |
| :--- | :--- |
| `npm install` | Install dependencies |
| `npm run dev` | Start the local dev server at `localhost:4321` |
| `npm run build` | Build the production site to `dist/` |
| `npm run preview` | Preview the build locally |

## Deployment

Netlify deploys the site automatically on every push to the `demo` branch (Beta Test site).

### Alur Pengembangan

1. Pengembangan harian dan pengujian prototype dilakukan di branch `prototype-01`.
2. Setelah fitur/perubahan siap dan disetujui, gabungkan ke branch `master`.
3. Untuk memperbarui situs Beta Test Netlify (`demo`), lakukan push ke branch `demo`:

```sh
git push origin prototype-01:demo
# Atau dari master:
git push origin master:demo
```

Build settings are defined in `netlify.toml`.

## References

- [Astro documentation](https://docs.astro.build)
- [Official Astro tutorial](https://docs.astro.build/en/tutorial/0-introduction/)
