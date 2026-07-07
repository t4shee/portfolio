import { useEffect } from 'react';

/**
 * Crosshair cursor for fine pointers: thin hairlines + small core dot,
 * rendered in difference blend so it stays visible on any surface.
 * Over interactive targets the core fills brass and a mono label appears.
 * Click: one quick expanding square tick. Touch devices: nothing added.
 */
export default function Cursor() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = window.matchMedia('(pointer: fine)').matches;
    if (!fine || reduced) return;

    const c = document.createElement('div');
    c.id = 'curs';
    c.innerHTML = `<div class="h"></div><div class="v"></div><div class="core"></div><span class="label"></span>`;
    document.body.appendChild(c);
    const label = c.querySelector('.label') as HTMLElement;
    document.documentElement.classList.add('dot-cursor');

    let raf = 0, tx = 0, ty = 0;
    const move = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!raf)
        raf = requestAnimationFrame(() => {
          c.style.transform = `translate(${tx}px, ${ty}px)`;
          raf = 0;
        });
      c.style.opacity = '1';

      const t = e.target as HTMLElement;
      if (t.closest('input, textarea, [data-native-cursor]')) {
        c.style.opacity = '0';
        return;
      }
      const hot = t.closest('a, button, summary, [data-cursor]') as HTMLElement | null;
      if (hot) {
        c.classList.add('hot');
        label.textContent =
          hot.dataset.cursor ??
          (hot.tagName === 'A' ? 'open' : hot.tagName === 'SUMMARY' ? 'expand' : 'run');
      } else {
        c.classList.remove('hot');
      }
    };
    const out = () => (c.style.opacity = '0');
    const click = (e: MouseEvent) => {
      const m = document.createElement('div');
      m.className = 'tick-mark';
      m.style.left = `${e.clientX}px`;
      m.style.top = `${e.clientY}px`;
      document.body.appendChild(m);
      setTimeout(() => m.remove(), 360);
    };

    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerdown', click);
    document.documentElement.addEventListener('mouseleave', out);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerdown', click);
      document.documentElement.removeEventListener('mouseleave', out);
      document.documentElement.classList.remove('dot-cursor');
      c.remove();
    };
  }, []);

  return null;
}
