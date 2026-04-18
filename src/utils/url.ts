// Helper that prefixes an internal path with Astro's BASE_URL.
// Use for every internal link so the site works both locally (base "/")
// and on GitHub Pages (base "/stableheat-blog").
//
// We normalize defensively because Astro's BASE_URL can come through with
// or without a trailing slash depending on version.
const baseRaw = import.meta.env.BASE_URL || '/';
const base = baseRaw.replace(/\/+$/, ''); // strip any trailing slashes

export function path(p: string): string {
  const cleanPath = p.startsWith('/') ? p : `/${p}`;
  // Result is always exactly one slash between base and path.
  // For root ('/'), this returns "/base/" (or just "/" if base was empty).
  return `${base}${cleanPath}`;
}
