import { useEffect } from 'react';

/**
 * Reticle cursor for fine pointers: crosshair ring + center dot,
 * expands/rotates over interactive targets with a mono label,
 * emits a "measurement ping" (ring + scattering specks) on click.
 * Touch devices get tap ripples instead. Reduced motion: nothing.
 */
export default function Cursor() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = window.matchMedia('(pointer: fine)').matches;

    const ping = (x: number, y: number, big = false) => {
      const p = document.createElement('div');
      p.className = 'ping';
      p.style.left = `${x}px`;
      p.style.top = `${y}px`;
      if (big) p.style.borderColor = 'rgba(139,92,255,0.9)';
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 450);
      for (let i = 0; i < 6; i++) {
        const s = document.createElement('div');
        s.className = 'speck';
        const a = (Math.PI * 2 * i) / 6 + Math.random() * 0.8;
        const d = 16 + Math.random() * 14;
        s.style.left = `${x}px`;
        s.style.top = `${y}px`;
        s.style.setProperty('--dx', `${Math.cos(a) * d}px`);
        s.style.setProperty('--dy', `${Math.sin(a) * d}px`);
        document.body.appendChild(s);
        setTimeout(() => s.remove(), 460);
      }
    };

    // Touch devices: tap ripples only
    if (!fine) {
      if (reduced) return;
      const onTouch = (e: TouchEvent) => {
        const t = e.touches[0];
        if (t) ping(t.clientX, t.clientY);
      };
      window.addEventListener('touchstart', onTouch, { passive: true });
      return () => window.removeEventListener('touchstart', onTouch);
    }

    if (reduced) return;

    // Build reticle
    const r = document.createElement('div');
    r.id = 'reticle';
    r.innerHTML = `
      <div class="ring"></div>
      <div class="dot"></div>
      <div class="tick" style="left:50%;top:-4px;width:1px;height:5px;margin-left:-0.5px"></div>
      <div class="tick" style="left:50%;bottom:-4px;width:1px;height:5px;margin-left:-0.5px"></div>
      <div class="tick" style="top:50%;left:-4px;height:1px;width:5px;margin-top:-0.5px"></div>
      <div class="tick" style="top:50%;right:-4px;height:1px;width:5px;margin-top:-0.5px"></div>
      <span class="label"></span>`;
    document.body.appendChild(r);
    const label = r.querySelector('.label') as HTMLElement;
    document.documentElement.classList.add('reticle');
    r.style.opacity = '0';

    let raf = 0;
    let tx = 0;
    let ty = 0;
    const move = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!raf)
        raf = requestAnimationFrame(() => {
          r.style.transform = `translate(${tx}px, ${ty}px)`;
          raf = 0;
        });
      r.style.opacity = '1';

      const t = e.target as HTMLElement;
      // Native cursor zones
      if (t.closest('input, textarea, [data-native-cursor]')) {
        r.style.opacity = '0';
        return;
      }
      const hot = t.closest('a, button, summary, [data-cursor]') as HTMLElement | null;
      if (hot) {
        r.classList.add('hover');
        label.textContent =
          hot.dataset.cursor ??
          (hot.tagName === 'A' ? 'open' : hot.tagName === 'SUMMARY' ? 'expand' : 'run');
      } else {
        r.classList.remove('hover');
      }
    };
    const out = () => (r.style.opacity = '0');
    const click = (e: MouseEvent) => ping(e.clientX, e.clientY);

    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerdown', click);
    document.documentElement.addEventListener('mouseleave', out);

    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerdown', click);
      document.documentElement.removeEventListener('mouseleave', out);
      document.documentElement.classList.remove('reticle');
      r.remove();
    };
  }, []);

  return null;
}
