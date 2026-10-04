const menu = document.querySelector<HTMLDetailsElement>('.mobile-menu');
if (menu) {
  const summary = menu.querySelector<HTMLElement>('summary')!;
  const nav = menu.querySelector<HTMLElement>('nav')!;
  const svg = menu.querySelector<SVGSVGElement>('.menu-surface')!;
  const path = svg.querySelector<SVGPathElement>('path')!;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const mobile = matchMedia('(max-width: 950px)');
  let animation: Animation | null = null;
  menu.dataset.animated = 'true';
  const shape = (
    x: number,
    w: number,
    h: number,
    radius: number,
    belly = 0,
  ) => {
    const rx = Math.min(radius, w / 2),
      ry = Math.min(radius, h / 2),
      k = 0.5522848;
    return `M${x + rx} 0
      C${x + rx} 0 ${x + w - rx} 0 ${x + w - rx} 0
      C${x + w - rx + rx * k} 0 ${x + w} ${ry - ry * k} ${x + w} ${ry}
      C${x + w} ${ry} ${x + w} ${h - ry} ${x + w} ${h - ry}
      C${x + w} ${h - ry + ry * k} ${x + w - rx + rx * k} ${h} ${x + w - rx} ${h}
      C${x + w - rx} ${h} ${x + rx} ${h} ${x + rx} ${h}
      C${x + rx - rx * k} ${h} ${x} ${h - ry + ry * k} ${x} ${h - ry}
      C${x - belly} ${h * 0.7} ${x - belly} ${h * 0.3} ${x} ${ry}
      C${x} ${ry - ry * k} ${x + rx - rx * k} 0 ${x + rx} 0Z`.replace(
      /\s+/g,
      ' ',
    );
  };
  const dimensions = () => {
    const { width: w, height: h } = nav.getBoundingClientRect();
    const pill = summary.getBoundingClientRect();
    svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
    return {
      w,
      h,
      small: shape(w - pill.width, pill.width, pill.height, pill.height / 2),
      large: shape(0, w, h, 20),
    };
  };
  const cancel = () => {
    animation?.cancel();
    animation = null;
  };
  const reset = () => {
    cancel();
    delete menu.dataset.filled;
    delete menu.dataset.closing;
    path.style.removeProperty('d');
    nav.inert = false;
    summary.setAttribute('aria-label', 'Open navigation');
  };
  const expand = () => {
    const interrupted = menu.hasAttribute('data-closing');
    const start = interrupted ? getComputedStyle(path).d : '';
    cancel();
    delete menu.dataset.filled;
    delete menu.dataset.closing;
    path.style.removeProperty('d');
    summary.setAttribute('aria-label', 'Close navigation');
    const { w, h, small, large } = dimensions();
    nav.scrollTop = 0;
    path.setAttribute('d', small);
    if (reduced.matches) {
      path.setAttribute('d', large);
      menu.dataset.filled = 'true';
      nav.inert = false;
      return;
    }
    nav.inert = true;
    const frames = interrupted
      ? [{ d: start }, { d: `path('${large}')` }]
      : [
          { d: `path('${small}')`, offset: 0 },
          {
            d: `path('${shape(w * 0.48, w * 0.52, h * 0.5, w * 0.24, 8)}')`,
            offset: 0.42,
          },
          {
            d: `path('${shape(w * 0.06, w * 0.94, h * 0.87, 55, 12)}')`,
            offset: 0.72,
          },
          { d: `path('${large}')`, offset: 1 },
        ];
    animation = path.animate(frames, {
      duration: interrupted ? 320 : 560,
      easing: 'cubic-bezier(.45,0,.25,1)',
      fill: 'forwards',
    });
    const current = animation;
    current.finished
      .then(() => {
        if (!menu.open || animation !== current) return;
        path.setAttribute('d', large);
        menu.dataset.filled = 'true';
        nav.inert = false;
        cancel();
      })
      .catch(() => {});
  };
  const collapse = (restoreFocus = false, immediate = false) => {
    if (!menu.open) return;
    if (restoreFocus) summary.focus();
    if (reduced.matches || immediate) {
      menu.open = false;
      reset();
      return;
    }
    if (menu.hasAttribute('data-closing')) return;
    const opening = animation !== null;
    const start = getComputedStyle(path).d;
    cancel();
    const { w, h, small } = dimensions();
    path.style.d = start;
    delete menu.dataset.filled;
    menu.dataset.closing = 'true';
    nav.inert = true;
    nav.scrollTop = 0;
    summary.setAttribute('aria-label', 'Open navigation');
    const frames = opening
      ? [{ d: start }, { d: `path('${small}')` }]
      : [
          { d: start, offset: 0 },
          {
            d: `path('${shape(w * 0.08, w * 0.92, h * 0.8, 55, 12)}')`,
            offset: 0.28,
          },
          {
            d: `path('${shape(w * 0.5, w * 0.5, h * 0.42, w * 0.23, 8)}')`,
            offset: 0.65,
          },
          { d: `path('${small}')`, offset: 1 },
        ];
    animation = path.animate(frames, {
      duration: opening ? 220 : 420,
      easing: 'cubic-bezier(.4,0,.35,1)',
      fill: 'forwards',
    });
    const current = animation;
    current.finished
      .then(() => {
        if (animation !== current) return;
        menu.open = false;
        reset();
      })
      .catch(() => {});
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
    else expand();
  });
  window.addEventListener('pageshow', () => {
    if (menu.open) expand();
  });
}
