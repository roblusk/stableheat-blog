import { defineConfig } from 'astro/config';

// Update `site` to your GitHub Pages URL once you know it.
// If deploying to a project page (https://USER.github.io/REPO), also set `base: '/REPO'`.
// If using a custom domain or a user/org page, leave `base` unset.
export default defineConfig({
  site: 'https://example.github.io',
  // base: '/stableheat-blog',
  output: 'static',
  trailingSlash: 'ignore',
  build: {
    format: 'directory',
  },
});
