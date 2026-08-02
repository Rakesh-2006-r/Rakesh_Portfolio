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
        primary: {
          50: '#f0f5ff',
          100: '#e0ebff',
          200: '#c7dcff',
          300: '#9ec1ff',
          400: '#6b9cff',
          500: '#386eff',
          600: '#2550f4',
          700: '#1d3edb',
          800: '#1e34b1',
          900: '#1e318c',
          950: '#111b54',
        },
        slate: {
          300: '#F8FAFC', // Primary Text (Bright White)
          400: '#94A3B8', // Secondary Text (Slate Text)
          500: '#94A3B8', // Secondary Text (Slate Text)
          600: '#475569', 
        },
        darkBg: '#0F172A', // Deep Slate
        lightBg: '#fafafa',
        darkCard: 'rgba(30, 41, 59, 0.75)', // Slate Container (#1E293B) with glass effect
        lightCard: 'rgba(255, 255, 255, 0.65)',
        accentPurple: '#14B8A6', // Secondary Accent (Teal)
        accentBlue: '#10B981', // Primary Accent (Emerald Green)
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'blob': 'blob 10s infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        blob: {
          '0%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
          '33%': {
            transform: 'translate(30px, -50px) scale(1.15)',
          },
          '66%': {
            transform: 'translate(-20px, 20px) scale(0.9)',
          },
          '100%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'premium': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'premium-light': '0 8px 32px 0 rgba(31, 38, 135, 0.08)',
        'glow-blue': '0 0 25px -5px rgba(59, 130, 246, 0.4)',
        'glow-purple': '0 0 25px -5px rgba(168, 85, 247, 0.4)',
      }
    },
  },
  plugins: [],
}
