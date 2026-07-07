import { useEffect, useState } from 'react';

/**
 * Calm hero: the name settles in letter by letter (fade + small rise,
 * staggered). No glitch, no RGB split, no ghosts. Role line and status
 * line resolve quietly after the name. Reduced motion: everything static.
 */
export default function HeroCollapse({ name, tagline }: { name: string; tagline: string }) {
  const [phase, setPhase] = useState(0); // 0 settling, 1 role, 2 status
  const [statusText, setStatusText] = useState('');
  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const words = name.split(' ');
  const letters = name.replace(/ /g, '').length;
  const STAGGER = 45; // ms per letter
  const STATUS = 'status: open to research collaboration & hard problems';

  useEffect(() => {
    if (reduced) {
      setPhase(2);
      setStatusText(STATUS);
      return;
    }
    const t1 = setTimeout(() => setPhase(1), letters * STAGGER + 350);
    const t2 = setTimeout(() => {
      setPhase(2);
      let i = 0;
      const t = setInterval(() => {
        i++;
        setStatusText(STATUS.slice(0, i));
        if (i >= STATUS.length) clearInterval(t);
      }, 18);
    }, letters * STAGGER + 750);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  let idx = 0;
  return (
    <div>
      <h1
        className={`display-h name-wrap text-ink ${reduced ? 'name-static' : ''}`}
        aria-label={name}
      >
        {words.map((w, wi) => (
          <span key={wi} className="word" aria-hidden="true">
            {w.split('').map((c, ci) => {
              const d = idx++ * STAGGER;
              return (
                <span key={ci} className="ch" style={{ animationDelay: `${d}ms` }}>
                  {c}
                </span>
              );
            })}
            {wi < words.length - 1 && '\u00A0'}
          </span>
        ))}
      </h1>

      <p
        className="mt-4 font-mono text-sm md:text-base tracking-[0.18em] uppercase text-accent transition-opacity duration-500"
        style={{ opacity: phase >= 1 ? 1 : 0 }}
      >
        AI Security Engineer &amp; Researcher
      </p>

      <p
        className="mt-5 max-w-xl text-dim text-base md:text-lg leading-relaxed transition-opacity duration-500"
        style={{ opacity: phase >= 1 ? 1 : 0 }}
      >
        {tagline}
      </p>

      <p className="mt-7 h-5 font-mono text-xs md:text-sm text-faint" aria-live="polite">
        {phase >= 2 && (
          <>
            <span className="text-accent2">$</span> {statusText}
            <span className="cursor-blink text-accent">▏</span>
          </>
        )}
      </p>

      <div
        className="mt-8 flex flex-wrap gap-3 transition-opacity duration-500"
        style={{ opacity: phase >= 1 ? 1 : 0 }}
      >
        <a
          href="#projects"
          data-cursor="open"
          className="panel px-5 py-2.5 font-mono text-sm text-accent transition-colors hover:border-accent/60"
        >
          view case files →
        </a>
        <a
          href="#terminal"
          data-cursor="run"
          className="border border-line px-5 py-2.5 font-mono text-sm text-dim transition-colors hover:border-accent/40 hover:text-ink"
        >
          open terminal_
        </a>
      </div>
    </div>
  );
}
