import { useEffect, useRef, useState } from 'react';
import { identity, projects, achievements, skills, skillClusters, resumeAvailable } from '../../data/profile';

type Line = { kind: 'in' | 'out' | 'ok' | 'err' | 'violet'; text: string };

const HELP = [
  'available commands:',
  '  whoami            — who is this person',
  '  ls                — list site directories',
  '  cat resume.pdf    — fetch the resume',
  '  open linkedin     — open a secure channel',
  '  open github       — inspect the code',
  '  sudo hire         — you know what this does',
  '  clear             — clear the terminal',
  '',
  '(some commands are not listed.)',
];

// Commands that emit lines over time: array of [delayMs, Line]
type Staged = Array<[number, Line]>;

function respond(raw: string): { lines?: Line[]; staged?: Staged; action?: () => void } {
  const cmd = raw.trim().toLowerCase().replace(/\s+/g, ' ');
  const out = (text: string): Line => ({ kind: 'out', text });
  const ok = (text: string): Line => ({ kind: 'ok', text });
  const vio = (text: string): Line => ({ kind: 'violet', text });
  const err = (text: string): Line => ({ kind: 'err', text });

  if (cmd === '') return {};
  if (cmd === 'help' || cmd === '?') return { lines: HELP.map(out) };

  if (cmd === 'whoami')
    return {
      lines: [
        ok(`${identity.name} — ${identity.title}`),
        out(identity.tagline),
        out('M.Tech CSE (Cyber Security specialization), NFSU. CGPA 9.1.'),
      ],
    };

  if (cmd === 'ls')
    return { lines: [out('about/  experience/  projects/  skills/  achievements/  contact/  resume.pdf')] };

  if (cmd === 'cat resume.pdf' || cmd === 'cat resume' || cmd === 'resume') {
    if (resumeAvailable) {
      return {
        lines: [ok('transferring resume.pdf ...')],
        action: () => window.open('/resume.pdf', '_blank'),
      };
    }
    return {
      lines: [
        err('cat: resume.pdf: permission denied'),
        out('resume transfers run over a secure channel — request access:'),
        ok(`  → ${identity.linkedin}`),
      ],
    };
  }

  if (cmd === 'open linkedin' || cmd === 'linkedin')
    return { lines: [ok('opening secure channel → linkedin ...')], action: () => window.open(identity.linkedin, '_blank') };
  if (cmd === 'open github' || cmd === 'github')
    return { lines: [ok('inspecting source → github ...')], action: () => window.open(identity.github, '_blank') };

  if (cmd === 'projects')
    return {
      lines: [
        out('drwxr-x--- ./projects'),
        ...projects.map((p) => out(`  ${p.slug.padEnd(22)} ${p.oneLiner}`)),
        out("type 'open <name>' to pull a case file"),
      ],
    };

  if (cmd.startsWith('open ')) {
    const slug = cmd.slice(5).trim();
    const p = projects.find((x) => x.slug === slug || x.name.toLowerCase() === slug);
    if (p) return { lines: [ok(`opening /projects/${p.slug} ...`)], action: () => (window.location.href = `/projects/${p.slug}/`) };
    return { lines: [err(`open: '${slug}' not found. try 'projects', 'linkedin', or 'github'.`)] };
  }

  if (cmd === 'skills') {
    const by = (c: keyof typeof skillClusters) => skills.filter((s) => s.cluster === c).map((s) => s.label).join(', ');
    return { lines: [vio('[AI / ML]        ' + by('ai')), ok('[CYBERSECURITY]  ' + by('sec')), out('[SYSTEMS]        ' + by('sys'))] };
  }

  if (cmd === 'achievements') return { lines: achievements.map((a) => ok(`${a.year}  ★ ${a.title}`)) };

  if (cmd === 'contact')
    return { lines: [out('secure channel: LinkedIn'), ok(`  → ${identity.linkedin}`), out(`code: ${identity.github}`)] };

  // ---- sudo hire: dramatic staged sequence ----
  if (cmd === 'sudo hire' || cmd === 'sudo hire tashee')
    return {
      staged: [
        [0, out('[sudo] verifying credentials ...')],
        [500, ok('identity confirmed: recruiter_with_excellent_judgment')],
        [1000, ok('ACCESS GRANTED')],
        [1450, out('opening secure channel ...')],
        [2100, ok(`  → ${identity.linkedin}`)],
        [2400, out('response time: fast. appetite for hard problems: guaranteed.')],
      ],
      action: () => setTimeout(() => window.open(identity.linkedin, '_blank'), 2200),
    };
  if (cmd.startsWith('sudo')) return { lines: [err(`${raw.trim()}: permission denied. (try 'sudo hire')`)] };

  // ---- hidden: hack ----
  if (cmd === 'hack')
    return {
      staged: [
        [0, out('initializing intrusion framework ...')],
        [420, ok('bypassing firewall .......... done')],
        [900, ok('cracking mainframe .......... done')],
        [1350, ok('downloading the internet .... 98%')],
        [1900, err('ERROR: conscience.dll loaded')],
        [2400, out('just kidding — I do this legally. (see: SOC internship, hackathon wins)')],
      ],
    };

  // ---- hidden: nmap visitor ----
  if (cmd === 'nmap visitor' || cmd === 'nmap')
    return {
      staged: [
        [0, out('Starting Nmap 9.0 ( https://nmap.org ) — scanning visitor ...')],
        [500, out('PORT      STATE     SERVICE')],
        [700, ok('22/tcp    open      curiosity')],
        [950, ok('80/tcp    open      attention')],
        [1200, ok('443/tcp   open      good-taste (encrypted)')],
        [1450, out('8080/tcp  filtered  skepticism')],
        [1750, ok('Scan complete: 1 impressive visitor up (0.02s latency)')],
      ],
    };

  if (cmd === 'rm -rf /' || cmd.startsWith('rm '))
    return { lines: [err('nice try. filesystem is read-only. intrusion logged.')] };
  if (cmd === 'exit' || cmd === 'quit') return { lines: [out('there is no exit. only scroll.')] };
  if (cmd === 'pwd') return { lines: [out('/home/tashee/portfolio')] };

  return { lines: [err(`command not found: ${cmd.split(' ')[0]} — type 'help'`)] };
}

