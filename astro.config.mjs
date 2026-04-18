import { defineConfig } from 'astro/config';

// Deploys to https://roblusk.github.io/stableheat-blog/
// If you later attach a custom domain, set `site` to that and remove `base`.
export default defineConfig({
  site: 'https://roblusk.github.io',
  base: '/stableheat-blog',
  output: 'static',
  trailingSlash: 'ignore',
  build: {
    format: 'directory',
  },
});
