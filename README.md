# StableHeat Blog

A static blog for StableHeat (formerly STEP Heat) built with [Astro](https://astro.build).
Posts are written in Markdown. The site builds to plain static HTML and deploys to GitHub Pages.

## Local development

```bash
npm install
npm run dev
```

Open <http://localhost:4321>.

Other commands:

| Command | What it does |
| ------- | ------------ |
| `npm run dev` | Start the dev server with hot reload |
| `npm run build` | Build the static site to `./dist/` |
| `npm run preview` | Preview the production build locally |

## Project layout

```
src/
├── components/      Header, Footer, Thumb, PostCard
├── content/
│   ├── config.ts    Frontmatter schema (Zod-validated)
│   └── posts/       One Markdown file per blog post
├── layouts/
│   └── BaseLayout.astro
├── pages/
│   ├── index.astro          Homepage (featured + grid + list)
│   ├── about.astro
│   └── posts/[...slug].astro  Dynamic post pages
└── styles/
    └── global.css   Site-wide styles + cool→warm palette
public/
└── favicon.svg
```

## Adding a new post

1. Create `src/content/posts/your-slug.md`.
2. Use the frontmatter below. The schema is enforced — `npm run build` will fail if a field is missing or wrong-typed.

```markdown
---
title: "Your Post Title"
deck: "One-sentence deck shown under the title."
category: "Commercial"           # free text — used as the badge/label
date: 2026-04-20
readTime: "3 min read"
thumbVariant: 1                  # 1–10, picks the gradient color (see global.css)
thumbIcon: "building"            # Font Awesome Free icon name (no `fa-` prefix)
excerpt: "One- or two-sentence summary shown on cards."
featured: true                   # optional — promotes this post to the hero slot
---

Your post body in Markdown. Headings, **bold**, *italic*, lists, > blockquotes,
links, and code all work out of the box.
```

That's it — the homepage automatically picks it up, sorts by `date` descending, and
the most recent (or `featured: true`) post becomes the hero card.

### Icon reference

`thumbIcon` is any Font Awesome 6 Free **solid** icon name (without the `fa-` prefix).
Browse them at <https://fontawesome.com/search?o=r&m=free&s=solid>. Common ones used here:

| Topic | Icon |
| ----- | ---- |
| Commercial | `building` |
| RV / mobile | `caravan` |
| Marine | `sailboat` |
| Snowmelt | `snowflake` |
| Bathroom | `bath` |
| Floor / tile | `table-cells-large` |
| Comparison / guide | `scale-balanced` |
| Cost | `sack-dollar` |
| Technology | `microchip` |
| Wellness / air | `leaf` |

### Thumb variants (background gradient)

`thumbVariant` is `1`–`10`. Each maps to a subtle cool→warm gradient defined in
`src/styles/global.css` under `.thumb-1`–`.thumb-10`. Pick whichever feels right
for the topic — there's no semantic meaning enforced.

## Deploying to GitHub Pages

This repo includes a GitHub Actions workflow at `.github/workflows/deploy.yml` that
builds the site and publishes it to GitHub Pages on every push to `main`.

### One-time setup

1. **Push this repo to GitHub.**
2. **Update `astro.config.mjs`** with the right `site` (and `base` if needed):
   - **User/org page** (`https://USER.github.io`): set `site: 'https://USER.github.io'`.
     Leave `base` commented out.
   - **Project page** (`https://USER.github.io/REPO`): set
     `site: 'https://USER.github.io'` **and** uncomment `base: '/REPO'`.
   - **Custom domain**: set `site: 'https://yourdomain.com'`. Add a `public/CNAME`
     file containing your domain. Leave `base` commented out.
3. In the GitHub repo, go to **Settings → Pages** and set **Source** to
   **GitHub Actions**.
4. Push to `main`. The Actions workflow will build and deploy automatically.

After the first deploy, the workflow runs on every push to `main` — no manual steps.

## Tech notes

- **No JS shipped to the client.** Astro renders to static HTML at build time.
  Font Awesome loads via CDN for the icon glyphs.
- **Markdown renders through Astro's built-in MDX-compatible pipeline.** No extra
  config needed — just write Markdown.
- **Content is type-checked.** The Zod schema in `src/content/config.ts` validates
  every post's frontmatter at build time.
- **Palette and typography** live in `src/styles/global.css` under `:root` —
  CSS variables, easy to retune.

## Branding

- "StableHeat" everywhere (the rebrand from STEP Heat). Don't write "STEP HEAT" or
  "STEP Heat" in new content.
- Product CTAs link to <https://stableheat.com> until the new branded marketing site
  is ready.
- Tone is professional but aspirational — health, comfort, efficiency, durability.
  No fiery / red-hot imagery. The visual identity is cool-to-warm and subtle.

## Contact

St. Louis, MO · 314.202.5540 · sales@stableheat.com
