/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html'
  ],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1440px',
    },
    extend: {
      colors: {
        bg: {
          primary: '#0A0A0B',
          surface: '#141416',
          elevated: '#1C1C1F',
          soft: '#222226',
          white: '#FFFFFF',
        },
        text: {
          primary: '#F5F5F5',
          secondary: '#A1A1AA',
          muted: '#6B7280',
        },
        border: {
          hairline: 'rgba(255, 255, 255, 0.08)',
          subtle: 'rgba(255, 255, 255, 0.14)',
          dark: '#2A2A2E',
        },
        accent: {
          primary: '#6366F1',
          hover: '#4F46E5',
          glow: 'rgba(99, 102, 241, 0.2)',
          cobalt: '#6366F1',
          red: '#EF4444',
          orange: '#F97316',
          yellow: '#F59E0B',
          green: '#10B981',
          charcoal: '#1C1C1F',
        },
      },
      fontFamily: {
        sans: ['Geist Sans', 'Helvetica Neue', 'Inter', 'sans-serif'],
        serif: ['Cormorant Garamond', 'Playfair Display', 'serif'],
      },
      fontSize: {
        'nav': ['12px', { letterSpacing: '0.08em', lineHeight: '1rem' }],
        'hero-desktop': ['96px', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
        'hero-mobile': ['52px', { lineHeight: '1.02', letterSpacing: '-0.02em' }],
        'section-title': ['48px', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
      borderRadius: {
        DEFAULT: '0px',
        none: '0px',
      },
    },
  },
  plugins: [],
};
