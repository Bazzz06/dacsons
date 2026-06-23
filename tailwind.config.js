/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#070A14', // near-black navy, the "sombre" end
        navy: '#16244D', // martini deep blue
        sky: '#5BC3EF', // martini light blue
        racing: '#E11D2A', // martini red
        paper: '#F3F2EE', // warm off-white, the "clair" end
      },
      fontFamily: {
        display: ['"Clash Display"', 'system-ui', 'sans-serif'],
        sans: ['"Satoshi"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.65, 0.05, 0, 1)',
      },
    },
  },
  plugins: [],
}
