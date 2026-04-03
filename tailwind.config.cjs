/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        obsidian: '#13100d',
        basalt: '#1b1714',
        earth: '#26201c',
        stone: '#342d28',
        bronze: '#6c5a42',
        ochre: '#a68452',
        parchment: '#e8decb',
        ash: '#b7ac98',
        ivory: '#f3ece0',
        indigo: '#343545',
        plum: '#433540',
        moss: '#667461',
        success: '#7f9677',
        danger: '#ba7e6d',
      },
      fontFamily: {
        sans: ['EB Garamond', 'Georgia', 'serif'],
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        display: ['Cinzel', 'Georgia', 'serif'],
      },
      boxShadow: {
        panel: '0 18px 48px rgba(0, 0, 0, 0.22)',
        inset: 'inset 0 1px 0 rgba(255, 255, 255, 0.04)',
      },
      maxWidth: {
        shell: '76rem',
      },
      backgroundImage: {
        'sky-fade': 'radial-gradient(circle at top, rgba(166,132,82,0.09), transparent 34%)',
        'stone-fade': 'linear-gradient(180deg, rgba(255,255,255,0.03), transparent 28%)',
      },
    },
  },
  plugins: [],
}
