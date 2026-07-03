import { useEffect, useRef } from 'react';

/**
 * Sensor-noise point mesh: <=60 faint drifting dots with short links,
 * whole field parallaxes slightly against cursor. Fixed, full-viewport,
 * behind content. Paused when tab hidden; absent under reduced motion.
 */
export default function PointMesh() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const N = window.innerWidth < 768 ? 34 : 60;
    const LINK = 120;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0, raf = 0, running = true;
    let px = 0, py = 0; // parallax offset
    let mx = 0.5, my = 0.5;

    interface P { x: number; y: number; vx: number; vy: number; violet: boolean }
    let pts: P[] = [];

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const seed = () => {
      pts = Array.from({ length: N }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        violet: Math.random() < 0.3,
      }));
    };

    const step = () => {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);
      // ease parallax toward cursor (max ~10px drift)
      px += ((mx - 0.5) * 20 - px) * 0.04;
      py += ((my - 0.5) * 20 - py) * 0.04;

      for (const p of pts) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;
      }
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const a = pts[i], b = pts[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINK) {
            ctx.strokeStyle = `rgba(139,148,168,${(1 - d / LINK) * 0.07})`;
            ctx.beginPath();
            ctx.moveTo(a.x + px, a.y + py);
            ctx.lineTo(b.x + px, b.y + py);
            ctx.stroke();
          }
        }
      }
      for (const p of pts) {
        ctx.fillStyle = p.violet ? 'rgba(139,92,255,0.30)' : 'rgba(139,148,168,0.28)';
        ctx.beginPath();
        ctx.arc(p.x + px, p.y + py, 1.1, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(step);
    };

    const onMove = (e: PointerEvent) => {
      mx = e.clientX / w;
      my = e.clientY / h;
    };
    const onVis = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        raf = requestAnimationFrame(step);
      }
    };

    resize();
    seed();
    raf = requestAnimationFrame(step);
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('visibilitychange', onVis);
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="mesh-layer" />;
}
