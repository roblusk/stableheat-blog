# StableHeat Blog — Design Guide

A reference for the visual language, voice, and content patterns used across
the StableHeat Insights blog. Use this when extending the site, writing new
posts, or briefing collaborators.

---

## Brand voice

**Professional but aspirational.** Technical credibility paired with lifestyle
appeal. We're not a hard-sell brand — we're the quiet company that has been
solving heating problems for decades and is happy to explain how it works.

**Concrete, not corporate.** Use specific numbers ($600–$1,200 for a bathroom
kit), specific names (Atlantis Spa, NYPD patrol boats), and specific scenarios
(a January morning in Reno) over generic claims. The credibility comes from
the specificity.

**Honest about tradeoffs.** When electric isn't the right answer, say so.
("Whole-house new construction, cold climate, gas available → hydronic is
probably the right call.") Customers trust the recommendation more when they
trust the framing.

**Quietly confident.** Avoid superlatives, exclamation points, and hype words
("revolutionary," "cutting-edge," "best-in-class"). The product has been
running since the 1990s — the work speaks.

### Tone scaffolds

- Lead with a concrete observation, then zoom out to the principle.
- Pull quotes set in serif italic to break up long-form posts.
- "We" when it's StableHeat speaking; "you" sparingly, only when giving direct
  practical advice.
- Closing lines that summarize the point without restating it.

---

## Color palette

The system runs on a **subtle cool-to-warm** gradient. Never fiery, never
red-hot — the product is comfort, not combustion.

### Cool end — navy + steel

| Token | Hex | Use |
| ----- | --- | --- |
| `--navy` | `#1A2B47` | Primary background (header, footer, dark CTA bands), headings |
| `--navy-2` | `#243853` | Masthead strip, secondary dark surfaces |
| `--navy-3` | `#30486A` | Mid-depth navy for gradients |
| `--cool` | `#6B8AB3` | Cool accent, hero gradient stop |
| `--cool-2` | `#9CB2CE` | Soft cool for subtle washes |

### Warm end — bronze + amber

| Token | Hex | Use |
| ----- | --- | --- |
| `--accent` | `#B88954` | Primary warm accent — links, badges, CTA highlights, brand "Heat" |
| `--accent-2` | `#D9B584` | Soft amber highlight, kicker text on dark backgrounds |
| `--warm` | `#F3EADA` | Cream surface for article hero, inline CTAs |
| `--warm-2` | `#E8DBC2` | Slightly deeper cream for secondary warm surfaces |

### Neutrals

| Token | Hex | Use |
| ----- | --- | --- |
| `--bg` | `#F9F6EF` | Page background — soft warm off-white |
| `--surface` | `#FFFFFF` | Card surfaces, post cards, kit cards |
| `--ink` | `#141A24` | Body text |
| `--ink-2` | `#3A4556` | Secondary text, ledes, excerpts |
| `--muted` | `#6B7786` | Tertiary text, dates, metadata |
| `--line` | `#E5E0D3` | Borders, dividers |

### Hero gradient (the brand signature)

```css
background: linear-gradient(135deg, #1F3A5C 0%, #4E6E94 35%, #9BA8B8 60%, #C9A074 100%);
```

A single visual stroke across cool navy → soft blue → warm amber. Used on the
homepage hero panel and visible nowhere else — it's the brand's "money shot."

### Thumb gradients (per-post variants)

The 10 thumb variants in `global.css` (`.thumb-1` through `.thumb-10`) are
narrow palette variations within the cool-to-warm range. Each maps to a
content tone (cool blue for tech/commercial, sage for nature/RV/wellness,
warm amber for cost/solar topics). When picking a `thumbVariant` for a new
post, choose by the post's emotional tone — not its category.

---

## Typography

Two-font system, both via Google Fonts.

### Display — Fraunces

Used for: page titles, post titles, section headings, brand wordmark, pull
quotes. A modern serif with optical-size variants — feels editorial and
warm without being old-fashioned.

```
font-family: "Fraunces", Georgia, "Times New Roman", serif;
```

Weights in use: 500 (titles), 600 (brand). Italic at 500 for emphasis and
pull quotes.

### Body — Inter

Used for: body copy, navigation, buttons, metadata, captions. Clean,
technical, modern — the calm counterpoint to Fraunces.

```
font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI",
             Helvetica, Arial, sans-serif;
```

Weights in use: 400 (body), 500 (links/labels), 600 (buttons/labels), 700
(uppercase kickers and post-meta tags).

### Type scale (highlights)

| Element | Size | Family | Weight |
| ------- | ---- | ------ | ------ |
| Hero / page title | `clamp(36–58px)` to `clamp(40–72px)` | Fraunces | 500 |
| Article title | `clamp(34–54px)` | Fraunces | 500 |
| Section title | 32px | Fraunces | 500 |
| Post card title | 22px | Fraunces | 500 |
| Body | 17–18px | Inter | 400 |
| Lede / deck | 19–20px | Inter | 400 |
| Kicker / meta | 12–13px uppercase, `letter-spacing: 0.08–0.12em` | Inter | 700 |

---

## Iconography

**Font Awesome 6 Free Solid**, loaded via CDN. Always referenced by name in
the content collection schema (`thumbIcon: "building"`) and rendered by the
shared `Thumb` component.

### Application icons (the AppStrip taxonomy)

| App | Icon | Notes |
| --- | ---- | ----- |
| Home | `house` | Residential heating |
| Floor | `table-cells-large` | Under-floor systems |
| Commercial | `building` | Office, hospitality, healthcare |
| RV | `caravan` | Mobile / RV |
| Marine | `sailboat` | Below-deck installs |
| Snowmelt | `snowflake` | Driveways, walks, ramps |
| Roof De-Ice | `icicles` | Roof + gutter heat |
| Solar | `solar-panel` | Panel snow-clearing |
| Oil & Gas | `oil-well` | Industrial heat trace |

### Brand mark

`fa-temperature-half` — a thermometer. Heating without flames. The mark
sits inside a subtle cool-to-warm gradient tile (cool blue → bronze) in
the header and footer.

---

## Layout & spacing

- **Container max-width:** `1200px` (`--container`)
- **Section padding:** `52px 0` (top/bottom)
- **Hero padding:** `64px 0 40px`
- **Card radius:** `14px` (`--radius`); small radius `8px` (`--radius-sm`)
- **Grid gaps:** `32px` for post grid, `28px` for kit grid
- **Article reading width:** `720px` max (single-column body)

### Shadows

- `--shadow`: light, for hover states and minor lift
- `--shadow-lg`: dramatic, for hero panels and feature cards

Both are tinted with navy alpha so the warm background reads cleanly.

---

## Component patterns

### Header
Sticky, navy background, brand mark on the left, simple text nav on the right
ending in a warm-amber pill CTA ("Shop StableHeat" → `/shop`). Below the
header, a slim navy-2 strip carries the publication tagline and location.

### AppStrip (category nav)
Below the masthead, above the hero. White background, 9 application icons
with labels. Sticky on desktop. **Collapses to a 3×3 tile grid on mobile**
with cell borders — non-sticky on mobile to preserve scroll real estate.
Active state: warm cream background + amber underline (or inset shadow on
mobile).

### Post cards
Three variants:
- **Feature**: 2-column wide, hero card with large image and full deck
- **Card**: standard 3-up grid (3 cols desktop → 2 → 1)
- **List**: compact horizontal row with thumbnail and metadata

All three use the same `Thumb` gradient + icon for thumbnails until photos
are wired in.

### Article hero
Cream (`--warm`) background, breadcrumb → category badge (amber pill) →
serif title → deck → byline. The post's themed thumb sits below the hero
as a 21:9 banner.

### CTA bands
Navy background with two soft radial-gradient washes (one warm amber, one
cool blue) that bleed in from opposite corners. Title + supporting copy on
the left, CTA buttons on the right. Used on home, about, category, and
shop pages.

### Kit cards (shop)
Three-up grid, white surface, large serif size letter (S/M/L) inside a
gradient tile (cool / mid / warm to differentiate), price in display
serif, included-list with amber check icons. The "popular" middle card
gets an amber border + badge.

---

## Image direction

(Once photos replace the gradient thumbs.)

- **Hero photography**: prefer wide-aspect (16:9 or 21:9), warm-temperate
  lighting, real installations over staged renders.
- **Category-page heroes**: a single signature photo per application
  (e.g., Atlantis lobby for Commercial, NYPD vessel for Marine).
- **In-post galleries**: 2–4 images max per post, sized to the article's
  720px reading width.
- **Avoid**: stock photos with no connection to the product, isolated
  product shots on white, marketing renders that don't show installation
  context.
- **Honor the cool-to-warm palette**: photos with a slightly warm color
  cast feel like they belong; cold/blue-cast photos can feel off.

---

## Voice references

When a post drifts, run it through these checks:

- Would a customer who's already bought from us nod at this? (Not over-sold.)
- Would a customer who's never heard of us understand it? (Not over-jargoned.)
- Does it use a number, a name, or a scene in the first three sentences?
  (Specificity over abstraction.)
- Does it acknowledge a tradeoff somewhere? (Honesty over advertorial.)
- Is the closing line earned, or is it filler? (Endings matter.)

---

## File map

| Where | What |
| ----- | ---- |
| `src/styles/global.css` | All tokens, components, responsive rules |
| `src/data/applications.ts` | App taxonomy, icons, taglines |
| `src/content/config.ts` | Post frontmatter schema |
| `src/components/` | Header, Footer, AppStrip, PostCard, Thumb |
| `src/layouts/BaseLayout.astro` | Page shell + global font/CDN includes |
| `src/utils/url.ts` | BASE_URL helper for internal links |
| `astro.config.mjs` | `site` and `base` (set for GitHub Pages) |

---

_Last updated: April 2026._
