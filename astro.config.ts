import { defineConfig } from "astro/config";
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://mdmen.github.io',
  prefetch: true,
  integrations: [mdx()],
});
