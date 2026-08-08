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
          primary: '#F7F6F2',
          white: '#FFFFFF',
          soft: '#EFEEE9',
        },
        text: {
          primary: '#111111',
          secondary: '#666666',
          muted: '#999999',
        },
        border: {
          hairline: '#DCDCD7',
          dark: '#181818',
        },
        accent: {
          cobalt: '#1747FF',
          red: '#D62828',
          orange: '#F26A21',
          yellow: '#E9C400',
          green: '#176B4D',
          charcoal: '#181818',
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
