module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      dropShadow: {
        'tile-light': '0 0 2px rgba(245, 240, 235, 0.3)',
        'tile-dark': '0 0 2px rgba(30, 30, 30, 0.3)',
      }
    },
  },
  plugins: [],
}
