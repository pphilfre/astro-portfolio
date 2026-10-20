(() => {
  let theme = 'system';
  try {
    theme = localStorage.getItem('theme') || 'system';
  } catch {}
  document.documentElement.classList.toggle(
    'dark',
    theme === 'dark' ||
      (theme === 'system' &&
        matchMedia('(prefers-color-scheme: dark)').matches),
  );
  try {
    const arrival = JSON.parse(
      sessionStorage.getItem('portfolio-project-arrival') || 'null',
    );
    sessionStorage.removeItem('portfolio-project-arrival');
    if (
      arrival?.path === location.pathname &&
      Date.now() - arrival.time < 10000
    )
      document.documentElement.classList.add('project-arrival');
  } catch {}
})();
