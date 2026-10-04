const scene = document.querySelector<HTMLElement>('[data-experience]');
if (scene) {
  const deck = scene.querySelector<HTMLElement>('[data-project-deck]')!;
  const cards = [
    ...scene.querySelectorAll<HTMLAnchorElement>('[data-project-card]'),
  ];
  const switches = [
    ...scene.querySelectorAll<HTMLButtonElement>('[data-project-switch]'),
  ];
  const status = scene.querySelector<HTMLElement>('[data-project-status]')!;
  const view = scene.querySelector<HTMLButtonElement>('[data-view-toggle]')!;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let selected = 0;
  let changing: ReturnType<typeof setTimeout>;
  let leaving = false;
  let pointerInput = false;
  let ignoreClickUntil = 0;
  const select = (index: number, announce = true) => {
    selected = (index + cards.length) % cards.length;
    cards.forEach((card, i) => {
      card.dataset.depth = String((i - selected + cards.length) % cards.length);
      card.setAttribute(
        'aria-label',
        `${scene.dataset.view === 'list' || i === selected ? 'Open' : 'Show'} ${card.dataset.projectName} project`,
      );
    });
    switches.forEach((button, i) =>
      button.setAttribute('aria-pressed', String(i === selected)),
    );
    if (announce)
      status.textContent = `${cards[selected].dataset.projectName} selected. Activate the card to explore.`;
    clearTimeout(changing);
    scene.toggleAttribute('data-changing', announce && !reduced.matches);
    changing = setTimeout(() => scene.removeAttribute('data-changing'), 900);
  };
  switches.forEach((button, index) =>
    button.addEventListener('click', () => select(index)),
  );
  const next = scene.querySelector<HTMLButtonElement>('[data-project-next]')!;
  const tabs = scene.querySelector<HTMLElement>('.project-tabs')!;
  next.addEventListener('click', () => select(selected + 1));
  view.addEventListener('click', () => {
    const list = scene.dataset.view !== 'list';
    scene.dataset.view = list ? 'list' : 'stack';
    view.setAttribute('aria-pressed', String(list));
    view.setAttribute(
      'aria-label',
      list ? 'Show project stack' : 'Show project list',
    );
    tabs.inert = list;
    next.inert = list;
    tabs.setAttribute('aria-hidden', String(list));
    next.setAttribute('aria-hidden', String(list));
    select(selected, false);
  });
  document.addEventListener(
    'pointerdown',
    () => {
      pointerInput = true;
    },
    true,
  );
  document.addEventListener(
    'keydown',
    () => {
      pointerInput = false;
    },
    true,
  );
  const navigate = async (card: HTMLAnchorElement) => {
    if (leaving) return;
    leaving = true;
    const href = card.href;
    if (reduced.matches) {
      location.assign(href);
      return;
    }
    const source = card.querySelector<HTMLElement>('.project-window')!;
    const rect = source.getBoundingClientRect();
    const overlay = document.createElement('div');
    overlay.className = 'project-departure';
    overlay.setAttribute('aria-hidden', 'true');
    const window = document.createElement('div');
    window.className = 'departure-window';
    Object.assign(window.style, {
      left: `${rect.left}px`,
      top: `${rect.top}px`,
      width: `${rect.width}px`,
      height: `${rect.height}px`,
    });
    window.append(source.cloneNode(true));
    overlay.append(window);
    document.body.append(overlay);
    scene.dataset.leaving = 'true';
    overlay.animate([{ background: '#211a2100' }, { background: '#211a21' }], {
      duration: 620,
      fill: 'forwards',
    });
    const scale = Math.min(
      (innerWidth * 0.9) / rect.width,
      (innerHeight * 0.85) / rect.height,
    );
    const x = (innerWidth - rect.width) / 2 - rect.left;
    const y = (innerHeight - rect.height) / 2 - rect.top;
    try {
      await window.animate(
        [
          { transform: 'translate(0,0) scale(1)', opacity: 1 },
          {
            transform: `translate(${x}px,${y}px) scale(${scale})`,
            opacity: 1,
            offset: 0.75,
          },
          {
            transform: `translate(${x}px,${y - 15}px) scale(${scale * 1.04})`,
            opacity: 0,
          },
        ],
        {
          duration: 720,
          easing: 'cubic-bezier(.22,1,.36,1)',
          fill: 'forwards',
        },
      ).finished;
      try {
        sessionStorage.setItem(
          'portfolio-project-arrival',
          JSON.stringify({ path: new URL(href).pathname, time: Date.now() }),
        );
      } catch {}
    } finally {
      location.assign(href);
    }
  };
  cards.forEach((card, index) => {
    card.addEventListener('focus', () => {
      if (!pointerInput && scene.dataset.view === 'stack' && index !== selected)
        select(index);
    });
    card.addEventListener('click', (event) => {
      if (
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        event.button !== 0
      )
        return;
      if (performance.now() < ignoreClickUntil) {
        event.preventDefault();
        return;
      }
      if (scene.dataset.view === 'stack' && index !== selected) {
        event.preventDefault();
        select(index);
        return;
      }
      event.preventDefault();
      void navigate(card);
    });
  });
  scene.addEventListener('keydown', (event) => {
    if (
      !['ArrowLeft', 'ArrowRight'].includes(event.key) ||
      scene.dataset.view !== 'stack' ||
      !(event.target instanceof Element) ||
      !event.target.closest('.project-deck,.project-browser')
    )
      return;
    event.preventDefault();
    select(selected + (event.key === 'ArrowRight' ? 1 : -1));
    if (event.target.closest('.project-card')) cards[selected].focus();
  });
  let touch: { x: number; y: number; id: number } | null = null;
  deck.addEventListener('pointerdown', (event) => {
    if (event.pointerType !== 'touch' || scene.dataset.view !== 'stack') return;
    ignoreClickUntil = 0;
    touch = { x: event.clientX, y: event.clientY, id: event.pointerId };
  });
  deck.addEventListener('pointerup', (event) => {
    if (!touch || touch.id !== event.pointerId) return;
    const dx = event.clientX - touch.x,
      dy = event.clientY - touch.y;
    touch = null;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.3) {
      ignoreClickUntil = performance.now() + 400;
      select(selected + (dx < 0 ? 1 : -1));
    }
  });
  deck.addEventListener('pointercancel', () => {
    touch = null;
  });
  // Trackpad horizontal gestures browse; vertical wheel events remain native.
  let wheelDistance = 0;
  let lastWheel = 0;
  let lastSwitch = -Infinity;
  deck.addEventListener(
    'wheel',
    (event) => {
      if (
        scene.dataset.view !== 'stack' ||
        event.ctrlKey ||
        Math.abs(event.deltaX) <= Math.abs(event.deltaY) * 1.3
      )
        return;
      const now = performance.now();
      if (now - lastWheel > 180) wheelDistance = 0;
      lastWheel = now;
      wheelDistance += event.deltaX * (event.deltaMode === 1 ? 16 : 1);
      if (Math.abs(wheelDistance) > 60 && now - lastSwitch > 450) {
        select(selected + (wheelDistance > 0 ? 1 : -1));
        wheelDistance = 0;
        lastSwitch = now;
      }
    },
    { passive: true },
  );
  window.addEventListener('pageshow', () => {
    leaving = false;
    delete scene.dataset.leaving;
    document.querySelector('.project-departure')?.remove();
  });
  select(0, false);
}
