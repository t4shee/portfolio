/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md}'],
  theme: {
    extend: {
      colors: {
        base: '#0A0E14',       // page background
        panel: '#111722',      // raised surfaces
        panel2: '#151C29',     // hover surfaces
        line: 'rgba(148,163,184,0.14)', // hairline borders
        ink: '#E2E8F0',        // primary text
        dim: '#94A3B8',        // secondary text
        faint: '#64748B',      // tertiary text
        cyan: '#22D3EE',       // security / primary accent
        violet: '#8B5CF6',     // AI / research accent
        term: '#4ADE80',       // terminal green (terminal contexts only)
        warn: '#F59E0B',
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      maxWidth: { content: '72rem' },
    },
  },
  plugins: [],
};
