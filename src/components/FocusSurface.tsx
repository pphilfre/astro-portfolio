import type { ReactNode } from 'react';

export function FocusSurface({ children }: { children: ReactNode }) {
  return (
    <div className="focus-surface">
      {children}
      <span className="field-aura" aria-hidden="true">
        <span />
      </span>
    </div>
  );
}