export default function Terminal() {
  const [history, setHistory] = useState<Line[]>([
    { kind: 'out', text: 'tashee@portfolio:~$ session established · observer channel open' },
    { kind: 'out', text: "type 'help' to list commands, or go straight for 'sudo hire'" },
  ]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [history]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const run = () => {
    if (busy) return;
    const value = input;
    if (value.trim().toLowerCase() === 'clear') {
      setHistory([]);
      setInput('');
      return;
    }
    const res = respond(value);
    setHistory((h) => [...h, { kind: 'in', text: value }, ...(res.lines ?? [])]);
    if (value.trim()) setCmdHistory((c) => [value, ...c]);
    setHistIdx(-1);
    setInput('');
    if (res.staged) {
      setBusy(true);
      const total = res.staged[res.staged.length - 1][0];
      for (const [delay, line] of res.staged) {
        timers.current.push(window.setTimeout(() => setHistory((h) => [...h, line]), delay));
      }
      timers.current.push(window.setTimeout(() => setBusy(false), total + 100));
    }
    res.action?.();
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') run();
    else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = Math.min(histIdx + 1, cmdHistory.length - 1);
      if (cmdHistory[next]) { setHistIdx(next); setInput(cmdHistory[next]); }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = histIdx - 1;
      setHistIdx(next);
      setInput(next >= 0 ? cmdHistory[next] : '');
    }
  };

  const color = (k: Line['kind']) =>
    k === 'in' ? 'text-ink' : k === 'ok' ? 'text-mint' : k === 'err' ? 'text-threat' : k === 'violet' ? 'text-violet' : 'text-dim';

  return (
    <div className="panel text-left cursor-text" onClick={() => inputRef.current?.focus()} data-native-cursor>
      <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-threat/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-violet/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-mint/70" />
        <span className="ml-3 font-mono text-xs text-dim">tashee@portfolio: ~ (interactive — type here)</span>
      </div>
      <div ref={bodyRef} className="h-72 overflow-y-auto px-4 py-3 font-mono text-[13px] leading-6" role="log" aria-live="polite">
        {history.map((l, i) => (
          <p key={i} className={color(l.kind)}>
            {l.kind === 'in' && <span className="text-mint select-none">$ </span>}
            {l.text}
          </p>
        ))}
        <div className="flex items-center">
          <span className="text-mint select-none">$&nbsp;</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKey}
            disabled={busy}
            className="flex-1 bg-transparent text-ink outline-none caret-[#2DE0A5]"
            aria-label="Terminal command input"
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
}
