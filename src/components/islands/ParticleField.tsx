import { useEffect, useRef } from 'react';

/**
 * Neural-network particle field.
 * - Canvas 2D, ~55 nodes, edges drawn under a distance threshold
 * - Mouse gently attracts nearby nodes and brightens local edges
 * - Pauses when off-screen or tab hidden; disabled for reduced motion
 */
export default function ParticleField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const isMobile = window.innerWidth < 768;
    const COUNT = isMobile ? 34 : 55;
    const LINK = isMobile ? 110 : 150;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let w = 0;
    let h = 0;
    let raf = 0;
    let running = true;
    const mouse = { x: -9999, y: -9999 };

    interface P {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      hue: 0 | 1; // 0 = cyan, 1 = violet
    }
    let pts: P[] = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const seed = () => {
      pts = Array.from({ length: COUNT }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        r: 1 + Math.random() * 1.6,
        hue: Math.random() < 0.22 ? 1 : 0,
      }));
    };

    const step = () => {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);

      for (const p of pts) {
        // Gentle mouse attraction within 180px
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 180 * 180 && d2 > 1) {
          const f = 0.012 / Math.sqrt(d2);
          p.vx += dx * f;
          p.vy += dy * f;
        }
        // Speed cap
        const sp = Math.hypot(p.vx, p.vy);
        if (sp > 0.6) {
          p.vx *= 0.6 / sp;
          p.vy *= 0.6 / sp;
        }
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -20) p.x = w + 20;
        if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20;
        if (p.y > h + 20) p.y = -20;
      }

      // Edges
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const a = pts[i];
          const b = pts[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < LINK) {
            const mx = (a.x + b.x) / 2;
            const my = (a.y + b.y) / 2;
            const md = Math.hypot(mouse.x - mx, mouse.y - my);
            const near = md < 160 ? 0.22 : 0;
            const alpha = (1 - d / LINK) * 0.16 + near * (1 - d / LINK);
            ctx.strokeStyle =
              a.hue + b.hue > 0
                ? `rgba(139,92,246,${alpha})`
                : `rgba(34,211,238,${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Nodes
      for (const p of pts) {
        ctx.fillStyle =
          p.hue === 1 ? 'rgba(139,92,246,0.75)' : 'rgba(34,211,238,0.65)';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(step);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    // Pause when hero is off-screen or tab hidden
    const vis = new IntersectionObserver(([entry]) => {
      const on = entry.isIntersecting && !document.hidden;
      if (on && !running) {
        running = true;
        raf = requestAnimationFrame(step);
      } else if (!on) {
        running = false;
        cancelAnimationFrame(raf);
      }
    });
    const onVis = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else {
        running = true;
        raf = requestAnimationFrame(step);
      }
    };

    resize();
    seed();
    raf = requestAnimationFrame(step);
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerleave', onLeave);
    document.addEventListener('visibilitychange', onVis);
    vis.observe(canvas);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerleave', onLeave);
      document.removeEventListener('visibilitychange', onVis);
      vis.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
    />
  );
}
