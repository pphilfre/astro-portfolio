(() => {
  const schedule = () => {
    const load = () => {
      if (window.posthog?.__loaded) return;
      void import(posthogUrl)
        .then(({ default: posthog }) => {
          window.posthog = posthog;
          posthog.init(
            'phc_kHZWuiUzdGkjQ7OvXfER2jygjMyTK9oyFfjVeg5vuAg',
            analyticsConfig,
          );
        })
        .catch(() => {});
    };
    if (typeof window.requestIdleCallback === 'function')
      window.requestIdleCallback(load, { timeout: 3000 });
    else window.setTimeout(load, 1000);
  };
  if (document.readyState === 'complete') schedule();
  else window.addEventListener('load', schedule, { once: true });
})();
