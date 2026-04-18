# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Quick commands

```bash
npm run dev      # dev server on http://localhost:4321/stableheat-blog/
npm run build    # static build to ./dist + Astro Image webp generation
npm run preview  # serve the built ./dist locally
```

There is no test suite. The build *is* the test — `npm run build` enforces
the content-collection schema and will fail loudly if a post's frontmatter
is wrong, an image path is missing, or an Astro component is broken. Run
it after non-trivial edits.

When verifying UI changes interactively, use the Claude_Preview MCP server
(`preview_start` → `preview_screenshot` / `preview_resize` / `preview_eval`).
A `.claude/launch.json` is already wired for the `blog` server.

## Architecture

**Astro 4 static-site blog** — pure SSG, no client-side JS shipped beyond
Font Awesome's CDN stylesheet. 53 posts, 9 application categories, deploys
to GitHub Pages via `.github/workflows/deploy.yml` on push to `main`.

### The base-URL trap (most common bug)

Site is configured with `base: '/stableheat-blog'` in `astro.config.mjs`
because it deploys to a project page (`https://roblusk.github.io/stableheat-blog/`).
This means **every internal link must go through `path()` from
`src/utils/url.ts`** — root-relative `href="/about"` works locally but 404s
on the deployed site.

```astro
---
import { path } from '../utils/url';
---
<a href={path('/about')}>About</a>
```

Astro's `BASE_URL` is normalized inconsistently across versions; the helper
strips trailing slashes and re-joins predictably. Don't hand-roll
`${import.meta.env.BASE_URL}about` — it has produced `/stableheat-blogabout`
in practice.

### Content collections (posts)

`src/content/config.ts` defines the `posts` collection schema. Posts come
in two structural forms — both produce the same slug:

- Flat: `src/content/posts/<slug>.md`
- Folder (preferred when the post has photos):
  `src/content/posts/<slug>/{index.md, cover.jpg, images/...}`

The folder form lets you co-locate the hero photo and any inline images.
Reference them in frontmatter / markdown with `./cover.jpg` and
`./images/foo.jpg` — Astro resolves and optimizes them via the `image()`
schema helper.

Every post needs: `title, deck, category, date, readTime, thumbVariant
(1–10), thumbIcon (Font Awesome name without "fa-" prefix), excerpt,
applications (array of slugs), heroImage (optional image()), heroImageAlt
(optional)`. The schema is strict; missing or wrong-typed fields fail the
build.

**Common gotcha:** when restructuring a flat `.md` into a folder, run the
`mv` *before* editing the new `index.md` — parallel `mv + Edit` operations
race and the edit can land on the wrong file.

### Two parallel taxonomies

Each post has both:

1. **`category`** — free-text editorial label shown as the badge on the
   post hero (e.g. "Commercial", "Marine", "Snowmelt"). Display only.
2. **`applications`** — array of slugs from `src/data/applications.ts`
   that drives the `/category/<slug>/` pages and the AppStrip nav.

A post can belong to multiple applications (e.g. an air-quality post can
be tagged `["home", "commercial", "rv", "marine"]`). The category badge
is independent and can describe the post in editorial terms even when the
applications list spans many areas.

If you add a new application, edit `src/data/applications.ts` (it ships
to both the AppStrip component and the dynamic category page generator)
*and* re-tag posts so the new category isn't empty.

### Image pipeline

- **Hero image**: frontmatter `heroImage: ./cover.jpg`, rendered by
  `PostCard.astro` (cards) and `pages/posts/[...slug].astro` (article hero).
  Falls back to the gradient `Thumb` when `heroImage` is absent.
- **Inline images** in post body: standard markdown `![alt](./images/foo.jpg)`.
  Astro auto-optimizes (multiple WebP widths). An italic-only paragraph
  immediately after the image becomes a centered figcaption — see the CSS
  rule `.article-body img + p em:only-child` in `src/styles/global.css`.

Avoid raw `<img>` HTML in markdown — it bypasses optimization.

### Styling

Single CSS file (`src/styles/global.css`) imported via `BaseLayout`. No
CSS-in-JS, no Tailwind. The design system (cool→warm palette, Fraunces +
Inter typography, component patterns) is documented in `DESIGN.md` — use
that when picking colors or building new components.

### Mobile AppStrip

`src/components/AppStrip.astro` is sticky on desktop. On mobile (<600px)
it collapses to a non-sticky 3×3 tile grid with cell borders. The mobile
override lives at the bottom of `global.css` under the 600px media query
— if you add a 10th application, the grid layout will need adjustment
(currently assumes `nth-child(3n)` and `nth-last-child(-n+3)` for borders).

## Content workflow

When adding a new customer-project post:

1. Find a target in `CONTENT_STATUS.md` — it tracks which catalog projects
   have been covered and which are still on deck (with notes on photo
   availability).
2. Source photos and docs live in OneDrive at `/Users/robertlusk/Library/CloudStorage/OneDrive-planitworks.com/planitworks - PIW_Library/StepHeat_StableHeat/03 Marketing/`. **Read-only — never modify, rename, or delete anything in there.** Copy needed photos into the post folder.
3. Browse the project's folder for nearby Word/PDF docs that provide
   factual context (specs, dates, partner names). Read them for content;
   don't quote or copy them verbatim.
4. After adding the post, **update `CONTENT_STATUS.md`** to move the
   project from the "not yet covered" table to the "covered" table.
   The build doesn't enforce this — it's a manual discipline.

Voice and visual conventions are in `DESIGN.md`. The brand is "StableHeat"
(rebrand from "STEP HEAT") — never write "STEP Heat" or "STEP HEAT" in new
content. Visual web links currently route to `https://stepheat.com` (the
live legacy site) but display "stableheat.com" — don't change the href
values until the new domain is live; only the visible text and email
addresses (`sales@stableheat.com`) reflect the new brand.

## Deploying

`.github/workflows/deploy.yml` builds and publishes on every push to
`main`. The workflow needs **Settings → Pages → Source: GitHub Actions**
configured once on the GitHub repo (it's already set up). Don't change
`site` or `base` in `astro.config.mjs` without coordinating — it'll break
internal links until the helper picks up the new value.
