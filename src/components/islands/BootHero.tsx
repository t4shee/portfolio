import { useEffect, useRef, useState } from 'react';

const BOOT_LINES = [
  '> initializing environment ...',
  '> loading profile: TASHEE BISHT',
  '> domains: [AI/ML] [CYBERSECURITY] [SYSTEMS]',
  '> credentials: verified ✓',
  '> rendering interface ...',
];

const GLYPHS = '01<>/\\{}[]#$%&*+=?!;:~^';

/** Scramble-decode text effect */
function useDecode(target: string, start: boolean, speed = 28) {
  const [text, setText] = useState('');
  useEffect(() => {
    if (!start) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setText(target);
      return;
    }
    let frame = 0;
    const total = target.length;
    const id = setInterval(() => {
      frame++;
      const fixed = Math.floor(frame / 2.2);
      let out = '';
      for (let i = 0; i < total; i++) {
        if (i < fixed) out += target[i];
        else if (target[i] === ' ') out += ' ';
        else out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }
      setText(out);
      if (fixed >= total) {
        setText(target);
        clearInterval(id);
      }
    }, speed);
    return () => clearInterval(id);
  }, [start, target, speed]);
  return text;
}

export default function BootHero({
  name,
  title,
  tagline,
}: {
  name: string;
  title: string;
  tagline: string;
}) {
  const [phase, setPhase] = useState<'boot' | 'hero'>('boot');
  const [lines, setLines] = useState<string[]>([]);
  const skipped = useRef(false);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const seen = sessionStorage.getItem('booted');
    if (reduced || seen) {
      setPhase('hero');
      return;
    }

    let i = 0;
    const timers: number[] = [];
    const push = () => {
      if (skipped.current) return;
      setLines((l) => [...l, BOOT_LINES[i]]);
      i++;
      if (i < BOOT_LINES.length) {
        timers.push(window.setTimeout(push, 320));
      } else {
        timers.push(
          window.setTimeout(() => {
            sessionStorage.setItem('booted', '1');
            setPhase('hero');
          }, 450)
        );
      }
    };
    timers.push(window.setTimeout(push, 250));

    const skip = () => {
      skipped.current = true;
      sessionStorage.setItem('booted', '1');
      setPhase('hero');
    };
    window.addEventListener('keydown', skip, { once: true });
    window.addEventListener('pointerdown', skip, { once: true });
    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener('keydown', skip);
      window.removeEventListener('pointerdown', skip);
    };
  }, []);

  const decodedName = useDecode(name, phase === 'hero');
  const decodedTitle = useDecode(title, phase === 'hero', 20);

  if (phase === 'boot') {
    return (
      <div
        className="font-mono text-sm md:text-base text-term/90 min-h-[220px]"
        aria-label="Loading"
      >
        {lines.map((l, i) => (
          <p key={i} className="leading-7">
            {l}
          </p>
        ))}
        <span className="cursor-blink">█</span>
        <p className="mt-6 text-xs text-faint">press any key to skip</p>
      </div>
    );
  }

  return (
    <div className="min-h-[220px]">
      <p className="eyebrow mb-4">
        <span className="pulse-dot inline-block h-2 w-2 rounded-full bg-term align-middle mr-2" />
        SYSTEM ONLINE
      </p>
      <h1 className="font-mono font-bold text-4xl md:text-6xl lg:text-7xl tracking-tight text-ink">
        {decodedName || name}
      </h1>
      <p className="mt-4 font-mono text-lg md:text-2xl text-cyan">
        {decodedTitle || title}
      </p>
      <p className="mt-5 max-w-xl text-dim text-base md:text-lg leading-relaxed">
        {tagline}
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href="#projects"
          className="hud lift px-5 py-2.5 font-mono text-sm text-cyan hover:text-ink"
        >
          view projects →
        </a>
        <a
          href="#terminal"
          className="px-5 py-2.5 font-mono text-sm text-dim border border-line hover:border-cyan/40 hover:text-ink transition-colors"
        >
          open terminal_
        </a>
      </div>
    </div>
  );
}
