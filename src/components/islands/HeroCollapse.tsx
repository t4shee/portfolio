import { useEffect, useRef, useState } from 'react';

const ROLES = ['AI SECURITY ENGINEER', 'ML RESEARCHER', 'QUANTUM-CURIOUS', 'DEVSECOPS'];
const FINAL_ROLE = 'AI Security Engineer & Researcher';
const LOG = 'state collapsed \u00b7 observer logged \u00b7 welcome';

export default function HeroCollapse({ name, tagline }: { name: string; tagline: string }) {
  const [collapsed, setCollapsed] = useState(false);
  const [role, setRole] = useState(0);
  const [log, setLog] = useState('');
  const done = useRef(false);

  // Cycle unstable role states until observation
  useEffect(() => {
    if (collapsed) return;
    const id = setInterval(() => setRole((r) => (r + 1) % ROLES.length), 900);
    return () => clearInterval(id);
  }, [collapsed]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      done.current = true;
      setCollapsed(true);
      setLog(LOG);
      return;
    }

    const collapse = (x: number, y: number) => {
      if (done.current) return;
      done.current = true;
      // radial measurement ripple from the cursor
      const r = document.createElement('div');
      r.className = 'ripple';
      r.style.left = `${x}px`;
      r.style.top = `${y}px`;
      document.body.appendChild(r);
      setTimeout(() => r.remove(), 750);
      setCollapsed(true);
      // typed log line
      let i = 0;
      const t = setInterval(() => {
        i++;
        setLog(LOG.slice(0, i));
        if (i >= LOG.length) clearInterval(t);
      }, 26);
    };

    const onClick = (e: MouseEvent) => collapse(e.clientX, e.clientY);
    const onKey = () => collapse(innerWidth / 2, innerHeight / 2);
    const onScroll = () => collapse(innerWidth / 2, innerHeight / 3);
    window.addEventListener('click', onClick, { once: true });
    window.addEventListener('keydown', onKey, { once: true });
    window.addEventListener('scroll', onScroll, { once: true, passive: true });
    return () => {
      window.removeEventListener('click', onClick);
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div className={collapsed ? 'collapsed' : ''}>
      {/* Name in superposition: three offset spectral copies over a hidden sizer */}
      <div className="relative inline-block" aria-label={name}>
        <h1 className="display-h invisible" aria-hidden="true">
          {name}
        </h1>
        <span
          aria-hidden="true"
          className="ghost display-h osc-a"
          style={{ color: '#8B5CFF', opacity: collapsed ? 0 : 0.85, mixBlendMode: 'screen' }}
        >
          {name}
        </span>
        <span
          aria-hidden="true"
          className="ghost display-h osc-b"
          style={{ color: '#2DE0A5', opacity: collapsed ? 0 : 0.75, mixBlendMode: 'screen' }}
        >
          {name}
        </span>
        <span
          aria-hidden="true"
          className="ghost display-h osc-c"
          style={{ color: '#FF4D6D', opacity: collapsed ? 0 : 0.5, mixBlendMode: 'screen' }}
        >
          {name}
        </span>
        <span
          aria-hidden="true"
          className={`ghost display-h text-ink ${collapsed ? 'breath' : ''}`}
          style={{ opacity: collapsed ? 1 : 0.28 }}
        >
          {name}
        </span>
      </div>

      {/* Role line: unstable until observed */}
      <p className="mt-4 font-mono text-sm md:text-base tracking-[0.22em] uppercase h-6">
        {collapsed ? (
          <span className="text-violet">{FINAL_ROLE}</span>
        ) : (
          <span className="text-dim" key={role}>
            {ROLES[role]}
            <span className="cursor-blink text-mint">▮</span>
          </span>
        )}
      </p>

      <p className="mt-5 max-w-xl text-dim text-base md:text-lg leading-relaxed">{tagline}</p>

      {/* Instruction / log line */}
      <p className="mt-8 font-mono text-xs md:text-sm h-5" aria-live="polite">
        {collapsed ? (
          <span className="text-mint">{log}</span>
        ) : (
          <span className="text-dim">
            <span className="text-mint">&gt;</span> observe to collapse the wavefunction{' '}
            <span className="text-ink/60">[click anywhere]</span>
          </span>
        )}
      </p>

      <div
        className="mt-8 flex flex-wrap gap-3 transition-opacity duration-500"
        style={{ opacity: collapsed ? 1 : 0.35 }}
      >
        <a
          href="#projects"
          data-cursor="open"
          className="panel px-5 py-2.5 font-mono text-sm text-mint hover:border-mint/60 transition-colors"
        >
          open case files →
        </a>
        <a
          href="#terminal"
          data-cursor="run"
          className="px-5 py-2.5 font-mono text-sm text-dim border border-line hover:border-violet/60 hover:text-ink transition-colors"
        >
          open terminal_
        </a>
      </div>
    </div>
  );
}
