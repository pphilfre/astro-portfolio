const reduceFieldMotion = matchMedia('(prefers-reduced-motion: reduce)');
let pointer: { field: Element; x: number; y: number; time: number } | undefined;
let reveal: Animation | undefined;
let fieldSize: ResizeObserver | undefined;

const fieldFrom = (target: EventTarget | null) =>
  target instanceof Element
    ? target.closest<HTMLInputElement | HTMLTextAreaElement>(
        '.focus-surface > input, .focus-surface > textarea',
      )
    : null;

document.addEventListener(
  'pointerdown',
  (event) => {
    const field = fieldFrom(event.target);
    if (!field || field.disabled) return;
    pointer = {
      field,
      x: event.clientX,
      y: event.clientY,
      time: performance.now(),
    };
  },
  { passive: true },
);

document.addEventListener('focusin', (event) => {
  const field = fieldFrom(event.target);
  const colour =
    field?.parentElement?.querySelector<HTMLElement>('.field-aura > span');
  reveal?.cancel();
  fieldSize?.disconnect();
  if (!field || !colour) return;
  const clicked =
    pointer?.field === field && performance.now() - pointer.time < 500;
  field.parentElement!.dataset.focusOrigin = clicked ? 'pointer' : 'keyboard';
  const fitGradient = () => {
    const { width, height } = colour.getBoundingClientRect();
    colour.style.setProperty(
      '--aura-size',
      `${Math.ceil(Math.hypot(width, height)) + 8}px`,
    );
  };
  fitGradient();
  fieldSize = new ResizeObserver(fitGradient);
  fieldSize.observe(field);
  if (reduceFieldMotion.matches) {
    pointer = undefined;
    return;
  }
  const rect = colour.getBoundingClientRect();
  const x = clicked
    ? Math.max(0, Math.min(rect.width, pointer!.x - rect.left))
    : 16;
  const y = clicked
    ? Math.max(0, Math.min(rect.height, pointer!.y - rect.top))
    : rect.height / 2;
  pointer = undefined;
  const radius =
    Math.hypot(Math.max(x, rect.width - x), Math.max(y, rect.height - y)) + 8;
  const at = `${x}px ${y}px`;
  reveal = colour.animate(
    [
      { clipPath: `ellipse(0px 0px at ${at})`, opacity: 0.45 },
      {
        clipPath: `ellipse(${radius * 0.42}px ${radius * 0.28}px at ${at})`,
        opacity: 0.85,
        offset: 0.4,
      },
      { clipPath: `ellipse(${radius}px ${radius}px at ${at})`, opacity: 1 },
    ],
    { duration: 680, easing: 'cubic-bezier(.18,.65,.25,1)' },
  );
});
document.addEventListener('focusout', (event) => {
  if (fieldFrom(event.target)) {
    reveal?.cancel();
    fieldSize?.disconnect();
  }
});
reduceFieldMotion.addEventListener('change', () => reveal?.cancel());
