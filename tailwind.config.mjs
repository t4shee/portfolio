/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md}'],
  theme: {
    extend: {
      colors: {
        void: '#070B14',      // base
        surface: '#0E1524',   // raised panels
        line: '#1C2740',      // borders
        ink: '#E8ECF4',       // primary text
        dim: '#8B94A8',       // muted text
        violet: '#8B5CFF',    // quantum / AI / research
        mint: '#2DE0A5',      // signal / ops / security / success
        threat: '#FF4D6D',    // alerts, sparse
      },
      fontFamily: {
        display: ['"Clash Display"', 'Inter', 'sans-serif'],
        sans: ['"IBM Plex Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      maxWidth: { content: '74rem' },
    },
  },
  plugins: [],
};
