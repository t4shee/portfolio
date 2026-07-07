/** @type {import('tailwindcss').Config} */
// All colors resolve through CSS variables (RGB triplets) so the
// light/dark themes share every component. See global.css for values.
const v = (name) => `rgb(var(${name}) / <alpha-value>)`;

export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md}'],
  theme: {
    extend: {
      colors: {
        void: v('--c-void'),
        surface: v('--c-surface'),
        raise: v('--c-raise'),
        line: v('--c-line'),
        ink: v('--c-ink'),
        dim: v('--c-dim'),
        faint: v('--c-faint'),
        accent: v('--c-accent'),    // pink (both themes)
        accent2: v('--c-accent2'),  // beige (dark) / baby mint (light)
        alert: v('--c-alert'),
      },
      fontFamily: {
        display: ['"Fraunces"', 'Georgia', 'serif'],
        sans: ['"IBM Plex Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      maxWidth: { content: '72rem' },
    },
  },
  plugins: [],
};
