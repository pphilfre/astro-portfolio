import posthog from 'posthog-js/dist/module.slim';

declare global {
  interface Window {
    posthog?: typeof posthog;
  }
}

export function initAnalytics() {
  if (posthog.__loaded) return;
  // The pinned slim SDK retains identity, sessions and page views without
  // bundling replay, surveys, autocapture or their external script loaders.
  window.posthog = posthog;
  posthog.init('phc_kHZWuiUzdGkjQ7OvXfER2jygjMyTK9oyFfjVeg5vuAg', {
    api_host: 'https://us.i.posthog.com',
    defaults: '2025-11-30',
    person_profiles: 'identified_only',
    capture_pageview: true,
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
  });
}
