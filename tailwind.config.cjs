/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './pages/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        night: '#05070b',
        neon: '#00f5ff',
        steel: '#12151c',
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"Share Tech Mono"', 'monospace'],
      },
      boxShadow: {
        neon: '0 0 30px rgba(0, 245, 255, 0.45)',
      },
      animation: {
        pulseGlow: 'pulseGlow 2.2s ease-in-out infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { transform: 'scale(1)', boxShadow: '0 0 0 rgba(0, 245, 255, 0)' },
          '50%': { transform: 'scale(1.04)', boxShadow: '0 0 30px rgba(0, 245, 255, 0.5)' },
        },
      },
    },
  },
  plugins: [],
};
