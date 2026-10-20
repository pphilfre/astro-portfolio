/// <reference types="astro/client" />

import type posthog from 'posthog-js/dist/module.slim';

declare global {
  interface ImportMetaEnv {
    readonly RESEND_API_KEY: string;
    readonly TURNSTILE_SECRET_KEY: string;
  }
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  interface Window {
    posthog?: typeof posthog;
    dataLayer?: unknown[];
  }
}
