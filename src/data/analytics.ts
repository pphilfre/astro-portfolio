import type { PostHogConfig } from 'posthog-js';

export const analyticsConfig = {
  api_host: 'https://us.i.posthog.com',
  defaults: '2025-11-30',
  person_profiles: 'identified_only',
  capture_pageview: false,
  autocapture: false,
  capture_dead_clicks: false,
  rageclick: false,
  capture_heatmaps: false,
  capture_performance: false,
  capture_exceptions: false,
  disable_session_recording: true,
  disable_surveys: true,
  disable_external_dependency_loading: true,
  advanced_disable_flags: true,
} satisfies Partial<PostHogConfig>;
