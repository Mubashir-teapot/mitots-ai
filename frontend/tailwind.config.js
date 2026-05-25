/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        gold: '#E8A020',
        navy: '#0B1929',
        'app-bg': '#F0F4F9',
        'app-border': '#DDE3EC',
        'text-primary': '#1A2332',
        'text-secondary': '#5A6B82',
        'gold-bg': '#FEF5E0',
      },
      fontFamily: {
        mono: ['"Courier New"', 'Courier', 'monospace'],
      },
    },
  },
  plugins: [],
}
