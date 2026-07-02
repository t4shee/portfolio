import { useEffect, useRef, useState } from 'react';
import {
  identity,
  projects,
  achievements,
  skills,
  skillClusters,
} from '../../data/profile';

type Line = { kind: 'in' | 'out' | 'ok' | 'err'; text: string };

const HELP = [
  'available commands:',
  '  whoami          — who is this person',
  '  projects        — list project files',
  '  open <name>     — open a project page (e.g. open cybervajra)',
  '  skills          — dump the skill matrix',
  '  achievements    — list the trophy wall',
  '  contact         — how to reach me',
  '  sudo hire       — you know what this does',
  '  clear           — clear the terminal',
];

function respond(raw: string): Line[] {
  const cmd = raw.trim().toLowerCase();
  const out = (text: string): Line => ({ kind: 'out', text });
  const ok = (text: string): Line => ({ kind: 'ok', text });
  const err = (text: string): Line => ({ kind: 'err', text });

  if (cmd === '' ) return [];
  if (cmd === 'help' || cmd === '?') return HELP.map(out);

  if (cmd === 'whoami')
    return [
      ok(`${identity.name} — ${identity.title}`),
      out(identity.tagline),
      out('Final-year B.Tech–M.Tech (CSE, Cyber Security), NFSU. CGPA 9.05.'),
    ];

  if (cmd === 'projects')
    return [
      out('drwxr-x--- ./projects'),
      ...projects.map((p) =>
        out(`  ${p.slug.padEnd(18)} ${p.oneLiner}`)
      ),
      out("type 'open <name>' to inspect one"),
    ];

  if (cmd.startsWith('open ')) {
    const slug = cmd.slice(5).trim();
    const p = projects.find((x) => x.slug === slug || x.name.toLowerCase() === slug);
    if (p) {
      window.location.href = `/projects/${p.slug}/`;
      return [ok(`opening /projects/${p.slug} ...`)];
    }
    return [err(`open: '${slug}' not found. try 'projects' first.`)];
  }

  if (cmd === 'skills') {
    const byCluster = (c: keyof typeof skillClusters) =>
      skills.filter((s) => s.cluster === c).map((s) => s.label).join(', ');
    return [
      ok('[AI / ML]        ' + byCluster('ai')),
      ok('[CYBERSECURITY]  ' + byCluster('sec')),
      ok('[SYSTEMS]        ' + byCluster('sys')),
    ];
  }

  if (cmd === 'achievements')
    return achievements.map((a) => ok(`${a.year}  ${a.title}`));

  if (cmd === 'contact')
    return [
      out('secure channel: LinkedIn'),
      ok(`  → ${identity.linkedin}`),
      out(`code: ${identity.github}`),
    ];

  if (cmd === 'sudo hire' || cmd === 'sudo hire tashee')
    return [
      ok('[sudo] permission granted. excellent judgment.'),
      out('initiating recruitment protocol ...'),
      ok(`  → message me on LinkedIn: ${identity.linkedin}`),
      out('response time: fast. interest in hard problems: guaranteed.'),
    ];

  if (cmd.startsWith('sudo'))
    return [err(`${raw.trim()}: permission denied. (try 'sudo hire')`)];

  if (cmd === 'ls')
    return [out('about/  experience/  projects/  skills/  achievements/  contact/')];

  if (cmd === 'rm -rf /' || cmd.startsWith('rm '))
    return [err('nice try. filesystem is read-only. intrusion logged.')];

  if (cmd === 'exit' || cmd === 'quit')
    return [out('there is no exit. only scroll.')];

  return [err(`command not found: ${cmd.split(' ')[0]} — type 'help'`)];
}

export default function Terminal() {
  const [history, setHistory] = useState<Line[]>([
    { kind: 'out', text: `tashee@portfolio:~$ session established` },
    { kind: 'out', text: `type 'help' to list commands, or try 'sudo hire'` },
  ]);
  const [input, setInput] = useState('');
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [history]);

  const run = () => {
    const value = input;
    if (value.trim().toLowerCase() === 'clear') {
      setHistory([]);
      setInput('');
      return;
    }
    setHistory((h) => [
      ...h,
      { kind: 'in', text: value },
      ...respond(value),
    ]);
    if (value.trim()) setCmdHistory((c) => [value, ...c]);
    setHistIdx(-1);
    setInput('');
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') run();
    else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = Math.min(histIdx + 1, cmdHistory.length - 1);
      if (cmdHistory[next]) {
        setHistIdx(next);
        setInput(cmdHistory[next]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = histIdx - 1;
      setHistIdx(next);
      setInput(next >= 0 ? cmdHistory[next] : '');
    }
  };

  const color = (k: Line['kind']) =>
    k === 'in'
      ? 'text-ink'
      : k === 'ok'
        ? 'text-term'
        : k === 'err'
          ? 'text-warn'
          : 'text-dim';

  return (
    <div
      className="hud text-left cursor-text"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-warn/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-term/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-cyan/70" />
        <span className="ml-3 font-mono text-xs text-faint">
          tashee@portfolio: ~ (interactive — type here)
        </span>
      </div>
      <div
        ref={bodyRef}
        className="h-72 overflow-y-auto px-4 py-3 font-mono text-[13px] leading-6"
        role="log"
        aria-live="polite"
      >
        {history.map((l, i) => (
          <p key={i} className={color(l.kind)}>
            {l.kind === 'in' && (
              <span className="text-cyan select-none">$ </span>
            )}
            {l.text}
          </p>
        ))}
        <div className="flex items-center">
          <span className="text-cyan select-none">$&nbsp;</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKey}
            className="flex-1 bg-transparent text-ink outline-none caret-cyan"
            aria-label="Terminal command input"
            autoComplete="off"
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
}
