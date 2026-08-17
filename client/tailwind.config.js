/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        base: 'var(--color-base)',
        surface: 'var(--color-surface)',
        surface2: 'var(--color-surface2)',
        accent: 'var(--accent)',
        accent2: 'var(--accent2)',
        muted: 'var(--color-muted)',
        text: 'var(--color-text)',
      },
      fontFamily: {
        display: ['"Clash Display"', 'Poppins', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      backgroundImage: {
        'grid-glow': 'radial-gradient(circle at 20% 20%, rgba(var(--accent-rgb),0.15), transparent 40%), radial-gradient(circle at 80% 60%, rgba(var(--accent2-rgb),0.12), transparent 40%)',
      },
      boxShadow: {
        glow: '0 0 40px rgba(var(--accent-rgb),0.25)',
        card: '0 4px 24px rgba(0,0,0,0.08)',
      },
    },
  },
  plugins: [],
};
