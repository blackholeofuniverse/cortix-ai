/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography'
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary': '#000000',
        'secondary': '#333333',
        'navy': '#030712',
        'btn-or': '#FF6500',
        'accent': '#0284c7',
        'light': {
          100: '#ffffff',
          200: '#f3f4f6',
          300: '#e5e7eb',
          400: '#d1d5db',
          500: '#9ca3af',
        },
        'dark': {
          100: '#1f2937',
          200: '#111827',
          300: '#030712',
          400: '#000000',
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [
    typography(),
  ],
};