# Parametris — Complete Source Export (version 8)

Website: https://www.parametris.com
GPT Sites project: Parametrik — Software, IoT & Engineering
Export date: 4 November 2026
Source commit: e312c8c2a1d553602c27aa08c5ff3e368e5eef09

All tracked files at this commit are included unchanged, plus this README
and an export manifest with SHA-256 checksums. This is the site connected
to www.parametris.com, not the separate Parametrik development site.

## Run locally

Install Python 3, open a terminal in this extracted folder, and run:

    python3 -m http.server 8000 --bind 127.0.0.1 --directory dist

On Windows, you can use `py` instead of `python3`.
Open http://localhost:8000 in your browser. Stop the server with Ctrl+C.
Use a web server rather than opening index.html directly, because the
website uses root-relative paths.

## What is included

- dist/: complete deployable static website, including 13 HTML pages,
  CSS, JavaScript, Indonesian/English content, images, logos and icons.
- dist/app.js: page rendering, navigation and interactions.
- dist/data.js: page content and translations.
- dist/products.js: software catalog, product links and translations.
- dist/style.css: styling and responsive layouts.
- dist/assets/: all repository image and icon files, including icon license.
- generate.py: original generator, preserved unchanged.
- validate.cjs: original validator, preserved unchanged.
- .openai/hosting.json: original GPT Sites deployment configuration.

## Edit and host

Edit the files in dist/ directly. No npm installation or build step is
required to run the existing website. Deploy the contents of dist/ as the
web root on a static hosting service; preserve the route directories.

The repository contains no separate backend, database, package manifest,
or node_modules directory. Remote links (PTC products, social media,
WhatsApp, email, and original articles) remain links to their destinations;
the content of those external destinations is not part of this export.
GPT Sites hosting infrastructure, account credentials and Git metadata are
not included. All version 8 tracked source files are included.

## Generator limitation

The original generate.py expects /tmp/parametris-software.html, a temporary
input that is not tracked in the source repository and could not be
retrieved. Its generated output is already included in dist/. Running this
script is unnecessary for serving or editing the website. It may overwrite
later manual changes if used, so preserve a copy before regenerating.

## Validation

With Node.js installed, run from this folder:

    node validate.cjs

This passed at export: 13 pages in both languages, with local navigation
and asset paths resolving. This is a programmatic check, not a new visual
browser audit or a verification of remote links.
