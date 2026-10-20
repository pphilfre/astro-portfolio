import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://freddiephilpot.dev',
  output: 'server',
  compressHTML: true,
  // Avoid stylesheet round trips before the first paint on this small site.
  build: { inlineStylesheets: 'always' },
  adapter: vercel(),
  vite: { plugins: [tailwindcss()] },
  integrations: [react()],
  markdown: {
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark-default' },
    },
  },
});
