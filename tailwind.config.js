/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'finance-bg': '#fafaf9',
        'finance-dark-bg': '#0a0a0a',
        'finance-border': '#e7e5e4',
        'finance-dark-border': '#262626',
        'finance-text': '#1c1917',
        'finance-dark-text': '#fafaf9',
        'finance-muted': '#78716c',
        'finance-dark-muted': '#a8a29e',
        'finance-accent': '#dc2626',
        'finance-green': '#16a34a',
        'finance-blue': '#2563eb',
      },
      fontFamily: {
        'sans': ['IBM Plex Mono', 'Courier New', 'monospace'],
        'display': ['Archivo', 'Arial Narrow', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in',
        'slide-down': 'slideDown 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
