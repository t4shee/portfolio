import { useEffect, useRef, useState } from 'react';

const STAGES = [
  { id: 'build', target: 'about' },
  { id: 'test', target: 'experience' },
  { id: 'scan', target: 'projects' },
  { id: 'sign', target: 'achievements' },
  { id: 'deploy', target: 'contact' },
] as const;

const fmt = (s: number) =>
  `00:${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

export default function PipelineRail() {
  const [passed, setPassed] = useState<Record<string, string>>({}); // stage -> timestamp
  const [elapsed, setElapsed] = useState(0);
  const start = useRef(Date.now());

  useEffect(() => {
    const timer = setInterval(
      () => setElapsed(Math.floor((Date.now() - start.current) / 1000)),
      1000
    );

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const stage = STAGES.find((s) => s.target === e.target.id);
          if (!stage) continue;
          setPassed((p) =>
            p[stage.id]
              ? p
              : { ...p, [stage.id]: fmt(Math.floor((Date.now() - start.current) / 1000)) }
          );
        }
      },
      { threshold: 0.25 }
    );
    for (const s of STAGES) {
      const el = document.getElementById(s.target);
      if (el) io.observe(el);
    }
    return () => {
      clearInterval(timer);
      io.disconnect();
    };
  }, []);

  const allPassed = STAGES.every((s) => passed[s.id]);

  return (
    <>
      {/* Desktop: vertical rail on left edge */}
      <nav
        aria-label="Page pipeline progress"
        className="fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 lg:block"
      >
        <ol className="relative space-y-7">
          <span className="absolute left-[4px] top-2 bottom-2 w-px bg-line" aria-hidden="true" />
          {STAGES.map((s) => (
            <li key={s.id} className={`rail-stage relative flex items-center gap-3 text-dim ${passed[s.id] ? 'pass' : ''}`}>
              <span className="node relative z-10 bg-void" />
              <a href={`#${s.target}`} data-cursor="jump" className="font-mono text-[11px] tracking-wider">
                {s.id}
                {passed[s.id] && <span className="ml-1.5">✓</span>}
              </a>
              {passed[s.id] && (
                <span className="font-mono text-[9px] text-dim/70">{passed[s.id]}</span>
              )}
            </li>
          ))}
        </ol>
        <p className="mt-8 font-mono text-[10px] leading-4 text-dim/80 w-36">
          {allPassed ? (
            <span className="text-accent">deploy ✓ — pipeline passed in {fmt(elapsed)}</span>
          ) : (
            <>pipeline running · {fmt(elapsed)}</>
          )}
        </p>
      </nav>

      {/* Mobile: horizontal strip under the nav */}
      <div
        aria-hidden="true"
        className="fixed top-[52px] left-0 z-40 w-full border-b border-line bg-void/85 backdrop-blur-sm lg:hidden"
      >
        <ol className="flex items-center justify-center gap-4 px-3 py-1.5">
          {STAGES.map((s) => (
            <li key={s.id} className={`rail-stage flex items-center gap-1.5 text-dim ${passed[s.id] ? 'pass' : ''}`}>
              <span className="node" style={{ width: 7, height: 7 }} />
              <span className="font-mono text-[9px] tracking-wider">{s.id}</span>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}
