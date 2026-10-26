import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';
import sentry from '@sentry/astro';

export default defineConfig({
  site: 'https://freddiephilpot.dev',
  output: 'server',
  compressHTML: true,
  security: {
    csp: {
      directives: [
        "default-src 'self'",
        "base-uri 'none'",
        "object-src 'none'",
        "frame-ancestors 'none'",
        "form-action 'self'",
        "font-src 'self' data:",
        "img-src 'self' data: blob: https://www.googletagmanager.com https://*.google-analytics.com",
        "connect-src 'self' https://us.i.posthog.com https://www.googletagmanager.com https://*.google-analytics.com https://*.google.com https://challenges.cloudflare.com https://o4512295457062912.ingest.de.sentry.io",
        'frame-src https://challenges.cloudflare.com https://www.googletagmanager.com',
        "worker-src 'self' blob:",
        'upgrade-insecure-requests',
      ],
      scriptDirective: {
        resources: [
          "'self'",
          'https://www.googletagmanager.com',
          'https://challenges.cloudflare.com',
          { resource: "'none'", kind: 'attribute' },
        ],
      },
      // Shiki code blocks and React/animation styles use inline CSS. Scripts
      // remain hash-authorized; no unsafe-inline or unsafe-eval for JavaScript.
      styleDirective: { resources: ["'self'", "'unsafe-inline'"] },
    },
  },
  // Fingerprinted stylesheets share the long-lived /_astro cache policy.
  build: { inlineStylesheets: 'never' },
  adapter: vercel({ staticHeaders: true }),
  vite: { plugins: [tailwindcss()] },
  integrations: [
    react(),
    sentry({
      project: 'astro-portfolio',
      org: 'pphilfre',
      authToken: process.env.SENTRY_AUTH_TOKEN,
    }),
  ],
  markdown: {
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark-default' },
    },
  },
});
