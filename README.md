# Astro Framework Practice

A practice repository for learning the [Astro](https://astro.build) framework.

Demo: https://parametris-astro-practice-001.netlify.app

## Branches

| Branch      | Purpose                                                  |
| :---------- | :------------------------------------------------------- |
| `master`    | Day-to-day development                                   |
| `demo`      | Version deployed to Netlify                              |
| `referensi` | Original Jasa Listrik Bandung source code (read-only)    |

## Getting started

Requires Node.js 22.12 or later.

```sh
npm install
npm run dev
```

Open `http://localhost:4321` in your browser.

## Commands

| Command           | Action                                       |
| :---------------- | :------------------------------------------- |
| `npm install`     | Install dependencies                         |
| `npm run dev`     | Start the local dev server at `localhost:4321` |
| `npm run build`   | Build the production site to `dist/`         |
| `npm run preview` | Preview the build locally                    |

## Deployment

Netlify deploys the site automatically on every push to the `demo` branch.
To update the demo from `master`:

```sh
git push origin master:demo
```

Build settings are defined in `netlify.toml`.

## References

- [Astro documentation](https://docs.astro.build)
- [Official Astro tutorial](https://docs.astro.build/en/tutorial/0-introduction/)