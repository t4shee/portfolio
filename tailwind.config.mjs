/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md}'],
  theme: {
    extend: {
      colors: {
        // Warmer, calmer "research instrument" palette — no neon.
        void: '#0C0D10',      // warm near-black base
        surface: '#131519',   // raised panels
        raise: '#181B21',     // hover surfaces
        line: '#262A32',      // hairline borders
        ink: '#E6E4DF',       // warm off-white primary text
        dim: '#9A9891',       // muted warm grey
        faint: '#6A6862',     // tertiary
        // Single restrained accent: a muted amber/brass (instrument dial).
        accent: '#C9A227',    // brass — used sparingly, never glowing
        accent2: '#7C8B7A',   // sage green secondary, very quiet
        alert: '#B4552F',     // burnt sienna, for rare alerts only
      },
      fontFamily: {
        display: ['"Fraunces"', 'Georgia', 'serif'],   // characterful serif for headers
        sans: ['"IBM Plex Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      maxWidth: { content: '72rem' },
    },
  },
  plugins: [],
};
