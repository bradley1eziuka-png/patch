# The Original Patch Master website

Static website for The Original Patch Master, a family-owned drywall, plaster and finishing contractor in Dearborn Heights, MI.

## How it works
Pages are generated from shared data by a small Node script (no dependencies).

- `src/data.mjs`: business details, services, locations, navigation, media mapping, hero settings
- `src/lib.mjs`, `src/pages.mjs`: templates and page content
- `build.mjs`: writes every page into `site/`
- `site/`: the deployable site (HTML, CSS, JS, optimized images and videos)

```
node build.mjs                      # rebuild all pages
cd site && python3 -m http.server 3417   # preview at http://localhost:3417
```

Links are root-relative, so deploy `site/` at the domain root.

## Before launch
- Set `siteUrl` in `src/data.mjs` (canonicals, sitemap, robots) and rebuild.
- Set `formEndpoint` in `src/data.mjs` so the contact form can send. Until then it tells visitors to call or email.
- See `MEDIA.md` for the media inventory, what each clip shows, and how to re-encode or swap media.

## QA (optional)
`qa.mjs` and `screenshot.mjs` use `puppeteer-core` and Google Chrome. Install `puppeteer-core` somewhere and point `PUPPETEER_DIR` at it. Raw source videos and images are not in this repository.
