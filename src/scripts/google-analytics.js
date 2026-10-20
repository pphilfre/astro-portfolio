(() => {
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', 'G-WYYGVPXGPG');
  const schedule = () => {
    const load = () => {
      const tag = document.createElement('script');
      tag.async = true;
      tag.src = 'https://www.googletagmanager.com/gtag/js?id=G-WYYGVPXGPG';
      document.head.append(tag);
    };
    if (typeof window.requestIdleCallback === 'function')
      window.requestIdleCallback(load, { timeout: 3000 });
    else window.setTimeout(load, 1000);
  };
  if (document.readyState === 'complete') schedule();
  else window.addEventListener('load', schedule, { once: true });
})();
