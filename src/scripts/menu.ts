const menu = document.querySelector<HTMLDetailsElement>('.mobile-menu');
if (menu) {
  const summary = menu.querySelector<HTMLElement>('summary')!;
  const nav = menu.querySelector<HTMLElement>('nav')!;
  const surface = menu.querySelector<HTMLElement>('.menu-surface')!;
  const content = [
    ...nav.querySelectorAll<HTMLElement>('.menu-pages, .menu-utilities'),
  ];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const mobile = matchMedia('(max-width: 950px)');
  let animations: Animation[] = [];
  menu.dataset.animated = 'true';

  const reset = () => {
    animations.forEach((animation) => animation.cancel());
    animations = [];
    delete menu.dataset.filled;
    delete menu.dataset.closing;
    nav.inert = false;
    summary.setAttribute('aria-label', 'Open navigation');
  };
  const expand = () => {
    const reversing = menu.hasAttribute('data-closing');
    delete menu.dataset.closing;
    summary.setAttribute('aria-label', 'Close navigation');
    if (reduced.matches) {
      menu.dataset.filled = 'true';
      nav.inert = false;
      return;
    }
    nav.inert = true;
    if (reversing && animations.length) {
      // Reverse the same timeline, including the text, at its current frame.
      animations.forEach((animation) => animation.reverse());
      return;
    }
    menu.querySelector('.menu-scroll')!.scrollTop = 0;
    const { width, height } = nav.getBoundingClientRect();
    const pill = summary.getBoundingClientRect();
    const timing: KeyframeAnimationOptions = {
      duration: 300,
      easing: 'cubic-bezier(.22,1,.36,1)',
      fill: 'both',
    };
    // Only transform and opacity animate: no SVG morphing or per-frame layout.
    const background = surface.animate(
      [
        { transform: `scale(${pill.width / width}, ${pill.height / height})` },
        { transform: 'scale(1, 1)' },
      ],
      timing,
    );
    animations = [
      background,
      ...content.map((element) =>
        element.animate(
          [
            { opacity: 0, transform: 'translateY(-6px)', offset: 0 },
            { opacity: 0, transform: 'translateY(-6px)', offset: 0.25 },
            { opacity: 1, transform: 'translateY(0)', offset: 1 },
          ],
          timing,
        ),
      ),
    ];
    background.onfinish = () => {
      if (background.playbackRate < 0) {
        menu.open = false;
        reset();
      } else {
        menu.dataset.filled = 'true';
        nav.inert = false;
      }
    };
  };
  const collapse = (restoreFocus = false, immediate = false) => {
    if (!menu.open) return;
    if (restoreFocus) summary.focus();
    if (reduced.matches || immediate || !animations.length) {
      menu.open = false;
      reset();
      return;
    }
    if (menu.hasAttribute('data-closing')) return;
    delete menu.dataset.filled;
    menu.dataset.closing = 'true';
    nav.inert = true;
    summary.setAttribute('aria-label', 'Open navigation');
    animations.forEach((animation) => animation.reverse());
  };
  summary.addEventListener('click', (event) => {
    event.preventDefault();
    if (menu.open && !menu.hasAttribute('data-closing')) collapse();
    else {
      menu.open = true;
      expand();
    }
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menu.open) {
      event.preventDefault();
      collapse(true);
    }
  });
  document.addEventListener('click', (event) => {
    if (menu.open && !menu.contains(event.target as Node)) collapse();
  });
  menu.addEventListener('toggle', () => {
    if (!menu.open) reset();
  });
  mobile.addEventListener('change', () => {
    if (!mobile.matches) collapse(false, true);
  });
  reduced.addEventListener('change', () => {
    if (!menu.open) return;
    if (menu.hasAttribute('data-closing')) collapse(false, true);
    else {
      reset();
      expand();
    }
  });
  window.addEventListener('pagehide', () => collapse(false, true));
  window.addEventListener('pageshow', (event) => {
    if (event.persisted) collapse(false, true);
  });
}
