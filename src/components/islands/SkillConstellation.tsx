import { useEffect, useRef, useState } from 'react';
import { skills, skillClusters, type SkillNode } from '../../data/profile';

/**
 * Skill constellation: three gravity wells (AI, Security, Systems) with
 * skills orbiting each. Hover a node to highlight it and its cluster.
 * Canvas 2D, gentle drift, paused off-screen, reduced-motion → static frame.
 */

interface Node extends SkillNode {
  x: number;
  y: number;
  bx: number; // base orbit position
  by: number;
  phase: number;
  amp: number;
}

export default function SkillConstellation() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [hover, setHover] = useState<string | null>(null);
  const hoverRef = useRef<string | null>(null);
  hoverRef.current = hover;

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let nodes: Node[] = [];
    let centers: Record<string, { x: number; y: number }> = {};
    let raf = 0;
    let running = true;
    let t = 0;

    const layout = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const narrow = w < 640;
      centers = narrow
        ? {
            ai: { x: w * 0.5, y: h * 0.18 },
            sec: { x: w * 0.5, y: h * 0.5 },
            sys: { x: w * 0.5, y: h * 0.82 },
          }
        : {
            ai: { x: w * 0.22, y: h * 0.32 },
            sec: { x: w * 0.72, y: h * 0.3 },
            sys: { x: w * 0.47, y: h * 0.74 },
          };

      const byCluster: Record<string, SkillNode[]> = { ai: [], sec: [], sys: [] };
      for (const s of skills) byCluster[s.cluster].push(s);

      nodes = [];
      (Object.keys(byCluster) as Array<'ai' | 'sec' | 'sys'>).forEach((c) => {
        const list = byCluster[c];
        const R = narrow ? Math.min(w * 0.34, 120) : Math.min(w * 0.16, 150);
        list.forEach((s, i) => {
          const ang = (i / list.length) * Math.PI * 2 - Math.PI / 2;
          const r = R * (0.62 + 0.38 * ((i * 7) % 3) / 2);
          const bx = centers[c].x + Math.cos(ang) * r;
          const by = centers[c].y + Math.sin(ang) * r * 0.82;
          nodes.push({
            ...s,
            x: bx,
            y: by,
            bx,
            by,
            phase: Math.random() * Math.PI * 2,
            amp: 2.5 + Math.random() * 3.5,
          });
        });
      });
    };

    const pick = (mx: number, my: number): Node | null => {
      let best: Node | null = null;
      let bestD = 26;
      for (const n of nodes) {
        const d = Math.hypot(n.x - mx, n.y - my);
        if (d < bestD) {
          bestD = d;
          best = n;
        }
      }
      return best;
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const hovered = nodes.find((n) => n.id === hoverRef.current) ?? null;
      const activeCluster = hovered?.cluster ?? null;

      // Edges: skill → cluster core
      for (const n of nodes) {
        const c = centers[n.cluster];
        const on = activeCluster === null || n.cluster === activeCluster;
        const col = skillClusters[n.cluster].color;
        ctx.strokeStyle = hexA(col, on ? (n.id === hovered?.id ? 0.7 : 0.18) : 0.05);
        ctx.lineWidth = n.id === hovered?.id ? 1.5 : 1;
        ctx.beginPath();
        ctx.moveTo(c.x, c.y);
        ctx.lineTo(n.x, n.y);
        ctx.stroke();
      }

      // Cluster cores + labels
      for (const key of Object.keys(centers) as Array<'ai' | 'sec' | 'sys'>) {
        const c = centers[key];
        const col = skillClusters[key].color;
        const on = activeCluster === null || activeCluster === key;
        ctx.fillStyle = hexA(col, on ? 0.9 : 0.25);
        ctx.beginPath();
        ctx.arc(c.x, c.y, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = hexA(col, on ? 0.35 : 0.1);
        ctx.beginPath();
        ctx.arc(c.x, c.y, 11, 0, Math.PI * 2);
        ctx.stroke();
        ctx.font = '700 12px "IBM Plex Mono", monospace';
        ctx.fillStyle = hexA(col, on ? 0.95 : 0.3);
        ctx.textAlign = 'center';
        ctx.fillText(skillClusters[key].label.toUpperCase(), c.x, c.y - 20);
      }

      // Skill nodes + labels
      for (const n of nodes) {
        const col = skillClusters[n.cluster].color;
        const isHover = n.id === hovered?.id;
        const on = activeCluster === null || n.cluster === activeCluster;
        const r = 2 + n.weight * 1.4 + (isHover ? 2 : 0);
        ctx.fillStyle = hexA(col, on ? (isHover ? 1 : 0.75) : 0.18);
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fill();

        ctx.font = `${isHover ? '700' : '400'} 11px "IBM Plex Mono", monospace`;
        ctx.fillStyle = on
          ? isHover
            ? '#E8ECF4'
            : 'rgba(139,148,168,0.85)'
          : 'rgba(139,148,168,0.2)';
        ctx.textAlign = 'center';
        ctx.fillText(n.label, n.x, n.y - r - 6);
      }
    };

    const step = () => {
      if (!running) return;
      t += 0.008;
      for (const n of nodes) {
        n.x = n.bx + Math.cos(t + n.phase) * n.amp;
        n.y = n.by + Math.sin(t * 1.3 + n.phase) * n.amp;
      }
      draw();
      raf = requestAnimationFrame(step);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const n = pick(e.clientX - rect.left, e.clientY - rect.top);
      setHover(n?.id ?? null);
      canvas.style.cursor = n ? 'pointer' : 'default';
      if (reduced) draw();
    };

    const vis = new IntersectionObserver(([entry]) => {
      if (reduced) return;
      if (entry.isIntersecting && !running) {
        running = true;
        raf = requestAnimationFrame(step);
      } else if (!entry.isIntersecting) {
        running = false;
        cancelAnimationFrame(raf);
      }
    });

    layout();
    if (reduced) {
      running = false;
      draw();
    } else {
      raf = requestAnimationFrame(step);
      vis.observe(canvas);
    }
    const onResize = () => {
      layout();
      if (reduced) draw();
    };
    window.addEventListener('resize', onResize);
    canvas.addEventListener('pointermove', onMove);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      canvas.removeEventListener('pointermove', onMove);
      vis.disconnect();
    };
  }, []);

  return (
    <div className="panel relative">
      <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
        <span className="font-mono text-xs text-dim">
          skill_constellation.map — hover to isolate a domain
        </span>
        <span className="pulse-dot h-2 w-2 rounded-full bg-violet" />
      </div>
      <canvas
        ref={ref}
        className="h-[460px] w-full sm:h-[420px]"
        role="img"
        aria-label="Interactive map of skills grouped into AI/ML, Cybersecurity, and Systems & Software clusters"
      />
    </div>
  );
}

function hexA(hex: string, a: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${a})`;
}
