import * as Sentry from '@sentry/astro';

Sentry.init({
  dsn: 'https://c654b4e9cbf36b756003774e9fa7b969@o4512295457062912.ingest.de.sentry.io/4512295476199504',
  enabled: import.meta.env.PROD,
  tracesSampleRate: 1.0,
});
